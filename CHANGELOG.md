# [Dank Domain](https://robert.hurst-ri.us/games/dankdomain)
### the return of Hack & Slash
> [developed](https://github.com/theflyingape/dankdomain) using Node.js on Linux served up using Verizon FiOS 100mb
#### 21-Oct-2017
* a monster set of ASCII art donated by [Johannes Pelzer](https://www.learn-sword-fighting.com/en/about-us.html)
* reformatted legacy [ChangeLog](https://github.com/theflyingape/rpgd/blob/master/ChangeLog) file into this CHANGELOG.md
* alpha 0.4 release using Node.js 8
#### 11-Feb-2017
* alpha development using Node.js 6
-----------
```
       ---------
 --=:)) HISTORY ((:=--
       ---------
```
-----------
# RPGD
> [developed](https://github.com/theflyingape/rpgd) using GCC on Linux served up using a Cox cable modem
----------
#### 01-Jan-2015
* Ran across this Source Lines of Code cost estimation and pointed it to my venerable online MUD.<br>
The bottom line: a remake in 2005 would have taken about a year for ~5 developers at over a half-million dollars.
```
[rhurst@rampage rpgd]$ sloccount src
Creating filelist for hack
Creating filelist for rpgclient
Creating filelist for rpgd
Creating filelist for rpgwatch
Creating filelist for rpgweb
Creating filelist for sysop
Categorizing files.
Finding a working MD5 command....
Found a working MD5 command.
Computing results.

SLOC Directory SLOC-by-Language (Sorted)
14249 rpgclient ansic=14249
1779 rpgd ansic=1779
1409 top_dir ansic=1409
1238 rpgweb ansic=1238
0 hack (none)
0 rpgwatch (none)
0 sysop (none)

Totals grouped by language (dominant language first):
ansic: 18675 (100.00%)

Total Physical Source Lines of Code (SLOC) = 18,675
Development Effort Estimate, Person-Years (Person-Months) = 4.32 (51.88)
(Basic COCOMO model, Person-Months = 2.4 * (KSLOC**1.05))
Schedule Estimate, Years (Months) = 0.93 (11.21)
(Basic COCOMO model, Months = 2.5 * (person-months**0.38))
Estimated Average Number of Developers (Effort/Schedule) = 4.63
Total Estimated Cost to Develop = $ 584,070
(average salary = $56,286/year, overhead = 2.40).
SLOCCount, Copyright (C) 2001-2004 David A. Wheeler
SLOCCount is Open Source Software/Free Software, licensed under the GNU GPL.
```
#### 20-Sep-2008
* Major bug-fix on USER master file; it is now 64-bit friendly

#### 23-Aug-2008
* Updated all source to allow compiling with gcc 4.3
* Removed makefiles and replaced with Code::Blocks project files

#### 24-Apr-2005
* Added WILD icon and adjusted payoffs in Casino's Slot Machine.
* Corrected transmission of soundbytes.
* Added cancel typeahead (Ctrl-X) features in critical areas to avoid random events from taking buffered keyboard events, such as Y/N prompts and falling through dungeon trapdoors.
* Added some honor among thieves in the dungeon.

#### 11-Feb-2004
* Added Big Blast to most memorable hits.
* Adjusted Thief to an average melee with less backstab power.
* Fixed skill from Wands to Scrolls to work.

#### 23-Jan-2004
* Reaching level 50 now earns you a skill point to assign to your character, either +10 to any ability attribute or melee, backstab, poison, magic, or stealing.
* Some class table mods made to starting points.

#### 31-Dec-2004
* Tweaked character classes and skill sets.
* New backstab factor in battle engine.

#### 19-Apr-2003
* Fixed install script to create a default `/etc/rpgd.conf`

#### 18-Apr-2003
* Minor console and sound bug fixes.
* Added a `hack` shell script that kills playing music and sets a cool console font before running the `rpgclient`.

#### 21-Jul-2002
* Minor updates to cgi utility, `rpgwatch`, and package.

#### 16-Aug-2001
* Fixed `fork() _exit` completion in `sndplay()` to comply with glibc spec.
* Minor tweaks to characteristics and spoils to the deeper dungeon levels.

#### 04-Mar-2001
* Updated documentation.

#### 17-Feb-2001
* Ported all packages to the KDevelop C/C++ IDE with installation changes.

#### 14-Jan-2001
* Rewrote AI within `Battle()` to be smarter in its spell casting selections, as well as tweaked excellent hits and blasts.
* Fixed treasure detect map.
* Adjusted Wheel of Life Grace and Doom! payoffs.
* Ogre-class has been redefined to be the best at melee, at further expense of dexterity.
* Fixed potential midnight bug in daemon.

#### 07-Jan-2001
* Changed New User registration to be more 'net friendly.  The inclusion of an e-mail address field now auto-validates the account.  This makes `sendmail` a prerequisite.
* Extensive rewrite of `rpgweb` to include too many web features to list.
* Also added an enchanted map feature in the dungeon.
* Updated GTK+ `Sysop` utility.
* Fixed cleanup routines.
* Happy 11th Birthday to Erin J. Hurst.

#### 01-Jan-2001
* Updated source & binaries to work correctly with Linux 2.2.18 kernel and glibc-2.2.
* Updated installation script to be `xinetd` aware.
* Added `rpgweb` for web site output.

#### 04-Sep-2000
* Fixed GTK `Sysop` build and some internal flags.
* Added dungeon armor and weapon gift shops.
* Enhanced the Legendary Wishing Well and Wheel of Life routines.

#### 27-Aug-2000
* Added portals to other deep, dank dungeons.<br>
Exploring them widens the range of risks & rewards, as well as a few more treats along the way.

#### 31-Jul-2000
* Minor bug fixes to `rpgd` server.
* Changed bail-out from jail algorithm at login.
* New player rating algorithms.
* Added casino music.

#### 05-May-2000
* Added many more sounds.

#### 25-Mar-2000
* Fixed 5-card = 21 bug.
* Rounded some money calculations to nearest coinage for a more realistic look.
* Added a magic map treasure to each dungeon floor.

#### 27-Feb-2000
* Added a bonus sound.
* Fixed `RPGclient` Windows packager.

#### 29-Jan-2000
* Updated install script
* a surprised dungeon thief will vanish
* more sound events, better DEC OSF/1 support, and more minor bug fixes.

#### 23-Jan-2000
* Improved async input handling with timeouts.
* Updated GTK `Sysop` utility.
* Fixed monster poisoning.

#### 16-Jan-2000
* Created GTK `Sysop` utility.
* Added toss vial option in Dungeon.

#### 14-Jan-2000
* Added better FreeBSD support [thanks Shane Bryldt for use of his FreeBSD server].
* Install/Makefiles updated.
* `term.c` fixed.

#### 11-Jan-2000
* Minor bug fixes that check Origin/Name of Class, Armor, and Weapon.
* Bug fix when checking a new dungeon level.
* Thanks to Travis Mikalson for his debugging.

#### 06-Jan-2000
* Re-engineered install procedure.  Binaries are optimized to less than half their original size.

#### 30-Dec-1999
* Moved Won Game stuff from client to server, gives any online users at the time the boot.
* Updated some Sysop functions.
* Got rid of visitors in the newspaper.
* Keep last 5 callers, instead of 3.
* Better signal trapping.

#### 25-Dec-1999
* More robust client-server handling of timeouts.
* Split out and display the effect of ego weapon/armor during battle.
* Added a check when adventuring in the dungeon to influence bad events upon the player without reasonable security for his
experience level.
* Wishing Well can generate multiple key hints and spells.
* Fixed an overflow bug in `rpgclient.exe`.

#### 19-Dec-1999
* Tax Collector monitors tavern entrance.
* RPGD sends HUP signal to idle client after 10-minutes and KILL signal after 20-minutes.
* RPGD startup re-builds USER files regardless and will re-build GANG from USER if deleted.
* Added `<C>olors` option for gang leader to edit their party's banner.
* Added a new binary, `rpgwatch`, which opens a socket for `rpgclient` to pipe its output to.

#### 13-Dec-1999
* Relaxed poison vaporizing chances to be more in line with magic enhancements.
* Updated `rpgd` btree handling routines to be unassuming about keys-per-node and protect better against memory access violations.

#### 13-Oct-1999
* Modified permanent ToAC/ToWC to never increase if their values are negative to begin with (i.e., damaged by falling).
* Over- poisoning a weapon may vaporize it, as too much magic will.

#### 15-Sep-1999
* Added Sysop functions (`@`) in the Main Menu.

#### 19-Jul-1999
* Use `getchar()` / `select()` workaround so cursor arrow keys will work again in the dungeon.

#### 04-Jul-1999
* Ported to Linux 2.2.10 using MetroWerks CodeWarrior.
* `rpgd` is a background server daemon and `rpgclient` is an `inetd` client service.

--------------
## Commodore Amiga
### RPGBBS DELUXE
> [developed](https://github.com/theflyingape/rpgbbs/tree/master/v7) using SAS/C on an Amiga 3000T using a SupraFAXModem 28.8k
--------------
#### 25-Sep-1996
* Added dungeon MODs while exploring the deep, dank dungeon.
* This release is now FREEWARE and my final release (for now).<br>
*Moohahahaha-ha!*

#### 01-May-1996
* Added some more local, sound effects.
* Sea Hag is now cursed and armed with random ego items.

#### 16-Mar-1996
* Hack & Slash BBS hits 60,000 calls made from 19-Jun-1992. (~44 calls/day).
* Adjustments made to class, magic, naval, and weapon file sets.
* Battling another user's warship may result in permament hull-point loss, regardless of mounted cannons.
* Any gang member that teleports away during the party is the same as not participating in the first place. This can affect the spoils collected at the end of the fight.

#### 08-Mar-1996
* You can no longer 'bump' into someone going to the Square when 'visiting'.
* Life Stealing spell will take up to half the victim's experience points away from him, but the taker may only get up to their level's worth of experience (and possibly go up an experience level during the battle).

#### 17-Feb-1996
* Added Top 20 feature to High Score List.

#### 01-Jan-1996
* Messages can contain embedded ANSI sequences, i.e., `\0` for BLACK, `\1` for RED, `\2` for GREEN, `\3` for YELLOW, `\4` for BLUE, `\5` for MAGENTA, `\6` for CYAN, and `\7` for WHITE.  Plus, `\10` + color #`0`-`7` to add BOLD and/or `\100` to add blink.

#### 01-Dec-1995
* Added Mystical Wheel of Life to Dungeon.  Only Novice Players will get the dungeon prompt all the time.
* Fixed extended spell bugs.
* A player's bounty postings get erased when that player rolls.

#### 01-Nov-1995
* All executables recompiled and optimized for SAS/C v6.56.
* Added extended spells to dungeon: Armor Rusting, Weapon Decay, Big Blast, Mana Stealing, Life Stealing.
* Player may find Wand or Scroll; Spell may be taught from a Wish.

#### 01-Oct-1995
* Money lost to another player gets applied towards his outstanding loan first, the remaining balance is left in his hands.
Upon first caller after midnight, server moves any money in player's hands to his bank account.

#### 01-Sep-1995
* Fixed many Enforcer-hits!
* Added Iconify menu item for Modem Lines; iconified clients yield faster serial ops.
* Fixed bug from SAS/C `getft()`; use AmigaDOS `DateToStr()`.

#### 01-Aug-1995
* `xemrpgbbs.library` created for use with Term and other Amiga terminal programs that support external emulation.<br>
Emulation now supports any point size, not just my wife's size (8).
* New `rpgbbs.library` completely replaces `sercon.library`.
* Naval warships cannot carry more than a full complement of cannons cost -- the rest of the booty will sink to the ocean floor.

#### 01-Jul-1995
* Ego Weapons & Armor.
* Auto-purge added to delete players that haven't called in some time.
* New players must start as Novice class fighters.
* Morph & Disintegrate spells have swapped places on spell list (#15 & #16).

#### 01-Apr-1995
* All executables recompiled and optimized for SAS/C v6.55.
* A player can no longer duck a punch and hit a dead or jailed player.

#### 01-Feb-1995
* `RPGBBSclient` can run as a CLI-door.
* `RPGBBSserver` has the option to run without its custom screen (`RPG=DOOR`).
* New IFF sound support for chat mode and other various events.
* New `sercon.library` supports ZOOM gadget (suppress local console output) for faster modem throughput.

#### 01-Jan-1995
* New `Sysop` utility program with GadTools interface.

#### 01-Dec-1994
* Hack & Slash BBS goes back online.

#### 01-Nov-1994
* Illusion Spell replaces Mayhem Spell.
* Added .PXL files for bit-mapped graphics.

#### 01-Oct-1994
* Complete rewrite!  Support for Workbench 2.0+ only.
* All files have changed their internal structure.  Multiple sets of character, weapon and armor classes.
* ANSI/VT220 console support for all video modes.
* 100% event driven.

--------------
### RPGBBS
> [developed](https://github.com/theflyingape/rpgbbs/tree/master/v6) using SAS/C on an Amiga 2000 using a SupraFAXModem 14400
--------------
#### 01-Oct-1993 `v6.43`
* Added `<T>oday` & `<Y>esterday` newspaper in Tiny's Tavern.
* Rewrote Gang Wars to include class-dependent action:
  * fighting classes hit harder, magic users cast spells, poison users may apply their ware.

#### 26-Sep-1993 `v6.42`
* Word-wrapped file comments.
* Check gang pointers upon boot and logon for corrupt data.
* Can't Swear at Tiny anymore after allowable calls.

#### 09-Sep-1993 `v6.40`
* Blinking cursor.
* File section will determine if an associated icon on the drawer should be accessible to the user's access level.
* Maximum screen rows definable per user.

#### 20-Aug-1993 `v6.20`
* Added `<S>wear at Tiny`.  Don't swear too many times!

#### 19-Aug-1993 `v6.10`
* Added `DEPTH` and `FONT` ToolTypes.
* ANSI emulation is built in, rather than using `console.device` as the screen driver.

#### 12-Aug-1993 `v6.00`
* Wrote `XPRtalk` utility to replace `rz` & `sz` utilities.<br>
Now supports Xmodem, Zmodem, and Kermit `xpr` libraries.
* Allow 15 separate file paths and 1 upload path.<br>
Each path can hold up to 48 subdirectories.
* Fixed mega-bucks bug should a user wield an ego weapon/armor and defeat any dungeon monster.

#### 26-Jul-1993 `v5.41`
* Fixed potential bug when user types OFF or drops carrier in key positions within program.
* Fixed potential bug when asked to `Hire a Scout' for your character statistics.

#### 13-Jul-1993 `v5.40`
* Added SMASH! for very good attack hits (98%-100%).
* Added EGO weapons & armors.  Only won off of creature.
* If you kill your Gang Leader or he dies fighting you, you become the Gang Leader.
* Added system call to `rz` & `sz` file transfer utilities to allow elementary usage of a file section.

#### 16-May-1993 `v5.22`
* Updated all ANS files to 16-color.
* Added KENO lottery number game to Gambling Casino.
* Removed Menu drawer.  All submenus are embedded in executable and rendered to specified emulation.
* Added Potion of Augment (*makes* you feel invincible!) and vial of crack (you *think* you feel invincible!).

#### 01-May-1993 `v5.21`
* Change emulation drivers to `<0> ASCII`, `<1> VT100`, and `<2> ANSI` 16-color.
* Added `DELAY=min` ToolType to specify # of minutes user must wait between calls.
* Delete your current `RPGBBS.system` so new one can be created to reserve 240-bytes to hold REASON last 3 callers were logged off.
* Added `<Y> Your Statistics` (new look) to Sysop Menu.

#### 04-Apr-1993 `v5.20`
* `RPGclient` is now RESIDENTable.
* Top 3 Immortals have their level highlighted in lists.
* Added Bounty feature in Tavern.
* Open screen & windows with 2.0 tags for 3d look.
* Display Neptune & Sea Hag pix, like Mermaid.

#### 14-Feb-1993 `v5.12`
* Logon is now event-driven, not `Delay()`-driven.
* Walking into dungeon walls causes a 1-hit point loss.
* Retreat from gang shows surviving members hit points remaining.
* Server correctly handles maximum online users.  Shutdown will no longer occur if any clients are still active.

#### 28-Feb-1993 `v5.10`
* Pending messages between online users added.  All online users receive messages about certain events taking place from the other `lines' as they occur.
* Fishing for oysters now have a cannon factor involved, so the less cannons you have, the less gold you receive for pearl/diamond.
* Defense agility was not taken in account properly!
* Key Hint works properly now.
* Brawl algorithm calculates for character class now. This is to account for Beast & Undead class that get no + agility bonus.  Magic users (again) get screwed, but it goes with the flow.  Defense agility calculated in.
* Robbing the bank properly alerts users-with-Bank-money who done it and empties their respective accounts.

#### 14-Feb-1993 `v5.00`
* `RPGserver` & `RPGclient` replace `RPGBBS`.  Multi-user is now supported!  Icon tool types replace `.config` file.
* Increase number of users to 200 and gangs to 50.
* Auto-Verify function added.  Up to 2 accounts per phone number can get verified.  "Bad" phone numbers get logged in `BadPhone.list` to mark unwanted dialbacks.
* Money format default replaces scientific format.  Now display gold in platinum, gold, silver, & copper pieces format.
* `<M>ost Wanted` list added to Party option.
* `<Y>our character statistics` has been redesigned.
* Gambling Casino now has `<S>lots`.
* Added four more default classes: Beast, Lizard, Rogue, and Undead.
* Buying poison only lists those vials you can afford + 1.
* Each class now have separate definitions for suggested ability assignments, noted feature, and maximum weapon & armor classes they can purchase in Square.
* Riddle of Key sequence remains same for rolling user until it is solved to advance to Hero.  It gets reset if System Reroll or Hero does not advance to Titan.
* Mollicone spell becomes Mayhem spell.  New spell Morph added.
* Sysop functions `<E> Send E-mail` & `<M> Read your mail` added.

#### 02-Jan-1993 `v4.20`
* Dungeon size fluctuates; width 7-15, height 7-10.
* Thief may surprise you in other ways than in the pocket.
* "Magic Mapping" feature traces where you have been.
* Wishing Well randomly appears in dungeon.
* More types of potions to quaff in dungeon.
* Dungeon monsters have 2 new spells: Acid rain & Curse.

#### 21-Dec-1992 `v4.11`
* ANSI & TeXT pictures for arena, dungeon, and players.  Please add/modify your own!
* You may run into an active player in the dungeon of the same level, in place of a monster.
* Warning bell character is not sent to the console when a remote user logs on.
* Added Sysop functions View loser log & eXterminate user. The `sysop.log` is useful for tracking down "chronies" who use them to augment their real characters. There are a lot of cheaters who can't play by the rules, thus the exterminate function -- make 'em play again!

#### 23-Sep-1992 `v3.03`
* Up to 16 Message Bases may be defined.
* Added Sysop functions Bless & Curse.

#### 21-Sep-1992 `v3.01`
* Escaping the dungeon when sent there by the old sea hag is not good enough.  You must now defeat the bitch in combat.  She's a level 99 God with 1/6th the hit points and she cannot teleport away.
* Neptune of the Sea cannot teleport away.

#### 18-Sep-1992 `v3.00`
* Display initialization procedure to console.
* <2400 baud users don't get the Logon file.  Really.
* Added `<R>eply` option to Email.
* Eliminated `Tables.c` and made `Config` program for more customization.

#### 03-Sep-1992 `v2.44`
* Purge user after # days when rerolling now works.
* Log to user note when someone retreats in naval battle.
* Dungeon teleport may become inoperative for that level.
* Tavern brawls have two new saving throws for ducking or landing a punch with a +/-5% ratio.

#### 01-Sep-1992 `v2.43`
* First release to Steve Hostettler of Toledo, OH.
* Supports ANSI mode.  Local mode now uses `console.device`.
* Don't call verify a number starting with 911, ugh.

#### 19-Jun-1992 `v1.00`
* Hack & Slash BBS goes online for the first time using the new SupraFAXModem 14400:<br>
`(401) 787-1437` with Caller ID.