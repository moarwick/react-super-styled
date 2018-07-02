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

  it('handles styles as a (CSS) string', () => {
    props = { ...props, styles: 'display: block; color: red;' };
    expect(withMediaStyles(props)).toEqual(['display: block; color: red;']);
  });

  it('handles styles as an empty array', () => {
    props = { ...props, styles: [] };
    expect(withMediaStyles(props)).toEqual([]);
  });

  it('handles styles as an css array', () => {
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
      xs: 'display: inline;', // out of order
      xl: ' ', // some empty
      md: 'color: red;', // some semis, some not..
      gah: 'whoops!', // unsupported keys
    };
    expected = [
      'display: inline;',
      '@media (min-width: 576px) { display:block;cursor:pointer; }',
      '@media (min-width: 768px) { color: red; }',
      '@media (min-width: 992px) { display: inline-block; color: blue; }',
      '@media (min-width: 1200px) {  }',
    ];
    props = { ...props, styles };
    expect(filterOutEmpties(withMediaStyles(props))).toEqual(expected);
  });
});
