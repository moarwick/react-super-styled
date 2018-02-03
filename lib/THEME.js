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
  FONT_XSMALL: 11,
  FONT_SMALL: 14,
  FONT_BASE: 16, // default <p> size (px), use strings for other units, e.g. '1.4rem'
  FONT_MEDIUM: 18,
  FONT_LARGE: 24,
  FONT_XLARGE: 32,

  FONT_LIGHT: 300,
  FONT_NORMAL: 400,
  FONT_BOLD: 600,
  FONT_H_LIGHT: 300, // Heading
  FONT_H_NORMAL: 400, // Heading
  FONT_H_BOLD: 600, // Heading

  CONTAINER_SMALL: 740,
  CONTAINER_MEDIUM: 960,
  CONTAINER_LARGE: 980,

  MEDIA_XS: MEDIA_XS,
  MEDIA_SM: MEDIA_SM,
  MEDIA_MD: MEDIA_MD,
  MEDIA_LG: MEDIA_LG,

  // valid at and above given width
  MEDIA_XS_MIN: "@media (min-width: " + MEDIA_XS + "px)",
  MEDIA_SM_MIN: "@media (min-width: " + MEDIA_SM + "px)",
  MEDIA_MD_MIN: "@media (min-width: " + MEDIA_MD + "px)",
  MEDIA_LG_MIN: "@media (min-width: " + MEDIA_LG + "px)",

  // valid up to (below) given width
  MEDIA_XS_MAX: "@media (max-width: " + (MEDIA_XS - 1) + "px)",
  MEDIA_SM_MAX: "@media (max-width: " + (MEDIA_SM - 1) + "px)",
  MEDIA_MD_MAX: "@media (max-width: " + (MEDIA_MD - 1) + "px)",
  MEDIA_LG_MAX: "@media (max-width: " + (MEDIA_LG - 1) + "px)",

  SPACER: 10 // multiplier for margin, padding, column gutter shorthands
};

var _default = THEME;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MEDIA_XS, "MEDIA_XS", "src/lib/THEME.js");

  __REACT_HOT_LOADER__.register(MEDIA_SM, "MEDIA_SM", "src/lib/THEME.js");

  __REACT_HOT_LOADER__.register(MEDIA_MD, "MEDIA_MD", "src/lib/THEME.js");

  __REACT_HOT_LOADER__.register(MEDIA_LG, "MEDIA_LG", "src/lib/THEME.js");

  __REACT_HOT_LOADER__.register(THEME, "THEME", "src/lib/THEME.js");

  __REACT_HOT_LOADER__.register(_default, "default", "src/lib/THEME.js");
}();

;