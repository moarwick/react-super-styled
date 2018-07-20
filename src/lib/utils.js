import PropTypes from 'prop-types';
import { css } from 'styled-components';
import THEME from './THEME';

/**
 * Extend the theme prop onto the base THEME, and return all props
 */
export function addTheme(props) {
  return { ...props, theme: props.theme ? { ...THEME, ...props.theme } : THEME };
}

/**
 * Accept string, trim, return terminated with a semicolon
 * If input string contains all spaces or only ';', return empty string
 */
export function ensureSemi(val) {
  val = val.trim();
  return val && val !== ';' ? (val.slice(-1) === ';' ? val : `${val};`) : '';
}

/**
 * Parse value to determine units, make default assumptions based on type (unless default passed in)
 * Return string: px|rem|em|%
 */
export function resolveUnits(val, defaultUnits = '') {
  const match = String(val).match(/px|rem|em|%/g);
  return match ? match[0] : defaultUnits || 'rem';
}

/**
 * Accept string or a list of strings (from SC), return a single string
 * Filter, trim, and ensure a semicolon delimiter
 */
export function toCssString(val) {
  if (typeof val === 'string') return ensureSemi(val);
  if (!Array.isArray(val)) return '';
  return val
    .map(el => ensureSemi(el))
    .join('')
    .trim();
}

/**
 * Return strings as-is, coerce numbers to 'rem' (default '0rem')
 */
export function toCssUnits(val) {
  return typeof val === 'string' ? val : typeof val === 'number' ? `${val}rem` : '0rem';
}

/**
 * Helper to ensure that value is a (media) object
 */
export function toMediaObj(val) {
  return typeof val === 'object' ? val : { xs: val };
}

/**
 * Parse input value into a number, with optional decimal precision
 * Always return a number, 0 if value cannot be parsed
 */
export function toNum(value, precision = 0) {
  value = parseFloat(value) || 0;
  return precision > 0 ? Number(value.toFixed(precision)) : value;
}

/**
 * Deliver CSS 'padding' or 'margin' rules derived from passed in prop
 * Numbers are assumed to be 'rem'
 */
export function cssSpacing(rule, value) {
  if (typeof value === 'number') value += 'rem';
  return css`
    ${rule}: ${value};
  `;
}

/**
 * Deliver negative left/right margin rules for FlexRow
 * This is to ensure outer columns (with gutters) are flush with the container
 */
function toMediaGuttersCss(breakpoint, gutter) {
  const units = resolveUnits(gutter);
  gutter = toNum(gutter);
  const rule = `margin-left: -${gutter / 2}${units}; margin-right: -${gutter / 2}${units};`;
  return breakpoint ? `${breakpoint} { ${rule} }` : rule;
}

/**
 * Deliver correct column width and left/right margins, per the supplied props
 */
export function toMediaColumnCss(breakpoint, col, offset, gutter) {
  const units = resolveUnits(gutter);
  gutter = toNum(gutter);
  col = toNum(col) * 100;
  offset = toNum(offset) * 100;
  const width = gutter ? `calc(${col}% - ${gutter}${units})` : `${col}%`;
  const marginRight = gutter ? `${gutter / 2}${units}` : '0';
  const marginLeft =
    offset && gutter
      ? `calc(${offset}% + ${gutter / 2}${units})`
      : offset && !gutter
        ? `${offset}%`
        : gutter
          ? `${gutter / 2}${units}`
          : '0';

  const rule = `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width};`;
  return breakpoint ? `${breakpoint} { ${rule} }` : rule;
}

/**
 * throttleEvent
 */
export function throttleEvent(type, name, obj) {
  let isTriggered = false;
  const func = () => {
    if (isTriggered) return;
    isTriggered = true;
    requestAnimationFrame(() => {
      obj.dispatchEvent(new CustomEvent(name));
      isTriggered = false;
    });
  };
  obj = obj || window;
  obj.addEventListener(type, func);
}

/* ----- PROP TYPES & CSS RULE SETS ----- */

const basePropTypes = {
  children: PropTypes.node,
  innerRef: PropTypes.func,
  theme: PropTypes.object,
};
export { basePropTypes };

export const columnPropTypes = {
  col: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
};

const displayPropTypes = {
  hide: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
};
export { displayPropTypes };

/**
 * withContainer
 */
const containerPropTypes = {
  container: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};
export { containerPropTypes };
export function withContainer(props) {
  if (!props.container) return '';

  if (typeof props.container === 'number')
    return css`
      margin-left: auto;
      margin-right: auto;
      max-width: ${props.container}px;
    `;

  // passing in a 'boolean' behaves "just like Bootstrap"
  // prettier-ignore
  return css`
    margin-left: auto;
    margin-right: auto;
    max-width: ${props.theme.CONTAINER_SMALL}px;

    ${props.theme.MEDIA_MD_UP} { 
      max-width: ${props.theme.CONTAINER_MEDIUM}px;
    }
    
    ${props.theme.MEDIA_LG_UP} { 
      max-width: ${props.theme.CONTAINER_LARGE}px;
    }
  `
}

/**
 * withFont
 */
const fontPropTypes = {
  inline: PropTypes.bool,

  roman: PropTypes.bool,
  italic: PropTypes.bool,
  oblique: PropTypes.bool,

  light: PropTypes.bool,
  lighter: PropTypes.bool,
  normal: PropTypes.bool,
  bold: PropTypes.bool,
  bolder: PropTypes.bool,

  xxSmall: PropTypes.bool,
  xSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xLarge: PropTypes.bool,
  xxLarge: PropTypes.bool,
  larger: PropTypes.bool,
  smaller: PropTypes.bool,

  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  underline: PropTypes.bool,
};
const FONT_SIZING = {
  xxSmall: 'xx-small',
  xSmall: 'x-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xLarge: 'x-large',
  xxLarge: 'xx-large',
  larger: 'larger',
  smaller: 'smaller',
};
export { fontPropTypes };
export function withFont(props) {
  let fontStyle = ['roman', 'italic', 'oblique'].find(style => style in props) || '';
  if (fontStyle === 'roman') fontStyle = 'normal';

  const fontWeight =
    ['light', 'lighter', 'normal', 'bold', 'bolder'].find(weight => weight in props) || '';

  const fontSize = props.size
    ? toCssUnits(props.size)
    : FONT_SIZING[Object.keys(FONT_SIZING).find(size => size in props)] || '';

  // prettier-ignore
  return css`
    ${props.inline && `display: inline;`}
    ${props.underline && 'text-decoration: underline;'}
    font-size: ${fontSize}; 
    font-style: ${fontStyle}; 
    font-weight: ${fontWeight};
  `;
}

/**
 * withJustify
 */
const justifyPropTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};
export { justifyPropTypes };

export function withJustify(props) {
  const justify = ['center', 'right', 'left'].find(dir => dir in props);
  return css`
    ${justify && `text-align: ${justify};`};
  `;
}

/**
 * withMediaGutters
 */
const gutterPropTypes = {
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};
export { gutterPropTypes };
export function withMediaGutters({ gutter, theme }) {
  gutter = toMediaObj(gutter);

  // prettier-ignore
  return css`
    ${gutter.xs && toMediaGuttersCss(null, gutter.xs)}
    ${gutter.sm && toMediaGuttersCss(theme.MEDIA_SM_UP, gutter.sm)}
    ${gutter.md && toMediaGuttersCss(theme.MEDIA_MD_UP, gutter.md)}
    ${gutter.lg && toMediaGuttersCss(theme.MEDIA_LG_UP, gutter.lg)}
    ${gutter.xl && toMediaGuttersCss(theme.MEDIA_XL_UP, gutter.xl)}
  `;
}

/**
 * withMediaColumns
 */
export function withMediaColumns({ col, offset = 0, gutter = 0, theme }) {
  col = toMediaObj(col);
  offset = toMediaObj(offset);
  gutter = toMediaObj(gutter);

  // prettier-ignore
  return css`
    ${col.xs && toMediaColumnCss(null, col.xs, offset.xs, gutter.xs)}
    ${col.sm && toMediaColumnCss(theme.MEDIA_SM_UP, col.sm, offset.sm, gutter.sm)}
    ${col.md && toMediaColumnCss(theme.MEDIA_MD_UP, col.md, offset.md, gutter.md)}
    ${col.lg && toMediaColumnCss(theme.MEDIA_LG_UP, col.lg, offset.lg, gutter.lg)}
    ${col.xl && toMediaColumnCss(theme.MEDIA_XL_UP, col.xl, offset.xl, gutter.xl)}
  `;
}

/**
 * withMediaStyles
 */
const mediaStylesPropTypes = {
  styles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]),
};
export { mediaStylesPropTypes };
export function withMediaStyles({ styles, theme }) {
  if (Array.isArray(styles)) return styles;
  if (typeof styles === 'string') return css`${toCssString(styles)}`; // prettier-ignore
  if (typeof styles === 'object') {
    // prettier-ignore
    return css`
    ${styles.xs && toCssString(styles.xs)}
    ${styles.sm && `${theme.MEDIA_SM_UP} { ${toCssString(styles.sm)} }`}
    ${styles.md && `${theme.MEDIA_MD_UP} { ${toCssString(styles.md)} }`}
    ${styles.lg && `${theme.MEDIA_LG_UP} { ${toCssString(styles.lg)} }`}
    ${styles.xl && `${theme.MEDIA_XL_UP} { ${toCssString(styles.xl)} }`}
  `;
  }

  return [];
}

/**
 * withSpacing
 */
const spacingPropTypes = {
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export { spacingPropTypes };
export function withSpacing(props) {
  // we no-op only if 'undefined', to allow for number 0 to clear margins/padding
  // prettier-ignore
  return css`
    ${props.margin && cssSpacing('margin', props.margin)} 
    ${props.padding && cssSpacing('padding', props.padding)}
  `
}
