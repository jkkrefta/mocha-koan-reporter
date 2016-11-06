import { reporters } from 'mocha';
import format from 'string-format';
const Base = reporters.Base;
const colorOutput = Base.color;
const symbols = Base.symbols;

function write (messageColor, message) {
  const coloredMessage = colorOutput(messageColor, message);
  process.stdout.write(coloredMessage);
}

function nextLine () {
  process.stdout.write('\n');
}

function writeLine (messageColor, message) {
  write(messageColor, format('{}\n', message));
}

class KoanReporter {
  constructor(runner) {
    this.testSuites = 0;
    this.passingTests = 0;
    this.registerRunnerEvents(runner);
  }

  registerRunnerEvents (runner) {
    runner.on('suite', this.onTestSuite);
    runner.on('pass', this.onTestPass);
    runner.on('fail', this.onTestFail);
    runner.on('end', this.onEnd);
  }

  onTestSuite (suite) {
    if (suite.root) {
      return;
    }
    this.testSuites++;
    writeLine('suite', format('Thinking {}', suite.title));
  }

  onTestPass (test) {
    this.passingTests++;
    writeLine('bright pass', format(' {} {} has expanded your awarness', symbols.ok, test.title));
  }

  onTestFail (test, err) {
    writeLine('bright fail', format(' {} {} has damaged your karma', symbols.err, test.title));
    nextLine();
    write('suite', 'You need to meditate on ');
    write('bright fail', test.title);
    nextLine();
    nextLine();
    write('bright yellow', format(' {}', err.message));

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

  onEnd () {
    nextLine();
    writeLine('suite', 'Summing up your awarnes');
    writeLine('bright pass', format(' You have done {} koans', this.testSuites));
    writeLine('bright pass', format(' You performed {} tasks', this.passingTests));
    process.exit();
  }
}

export default KoanReporter;
