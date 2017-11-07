import PropTypes from 'prop-types'
import { css } from 'styled-components'
import THEME from './THEME'

/**
 * Extend the theme prop onto the base THEME, and return all props
 */
export function addTheme(props) {
  props.theme = props.theme ? { ...THEME, ...props.theme } : THEME
  return props
}

/**
 * Parse column value (number or string) into a width rule
 */
function toColumnWidth(columns, spacer) {
  const colPct = 100 / 12

  if (typeof columns === 'number') {
    return `${columns * colPct}%`
  }

  let [col, gutter] = columns.split('|').map(str => Number(str))
  return gutter ? `calc(${col * colPct}% - ${spacer * gutter / 2}px)` : `${col * colPct}%`
}

/**
 * Return strings as-is, coerce numbers to 'px'
 */
export function toCssUnits(val) {
  return typeof val === 'string' ? val : typeof val === 'number' ? val + 'px' : ''
}

/**
 * Parse an incoming string into a valid CSS size unit, e.g. 10px, 2.5em, 50%
 * If the string does not match known units, assume it is a SPACER multiplier
 *
 * Ex. cssSize('10px') --> '10px'
 * Ex. cssSize('3') --> '30px'
 */
export function cssSize(val, spacer) {
  // check if val matches legit pattern, e.g. 1px, 50%, 2.5em, or 'auto'
  // if true, return val as-is
  const isExplicit = /^[0-9.]+(px|em|rem|%)$/.test(val) || val === 'auto'
  if (isExplicit) return val

  // otherwise, assume a SPACER multiplier, e.g. 1, 2.5, etc
  const multi = Number((val.match(/[0-9.]/g) || []).join(''))
  return `${multi * spacer}px`
}

/**
 * Deliver CSS 'padding' or 'margin' rules, derived from a shorthand string
 * Expect a space delimited string of up to 4 elems, in the CSS shorthand order "top right bottom left"
 * The values can be in known CSS units (10px), or numbers only (5) as SPACER multipliers (px)
 * If a dash is supplied for any direction, no rule is applied for it
 *
 * Ex. spacingCss('padding', '1 5px 10% -') -->
 *  'padding-top: 10px;
 *   padding-right: 5px;
 *   padding-bottom: 10%;
 */
export function cssSpacing(rule, props) {
  rule = ['margin', 'padding'].find(supportedRule => supportedRule === rule.trim())

  if (!rule) return ''

  const values = props[rule]
  let top
  let right
  let bottom
  let left

  if (typeof values === 'number') {
    top = right = `${values}px`
  } else {
    ;[top, right, bottom, left] = String(values)
      .split(' ')
      .slice(0, 4) // limit to 4 elems
  }

  const spacer = props.theme.SPACER
  top = top && top !== '-' ? cssSize(top, spacer) : '' // do not apply rule if '0'
  right = right !== '-' ? (right ? cssSize(right, spacer) : top) : '' // if not supplied, apply 'top'
  bottom = bottom !== '-' ? (bottom ? cssSize(bottom, spacer) : top) : '' // if not supplied, apply 'top'
  left = left !== '-' ? (left ? cssSize(left, spacer) : right) : '' // if not supplied, apply 'right'

  return css`
    ${top && `${rule}-top: ${top};`} ${right && `${rule}-right: ${right};`} ${bottom &&
        `${rule}-bottom: ${bottom};`} ${left && `${rule}-left: ${left};`};
  `
}

/* ----- PROP TYPES & CSS METHODS ----- */

const basePropTypes = {
  children: PropTypes.node,
  innerRef: PropTypes.func,
  theme: PropTypes.object
}
export { basePropTypes }

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
  xsShowInlineBlock: PropTypes.bool
}
export { displayPropTypes }

/**
 * Font-related CSS rules
 */
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
  xxLarge: PropTypes.bool
}
export { fontPropTypes }

export function withFont(props, isHeader = false) {
  let fontSize =
    ['small', 'base', 'medium', 'large', 'xLarge', 'xxLarge'].find(size => size in props) || ''
  let fontStyle = ['italic', 'roman'].find(style => style in props) || ''
  let fontWeight = ['light', 'normal', 'bold'].find(weight => weight in props) || ''

  fontSize = toCssUnits(props.theme['FONT_' + fontSize.toUpperCase()])
  if (fontStyle === 'roman') fontStyle = 'normal'
  fontWeight = props.theme[(isHeader ? 'FONT_H_' : 'FONT_') + fontWeight.toUpperCase()]

  // prettier-ignore
  return css`
    ${props.inline && `display: inline;`}
    ${fontSize && `font-size: ${fontSize};`} 
    ${fontStyle && `font-style: ${fontStyle};`} 
    ${fontWeight && `font-weight: ${fontWeight};`}
  `
}

/**
 * Text align rules
 */
const justifyPropTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool
}
export { justifyPropTypes }

export function withJustify(props) {
  const justify = ['center', 'right', 'left'].find(dir => dir in props)
  return css`
    ${justify && `text-align: ${justify};`};
  `
}

/**
 * Helper to interpret media-based column props into CSS width rules
 * Calculated assuming a 12 column grid
 * Supports format: "column|gutter" (gutter is a SPACER multiplier)
 *
 * Ex. col={ 12 }   -> width: 100%
 *     xsCol="6|1"  -> width: calc(50% - 10px)
 */
const columnPropTypes = {
  col: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mdCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  smCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  xsCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
export { columnPropTypes }
export function withColumns({ xsCol, smCol, mdCol, col, theme }) {
  let styles = ''

  if (xsCol) {
    styles += `${theme.MEDIA_XS_MIN} { width: ${toColumnWidth(xsCol, theme.SPACER)}; }`
  }
  if (smCol) {
    styles += `${theme.MEDIA_SM_MIN} { width: ${toColumnWidth(smCol, theme.SPACER)}; }`
  }
  if (mdCol) {
    styles += `${theme.MEDIA_MD_MIN} { width: ${toColumnWidth(mdCol, theme.SPACER)}; }`
  }
  if (col) {
    styles += `${theme.MEDIA_LG_MIN} { width: ${toColumnWidth(col, theme.SPACER)}; }`
  }

  return css`
    ${styles};
  `
}

/**
 * Passed-in CSS, with media-based breakpoint support
 */
const mediaStylesPropTypes = {
  mdStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  smStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  xsStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
}
export { mediaStylesPropTypes }
export function withMediaStyles({ styles, mdStyles, smStyles, xsStyles, theme }) {
  // prettier-ignore
  return css`
    ${xsStyles && `${theme.MEDIA_XS_MIN} { ${xsStyles} }`}
    ${smStyles && `${theme.MEDIA_SM_MIN} { ${smStyles} }`}
    ${mdStyles && `${theme.MEDIA_MD_MIN} { ${mdStyles} }`}
    ${styles && styles}
  `
}

/**
 * Deliver css for margin and padding
 */
const spacingPropTypes = {
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
export { spacingPropTypes }
export function withSpacing(props) {
  // prettier-ignore
  // we noop only if 'undefined', to allow for number 0 to clear margins/padding
  return css`
    ${props.margin !== undefined && cssSpacing('margin', props)} 
    ${props.padding !== undefined && cssSpacing('padding', props)};
  `
}
