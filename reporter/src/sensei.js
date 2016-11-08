import { budda, zen } from './assets';
import { Yellow, Gray, Green, Red } from './color-utils';
import format from 'string-format';
import { reporters } from 'mocha';

const symbols = reporters.Base.symbols;

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function zenWisdom () {
  return zen[getRandomIntInclusive(0, zen.length)];
}

export function showGoldBudda () {
  return format('{}\n{}\n\n', Yellow(budda), Yellow(zenWisdom()));
}

export function thinkingOn (subject) {
  return Gray(format('Thinking {}\n', subject));
}

export function youAreAwareOf (subject) {
  return Green(format(' {} {} has expanded your awarness\n', symbols.ok, subject));
}

export function youHaveReachedEnlightment () {
  const praise = Gray(format('That was the last one, well done{}', symbols.bang));
  const judgement = Green(format('You have reached enlightenment', symbols.bang));
  return format('\n{}\n{}\n', praise, judgement);
}

export function meditateOn (subject, fallacy) {
  const judgement = Gray('You have not yet reached enlightenment ..');
  const result = Red(format('{} {} has damaged your karma', symbols.err, subject));
  const widsom = Gray('Please meditate on the following code:');
  const place = Red(subject);
  const reason = Yellow(format('{}', fallacy.message));
  const givenAnswear = Gray('Given:') + Red(fallacy.actual);
  const expectedAnswear = Gray('Expected:') + Green(fallacy.expected);

  return fallacy.showDiff
    ? format('\n{}\n {}\n\n{} {}\n\n    {}\n\n    {}\n    {}\n', judgement, result, widsom, place, reason, expectedAnswear, givenAnswear)
    : format('\n{}\n {}\n\n{} {}\n\n    {}\n', judgement, result, widsom, place, reason);
}
