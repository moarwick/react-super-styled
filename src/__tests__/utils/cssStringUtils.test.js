import { ensureSemi, toCssString } from '../../lib/utils';

describe('ensureSemi', () => {
  it('ensures string is trimmed, terminated with semicolon', () => {
    expect(ensureSemi('foo; ')).toBe('foo;');
    expect(ensureSemi('   foo ')).toBe('foo;');
  });

  it('returns empty string when only spaces or semi', () => {
    expect(ensureSemi('   ')).toBe('');
    expect(ensureSemi(' ;  ')).toBe('');
  });
});

describe('toCssString', () => {
  it('handles strings, ensures terminated with semi', () => {
    expect(toCssString('foo; ')).toBe('foo;');
    expect(toCssString('   foo ')).toBe('foo;');
  });

  it('handles arrays of strings, ensures all (actual) rules terminated with semi', () => {
    expect(toCssString([' foo ', ' ', 'bar; ', ' ; '])).toBe('foo;bar;');
  });
});
