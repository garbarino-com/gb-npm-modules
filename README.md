# gb-device-detection (Moblet @juanga)

## Install module
    $ npm install git+https://github.com/garbarino-com/gb-npm-modules.git#gb-device-detection --save-dev

## Require module
    var device = require('get-user-agent');

## Functions

  * detectDevice
  * isMobile
  * isIOS
  * isAndroid

## Usage

  * device.detectDevice(userAgent) //return mobile, tablet, desktop
  * device.isMobile(userAgent) // return boolean
  * device.isIOS(userAgent) // return boolean
  * device.isAndroid(userAgent) // return boolean
