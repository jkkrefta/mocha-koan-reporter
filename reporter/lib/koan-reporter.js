'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mocha = require('mocha');

var _stringFormat = require('string-format');

var _stringFormat2 = _interopRequireDefault(_stringFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = _mocha.reporters.Base;
var colorOutput = Base.color;
var symbols = Base.symbols;

function write(messageColor, message) {
  var coloredMessage = colorOutput(messageColor, message);
  process.stdout.write(coloredMessage);
}

function nextLine() {
  process.stdout.write('\n');
}

function writeLine(messageColor, message) {
  write(messageColor, (0, _stringFormat2.default)('{}\n', message));
}

var KoanReporter = function () {
  function KoanReporter(runner) {
    _classCallCheck(this, KoanReporter);

    this.testSuites = 0;
    this.passingTests = 0;
    this.registerRunnerEvents(runner);
  }

  _createClass(KoanReporter, [{
    key: 'registerRunnerEvents',
    value: function registerRunnerEvents(runner) {
      runner.on('suite', this.onTestSuite);
      runner.on('pass', this.onTestPass);
      runner.on('fail', this.onTestFail);
      runner.on('end', this.onEnd);
    }
  }, {
    key: 'onTestSuite',
    value: function onTestSuite(suite) {
      if (suite.root) {
        return;
      }
      this.testSuites++;
      writeLine('suite', (0, _stringFormat2.default)('Thinking {}', suite.title));
    }
  }, {
    key: 'onTestPass',
    value: function onTestPass(test) {
      this.passingTests++;
      writeLine('bright pass', (0, _stringFormat2.default)(' {} {} has expanded your awarness', symbols.ok, test.title));
    }
  }, {
    key: 'onTestFail',
    value: function onTestFail(test, err) {
      writeLine('bright fail', (0, _stringFormat2.default)(' {} {} has damaged your karma', symbols.err, test.title));
      nextLine();
      write('suite', 'You need to meditate on ');
      write('bright fail', test.title);
      nextLine();
      nextLine();
      write('bright yellow', (0, _stringFormat2.default)(' {}', err.message));

      if (err.showDiff) {
        nextLine();
        nextLine();
        write('suite', ' Given: ');
        write('bright fail', err.actual);
        nextLine();
        write('suite', ' Expected: ');
        write('bright pass', err.expected);
      }

      nextLine();
      process.exit();
    }
  }, {
    key: 'onEnd',
    value: function onEnd() {
      nextLine();
      writeLine('suite', 'Summing up your awarnes');
      writeLine('bright pass', (0, _stringFormat2.default)(' You have done {} koans', this.testSuites));
      writeLine('bright pass', (0, _stringFormat2.default)(' You performed {} tasks', this.passingTests));
      process.exit();
    }
  }]);

  return KoanReporter;
}();

exports.default = KoanReporter;