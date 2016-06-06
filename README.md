[![Build Status](https://travis-ci.org/mvines/relay.svg)](https://travis-ci.org/mvines/relay)

This module controls a SainSmart 16-channel USB-HID programmable relay using node. 
## Usage
```
$ npm install
$ ./cli.js
Usage: node bin/relay <command>

Available commands:
  on <N>  - Turn relay N on
  off <N> - Turn relay N off
  test    - Run a test pattern to ensure all relays are functioning
  reset   - Reset the device state, turn off all the relays

```

### ../hidapi/libusb/hid.c:47: fatal error: libusb.h: No such file or directory

If you run into a missing *libusb.h* during `npm install` on Ubuntu, try:

```
sudo apt-get install libusb-1.0-0-dev
```

### Segmentation fault (core dumped)

Currently [node-hid](https://github.com/node-hid/node-hid) will segmentation fault if the current user does not
have access to the HID device. You may use `sudo` or follow the instructions to add [udev rules](#udev-rules).

```
$ ./cli.js test
Detected devices: [ { vendorId: 1046,
    productId: 20512,
    path: '0007:0009:00',
    release: 0,
    interface: 0 } ]
Segmentation fault (core dumped)

$ sudo bin/relay test
Detected devices: [ { vendorId: 1046,
    productId: 20512,
    path: '0007:0009:00',
    manufacturer: 'Nuvoton',
    product: 'HID Transfer',
    release: 0,
    interface: 0 } ]

```

### udev rules

You can use this module without sudo by following the steps below:

1. Copy [the udev rules file](51-sainsmart-usb.rules) to /etc/udev/rules.d.

    ```
    sudo cp 51-sainsmart-usb.rules /etc/udev/rules.d/
    ```

2. Disconnect and reconnect the device from USB.

3. Run the command without sudo!

```
$  ./cli.js test
Detected devices: [ { vendorId: 1046,
    productId: 20512,
    path: '0001:0008:00',
    manufacturer: 'Nuvoton',
    product: 'HID Transfer',
    release: 0,
    interface: 0 } ]
```

## Required Hardware
Search Amazon for "SainSmart 16-CH USB HID Programmable Control Relay Module +
Relay".  The unit looks like this:

<p align="center">
<img src="https://github.com/mvines/relay/raw/master/relay.jpg"/>
</p>

You will also need a 12V power supply (~1A) connected to the **blue**
connector on the main relay board.  Do not connect anything to the **green** connector
on the USB HID board.

## Links
* There's a python port of this project at https://github.com/tatobari/hidrelaypy if you prefer Python over node.
