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
    runner.on('start', this.onStart);
    runner.on('suite', this.onTestSuite);
    runner.on('pass', this.onTestPass);
    runner.on('fail', this.onTestFail);
    runner.on('end', this.onEnd);
  }

  onStart () {
    writeLine('bright yellow', '                           _ooOoo_');
    writeLine('bright yellow', '                          o8888888o');
    writeLine('bright yellow', '                          88" . "88');
    writeLine('bright yellow', '                          (| -_- |)');
    writeLine('bright yellow', '                          O\\  =  /O');
    writeLine('bright yellow', '                       ____/\`---\'\\____');
    writeLine('bright yellow', '                     .\'  \\\\|     |//  \`.');
    writeLine('bright yellow', '                    /  \\\\|||  :  |||//  \\');
    writeLine('bright yellow', '                   /  _||||| -:- |||||_  \\');
    writeLine('bright yellow', '                   |   | \\\\\\  -  /\'| |   |');
    writeLine('bright yellow', '                   | \\_|  \`\\\`---\'//  |_/ |');
    writeLine('bright yellow', '                   \\  .-\\__ \`-. -\'__/-.  /');
    writeLine('bright yellow', '                 ___\`. .\'  /--.--\\  \`. .\'___');
    writeLine('bright yellow', '              .\"\" \'<  \`.___\\_<|>_/___.\' _> \\\"\".');
    writeLine('bright yellow', '             | | :  \`- \\\`. ;\`. _/; .\'/ /  .\' ; |');
    writeLine('bright yellow', '             \\  \\ \`-.   \\_\\_\`. _.\'_/_/  -\' _.\' /');
    writeLine('bright yellow', '==============\`-.\`___\`-.__\\ \\___  /__.-\'_.\'_.-\'===================');
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
    nextLine();
    writeLine('suite', 'You have not yet reached enlightenment ..');
    writeLine('bright fail', format(' {} {} has damaged your karma', symbols.err, test.title));
    nextLine();
    write('suite', 'Please meditate on the following code: ');
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
    writeLine('suite', format('That was the last one, well done{}', symbols.bang));
    writeLine('bright pass', 'You have reached enlightenment');
    writeLine('suite', format(' You have done {} koans', this.testSuites));
    writeLine('suite', format(' You performed {} tasks', this.passingTests));
    process.exit();
  }
}

export default KoanReporter;
