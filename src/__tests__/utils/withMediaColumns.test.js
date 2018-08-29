import { toMediaColumnCss, withMediaColumns } from '../../lib/utils';
import THEME from '../../lib/THEME';

const filterOutEmpties = list => list.filter(el => el.trim());
const withMediaColumnsFiltered = props => filterOutEmpties(withMediaColumns(props));

describe('toMediaColumnCss', () => {
  let breakpoint;
  let col;
  let offset;
  let gutter;

  beforeEach(() => {
    breakpoint = null;
    col = 12 / 12;
    offset = 0;
    gutter = 0;
  });

  it('delivers correct rules per col', () => {
    expect(toMediaColumnCss(breakpoint, col)).toBe('margin-left: 0; margin-right: 0; width: 100%;');

    col = 6 / 12;
    expect(toMediaColumnCss(breakpoint, col)).toBe('margin-left: 0; margin-right: 0; width: 50%;');

    col = 3 / 12;
    expect(toMediaColumnCss(breakpoint, col)).toBe('margin-left: 0; margin-right: 0; width: 25%;');
  });

  it('delivers correct rules per offset', () => {
    col = 3 / 12;
    offset = 6 / 12;
    expect(toMediaColumnCss(breakpoint, col, offset)).toBe(
      'margin-left: 50%; margin-right: 0; width: 25%;'
    );
  });

  it('delivers correct rules per gutter, rem units, no offset', () => {
    col = 12 / 12;
    offset = 0;
    gutter = 3;
    expect(toMediaColumnCss(breakpoint, col, offset, gutter)).toBe(
      'margin-left: 1.5rem; margin-right: 1.5rem; width: calc(100% - 3rem);'
    );
  });

  it('delivers correct rules per gutter, px units, no offset', () => {
    col = 12 / 12;
    offset = 0;
    gutter = '20px';
    expect(toMediaColumnCss(breakpoint, col, offset, gutter)).toBe(
      'margin-left: 10px; margin-right: 10px; width: calc(100% - 20px);'
    );
  });

  it('delivers correct media rules with breakpoint', () => {
    breakpoint = THEME.MEDIA_SM_UP;
    col = 12 / 12;
    expect(toMediaColumnCss(breakpoint, col, offset, gutter)).toBe(
      '@media only screen and (min-width: 576px) { margin-left: 0; margin-right: 0; width: 100%; }'
    );
  });
});

describe('withMediaColumns', () => {
  let props;
  let expected;

  beforeEach(() => {
    props = {
      col: 12 / 12,
      offset: 0,
      gutter: 0,
      theme: THEME,
    };
  });

  it('delivers correct rules, no grid props', () => {
    props = { theme: THEME };
    expect(withMediaColumnsFiltered(props)).toEqual([]);
  });

  it('delivers correct rules, base props (no media)', () => {
    expected = ['margin-left: 0; margin-right: 0; width: 100%;'];
    expect(withMediaColumnsFiltered(props)).toEqual(expected);

    props = { ...props, col: 6 / 12, offset: 3 / 12, gutter: '2rem' };
    expected = ['margin-left: calc(25% + 1rem); margin-right: 1rem; width: calc(50% - 2rem);'];
    expect(withMediaColumnsFiltered(props)).toEqual(expected);
  });

  it('delivers correct rules, with media', () => {
    props = { ...props, col: { xs: 12 / 12, sm: 6 / 12 } };
    expected = [
      'margin-left: 0; margin-right: 0; width: 100%;',
      '@media only screen and (min-width: 576px) { margin-left: 0; margin-right: 0; width: 50%; }',
    ];
    expect(withMediaColumnsFiltered(props)).toEqual(expected);

    props = {
      ...props,
      col: { xs: 12 / 12, sm: 6 / 12, lg: 3 / 12 },
      offset: { sm: 3 / 12, lg: 4.5 / 12 },
    };
    expected = [
      'margin-left: 0; margin-right: 0; width: 100%;',
      '@media only screen and (min-width: 576px) { margin-left: 25%; margin-right: 0; width: 50%; }',
      '@media only screen and (min-width: 992px) { margin-left: 37.5%; margin-right: 0; width: 25%; }',
    ];
    expect(withMediaColumnsFiltered(props)).toEqual(expected);
  });
});
