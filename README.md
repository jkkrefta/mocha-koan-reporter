# Console Koan Test Reporter for MochaJS

## About
This is third party reporter for JavaScript test runner **MochaJS**.
I have written it in order to have nicely formated reports for people learning stuff in JavaScript.

## Features
* Has nice color schema.
* Stops on first failed test.
* Displays random words of wisdom from _"Programming Budda"_.
* Has stylized and more humane output than regular reporter.

## Output
```
mocha --compilers js:babel-register --reporter mocha-koan-reporter ./test/failing-test-suite.js

                          _ooOoo_
                         o8888888o
                         88" . "88
                         (| -_- |)
                         O\  =  /O         Modules are great idea - let's do more of those!
                      ____/`---'\____
                    .'  \\|     |//  `.
                   /  \\|||  :  |||//  \
                  /  _||||| -:- |||||_  \
                  |   | \\\  -  /'| |   |
                  | \_|  `\`---'//  |_/ |
                  \  .-\__ `-. -'__/-.  /
                ___`. .'  /--.--\  `. .'___
             ."" '<  `.___\_<|>_/___.' _> \"".
            | | :  `- \`. ;`. _/; .'/ /  .' ; |
            \  \ `-.   \_\_`. _.'_/_/  -' _.' /
==============`-.`___`-.__\ \___  /__.-'_.'_.-'===================
                          `=--=-'
Thinking about koan reporter
√ simple passing test has expanded your awarness

You have not yet reached enlightenment ..
× simple failing test has damaged your karma

Please meditate on AssertionError: expected true to equal false
   at Context.<anonymous> (D:/Projects/mocha-koan-reporter/reporter-test/test/failing-test-suite.js:10:21)

   Expected:false
   Given:true
```

For screenshots go to: https://github.com/jkkrefta/mocha-koan-reporter/tree/master/Readme

## Requirements
mocha-koan-reporter requires mocha to run:

To **install mocha globaly** run:
```
npm install mocha -g
```
OR

To **install mocha localy** within project run:
```
npm install mocha
```

## Installation
To **install reporter** go to your node project folder and run:
```
npm install mocha-koan-reporter
```

## Usage
To use mocha-koan-reporter you need to select it in as a reporter when running tests
For example:
```
mocha --reporter mocha-koan-reporter
```

## Limitations
This was developed and tested on windows and with windows based consoles in mind.
You can use it under any other operating system but I can`t guarantee you that it will output properly colored and formated report.
