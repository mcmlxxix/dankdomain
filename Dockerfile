# docker build -t ddgame .
FROM centos:8
MAINTAINER Robert Hurst <theflyingape@gmail.com>
EXPOSE 1939

ENV LANG=C.UTF-8
RUN dnf -y upgrade-minimal
RUN dnf -y module install nodejs:12/development
RUN dnf -y install openssl python36 gcc-c++ make

# Set the working directory
WORKDIR /usr/src/dankdomain
#ENV NODE_PTY_DEBUG 1

CMD ["npm", "start"]

# First, install dependencies to improve layer caching
COPY package.json /usr/src/dankdomain/
RUN npm install

# Add the code
COPY . /usr/src/dankdomain

# Run the tests and build, to make sure everything is working nicely
RUN npm run build