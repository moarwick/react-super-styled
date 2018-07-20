import { parseDimensions, parseViewBoxRatio } from '../lib/SvgIcon';

describe('parseViewBoxRatio', () => {
  it('derives correct ratio', () => {
    expect(parseViewBoxRatio()).toEqual(1);
    expect(parseViewBoxRatio('0 0 foo bar')).toBe(1);
    expect(parseViewBoxRatio('0 0 100 100')).toBe(1);
    expect(parseViewBoxRatio('0 0 10 100')).toBe(0.1);
    expect(parseViewBoxRatio('0 0 100 10')).toBe(10);
  });
});

describe('parseDimensions', () => {
  it('derives correct dimensions, with 1:1 viewBox', () => {
    expect(parseDimensions(undefined, undefined, '0 0 100 100')).toEqual([1.4, 1.4]); // default
    expect(parseDimensions(undefined, 10, '0 0 100 100')).toEqual([10, 10]);
    expect(parseDimensions(10, undefined, '0 0 100 100')).toEqual([10, 10]);
  });

  it('derives correct dimensions, with arbitrary viewBox', () => {
    expect(parseDimensions(undefined, undefined, '0 0 100 50')).toEqual([2.8, 1.4]); // default
    expect(parseDimensions(undefined, 10, '0 0 100 50')).toEqual([20, 10]);
    expect(parseDimensions(10, undefined, '0 0 100 50')).toEqual([10, 5]);
  });
});
