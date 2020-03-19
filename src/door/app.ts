/*****************************************************************************\
 *  Dank Domain: the return of Hack & Slash                                  *
 *  DOOR authored by: Robert Hurst <theflyingape@gmail.com>                  *
\*****************************************************************************/
import chokidar = require('chokidar')
import dns = require('dns')
import express = require('express')
import fs = require('fs')
import http = require('http')
import https = require('https')
import pty = require('node-pty')
import ws = require('ws')
import { coins } from '../common'
const { URL } = require('url')
const DOOR = '/'

process.title = 'door'
process.chdir(__dirname)
console.log(`cwd: ${__dirname}`)

let server, ssl
let sessions = {}
let broadcasts = {}
let latest = { now: 0, msg: '' }

//dns.lookup('localhost', (err, addr, family) => {
dns.lookup('0.0.0.0', (err, addr, family) => {

  const app = express()
  app.set('trust proxy', ['loopback', addr])

  try {
    ssl = { key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') }
    server = https.createServer(ssl, app)
  }
  catch (e) {
    server = http.createServer(app)
  }
  let port = parseInt(process.env.PORT) || 1939

  //  enable REST services
  server.listen(port, addr)
  console.log(`Dank Domain Door on ${ssl ? 'https|wss' : 'http|ws'}://${addr}:${port}`)

  //  enable WebSocket endpoints
  const wsActive = new ws.Server({ noServer: true, path: `${DOOR}player/`, clientTracking: true })
  const wsLurker = new ws.Server({ noServer: true, path: `${DOOR}lurker/`, clientTracking: true })

  server.on('upgrade', (req, socket, head) => {
    const pathname = new URL(req.url, 'https://localhost').pathname
    if (pathname == `${DOOR}player/`) {
      wsActive.handleUpgrade(req, socket, head, (ws) => {
        wsActive.emit('connection', ws, req)
      })
    }
    else if (pathname == `${DOOR}lurker/`) {
      wsLurker.handleUpgrade(req, socket, head, (ws) => {
        wsLurker.emit('connection', ws, req)
      })
    } else {
      console.log(`?FATAL WebSocket request: ${pathname}`)
      socket.destroy()
    }
  })

  //  web services
  app.use(DOOR, express.static(__dirname + '/static'))

  //  REST services
  //  Player API
  app.get(`${DOOR}player/`, (req, res) => {
    let client = req.header('x-forwarded-for') || req.connection.remoteAddress
    console.log(`Door knocked from remote host: ${client} (${req.hostname})`)

    let list = []
    list.push(
      { handle: `The <span style="color:brown !important;">Player manual</span>: <a href="https://manual.DDgame.us" target="_blank">manual.DDgame.us</a>`, png: 'connect/arexielite_by_peachyco', effect: 'fadeInRight' },
      { handle: '100 dungeon levels, 10 dank domains', png: 'connect/dragonborn_dagger_sorcerer_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Take on the Monster Mash', png: 'connect/dragonborn_hexblade_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Come get some', png: 'connect/elf_cleric_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Crying will not help you', png: 'connect/elf_fighter_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Naval battles', png: 'connect/guild_findsman_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Rob and pick pockets', png: 'connect/human_battlemage_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Magic can be fun', png: 'connect/human_enchantress_mage_by_peachyco', effect: 'fadeInRight' },
      { handle: 'I hit like a girl. Heh.', png: 'connect/human_warpriest_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Discover all 20 magic rings', png: 'connect/human_wizard_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Come join our gang!', png: 'connect/kashaw_and_zahra_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Weapon and Armor specials', png: 'connect/krauser_dragonborn_warlord_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Special magicks', png: 'connect/lucien2_human_wizard_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Magic potions and poisons', png: 'connect/lucien_human_wizard_by_peachyco', effect: 'fadeInRight' },
      { handle: `Let's brawl in the tavern`, png: 'connect/orc_pirate_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Advance to a Paladin', png: 'connect/paladin_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Taunt others as a Titan', png: 'connect/thrask_goliath_fighter_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Transcend to a God', png: 'connect/warforged_fighter_and_human_wizard_by_peachyco', effect: 'fadeInRight' },
      { handle: 'Shall we begin?', png: 'connect/yuriel_genasi_warlord_by_peachyco', effect: 'fadeInRight' }
    )

    const armor = require('../items/armor.json')
    for (let i in armor) {
      if (!armor[i].armoury) {
        let profile = { handle: `<span style="color:${armor[i].dwarf ? 'black' : 'brown'} !important;">${i}</span>`, level: armor[i].ac, pc: (armor[i].dwarf ? 'dwarven' : 'uncommon') + ' armor', effect: 'fadeInUpBig' }
        profile['jpg'] = `specials/${i}`
        list.push(profile)
      }
    }

    const weapon = require('../items/weapon.json')
    for (let i in weapon) {
      if (!weapon[i].shoppe) {
        let profile = { handle: `<span style="color:${weapon[i].dwarf ? 'black' : 'brown'} !important;">${i}</span>`, level: weapon[i].wc, pc: (weapon[i].dwarf ? 'dwarven' : 'uncommon') + ' weapon', effect: 'fadeInUpBig' }
        profile['jpg'] = `specials/${i}`
        list.push(profile)
      }
    }

    const monsters = require('../etc/dungeon.json')
    let level = 0
    for (let n in monsters) {
      let pc = monsters[n].pc
      let profile = { handle: `The <span style="color:brown !important;">${n}</span>:`, level: ++level, pc: pc, effect: monsters[n].effect || 'fadeIn' }
      profile['jpg'] = `dungeon/${n}`
      if (!pc) profile['pc'] = `(same class)`
      list.push(profile)
    }

    let rs = query(`SELECT id,handle,pc,gender,level FROM Players WHERE xplevel>1`)
    for (let n in rs) {
      let id = rs[n].id, handle = rs[n].handle, pc = rs[n].pc, gender = rs[n].gender, level = rs[n].level
      let profile = { handle: handle, level: level, pc: pc, effect: 'fadeInLeft' }
      if (id[0] == '_') {
        profile['jpg'] = `npc/${{ _BAR: 'barkeep', _DM: 'dwarf', _NEP: 'neptune', _OLD: 'seahag', _TAX: 'taxman' }[id]}`
        delete profile.level
      }
      else {
        let userPNG = `user/${id}`
        try {
          fs.accessSync(`./static/images/${userPNG}.png`, fs.constants.F_OK)
        } catch (e) {
          userPNG = 'player/' + pc.toLowerCase() + (gender == 'F' ? '_f' : '')
        }
        profile['png'] = userPNG
      }
      list.push(profile)
    }

    const ring = require('../items/ring.json')
    for (let i in ring) {
      let profile = { handle: `<h2>${ring[i].unique ? 'The <span style="color:black' : 'Special <span style="color:brown'} !important">${i}</span> ${ring[i].emoji} ring</h2>`, pc: ring[i].description, effect: 'fadeInUpBig' }
      profile['jpg'] = `ring/${i}`
      list.push(profile)
    }

    res.send(JSON.stringify({ list: list, wall: latest.msg }))
    res.end()
  })

  app.post(`${DOOR}player`, function (req, res) {
    let client = req.header('x-forwarded-for') || req.connection.remoteAddress
    let cols = parseInt(req.query.cols)
    let rows = parseInt(req.query.rows)
    let tty = req.query.tty || "XT"

    process.env.SSH_CLIENT = client
    let term = pty.spawn('sh', ["-l", "../logins.sh", tty], {
      name: 'xterm-256color',
      cols: cols || 80,
      rows: rows || 25,
      cwd: __dirname,
      env: process.env
    })

    let pid: number = term.pid
    broadcasts[pid] = ''
    sessions[pid] = term
    sessions[pid].client = process.env.SSH_CLIENT
    //  buffer any initial output from forked process
    //  between this post and ensuing client wss connection
    sessions[pid].spawn = term.onData((data) => {
      sessions[pid].startup = (sessions[pid].startup || '') + data
    })
    //require('child_process').execSync(`sleep .3`)

    res.send(pid.toString())
    res.end()

    console.log(`Create PLAYER session ${pid} using ${tty} from remote host: ${client} (${req.hostname})`)
  })

  app.post(`${DOOR}player/:pid/size`, function (req, res) {
    let pid = parseInt(req.params.pid),
      cols = parseInt(req.query.cols),
      rows = parseInt(req.query.rows),
      term = sessions[pid]

    if (!term) return
    console.log(`Resize PLAYER session ${pid} (${rows}x${cols})`)
    term.resize(cols, rows)
    res.end()
  })

  app.post(`${DOOR}player/:pid/wall`, function (req, res) {
    let pid = parseInt(req.params.pid)
    let msg = req.query.msg
    let term = sessions[pid]
    if (!term) return

    const line = `\r\n\x1B[0;36m\u00B7\x1B[1m${msg}\x1B[m`

    //  buffer up to the latest 2-minutes of activity
    let now = new Date().getTime()
    if (Math.round((now - latest.now) / 1000 / 60) > 2) {
      latest.msg = ''
      latest.now = now
    }
    latest.msg += line

    //  buffer for all active player session(s)
    for (let o in sessions)
      if (+o !== pid)
        broadcasts[o] += line

    res.end()
  })

  //  Lurker API
  var lurkers = []

  app.post(`${DOOR}lurker`, function (req, res) {
    var pid = parseInt(req.query.pid)

    if (pid) {
      var player = ''
      if (sessions[pid]) {
        if (sessions[pid].who)
          player = ` (${sessions[pid].who})`
        console.log(`Lurker session ${pid}${player} request from remote host: ${req.header('x-forwarded-for') || req.connection.remoteAddress} (${req.hostname})`)
        res.send((lurkers.push(pid) - 1).toString())
      }
      else {
        console.log(`?FATAL lurker session ${pid} request from remote host: ${req.header('x-forwarded-for') || req.connection.remoteAddress} (${req.hostname})`)
      }
    }
    else if (Object.keys(sessions).length) {
      var who = []
      for (let pid in sessions) {
        let rs = query(`SELECT id FROM Online WHERE pid = ${pid}`)
        if (rs.length) {
          sessions[pid].who = rs[0].id
          who.push({ id: rs[0].id, pid: pid })
        }
      }
      res.send(JSON.stringify(who))
    }
    else {
      res.send(JSON.stringify([]))
    }
    res.end()
  })

  //  WebSocket endpoints: utilize upgraded socket connection to serve I/O between app pty and browser client
  //  ... for the active player
  wsActive.on('connection', (browser, req) => {
    const what = new URL(req.url, 'https://localhost')
    let pid = parseInt(what.searchParams.get('pid'))
    let term = sessions[pid]
    term.spawn.dispose()
    if (term.startup) browser.send(term.startup)

    //  app --> browser client
    term.onData((data) => {
      //  inspect for app's ACK ...
      let msg = data.toString()
      let ack = msg.indexOf('\x06')
      //  ... to appropriately replace it with any pending broadcast message(s)
      if (broadcasts[term.pid] && ack >= 0) {
        msg = `${msg.substr(0, ack)}${broadcasts[term.pid]}\n${msg.substr(ack)}`
        broadcasts[term.pid] = ''
      }

      try {
        browser.send(msg)
      } catch (ex) {
        if (term.pid) {
          console.log(`?FATAL ACTIVE app session ${term.pid} pty -> ws error:`, ex.message)
          console.log(msg)
          unlock(term.pid)
          browser.close()
        }
      }
    })

    //  app shutdown
    term.onExit(() => {
      console.log(`Exit PLAYER session ${term.pid} for remote host: ${term.client}`)
      // Clean things up
      delete broadcasts[term.pid]
      delete sessions[term.pid]
      pid = 0
      browser.close()
    })

    //  browser client --> app
    browser.on('message', (msg) => {
      try {
        term.write(msg)
      } catch (ex) {
        if (term.pid) {
          console.log(`?FATAL ACTIVE browser session ${term.pid} ws -> pty error:`, ex.message)
          unlock(term.pid)
          browser.close()
        }
      }
    })

    browser.on('close', () => {
      //  did user close browser with an open app?
      if (pid > 1) try {
        term.destroy()   // process.kill(pid, 1)
        console.log(`Forced close PLAYER session ${term.pid} from remote host: ${term.client}`)
      } catch (ex) {
        console.log(`?FATAL browser close event ${term.pid}: ${ex}`)
      }
    })
  })

  //  ... for the casual lurker
  wsLurker.on('connection', (browser, req) => {
    const what = new URL(req.url, 'https://localhost')
    let lurker = parseInt(what.searchParams.get('lurker'))
    let term = sessions[lurkers[lurker]]
    let player = ` (${sessions[term.pid].who})`
    console.log(`Lurker session ${term.pid}${player} connected as #${(lurker + 1)}`)

    //  app --> browser client
    let lurk = term.onData((data) => {
      try {
        browser.send(data)
      } catch (ex) {
        if (term.pid)
          console.log(`?FATAL session ${term.pid}${player} lurker/ws error: ${ex.message}`)
      }
    })
    term.onExit(() => {
      try {
        browser.close()
      } catch (ex) {
        console.log(`?FATAL browser session ${term.pid}${player} lurker/ws error: ${ex.message}`)
      }
    })

    //  browser client --> any key terminates lurking
    browser.on('message', (msg) => {
      browser.close()
    })

    browser.on('close', () => {
      console.log(`Lurker session ${term.pid}${player} closed #${(lurker + 1)}`)
      delete lurkers[lurker]
      lurk.dispose()
    })
  })

  //  database support
  const DD = '../users/dankdomain.sql'
  let better = require('better-sqlite3')
  let sqlite3 = new better(DD)

  chokidar.watch('../users/save.json')
    .on('add', (path, stats) => {
      interface save extends user {
        bounty?: coins
        coin?: coins
        bank?: coins
        loan?: coins
      }
      let user: save = {
        id: '',
        bounty: new coins(0),
        coin: new coins(0),
        bank: new coins(0),
        loan: new coins(0)
      }

      Object.assign(user, require(path))
      if (user.bounty.value)
        user.bounty.value = user.bounty._value
      else
        user.bounty = new coins(user.bounty.toString())
      if (user.coin.value)
        user.coin.value = user.coin._value
      else
        user.coin = new coins(user.coin.toString())
      if (user.bank.value)
        user.bank.value = user.bank._value
      else
        user.bank = new coins(user.bank.toString())
      if (user.loan.value)
        user.loan.value = user.loan._value
      else
        user.loan = new coins(user.loan.toString())
      fs.unlink(path, () => { })

      sqlite3.prepare(`UPDATE Players SET
        handle='${user.handle}', name='${user.name}', email='${user.email}', password='${user.password}',
        dob=${user.dob}, sex='${user.sex}', joined=${user.joined}, expires=${user.expires}, lastdate=${user.lastdate},
        lasttime=${user.lasttime}, calls=${user.calls}, today=${user.today}, expert=${+user.expert}, emulation='${user.emulation}',
        rows=${user.rows}, access='${user.access}', remote='${user.remote}', pc='${user.pc}', gender='${user.gender}',
        novice=${+user.novice}, level=${user.level}, xp=${user.xp}, xplevel=${user.xplevel}, status='${user.status}',
        blessed='${user.blessed}', cursed='${user.cursed}', coward=${+user.coward}, bounty=${user.bounty.value}, who='${user.who}',
        gang='${user.gang}', keyseq='${user.keyseq}', keyhints='${user.keyhints.toString()}', melee=${user.melee}, backstab=${user.backstab},
        poison=${user.poison}, magic=${user.magic}, steal=${user.steal}, hp=${user.hp}, sp=${user.sp},
        str=${user.str}, maxstr=${user.maxstr}, int=${user.int}, maxint=${user.maxint}, dex=${user.dex},
        maxdex=${user.maxdex}, cha=${user.cha}, maxcha=${user.maxcha}, coin=${user.coin.value}, bank=${user.bank.value},
        loan=${user.loan.value}, weapon='${user.weapon}', toWC=${user.toWC}, armor='${user.armor}', toAC=${user.toAC},
        spells='${user.spells.toString()}', poisons='${user.poisons.toString()}', realestate='${user.realestate}', rings=?, security='${user.security}',
        hull=${user.hull}, cannon=${user.cannon}, ram=${+user.ram}, wins=${user.wins}, immortal=${user.immortal},
        plays=${user.plays}, jl=${user.jl}, jw=${user.jw}, killed=${user.killed}, kills=${user.kills},
        retreats=${user.retreats}, steals=${user.steals}, tl=${user.tl}, tw=${user.tw}
        WHERE id = '${user.id}'`).run(user.rings.toString())
      console.log(`Player (${user.id}) updated`)
    })

  try {
    sqlite3.prepare(`DELETE FROM Online`).run().changes
  }
  catch (err) {
    console.log(`warning ${err.code} :: ${String(err)}`)
  }

  function query(q: string, errOk = false): any {
    try {
      let cmd = sqlite3.prepare(q)
      return cmd.all()
    }
    catch (err) {
      if (!errOk) {
        console.log(`?Unexpected error ${err.code} :: ${String(err)}`)
      }
      return []
    }
  }

  function unlock(pid: number) {
    console.log(`Unlocking ${pid}`)
    sqlite3.prepare(`DELETE FROM Online WHERE pid=${pid}`).run().changes
  }
})

//  process signal traps
process.on('SIGHUP', () => {
  console.log(new Date() + ' :: received hangup')
  process.exit()
})

process.on('SIGINT', () => {
  console.log(new Date() + ' :: received interrupt')
  process.exit()
})

process.on('SIGQUIT', () => {
  console.log(new Date() + ' :: received quit')
  process.exit()
})

process.on('SIGTERM', () => {
  console.log(new Date() + ' :: received terminate')
  process.exit()
})
