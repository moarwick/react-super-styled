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
  const isExplicit = /^[-0-9.]+(px|em|rem|%)$/.test(val) || val === 'auto';
  if (isExplicit) return val;

  // otherwise, assume a SPACER multiplier, e.g. -1, 2.5, etc
  const multi = Number((val.match(/[-0-9.]/g) || []).join('')); // negative multipliers ok
  return `${multi * spacer}px`;
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
  top = top && top !== '*' ? cssSize(top, spacer) : ''; // do not apply rule if '0'
  right = right !== '*' ? (right ? cssSize(right, spacer) : top) : ''; // if not supplied, apply 'top'
  bottom = bottom !== '*' ? (bottom ? cssSize(bottom, spacer) : top) : ''; // if not supplied, apply 'top'
  left = left !== '*' ? (left ? cssSize(left, spacer) : right) : ''; // if not supplied, apply 'right'

  // prettier-ignore
  return css`
    ${top && `${rule}-top: ${top};`} 
    ${right && `${rule}-right: ${right};`}
    ${bottom && `${rule}-bottom: ${bottom};`} 
    ${left && `${rule}-left: ${left};`};
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
      : offset && !gutter ? `${offset * COL_PCT}%` : gutter ? `${gutter / 2}px` : '0';

  return `margin-left: ${marginLeft}; margin-right: ${marginRight}; width: ${width};`;
}

/* ----- ENHANCERS ----- */

const basePropTypes = {
  children: PropTypes.node,
  innerRef: PropTypes.func,
  theme: PropTypes.object
};
export { basePropTypes };

const displayPropTypes = {
  hide: PropTypes.bool,
  smHide: PropTypes.bool,
  mdHide: PropTypes.bool,
  lgHide: PropTypes.bool,

  show: PropTypes.bool,
  smShow: PropTypes.bool,
  mdShow: PropTypes.bool,
  lgShow: PropTypes.bool,

  showInline: PropTypes.bool,
  smShowInline: PropTypes.bool,
  mdShowInline: PropTypes.bool,
  lgShowInline: PropTypes.bool,

  showInlineBlock: PropTypes.bool,
  smShowInlineBlock: PropTypes.bool,
  mdShowInlineBlock: PropTypes.bool,
  lgShowInlineBlock: PropTypes.bool
};
export { displayPropTypes };

const containerPropTypes = {
  container: PropTypes.bool
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
  underline: PropTypes.bool,
  light: PropTypes.bool,
  normal: PropTypes.bool,
  bold: PropTypes.bool,
  small: PropTypes.bool,
  base: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xLarge: PropTypes.bool,
  xxLarge: PropTypes.bool
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
    ${props.underline && 'text-decoration: underline;'}
    ${fontSize && `font-size: ${fontSize};`} 
    ${fontStyle && `font-style: ${fontStyle};`} 
    ${fontWeight && `font-weight: ${fontWeight};`}
  `
}

const justifyPropTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool
};
export { justifyPropTypes };

export function withJustify(props) {
  const justify = ['center', 'right', 'left'].find(dir => dir in props);
  return css`
    ${justify && `text-align: ${justify};`};
  `;
}

const gutterPropTypes = {
  gutter: PropTypes.number, // use when no media
  smGutter: PropTypes.number,
  mdGutter: PropTypes.number,
  lgGutter: PropTypes.number
};
export { gutterPropTypes };
export function withRowGutters({ gutter, smGutter, mdGutter, lgGutter, theme }) {
  // prettier-ignore
  return css`
    ${gutter && toRowGuttersCss(gutter)}
    ${smGutter && `${theme.MEDIA_SM_MIN} { ${toRowGuttersCss(smGutter)} }`}
    ${mdGutter && `${theme.MEDIA_MD_MIN} { ${toRowGuttersCss(mdGutter)} }`}
    ${lgGutter && `${theme.MEDIA_LG_MIN} { ${toRowGuttersCss(lgGutter)} }`}
  `;
}

const columnPropTypes = {
  col: PropTypes.number, // use when no media
  smCol: PropTypes.number,
  mdCol: PropTypes.number,
  lgCol: PropTypes.number,

  offset: PropTypes.number, // use when no media
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,

  ...gutterPropTypes
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
  theme
}) {
  // prettier-ignore
  return css`
    ${col && toColumnCss(col, offset, gutter)}
    ${smCol && `${theme.MEDIA_SM_MIN} { ${toColumnCss(smCol, smOffset, smGutter || gutter)} }`}
    ${mdCol && `${theme.MEDIA_MD_MIN} { ${toColumnCss(mdCol, mdOffset, mdGutter || gutter)} }`}
    ${lgCol && `${theme.MEDIA_LG_MIN} { ${toColumnCss(lgCol, lgOffset, lgGutter || gutter)} }`}
  `;
}

const mediaStylesPropTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), // use when no media
  smStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  mdStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  lgStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
export { mediaStylesPropTypes };
export function withMediaStyles({ styles, smStyles, mdStyles, lgStyles, theme }) {
  // prettier-ignore
  return css`
    ${styles && styles};
    ${smStyles && `${theme.MEDIA_SM_MIN} { ${smStyles} }`}
    ${mdStyles && `${theme.MEDIA_MD_MIN} { ${mdStyles} }`}
    ${lgStyles && `${theme.MEDIA_LG_MIN} { ${lgStyles} }`}
  `;
}

const spacingPropTypes = {
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
