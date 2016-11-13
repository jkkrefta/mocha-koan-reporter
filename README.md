# Console Koan Test Reporter for MochaJS
----------------------------------------

## About
This is third party reporter for JavaScript test runner MochaJS.
I have written it to with porpouse to use with ES6 koans.

## Screenshots
![conemu failing suite](https://github.com/jkkrefta/mocha-koan-reporter/Readme/conemu-failing-suite.png "Logo Title Text 1")

![cmd passing suite](https://github.com/jkkrefta/mocha-koan-reporter/Readme/cmd-passing-suite.png "Logo Title Text 1")

![powershell failing suite](https://github.com/jkkrefta/mocha-koan-reporter/Readme/powershell-failing-suite.png "Logo Title Text 1")

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
