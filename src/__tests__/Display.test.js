import Display, { getCss } from '../lib/Display';
import theme from '../../lib/THEME';

const filterOutEmpties = list => list.filter(el => el.trim());

describe('getCss', () => {
  let props;
  let expected;

  beforeEach(() => {
    props = { theme };
  });

  it('returns correct default rules', () => {
    expected = ['display: block;'];
    expect(filterOutEmpties(getCss(props))).toEqual(expected);
  });

  it('returns correct staggered hide -> show -> hide rules', () => {
    props = { ...props, show: { sm: 'block' }, hide: { lg: true } };
    expected = [
      'display: none;',
      '@media only screen and (min-width: 576px) { display: block; }',
      '@media only screen and (min-width: 992px) { display: none; }',
    ];
    expect(filterOutEmpties(getCss(props))).toEqual(expected);
  });
});
