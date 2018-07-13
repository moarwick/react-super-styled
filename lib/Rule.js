'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

/**
 * A "smarter" <hr/>
 * Renders <div>
 */
var propTypes = _extends({}, _utils.basePropTypes, {
  borderStyle: _propTypes2.default.string,
  color: _propTypes2.default.string,
  colorTo: _propTypes2.default.string,
  margin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
}, _utils.mediaStylesPropTypes);

var defaultProps = {
  borderStyle: 'solid',
  color: '#000',
  height: 0.1
};

var getCss = function getCss(props) {
  var borderStyle = props.borderStyle,
      color = props.color,
      height = props.height,
      margin = props.margin;


  var borderCss = borderStyle !== 'solid' ? (0, _utils.toCssUnits)(height) + ' ' + borderStyle + ' ' + color : '';

  if (borderCss) {
    // prettier-ignore
    return (0, _styledComponents.css)(['border-top:', ';', '  ', ';'], borderCss, margin && (0, _utils.cssSpacing)('margin', props), (0, _utils.withMediaStyles)(props));
  }

  var colorTo = props.colorTo || color;
  var background = 'linear-gradient(to right, ' + color + ', ' + colorTo + ')';

  // prettier-ignore
  return (0, _styledComponents.css)(['background:', ';height:', ';', ' ', ';'], background, (0, _utils.toCssUnits)(height), margin && (0, _utils.cssSpacing)('margin', margin), (0, _utils.withMediaStyles)(props));
};

var Rule = _styledComponents2.default.div.withConfig({
  displayName: 'Rule'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});
Rule.propTypes = propTypes;
Rule.defaultProps = defaultProps;
var _default = Rule;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(propTypes, 'propTypes', 'src/lib/Rule.js');
  reactHotLoader.register(defaultProps, 'defaultProps', 'src/lib/Rule.js');
  reactHotLoader.register(getCss, 'getCss', 'src/lib/Rule.js');
  reactHotLoader.register(Rule, 'Rule', 'src/lib/Rule.js');
  reactHotLoader.register(_default, 'default', 'src/lib/Rule.js');
  leaveModule(module);
})();

;