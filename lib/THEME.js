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
var MEDIA_SM = 576; // SM range: 576 - 767
var MEDIA_MD = 768; // MD range: 768 - 991
var MEDIA_LG = 992; // LG range: 992 - 1199
var MEDIA_XL = 1200; // XL range: 1200 - Infinity

// XL range: 1200+

/**
 * Theming Variables
 */
var THEME = {
  CONTAINER_SMALL: 740,
  CONTAINER_MEDIUM: 960,
  CONTAINER_LARGE: 980,

  MEDIA_SM: MEDIA_SM,
  MEDIA_MD: MEDIA_MD,
  MEDIA_LG: MEDIA_LG,
  MEDIA_XL: MEDIA_XL,

  // applies at and above given breakpoint
  MEDIA_SM_UP: "@media only screen and (min-width: " + MEDIA_SM + "px)",
  MEDIA_MD_UP: "@media only screen and (min-width: " + MEDIA_MD + "px)",
  MEDIA_LG_UP: "@media only screen and (min-width: " + MEDIA_LG + "px)",
  MEDIA_XL_UP: "@media only screen and (min-width: " + MEDIA_XL + "px)",

  // applies below given breakpoint
  MEDIA_XS_DOWN: "@media only screen and (max-width: " + (MEDIA_SM - 1) + "px)",
  MEDIA_SM_DOWN: "@media only screen and (max-width: " + (MEDIA_MD - 1) + "px)",
  MEDIA_MD_DOWN: "@media only screen and (max-width: " + (MEDIA_LG - 1) + "px)",
  MEDIA_LG_DOWN: "@media only screen and (max-width: " + (MEDIA_XL - 1) + "px)"
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

  reactHotLoader.register(MEDIA_SM, "MEDIA_SM", "src/lib/THEME.js");
  reactHotLoader.register(MEDIA_MD, "MEDIA_MD", "src/lib/THEME.js");
  reactHotLoader.register(MEDIA_LG, "MEDIA_LG", "src/lib/THEME.js");
  reactHotLoader.register(MEDIA_XL, "MEDIA_XL", "src/lib/THEME.js");
  reactHotLoader.register(THEME, "THEME", "src/lib/THEME.js");
  reactHotLoader.register(_default, "default", "src/lib/THEME.js");
  leaveModule(module);
})();

;