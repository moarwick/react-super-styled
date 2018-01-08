var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from 'prop-types';
import { css } from 'styled-components';
import THEME from './THEME';

/**
 * Extend the theme prop onto the base THEME, and return all props
 */
export function addTheme(props) {
  props.theme = props.theme ? _extends({}, THEME, props.theme) : THEME;
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
  var isExplicit = /^[0-9.]+(px|em|rem|%)$/.test(val) || val === 'auto';
  if (isExplicit) return val;

  // otherwise, assume a SPACER multiplier, e.g. 1, 2.5, etc
  var multi = Number((val.match(/[0-9.]/g) || []).join(''));
  return multi * spacer + 'px';
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
  rule = ['margin', 'padding'].find(function (supportedRule) {
    return supportedRule === rule.trim();
  });

  if (!rule) return '';

  var values = props[rule];
  var top = void 0;
  var right = void 0;
  var bottom = void 0;
  var left = void 0;

  if (typeof values === 'number') {
    top = values + 'px';
    right = values + 'px';
  } else {
    // limit to 4 elems
    var _String$split$slice = String(values).split(' ').slice(0, 4);

    var _String$split$slice2 = _slicedToArray(_String$split$slice, 4);

    top = _String$split$slice2[0];
    right = _String$split$slice2[1];
    bottom = _String$split$slice2[2];
    left = _String$split$slice2[3];
  }

  var spacer = props.theme.SPACER;
  top = top && top !== '-' ? cssSize(top, spacer) : ''; // do not apply rule if '0'
  right = right !== '-' ? right ? cssSize(right, spacer) : top : ''; // if not supplied, apply 'top'
  bottom = bottom !== '-' ? bottom ? cssSize(bottom, spacer) : top : ''; // if not supplied, apply 'top'
  left = left !== '-' ? left ? cssSize(left, spacer) : right : ''; // if not supplied, apply 'right'

  // prettier-ignore
  return css(['', '  ', ' ', '  ', ';'], top && rule + '-top: ' + top + ';', right && rule + '-right: ' + right + ';', bottom && rule + '-bottom: ' + bottom + ';', left && rule + '-left: ' + left + ';');
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
  var colPct = 100 / 12;

  if (typeof val === 'number') {
    return 'margin-left: 0; margin-right: 0; width: ' + val * colPct + '%;';
  }

  var _val$match = val.match(/[^ ]+/g),
      _val$match2 = _slicedToArray(_val$match, 2),
      val1 = _val$match2[0],
      val2 = _val$match2[1]; // split by ' ' for offset


  var _match = (val2 || val1).match(/[^-]+/g),
      _match2 = _slicedToArray(_match, 2),
      columns = _match2[0],
      gutter = _match2[1]; // split by '-' for gutter

  var colWidthPct = Number(columns) * colPct;
  var offsetColPct = val2 ? Number(val1) * colPct : 0;
  var gutterPx = gutter ? Number(gutter) * spacer : 0;

  var width = gutterPx ? 'calc(' + colWidthPct + '% - ' + gutterPx + 'px)' : colWidthPct + '%';
  var marginRight = gutterPx ? gutterPx / 2 + 'px' : '0';
  var marginLeft = offsetColPct && gutterPx ? 'calc(' + offsetColPct + '% + ' + gutterPx / 2 + 'px)' : offsetColPct && !gutterPx ? offsetColPct + '%' : gutterPx ? gutterPx / 2 + 'px' : '0';

  return 'margin-left: ' + marginLeft + '; margin-right: ' + marginRight + '; width: ' + width + ';';
}

/* ----- COMMON PROP TYPES ----- */

var basePropTypes = {
  children: PropTypes.node,
  innerRef: PropTypes.func,
  theme: PropTypes.object
};
export { basePropTypes };

var displayPropTypes = {
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
};
export { displayPropTypes };

/* ----- ENHANCERS ----- */

var containerPropTypes = {
  container: PropTypes.bool
};
export { containerPropTypes };
export function withContainer(props) {
  if (!props.container) return '';
  // prettier-ignore
  return css(['margin-left:auto;margin-right:auto;max-width:', 'px;', '{max-width:', 'px;}'], props.theme.CONTAINER_SMALL, props.theme.MEDIA_LG_MIN, props.theme.CONTAINER);
}

var fontPropTypes = {
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
};
export { fontPropTypes };
export function withFont(props) {
  var isHeader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var fontSize = ['small', 'base', 'medium', 'large', 'xLarge', 'xxLarge'].find(function (size) {
    return size in props;
  }) || '';
  var fontStyle = ['italic', 'roman'].find(function (style) {
    return style in props;
  }) || '';
  var fontWeight = ['light', 'normal', 'bold'].find(function (weight) {
    return weight in props;
  }) || '';

  fontSize = toCssUnits(props.theme['FONT_' + fontSize.toUpperCase()]);
  if (fontStyle === 'roman') fontStyle = 'normal';
  fontWeight = props.theme[(isHeader ? 'FONT_H_' : 'FONT_') + fontWeight.toUpperCase()];

  // prettier-ignore
  return css(['', ' ', '  ', '  ', ''], props.inline && 'display: inline;', fontSize && 'font-size: ' + fontSize + ';', fontStyle && 'font-style: ' + fontStyle + ';', fontWeight && 'font-weight: ' + fontWeight + ';');
}

var justifyPropTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool
};
export { justifyPropTypes };

export function withJustify(props) {
  var justify = ['center', 'right', 'left'].find(function (dir) {
    return dir in props;
  });
  return css(['', ';'], justify && 'text-align: ' + justify + ';');
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
var columnPropTypes = {
  col: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // use when no media
  xsCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  smCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mdCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lgCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export { columnPropTypes };
export function withColumns(_ref) {
  var col = _ref.col,
      xsCol = _ref.xsCol,
      smCol = _ref.smCol,
      mdCol = _ref.mdCol,
      lgCol = _ref.lgCol,
      theme = _ref.theme;

  // prettier-ignore
  return css(['', ' ', ' ', ' ', ' ', ''], col && toColumnCss(col, theme.SPACER), xsCol && toColumnCss(xsCol, theme.SPACER), smCol && theme.MEDIA_SM_MIN + ' { ' + toColumnCss(smCol, theme.SPACER) + ' }', mdCol && theme.MEDIA_MD_MIN + ' { ' + toColumnCss(mdCol, theme.SPACER) + ' }', lgCol && theme.MEDIA_LG_MIN + ' { ' + toColumnCss(lgCol, theme.SPACER) + ' }');
}

/**
 * Add passed-in CSS, with media-based breakpoint support
 */
var mediaStylesPropTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), // use when no media
  xsStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  smStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  mdStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  lgStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
export { mediaStylesPropTypes };
export function withMediaStyles(_ref2) {
  var styles = _ref2.styles,
      xsStyles = _ref2.xsStyles,
      smStyles = _ref2.smStyles,
      mdStyles = _ref2.mdStyles,
      lgStyles = _ref2.lgStyles,
      theme = _ref2.theme;

  // prettier-ignore
  return css(['', ';', ';', ' ', ' ', ''], styles && styles, xsStyles && xsStyles, smStyles && theme.MEDIA_SM_MIN + ' { ' + smStyles + ' }', mdStyles && theme.MEDIA_MD_MIN + ' { ' + mdStyles + ' }', lgStyles && theme.MEDIA_LG_MIN + ' { ' + lgStyles + ' }');
}

/**
 * Margin and padding "shorthand" enhancers
 */
var spacingPropTypes = {
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export { spacingPropTypes };
export function withSpacing(props) {
  // we no-op only if 'undefined', to allow for number 0 to clear margins/padding
  // prettier-ignore
  return css(['', '  ', ''], props.margin !== undefined && cssSpacing('margin', props), props.padding !== undefined && cssSpacing('padding', props));
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(addTheme, 'addTheme', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(toCssUnits, 'toCssUnits', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(cssSize, 'cssSize', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(cssSpacing, 'cssSpacing', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(toColumnCss, 'toColumnCss', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(basePropTypes, 'basePropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(displayPropTypes, 'displayPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(containerPropTypes, 'containerPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withContainer, 'withContainer', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(fontPropTypes, 'fontPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withFont, 'withFont', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(justifyPropTypes, 'justifyPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withJustify, 'withJustify', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(columnPropTypes, 'columnPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withColumns, 'withColumns', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(mediaStylesPropTypes, 'mediaStylesPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withMediaStyles, 'withMediaStyles', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(spacingPropTypes, 'spacingPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withSpacing, 'withSpacing', 'src/lib/utils.js');
}();

;