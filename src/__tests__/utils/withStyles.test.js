import { css } from 'styled-components';
import { withStyles } from '../../lib/utils';
import theme from '../../lib/THEME';

describe('withStyles', () => {
  let props;
  let styles;
  let expected;

  beforeEach(() => {
    props = { styles: {}, theme };
  });

  it('handles styles as an empty string', () => {
    props = { ...props, styles: '' };
    expect(withStyles(props)).toEqual([]);
  });

  it('handles styles as a (CSS) string', () => {
    props = { ...props, styles: 'display: block; color: red;' };
    expect(withStyles(props)).toEqual(['display: block; color: red;']);
  });

  it('handles styles as an empty array', () => {
    props = { ...props, styles: [] };
    expect(withStyles(props)).toEqual([]);
  });

  it('handles styles as an css array', () => {
    // prettier-ignore
    styles = css`
        display: block;
        color: red;
        ${true && 'cursor: pointer;'}
      `;
    props = { ...props, styles };
    expect(withStyles(props)).toEqual(['display:block;color:red;', 'cursor: pointer;']);
  });

  it('handles styles as an empty object', () => {
    expect(withStyles(props)).toEqual([' ', ' ', ' ', ' ']);
  });

  it('handles styles as an object with media keys', () => {
    styles = {
      lg: 'color: blue', // out of order
      xs: 'display: inline',
      sm: 'display: block',
      xl: 'cursor: pointer',
      md: 'color: red',
      gah: 'whoops!',
    };
    expected = [
      'display: inline',
      ' ',
      '@media (min-width: 576px) { display: block }',
      ' ',
      '@media (min-width: 768px) { color: red }',
      ' ',
      '@media (min-width: 992px) { color: blue }',
      ' ',
      '@media (min-width: 1200px) { cursor: pointer }',
    ];

    props = { ...props, styles };
    expect(withStyles(props)).toEqual(expected);
  });
});
