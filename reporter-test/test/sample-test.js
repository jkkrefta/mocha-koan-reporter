/* global describe, it */
import { expect } from 'chai';

describe('about koan reporter', () => {
  it('simple passing test', () => {
    expect(true).to.equal(true);
  });

  it('simple failing test', () => {
    expect(true).to.equal(false);
  });
});
