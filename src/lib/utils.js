import PropTypes from 'prop-types';
import { css } from 'styled-components';
import THEME from './THEME';

/**
 * Extend the theme prop onto the base THEME, and return all props
 */
export function addTheme(props) {
  props.theme = props.theme ? { ...THEME, ...props.theme } : THEME;
  return props;
}

/**
 * Return strings as-is, coerce numbers to 'px'
 */
export function toCssUnits(val) {
  return typeof val === 'string' ? val : typeof val === 'number' ? val + 'px' : '';
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
  const isExplicit = /^[0-9.]+(px|em|rem|%)$/.test(val) || val === 'auto';
  if (isExplicit) return val;

  // otherwise, assume a SPACER multiplier, e.g. 1, 2.5, etc
  const multi = Number((val.match(/[0-9.]/g) || []).join(''));
  return `${multi * spacer}px`;
}

/**
 * Deliver CSS 'padding' or 'margin' rules derived from a shorthand string
 * Expect a space delimited string of up to 4 elems, in the CSS shorthand order "top right bottom left"
 * The values can be in known CSS units (10px), or numbers only (5) as SPACER multipliers (px)
 * If a dash is supplied for any direction, no rule is applied for it
 *
 * Ex. spacingCss('padding', '1 5px 10% -') -->
 *   padding-top: 10px;
 *   padding-right: 5px;
 *   padding-bottom: 10%;
 */
export function cssSpacing(rule, props) {
  rule = ['margin', 'padding'].find(supportedRule => supportedRule === rule.trim());

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
  top = top && top !== '-' ? cssSize(top, spacer) : ''; // do not apply rule if '0'
  right = right !== '-' ? (right ? cssSize(right, spacer) : top) : ''; // if not supplied, apply 'top'
  bottom = bottom !== '-' ? (bottom ? cssSize(bottom, spacer) : top) : ''; // if not supplied, apply 'top'
  left = left !== '-' ? (left ? cssSize(left, spacer) : right) : ''; // if not supplied, apply 'right'

  // prettier-ignore
  return css`
    ${top && `${rule}-top: ${top};`} 
    ${right && `${rule}-right: ${right};`}
    ${bottom && `${rule}-bottom: ${bottom};`} 
    ${left && `${rule}-left: ${left};`};
  `
}

/**
 * Parse supplied column value (number or string) into pertinent CSS rules
 * Supported syntax: "columns", "offset columns", "columns-gutter", "offset columns-gutter"
 *
 * Ex. 12      --> 12 cols, entire width (100%)
 *     '3 6'   --> 3 cols left offset (25%) 6 cols width (50%),
 *     '2 4-1' --> 2 cols left offset (20%), 4 cols wide (33.33%), minus 5px left/right gutters (10px via spacer multiplier)
 */
function toColumnCss(val, spacer) {
  const colPct = 100 / 12;

  if (typeof val === 'number') {
    return `margin-left: 0; margin-right: 0; width: ${val * colPct}%;`;
  }

  const [val1, val2] = val.match(/[^ ]+/g); // split by ' ' for offset
  const [columns, gutter] = (val2 || val1).match(/[^-]+/g); // split by '-' for gutter

  const colWidthPct = Number(columns) * colPct;
  const offsetColPct = val2 ? Number(val1) * colPct : 0;
  const gutterPx = gutter ? Number(gutter) * spacer : 0;

  const width = gutterPx ? `calc(${colWidthPct}% - ${gutterPx}px)` : `${colWidthPct}%`;
  const marginRight = gutterPx ? `${gutterPx / 2}px` : '0';
  const marginLeft =
    offsetColPct && gutterPx
      ? `calc(${offsetColPct}% + ${gutterPx / 2}px)`
      : offsetColPct && !gutterPx ? `${offsetColPct}%` : gutterPx ? `${gutterPx / 2}px` : '0';

  return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width};`;
}

/* ----- COMMON PROP TYPES ----- */

const basePropTypes = {
  children: PropTypes.node,
  innerRef: PropTypes.func,
  theme: PropTypes.object,
};
export { basePropTypes };

const displayPropTypes = {
  mdHide: PropTypes.bool,
  smHide: PropTypes.bool,
  xsHide: PropTypes.bool,
  mdShow: PropTypes.bool,
  smShow: PropTypes.bool,
  xsShow: PropTypes.bool,
  mdShowInline: PropTypes.bool,
  smShowInline: PropTypes.bool,
  xsShowInline: PropTypes.bool,
  mdShowInlineBlock: PropTypes.bool,
  smShowInlineBlock: PropTypes.bool,
  xsShowInlineBlock: PropTypes.bool,
};
export { displayPropTypes };

/* ----- ENHANCERS ----- */

const containerPropTypes = {
  container: PropTypes.bool,
};
export { containerPropTypes };
export function withContainer(props) {
  if (!props.container) return '';
  // prettier-ignore
  return css`
    margin-left: auto;
    margin-right: auto;
    max-width: ${props.theme.CONTAINER_SMALL}px;

    ${props.theme.MEDIA_LG_MIN} { 
      max-width: ${props.theme.CONTAINER}px;
    }
  `
}

const fontPropTypes = {
  inline: PropTypes.bool,
  italic: PropTypes.bool,
  roman: PropTypes.bool,
  light: PropTypes.bool,
  normal: PropTypes.bool,
  bold: PropTypes.bool,
  small: PropTypes.bool,
  base: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xLarge: PropTypes.bool,
  xxLarge: PropTypes.bool,
};
export { fontPropTypes };
export function withFont(props, isHeader = false) {
  let fontSize =
    ['small', 'base', 'medium', 'large', 'xLarge', 'xxLarge'].find(size => size in props) || '';
  let fontStyle = ['italic', 'roman'].find(style => style in props) || '';
  let fontWeight = ['light', 'normal', 'bold'].find(weight => weight in props) || '';

  fontSize = toCssUnits(props.theme['FONT_' + fontSize.toUpperCase()]);
  if (fontStyle === 'roman') fontStyle = 'normal';
  fontWeight = props.theme[(isHeader ? 'FONT_H_' : 'FONT_') + fontWeight.toUpperCase()];

  // prettier-ignore
  return css`
    ${props.inline && `display: inline;`}
    ${fontSize && `font-size: ${fontSize};`} 
    ${fontStyle && `font-style: ${fontStyle};`} 
    ${fontWeight && `font-weight: ${fontWeight};`}
  `
}

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
 * Interpret media-based column props into CSS rules
 * Assumes Bootstrap-style 12 column grid, with optional offset and gutter
 * Supported syntax: "columns", "offset columns", "columns-gutter", "offset columns-gutter"
 *
 * Ex. xsCol={ 12 }  --> margin-left: 0; margin-right: 0; width: 100%;
 *     smCol="3 6"   --> margin-left: 25%; margin-right: 0; width: 50%;
 *     mdCol="6 6-1" --> margin-left: 50% + 5px; margin-right: 5px; width: 50% - 10px;
 */
const columnPropTypes = {
  col: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // use when no media
  xsCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  smCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mdCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lgCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export { columnPropTypes };
export function withColumns({ col, xsCol, smCol, mdCol, lgCol, theme }) {
  // prettier-ignore
  return css`
    ${col && toColumnCss(col, theme.SPACER)}
    ${xsCol && toColumnCss(xsCol, theme.SPACER)}
    ${smCol && `${theme.MEDIA_SM_MIN} { ${toColumnCss(smCol, theme.SPACER)} }`}
    ${mdCol && `${theme.MEDIA_MD_MIN} { ${toColumnCss(mdCol, theme.SPACER)} }`}
    ${lgCol && `${theme.MEDIA_LG_MIN} { ${toColumnCss(lgCol, theme.SPACER)} }`}
  `;
}

/**
 * Add passed-in CSS, with media-based breakpoint support
 */
const mediaStylesPropTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), // use when no media
  xsStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  smStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  mdStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  lgStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};
export { mediaStylesPropTypes };
export function withMediaStyles({ styles, xsStyles, smStyles, mdStyles, lgStyles, theme }) {
  // prettier-ignore
  return css`
    ${styles && styles};
    ${xsStyles && xsStyles};
    ${smStyles && `${theme.MEDIA_SM_MIN} { ${smStyles} }`}
    ${mdStyles && `${theme.MEDIA_MD_MIN} { ${mdStyles} }`}
    ${lgStyles && `${theme.MEDIA_LG_MIN} { ${lgStyles} }`}
  `;
}

/**
 * Margin and padding "shorthand" enhancers
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
    ${props.margin !== undefined && cssSpacing('margin', props)} 
    ${props.padding !== undefined && cssSpacing('padding', props)}
  `
}
