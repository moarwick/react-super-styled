"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

/**
 * Media Breakpoints
 */
var MEDIA_XS = 576; // XS range: 0 - 575
var MEDIA_SM = 768; // SM range: 576 - 767
var MEDIA_MD = 992; // MD range: 768 - 991
var MEDIA_LG = 1200; // LG range: 992 - 1199
// XL range: 1200+

/**
 * Theming Variables
 */
var THEME = {
  CONTAINER_SMALL: 740,
  CONTAINER_MEDIUM: 960,
  CONTAINER_LARGE: 980,

  MEDIA_XS: MEDIA_XS,
  MEDIA_SM: MEDIA_SM,
  MEDIA_MD: MEDIA_MD,
  MEDIA_LG: MEDIA_LG,

  // applies at and above given width breakpoint
  MEDIA_XS_MIN: "@media (min-width: " + MEDIA_XS + "px)",
  MEDIA_SM_MIN: "@media (min-width: " + MEDIA_SM + "px)",
  MEDIA_MD_MIN: "@media (min-width: " + MEDIA_MD + "px)",
  MEDIA_LG_MIN: "@media (min-width: " + MEDIA_LG + "px)",

  // applies up to (below) given width breakpoint
  MEDIA_XS_MAX: "@media (max-width: " + (MEDIA_XS - 1) + "px)",
  MEDIA_SM_MAX: "@media (max-width: " + (MEDIA_SM - 1) + "px)",
  MEDIA_MD_MAX: "@media (max-width: " + (MEDIA_MD - 1) + "px)",
  MEDIA_LG_MAX: "@media (max-width: " + (MEDIA_LG - 1) + "px)",

  SPACER: 10 // multiplier for margin, padding shorthands
};

var _default = THEME;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MEDIA_XS, "MEDIA_XS", "src/lib/THEME.js");
  reactHotLoader.register(MEDIA_SM, "MEDIA_SM", "src/lib/THEME.js");
  reactHotLoader.register(MEDIA_MD, "MEDIA_MD", "src/lib/THEME.js");
  reactHotLoader.register(MEDIA_LG, "MEDIA_LG", "src/lib/THEME.js");
  reactHotLoader.register(THEME, "THEME", "src/lib/THEME.js");
  reactHotLoader.register(_default, "default", "src/lib/THEME.js");
  leaveModule(module);
})();

;