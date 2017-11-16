#!/usr/bin/env node

'use strict';

let Relay16 = require('./relay16.js');
let testPattern = require('./test-pattern.js');

function usage(msg) {
  const node = process.argv[0];
  const program = process.argv[1];

  if (msg) {
    console.log(`${msg}\n`);
  }

  console.log(`Usage: ${node} ${program} <command>

Available commands:
  on <N>    - Turn relay N on
  off <N>   - Turn relay N off
  test      - Run a test pattern to ensure all relays are functioning
  reset     - Reset the device state, turn off all the relays
  `);

  process.exit(msg ? 1 : 0); // eslint-disable-line no-process-exit
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

function mapRelay() {
  const relay = new Relay16();

  let relayBitmap = new Array(16);

  // Turn all the relays off
  let p = relay.read().then(() => relay.write(0));

  // Turn on each relay in sequence and read in its bit
  for (let i = 0; i < 16; i++) {
    p = p.then(() => relay.write(Math.pow(2, i)))
    .then(() => relay.read())
    .then((mask) => {
      relayBitmap[i] = mask;
    })
    .then(() => timeout(100));
  }

  // Clear all the relays
  p = p.then(() => relay.write(0));

  // Write out the bitmap
  p.then(() => {
    console.log('\nRelay bitmap:\n');
    console.log(`  let relayBitmap = [${relayBitmap}]`);
  });

  p = p.then(() => relay.write(0));
}



const cmd = process.argv[2];
const param = process.argv[3];
if (!cmd) {
  usage();
} else {
  switch (cmd) {
  case 'on':
    if (!param) {
      usage('Error: missing relay ID parameter');
    }
    new Relay16().set(+param, true);
    break;
  case 'off':
    if (!param) {
      usage('Error: missing relay ID parameter');
    }
    new Relay16().set(+param, false);
    break;
  case 'map':
    mapRelay();
    break;
  case 'test':
    testPattern();
    break;
  case 'reset':
  {
    const relay = new Relay16();
    relay.reset()
    .then(() => relay.read())
    .then(() => relay.write(0));
    break;
  }
  default:
    usage(`Error: Unknown command: ${cmd}`);
    break;
  }
}

