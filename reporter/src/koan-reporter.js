import { showGoldBudda, thinkingOn, youAreAwareOf, youHaveReachedEnlightment, meditateOn } from './sensei';

class KoanReporter {
  constructor(runner) {
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
    process.stdout.write(showGoldBudda());
  }

  onTestSuite (suite) {
    if (suite.root) {
      return;
    }
    process.stdout.write(thinkingOn(suite.title));
  }

  onTestPass (test) {
    process.stdout.write(youAreAwareOf(test.title));
  }

  onTestFail (test, err) {
    process.stdout.write(meditateOn(test.title, err));
    process.exit();
  }

  onEnd () {
    process.stdout.write(youHaveReachedEnlightment());
    process.exit();
  }
}

export default KoanReporter;
