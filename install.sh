#!/bin/sh

[ -n "$1" ] && TARGET="$1" || TARGET=/usr/local/games
TARGET="${TARGET}/`basename ${PWD}`"
echo "Installing into ${TARGET}"

# let's prompt for admin credentials now, if necessary
sudo -v || exit

[ -d ${TARGET} ] || sudo mkdir -v ${TARGET}

# let's start with the services
[ -n "`which node`" ] || sudo dnf install nodejs npm
sudo dnf update nodejs npm

# add the transpiler
# npm install typescript@next -g
tsc -v && sudo npm update typescript -g || sudo npm install typescript -g

# this.package install script
sudo npm install

# transpile and test run locally
npm run build

# copy build, add it as a network service, and happy hunting
member=`sudo groupmems -g games -l | grep -c nobody`
[ $member -eq 0 ] && sudo groupmems -g games -a nobody

[ -d ./build/tty/files/tavern ] || sudo mkdir ./build/tty/files/tavern
[ -d ./build/tty/files/user ] || sudo mkdir ./build/tty/files/user
sudo rsync -a --delete ./build/ ${TARGET}
sudo rsync -a --delete ./node_modules ${TARGET}/
sudo chown -R root.games ${TARGET}
sudo find ${TARGET} -type d -exec chmod u+rwx,g+rwxs,o-rwx {} \;
ls -lh ${TARGET}

# practical, but use at your own risk
[ -n "`which in.telnetd`" ] || sudo dnf install telnet-server

cat > dankdomain << EOD
# default: on
# description: Dank Domain TTY service allows for remote user logins to play
#              Return of Hack & Slash.
service dankdomain
{
        disable = no
	port			= 23
        socket_type             = stream
	type			= UNLISTED
        wait                    = no
        user                    = nobody
	group			= games
        server                  = `which in.telnetd`
	server_args		= -L ${TARGET}/logins.sh
	env			= TERM=pcansi
	cps			= 2 5
        log_on_success          += HOST
        log_on_failure          = 
	instances		= 6
	per_source		= 1
}
EOD

sudo mv -v dankdomain /etc/xinetd.d/
sudo systemctl enable xinetd
sudo systemctl restart xinetd

if sudo service iptables status ; then
	hole=`sudo iptables -L INPUT -n | grep -c 'dpt:23'`
	if [ $hole -eq 0 ]; then
                sudo iptables -A INPUT -p tcp --syn --dport 23 -m connlimit --connlimit-above 1 -j REJECT
		sudo iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 23 -j ACCEPT
		sudo service iptables save
	fi
fi

sudo cp ${TARGET}/etc/dankdomain.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable dankdomain
sudo systemctl start dankdomain

echo -n "Press RETURN to continue: "
read n

echo
echo ... an Apache configuration example follows:
echo

cat <<-EOD
#
#   Apache proxy to run local Node.js apps using xterm.js
#
    SSLProxyEngine On
    ProxyRequests Off
    ProxyPreserveHost On
    ProxyBadHeader Ignore
    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    RewriteEngine On
    RewriteCond %{HTTP:Connection} Upgrade [NC]
    RewriteRule "^/games/dankdomain/xterm/(.*)" ws://`hostname -f`:1939/$1 [P,L]

    <Location "/games/dankdomain/xterm/">
        ProxyPass "http://`hostname -f`:1939/"
        ProxyPassReverse "http://`hostname -f`:1939/"
        Order allow,deny
        Allow from all
        Header edit Location ^http://`hostname -f`:1939/ https://robert.hurst-ri.us/
    </Location>

EOD

# DOOR uses app: express + ws and node-pty
#    for client: browser using xterm.js
#
# if https / wss is used, SSL Proxy works for me like this:
#
#       SSLProxyCheckPeerName off
#       SSLProxyVerify none
#
#       RewriteEngine On
#       RewriteCond %{HTTP:Upgrade} WebSocket [NC]
#       RewriteRule "^/xterm/(.*)" wss://atom.home:1939/xterm/$1 [P,L]
#
#       <Location "/xterm/door/">
#               ProxyPass "https://atom.home:1965/xterm/door/"
#               ProxyPassReverse "https://atom.home:1965/xterm/door/"
#               Order allow,deny
#               Allow from all
#       </Location>
#
# openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem

exit
