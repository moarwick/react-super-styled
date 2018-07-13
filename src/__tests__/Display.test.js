import { getCss } from '../lib/Display';
import theme from '../../lib/THEME';

const filterOutEmpties = list => list.filter(el => el.trim());

describe('getCss', () => {
  let props;
  let expected;

  beforeEach(() => {
    props = { theme };
  });

  it('returns default rules', () => {
    expected = [];
    expect(filterOutEmpties(getCss(props))).toEqual(expected);
  });

  it('returns initial (xs) hide rule', () => {
    props = { ...props, hide: true };
    expected = ['display: none;'];
    expect(filterOutEmpties(getCss(props))).toEqual(expected);
  });

  it('returns initial (xs) show rule', () => {
    props = { ...props, show: 'block' };
    expected = ['display: block;'];
    expect(filterOutEmpties(getCss(props))).toEqual(expected);
  });

  it('returns "delayed" hide rule', () => {
    props = { ...props, hide: { xl: true } };
    expected = ['@media only screen and (min-width: 1200px) { display: none; }'];
    expect(filterOutEmpties(getCss(props))).toEqual(expected);
  });

  it('returns "delayed" show rule', () => {
    props = { ...props, show: { sm: true } };
    expected = ['display: none;', '@media only screen and (min-width: 576px) { display: inline; }'];
    expect(filterOutEmpties(getCss(props))).toEqual(expected);
  });

  it('returns multiple show -> hide -> show rules', () => {
    props = { ...props, hide: { sm: true }, show: { md: true } };
    expected = [
      '@media only screen and (min-width: 576px) { display: none; }',
      '@media only screen and (min-width: 768px) { display: inline; }',
    ];
    expect(filterOutEmpties(getCss(props))).toEqual(expected);
  });

  it('returns multiple hide -> show -> hide rules', () => {
    props = { ...props, show: { sm: 'block' }, hide: { lg: true } };
    expected = [
      'display: none;',
      '@media only screen and (min-width: 576px) { display: block; }',
      '@media only screen and (min-width: 992px) { display: none; }',
    ];
    expect(filterOutEmpties(getCss(props))).toEqual(expected);
  });
});
