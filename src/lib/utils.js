import PropTypes from 'prop-types';
import { css } from 'styled-components';
import THEME from './THEME';

const COL_PCT = 8.333333333333334;

/**
 * Extend the theme prop onto the base THEME, and return all props
 */
export function addTheme(props) {
  props.theme = props.theme ? { ...THEME, ...props.theme } : THEME;
  return props;
}

/**
 * Parse value to determine units, make default assumptions based on type (unless default passed in)
 * Return string: px|rem|em|%
 */
export function resolveUnits(val, defaultUnits = '') {
  const match = String(val).match(/px|rem|em|%/g);
  return match ? match[0] : defaultUnits || typeof val === 'number' ? 'px' : 'rem';
}

/**
 * Return strings as-is, coerce numbers to 'px'
 */
export function toCssUnits(val) {
  return typeof val === 'string' ? val : typeof val === 'number' ? `${val}px` : '';
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
 * Parse an incoming string into a valid CSS size unit, e.g. 10px, 2.5em, 50%
 * If the string does not match known units, assume it is a SPACER multiplier
 *
 * Ex. cssSize('10px') --> '10px'
 *     cssSize('3')    --> '30px'
 */
export function cssSize(val, spacer) {
  // check if val matches legit pattern, e.g. 1px, 50%, 2.5em, or 'auto'
  // if true, return val as-is
  const isExplicit = /^[-0-9.]+(px|em|rem|%)$/.test(val) || val === 'auto';
  if (isExplicit) return val;

  // otherwise, assume a SPACER multiplier, e.g. -1, 2.5, etc
  const multi = Number((val.match(/[-0-9.]/g) || []).join('')); // negative multipliers ok
  return Number.isNaN(multi) ? '0px' : `${multi * spacer}px`;
}

/**
 * Deliver CSS 'padding' or 'margin' rules derived from a shorthand string
 * Expect a space delimited string of up to 4 elems, in the CSS shorthand order "top right bottom left"
 * The values can be in known CSS units (12px), or numbers only (5) as SPACER multipliers (50px)
 * If a '*' is supplied for any direction, no rule is applied for it
 *
 * Ex. spacingCss('padding', '1 * -5px 10%') -->
 *   padding-top: 10px;
 *   padding-bottom: -5px;
 *   padding-left: 10%;
 */
export function cssSpacing(rule, props) {
  // rule = ['margin', 'padding'].find(supportedRule => supportedRule === rule.trim());

  if (!rule) return '';

  const values = props[rule];
  let top;
  let right;
  let bottom;
  let left;

  if (typeof values === 'number') {
    top = `${values}px`;
    right = `${values}px`;
  } else {
    [top, right, bottom, left] = String(values)
      .split(' ')
      .slice(0, 4); // limit to 4 elems
  }

  const spacer = props.theme.SPACER;
  top = top && top !== '*' ? cssSize(top, spacer) : ''; // do not apply rule if '0'
  right = right !== '*' ? (right ? cssSize(right, spacer) : top) : ''; // if not supplied, apply 'top'
  bottom = bottom !== '*' ? (bottom ? cssSize(bottom, spacer) : top) : ''; // if not supplied, apply 'top'
  left = left !== '*' ? (left ? cssSize(left, spacer) : right) : ''; // if not supplied, apply 'right'

  // prettier-ignore
  return css`
    ${rule}-top: ${top};
    ${rule}-right: ${right};
    ${rule}-bottom: ${bottom};
    ${rule}-left: ${left};
  `
}

/**
 * Given the supplied gutter, deliver negative left/right margin rules for FlexRow
 * This is to ensure outer columns (with gutters) are flush with the container
 */
function toRowGuttersCss(gutter) {
  return `margin-left: -${gutter / 2}px; margin-right: -${gutter / 2}px;`;
}

/**
 * Deliver correct column width and left/right margins, per the supplied props
 */
function toColumnCss(col, offset, gutter) {
  const colWidthPct = col * COL_PCT;
  const width = gutter ? `calc(${colWidthPct}% - ${gutter}px)` : `${colWidthPct}%`;
  const marginRight = gutter ? `${gutter / 2}px` : '0';
  const marginLeft =
    offset && gutter
      ? `calc(${offset * COL_PCT}% + ${gutter / 2}px)`
      : offset && !gutter
        ? `${offset * COL_PCT}%`
        : gutter
          ? `${gutter / 2}px`
          : '0';

  return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width};`;
}

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

const displayPropTypes = {
  hide: PropTypes.bool, // xs, or when no media
  smHide: PropTypes.bool,
  mdHide: PropTypes.bool,
  lgHide: PropTypes.bool,
  xlHide: PropTypes.bool,

  show: PropTypes.oneOf([true, false, 'inline', 'inline-block', 'block']), // xs, or when no media
  smShow: PropTypes.oneOf([true, false, 'inline', 'inline-block', 'block']),
  mdShow: PropTypes.oneOf([true, false, 'inline', 'inline-block', 'block']),
  lgShow: PropTypes.oneOf([true, false, 'inline', 'inline-block', 'block']),
  xlShow: PropTypes.oneOf([true, false, 'inline', 'inline-block', 'block']),
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

    ${props.theme.MEDIA_MD_MIN} { 
      max-width: ${props.theme.CONTAINER_MEDIUM}px;
    }
    
    ${props.theme.MEDIA_LG_MIN} { 
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
 * withRowGutters
 */
const gutterPropTypes = {
  gutter: PropTypes.number, // xs, or when no media
  smGutter: PropTypes.number,
  mdGutter: PropTypes.number,
  lgGutter: PropTypes.number,
  xlGutter: PropTypes.number,
};
export { gutterPropTypes };
export function withRowGutters({ gutter, smGutter, mdGutter, lgGutter, xlGutter, theme }) {
  // prettier-ignore
  return css`
    ${gutter && toRowGuttersCss(gutter)}
    ${smGutter && `${theme.MEDIA_XS_MIN} { ${toRowGuttersCss(smGutter)} }`}
    ${mdGutter && `${theme.MEDIA_SM_MIN} { ${toRowGuttersCss(mdGutter)} }`}
    ${lgGutter && `${theme.MEDIA_MD_MIN} { ${toRowGuttersCss(lgGutter)} }`}
    ${xlGutter && `${theme.MEDIA_LG_MIN} { ${toRowGuttersCss(xlGutter)} }`}
  `;
}

/**
 * withColumns
 */
const columnPropTypes = {
  col: PropTypes.number, // xs, or when no media
  smCol: PropTypes.number,
  mdCol: PropTypes.number,
  lgCol: PropTypes.number,
  xlCol: PropTypes.number,

  offset: PropTypes.number, // xs, or when no media
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,
  xlOffset: PropTypes.number,

  ...gutterPropTypes,
};
export { columnPropTypes };
export function withColumns({
  col,
  offset,
  gutter,
  smCol,
  smOffset,
  smGutter,
  mdCol,
  mdOffset,
  mdGutter,
  lgCol,
  lgOffset,
  lgGutter,
  xlCol,
  xlOffset,
  xlGutter,
  theme,
}) {
  // prettier-ignore
  return css`
    ${col && toColumnCss(col, offset, gutter)}
    ${smCol && `${theme.MEDIA_XS_MIN} { ${toColumnCss(smCol, smOffset, smGutter || gutter)} }`}
    ${mdCol && `${theme.MEDIA_SM_MIN} { ${toColumnCss(mdCol, mdOffset, mdGutter || gutter)} }`}
    ${lgCol && `${theme.MEDIA_MD_MIN} { ${toColumnCss(lgCol, lgOffset, lgGutter || gutter)} }`}
    ${xlCol && `${theme.MEDIA_LG_MIN} { ${toColumnCss(xlCol, xlOffset, xlGutter || gutter)} }`}
  `;
}

/**
 * withMediaColumns (NEW, WIP...)
 */
function toMediaObj(val) {
  return typeof val === 'object' ? val : { xs: val };
}

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

const mediaStylesPropTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), // use when no media
  smStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  mdStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  lgStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  xlStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};
export { mediaStylesPropTypes };
export function withMediaStyles({ styles, smStyles, mdStyles, lgStyles, xlStyles, theme }) {
  // prettier-ignore
  return css`
    ${styles && styles};
    ${smStyles && `${theme.MEDIA_XS_MIN} { ${smStyles} }`}
    ${mdStyles && `${theme.MEDIA_SM_MIN} { ${mdStyles} }`}
    ${lgStyles && `${theme.MEDIA_MD_MIN} { ${lgStyles} }`}
    ${xlStyles && `${theme.MEDIA_LG_MIN} { ${xlStyles} }`}
  `;
}

/**
 * withStyles (NEW, WIP...)
 */
export function withStyles({ styles, theme }) {
  if (Array.isArray(styles)) return styles;

  if (typeof styles === 'string')
    // prettier-ignore
    return css`${styles}`;

  if (typeof styles === 'object') {
    // prettier-ignore
    return css`
    ${styles.xs}
    ${styles.sm && `${theme.MEDIA_XS_MIN} { ${styles.sm} }`}
    ${styles.md && `${theme.MEDIA_SM_MIN} { ${styles.md} }`}
    ${styles.lg && `${theme.MEDIA_MD_MIN} { ${styles.lg} }`}
    ${styles.xl && `${theme.MEDIA_LG_MIN} { ${styles.xl} }`}
  `;
  }

  return [];
}

const spacingPropTypes = {
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export { spacingPropTypes };
export function withSpacing(props) {
  // we no-op only if 'undefined', to allow for number 0 to clear margins/padding
  // prettier-ignore
  return css`
    ${props.margin !== undefined && cssSpacing('margin', props)} 
    ${props.padding !== undefined && cssSpacing('padding', props)}
  `
}
