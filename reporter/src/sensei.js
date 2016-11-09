import { budda, wisdom } from './assets';
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
  return wisdom[getRandomIntInclusive(0, wisdom.length)];
}

export function showGoldBudda () {
  return Yellow(format(budda, zenWisdom()));
}

export function thinkingOn (subject) {
  return Gray(format('Thinking {}\n', subject));
}

export function youAreAwareOf (subject) {
  return Green(format(' {} {} has expanded your awarness\n', symbols.ok, subject));
}

export function youHaveReachedEnlightment () {
  const praise = Gray(format('That was the last one, well done{}', symbols.bang));
  const enlightenment = Green(format('You have reached enlightenment', symbols.bang));
  return format('\n{}\n{}\n', praise, enlightenment);
}

export function meditateOn (subject, fallacy) {
  const enlightenment = Gray('You have not yet reached enlightenment ..');
  const karma = Red(format('{} {} has damaged your karma', symbols.err, subject));
  const meditate = Gray('Please meditate on');
  const place = Red(fallacy.stack);
  const givenAnswear = Gray('Given:') + Red(fallacy.actual);
  const expectedAnswear = Gray('Expected:') + Green(fallacy.expected);

  return fallacy.showDiff
    ? format('\n{}\n {}\n\n{} {}\n\n    {}\n    {}\n', enlightenment, karma, meditate, place, expectedAnswear, givenAnswear)
    : format('\n{}\n {}\n\n{} {}\n', enlightenment, karma, meditate, place);
}
