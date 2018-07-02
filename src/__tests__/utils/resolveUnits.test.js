import { resolveUnits } from '../../lib/utils';

describe('resolveUnits', () => {
  it('parses recognized units', () => {
    expect(resolveUnits('10px')).toBe('px');
    expect(resolveUnits('2.5rem')).toBe('rem');
    expect(resolveUnits('24%')).toBe('%');
  });

  it('defaults to px when value is a number', () => {
    expect(resolveUnits(100)).toBe('px');
  });

  it('defaults to rem on other types', () => {
    expect(resolveUnits('10')).toBe('rem');
    expect(resolveUnits()).toBe('rem');
  });
});
