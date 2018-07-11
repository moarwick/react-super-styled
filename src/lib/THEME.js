/**
 * Media Breakpoints
 */
const MEDIA_XS = 576; // XS range: 0 - 575
const MEDIA_SM = 768; // SM range: 576 - 767
const MEDIA_MD = 992; // MD range: 768 - 991
const MEDIA_LG = 1200; // LG range: 992 - 1199

const MEDIA_XS_START = 0; // XS range: 0 - 575
const MEDIA_SM_START = 576; // SM range: 576 - 767
const MEDIA_MD_START = 768; // MD range: 768 - 991
const MEDIA_LG_START = 992; // LG range: 992 - 1199
const MEDIA_XL_START = 1200; // XL range: 1200 - Infinity

// XL range: 1200+

/**
 * Theming Variables
 */
const THEME = {
  CONTAINER_SMALL: 740,
  CONTAINER_MEDIUM: 960,
  CONTAINER_LARGE: 980,

  // MEDIA_XS,
  // MEDIA_SM,
  // MEDIA_MD,
  // MEDIA_LG,

  // applies at and above given breakpoint
  MEDIA_SM_UP: `@media only screen and (min-width: ${MEDIA_SM_START}px)`,
  MEDIA_MD_UP: `@media only screen and (min-width: ${MEDIA_MD_START}px)`,
  MEDIA_LG_UP: `@media only screen and (min-width: ${MEDIA_LG_START}px)`,
  MEDIA_XL_UP: `@media only screen and (min-width: ${MEDIA_XL_START}px)`,

  // applies below given breakpoint
  MEDIA_XS_DOWN: `@media only screen and (max-width: ${MEDIA_SM_START - 1}px)`,
  MEDIA_SM_DOWN: `@media only screen and (max-width: ${MEDIA_MD_START - 1}px)`,
  MEDIA_MD_DOWN: `@media only screen and (max-width: ${MEDIA_LG_START - 1}px)`,
  MEDIA_LG_DOWN: `@media only screen and (max-width: ${MEDIA_XL_START - 1}px)`,

  // applies at and above given width breakpoint (deprecate!!!)
  MEDIA_XS_MIN: `@media (min-width: ${MEDIA_XS}px)`,
  MEDIA_SM_MIN: `@media (min-width: ${MEDIA_SM}px)`,
  MEDIA_MD_MIN: `@media (min-width: ${MEDIA_MD}px)`,
  MEDIA_LG_MIN: `@media (min-width: ${MEDIA_LG}px)`,

  // applies up to (below) given width breakpoint
  MEDIA_XS_MAX: `@media (max-width: ${MEDIA_XS - 1}px)`,
  MEDIA_SM_MAX: `@media (max-width: ${MEDIA_SM - 1}px)`,
  MEDIA_MD_MAX: `@media (max-width: ${MEDIA_MD - 1}px)`,
  MEDIA_LG_MAX: `@media (max-width: ${MEDIA_LG - 1}px)`,

  SPACER: 10, // multiplier for margin, padding shorthands (to rem!!!)
};

export default THEME;
