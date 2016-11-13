'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var mocha = require('mocha');
var format = _interopDefault(require('string-format'));

var budda = '\
                           _ooOoo_\n\
                          o8888888o\n\
                          88" . "88\n\
                          (| -_- |)\n\
                          O\\  =  /O         {}\n\
                       ____/\`---\'\\____      {}\n\
                     .\'  \\\\|     |//  \`.\n\
                    /  \\\\|||  :  |||//  \\\n\
                   /  _||||| -:- |||||_  \\\n\
                   |   | \\\\\\  -  /\'| |   |\n\
                   | \\_|  \`\\\`---\'//  |_/ |\n\
                   \\  .-\\__ \`-. -\'__/-.  /\n\
                 ___\`. .\'  /--.--\\  \`. .\'___\n\
              .\"\" \'<  \`.___\\_<|>_/___.\' _> \\\"\".\n\
             | | :  \`- \\\`. ;\`. _/; .\'/ /  .\' ; |\n\
             \\  \\ \`-.   \\_\\_\`. _.\'_/_/  -\' _.\' /\n\
==============\`-.\`___\`-.__\\ \\___  /__.-\'_.\'_.-\'===================\n\
                           \`=--=-\'\n';

var wisdom = [['Beautiful is better than ugly.', 'Explicit is better than implicit.'], ['Simple is better than complex.', 'Complex is better than complicated.'], ['Flat is better than nested.', 'Sparse is better than dense.'], ['Readability counts.', ''], ['Special cases aren\'t special enough to break the rules.', 'Although practicality beats purity.'], ['Errors should never pass silently.', 'Unless explicitly silenced.'], ['In the face of ambiguity, refuse the temptation to guess.', ''], ['There should be one - and preferably only one - obvious way to do it.', 'Although that way may not be obvious at first.'], ['Now is better than never.', 'Although never is often better than right now.'], ['If the implementation is hard to explain, it\'s a bad idea.', 'If the implementation is easy to explain, it may be a good idea.'], ['Modules are great idea - let\'s do more of those!', ''], ['Nobody ever expects the Spanish Inquisition.']];

var Base = mocha.reporters.Base;
var colorOutput = Base.color;

var Red = function Red(message) {
  return colorOutput('bright fail', message);
};

var Gray = function Gray(message) {
  return colorOutput('suite', message);
};

var Yellow = function Yellow(message) {
  return colorOutput('bright yellow', message);
};

var Green = function Green(message) {
  return colorOutput('bright pass', message);
};

var symbols = mocha.reporters.Base.symbols;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function zenWisdom() {
  return wisdom[getRandomInt(0, wisdom.length)];
}

function showGoldBudda() {
  var wiseWords = zenWisdom();
  return Yellow(format(budda, wiseWords[0], wiseWords[1]));
}

function thinkingOn(subject) {
  return Gray(format('Thinking {}\n', subject));
}

function youAreAwareOf(subject) {
  return Green(format(' {} {} has expanded your awarness\n', symbols.ok, subject));
}

function youHaveReachedEnlightment() {
  var praise = Gray(format('That was the last one, well done{}', symbols.bang));
  var enlightenment = Green(format('You have reached enlightenment', symbols.bang));
  return format('\n{}\n{}\n', praise, enlightenment);
}

function meditateOn(subject, fallacy) {
  var enlightenment = Gray('You have not yet reached enlightenment ..');
  var karma = Red(format('{} {} has damaged your karma', symbols.err, subject));
  var meditate = Gray('Please meditate on');
  var place = Red(fallacy.stack);
  var givenAnswear = Gray('Given:') + Red(fallacy.actual);
  var expectedAnswear = Gray('Expected:') + Green(fallacy.expected);

  return fallacy.showDiff ? format('\n{}\n {}\n\n{} {}\n\n    {}\n    {}\n', enlightenment, karma, meditate, place, expectedAnswear, givenAnswear) : format('\n{}\n {}\n\n{} {}\n', enlightenment, karma, meditate, place);
}

var KoanReporter = function () {
  function KoanReporter(runner) {
    _classCallCheck(this, KoanReporter);

    this.registerRunnerEvents(runner);
  }

  _createClass(KoanReporter, [{
    key: 'registerRunnerEvents',
    value: function registerRunnerEvents(runner) {
      runner.on('start', this.onStart);
      runner.on('suite', this.onTestSuite);
      runner.on('pass', this.onTestPass);
      runner.on('fail', this.onTestFail);
      runner.on('end', this.onEnd);
    }
  }, {
    key: 'onStart',
    value: function onStart() {
      process.stdout.write(showGoldBudda());
    }
  }, {
    key: 'onTestSuite',
    value: function onTestSuite(suite) {
      if (suite.root) {
        return;
      }
      process.stdout.write(thinkingOn(suite.title));
    }
  }, {
    key: 'onTestPass',
    value: function onTestPass(test) {
      process.stdout.write(youAreAwareOf(test.title));
    }
  }, {
    key: 'onTestFail',
    value: function onTestFail(test, err) {
      process.stdout.write(meditateOn(test.title, err));
      process.exit();
    }
  }, {
    key: 'onEnd',
    value: function onEnd() {
      process.stdout.write(youHaveReachedEnlightment());
      process.exit();
    }
  }]);

  return KoanReporter;
}();

module.exports = KoanReporter;