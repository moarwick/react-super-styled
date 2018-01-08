/**
 * Media breakpoints
 */
const MEDIA_LG = 1280;
const MEDIA_MD = 992;
const MEDIA_SM = 768;
const MEDIA_XS = 576;

/**
 * Theming Variables
 */
const THEME = {
  FONT_BASE: 16, // default <p> size (px), use strings for other units, e.g. '1.4rem'
  FONT_SMALL: 14,
  FONT_MEDIUM: 20,
  FONT_LARGE: 28,
  FONT_XLARGE: 40,
  FONT_XXLARGE: 56,

  FONT_LIGHT: 300,
  FONT_NORMAL: 400,
  FONT_BOLD: 600,
  FONT_H_LIGHT: 300, // Heading
  FONT_H_NORMAL: 400, // Heading
  FONT_H_BOLD: 600, // Heading

  CONTAINER: 980,
  CONTAINER_SMALL: 740,

  MEDIA_LG,
  MEDIA_MD,
  MEDIA_SM,
  MEDIA_XS,

  MEDIA_MD_MAX: `@media (max-width: ${MEDIA_MD}px)`,
  MEDIA_SM_MAX: `@media (max-width: ${MEDIA_SM}px)`,
  MEDIA_XS_MAX: `@media (max-width: ${MEDIA_XS}px)`,

  MEDIA_LG_MIN: `@media (min-width: ${MEDIA_MD + 1}px)`,
  MEDIA_MD_MIN: `@media (min-width: ${MEDIA_SM + 1}px)`,
  MEDIA_SM_MIN: `@media (min-width: ${MEDIA_XS + 1}px)`,
  MEDIA_XS_MIN: `@media (min-width: 0px)`,

  SPACER: 10, // multiplier for margin, padding, column gutter shorthands
};

export default THEME;
