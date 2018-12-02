'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n  '], ['\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n  ', ';\n'], ['\n  ', ';\n']);

exports.getCss = getCss;

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function toDisplayCss(hide, show) {
  if (hide) return 'display: none;';
  if (typeof show === 'boolean' || !show) show = 'inline';
  return 'display: ' + show + ';';
}

/**
 * Wrapper to show/hide contents based on media breakpoints
 * Renders <span> tag
 */
var propTypes = _extends({}, _utils.basePropTypes, _utils.displayPropTypes);

function getCss(_ref) {
  var hide = _ref.hide,
      show = _ref.show,
      theme = _ref.theme;

  var _toMediaObj = (0, _utils.toMediaObj)(hide || false),
      xsHide = _toMediaObj.xs,
      smHide = _toMediaObj.sm,
      mdHide = _toMediaObj.md,
      lgHide = _toMediaObj.lg,
      xlHide = _toMediaObj.xl;

  var _toMediaObj2 = (0, _utils.toMediaObj)(show || false),
      xsShow = _toMediaObj2.xs,
      smShow = _toMediaObj2.sm,
      mdShow = _toMediaObj2.md,
      lgShow = _toMediaObj2.lg,
      xlShow = _toMediaObj2.xl;

  var breakpoints = [[smHide, smShow], [mdHide, mdShow], [lgHide, lgShow], [xlHide, xlShow]];

  var isHideFirst = Boolean(xsHide);
  if (!isHideFirst) {
    breakpoints.some(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          bHide = _ref3[0],
          bShow = _ref3[1];

      if (bHide || bShow) {
        isHideFirst = !!bShow;
        return true;
      }
      return false;
    });
  }

  return (0, _styledComponents.css)(_templateObject, xsShow ? toDisplayCss(false, xsShow) : isHideFirst ? 'display: none;' : null, (smHide || smShow) && theme.MEDIA_SM_UP + ' { ' + toDisplayCss(smHide, smShow) + ' }', (mdHide || mdShow) && theme.MEDIA_MD_UP + ' { ' + toDisplayCss(mdHide, mdShow) + ' }', (lgHide || lgShow) && theme.MEDIA_LG_UP + ' { ' + toDisplayCss(lgHide, lgShow) + ' }', (xlHide || xlShow) && theme.MEDIA_XL_UP + ' { ' + toDisplayCss(xlHide, xlShow) + ' }');
}

var Display = _styledComponents2.default.span(_templateObject2, function (props) {
  return getCss((0, _utils.addTheme)(props));
});
Display.propTypes = propTypes;
exports.default = Display;