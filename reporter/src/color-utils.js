import { reporters } from 'mocha';

const Base = reporters.Base;
const colorOutput = Base.color;

export const Red = message => {
  return colorOutput('bright fail', message);
};

export const Gray = message => {
  return colorOutput('suite', message);
};

export const Yellow = message => {
  return colorOutput('bright yellow', message);
};

export const Green = message => {
  return colorOutput('bright pass', message);
};
