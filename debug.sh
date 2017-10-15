#!/bin/sh

cd ./build
killall tty.js
node ./node_modules/tty.js/bin/tty.js --config ./tty/files/debug.json &
firefox --new-instance -safe-mode --jsconsole --jsdebugger https://0.0.0.0 &
cd -
