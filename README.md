# Console Koan Test Reporter for MochaJS
----------------------------------------

## About
This is third party reporter for JavaScript test runner MochaJS.
I have written it to with porpouse to use with ES6 koans.

## Screenshots
![conemu failing suite](https://github.com/jkkrefta/mocha-koan-reporter/tree/master/Readme/conemu-failing-suite.png "Conemu failing suite")

![cmd passing suite](https://github.com/jkkrefta/mocha-koan-reporter/tree/master/Readme/cmd-passing-suite.png "CommandLine passing suite")

![powershell failing suite](https://github.com/jkkrefta/mocha-koan-reporter/tree/master/Readme/powershell-failing-suite.png "Powershell failing suite")

## Requirements
mocha-koan-reporter requires mocha to run.

To install mocha run one of commands below in your console.
|Installation Scope|Command|
|------|-------|
|Local - in project | ```npm install mocha``` |
|Global| ```npm install mocha -g``` |

## Installation
To install reporter run one of commands below in your console.
|Installation Scope|Command|
|------|-------|
|Local - in project | ```npm install mocha-koan-reporter``` |
|Global| ```npm install mocha-koan-reporter -g``` |

## Usage
To use mocha-koan-reporter you need to select it in as a reporter when running tests
For example:
```
mocha --reporter mocha-koan-reporter
```

## Limitations
This was developed and tested on windows and with windows based consoles in mind.
You can use it under any other operating system but I cant guarantee you that it will output properly colored and formated report.
