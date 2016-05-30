'use strict';

let Relay16 = require('./relay16.js');

function timeout(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

module.exports = function testPattern() {
  let relay = new Relay16();

  let p = relay.read()
  .then(() => relay.write(0xFFFF))
  .then(() => timeout(250))
  .then(() => relay.write(0))
  .then(() => timeout(250))
  .then(() => relay.write(0xFFFF))
  .then(() => timeout(250))
  .then(() => relay.write(0))
  .then(() => timeout(500));

  for (let i = 0; i < 16; i++) {
    p = p.then(() => relay.set(i, true))
        .then(() => timeout(100));
  }
  p = p.then(() => timeout(100));
  for (let i = 15; i >= 0; i--) {
    p = p.then(() => relay.set(i, false))
        .then(() => timeout(100));
  }

  p = p.then(() => timeout(500))
  .then(() => relay.write(0xFFFF))
  .then(() => timeout(250))
  .then(() => relay.write(0));
}

