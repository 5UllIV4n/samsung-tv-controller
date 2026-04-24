const Samsung = require('samsung-tv-control').default;
const readline = require('readline');
const fs = require('fs');

const TOKEN_FILE = './tv-token.txt';

let savedToken;
try {
  savedToken = fs.readFileSync(TOKEN_FILE, 'utf8').trim();
} catch (err) {
  console.warn('No saved token found, will request a new one.');
}

const config = {
  ip: 'YOUR_IP',
  mac: 'YOUR_MAC', 
  name: 'Node web Remote',
  token: savedToken
};

const tv = new Samsung(config);

if (!savedToken) {
  tv.getToken((token) => {
    if (!token) {
      console.error('Failed to get token.');
      return;
    }
    console.log('Successfully paired! Saving token to tv-token.txt...');
    fs.writeFileSync(TOKEN_FILE, token);
  });
}

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

const APPS = {
  y: { id: '111299001912', name: 'YouTube' },
  n: { id: '11101200001', name: 'Netflix' },
};

console.log(`
Samsung TV Remote

W A S D   Navigate
E         Enter
Q         Back
+ / -     Volume
H         Home
Y         YouTube
N         Netflix
CTRL+C    Exit
`);

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', async (str, key) => {
  if (key && key.ctrl && key.name === 'c') process.exit();

  const app = APPS[str];
  if (app) {
    console.log(`Opening ${app.name}...`);
    await tv.openApp(app.id);
    return;
  }

  const tvKey = keys[str];
  if (tvKey) {
    try {
      await tv.sendKey(tvKey);
      console.log(`[${str}] → Sent ${tvKey}`);
    } catch (err) {
      console.error('Connection error');
    }
  }
});
