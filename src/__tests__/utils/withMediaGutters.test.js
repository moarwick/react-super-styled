import { toMediaGuttersCss, withMediaGutters } from '../../lib/utils';
import THEME from '../../lib/THEME';

const filterOutEmpties = list => list.filter(el => el.trim());
const withMediaGuttersFiltered = props => filterOutEmpties(withMediaGutters(props));

describe('toMediaGuttersCss', () => {
  let breakpoint;
  let gutter;
  let expected;

  beforeEach(() => {
    breakpoint = null;
    gutter = 0;
  });

  it('delivers correct rules with no/zero breakpoint, gutter', () => {
    expected = 'margin-left: 0; margin-right: 0;';
    expect(toMediaGuttersCss()).toBe(expected);
    expect(toMediaGuttersCss(breakpoint)).toBe(expected);
    expect(toMediaGuttersCss(breakpoint, gutter)).toBe(expected);
  });

  it('delivers correct rules with gutter (different units)', () => {
    gutter = 1; // nums interpreted as rems
    expect(toMediaGuttersCss(breakpoint, gutter)).toBe(
      'margin-left: -0.5rem; margin-right: -0.5rem;'
    );

    gutter = '10px';
    expect(toMediaGuttersCss(breakpoint, gutter)).toBe('margin-left: -5px; margin-right: -5px;');
  });

  it('delivers correct rules with breakpoints', () => {
    breakpoint = THEME.MEDIA_SM_UP;
    expect(toMediaGuttersCss(breakpoint, gutter)).toBe(
      '@media only screen and (min-width: 576px) { margin-left: 0; margin-right: 0; }'
    );

    breakpoint = THEME.MEDIA_LG_UP;
    gutter = 2;
    expect(toMediaGuttersCss(breakpoint, gutter)).toBe(
      '@media only screen and (min-width: 992px) { margin-left: -1rem; margin-right: -1rem; }'
    );
  });
});

describe('withMediaGutters', () => {
  let props;
  let expected;

  beforeEach(() => {
    props = {
      gutter: 0,
      theme: THEME,
    };
  });

  it('delivers correct rules, no media', () => {
    expected = ['margin-left: 0; margin-right: 0;'];
    expect(withMediaGuttersFiltered(props)).toEqual(expected);

    props = { ...props, gutter: 2 };
    expected = ['margin-left: -1rem; margin-right: -1rem;'];
    expect(withMediaGuttersFiltered(props)).toEqual(expected);
  });

  it('delivers correct rules, with media', () => {
    props = { ...props, gutter: { xs: 0 } };
    expected = ['margin-left: 0; margin-right: 0;'];
    expect(withMediaGuttersFiltered(props)).toEqual(expected);

    props = { ...props, gutter: { xs: 0, sm: '30px' } };
    expected = [
      'margin-left: 0; margin-right: 0;',
      '@media only screen and (min-width: 576px) { margin-left: -15px; margin-right: -15px; }',
    ];
    expect(withMediaGuttersFiltered(props)).toEqual(expected);
  });
});
