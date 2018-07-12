import { css } from 'styled-components';
import { withMediaStyles } from '../../lib/utils';
import theme from '../../lib/THEME';

const filterOutEmpties = list => list.filter(el => el.trim());

describe('withMediaStyles', () => {
  let props;
  let styles;
  let expected;

  beforeEach(() => {
    props = { styles: {}, theme };
  });

  it('handles styles as an empty string', () => {
    props = { ...props, styles: '' };
    expect(withMediaStyles(props)).toEqual([]);
  });

  it('handles styles as an empty array', () => {
    props = { ...props, styles: [] };
    expect(withMediaStyles(props)).toEqual([]);
  });

  it('handles styles as a string of CSS', () => {
    props = { ...props, styles: 'display: block; color: red;' };
    expect(withMediaStyles(props)).toEqual(['display: block; color: red;']);
  });

  it(`handles styles as an array of SC's rules`, () => {
    // prettier-ignore
    styles = css`
        display: block;
        color: red;
        ${true && 'cursor: pointer;'}
      `;
    props = { ...props, styles };
    expect(withMediaStyles(props)).toEqual(['display:block;color:red;', 'cursor: pointer;']);
  });

  it('handles styles as an empty object', () => {
    expect(withMediaStyles(props)).toEqual([' ', ' ', ' ', ' ']);
  });

  it('handles styles as an object with media keys', () => {
    styles = {
      sm: css`
        display: block;
        cursor: pointer;
      `, // can be arrays (from SC's css method)
      lg: 'display: inline-block; color: blue', // or strings
      xs: css`
        display: inline;
      `, // keys out of order
      xl: undefined, // some empty
      md: 'color: red;', // some semis, some not..
      gah: 'whoops!', // unsupported keys
    };
    expected = [
      'display:inline;',
      '@media only screen and (min-width: 576px) { display:block;cursor:pointer; }',
      '@media only screen and (min-width: 768px) { color: red; }',
      '@media only screen and (min-width: 992px) { display: inline-block; color: blue; }',
    ];
    props = { ...props, styles };
    expect(filterOutEmpties(withMediaStyles(props))).toEqual(expected);
  });
});
