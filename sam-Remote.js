const Samsung = require('samsung-tv-control').default;

const readline = require('readline');

const fs = require('fs');


const TOKEN_FILE = './tv-token.txt';


let savedToken;

if (fs.existsSync(TOKEN_FILE)) {

savedToken = fs.readFileSync(TOKEN_FILE, 'utf8');

}


const config = {

ip: 'YOUR_SAMSUNG_IP_ADDRESS',

mac: 'YOUR_SAMSUNG_MAC_ADDRESS',

name: 'nodeRomote.js',

token: savedToken

};


const tv = new Samsung(config);


tv.getToken((token) => {

console.log('Successfully paired! Saving token to tv token.txt...');

fs.writeFileSync(TOKEN_FILE, token);

});


const keys = {

w: 'KEY_UP',

s: 'KEY_DOWN',

a: 'KEY_LEFT',

d: 'KEY_RIGHT',

e: 'KEY_ENTER',

q: 'KEY_RETURN',

'=': 'KEY_VOLUP',

'-': 'KEY_VOLDOWN',

m: 'KEY_MUTE',

h: 'KEY_HOME'

};


console.log(`

Samsung TV Remote


W A S D Navigate

E Enter

Q Back

+ / - Volume

H Home

CTRL+C Exit

`);


readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);


process.stdin.on('keypress', async (str, key) => {

if (key && key.ctrl && key.name === 'c') process.exit();


if (str === 'y') {

await tv.openApp('111299001912'); // samsung app id youtube

return;

}


if (str === 'n') {

await tv.openApp('11101200001'); // samsung app id netflex

return;

}


const tvKey = keys[str];

if (tvKey) {

try {

await tv.sendKey(tvKey);

console.log(`Sent ${tvKey}`);

} catch (err) {

console.error('Connection error');

}

}

}); 
