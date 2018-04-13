'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = _extends({}, _utils.basePropTypes, _utils.containerPropTypes, _utils.justifyPropTypes, _utils.spacingPropTypes, _utils.mediaStylesPropTypes);

/**
 * Article block wrapper
 * Duplicates Block, renders <article> tag
 */
var Article = _Block2.default.withComponent('article');
Article.propTypes = propTypes;
var _default = Article;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Article.js');

  __REACT_HOT_LOADER__.register(Article, 'Article', 'src/lib/Article.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Article.js');
}();

;