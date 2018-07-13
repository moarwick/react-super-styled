/**
 * Media Breakpoints
 */
const MEDIA_SM = 576; // SM range: 576 - 767
const MEDIA_MD = 768; // MD range: 768 - 991
const MEDIA_LG = 992; // LG range: 992 - 1199
const MEDIA_XL = 1200; // XL range: 1200 - Infinity

/**
 * Theming Variables
 */
const THEME = {
  CONTAINER_SMALL: 740,
  CONTAINER_MEDIUM: 960,
  CONTAINER_LARGE: 980,

  MEDIA_SM,
  MEDIA_MD,
  MEDIA_LG,
  MEDIA_XL,

  // applies at and above given breakpoint
  MEDIA_SM_UP: `@media only screen and (min-width: ${MEDIA_SM}px)`,
  MEDIA_MD_UP: `@media only screen and (min-width: ${MEDIA_MD}px)`,
  MEDIA_LG_UP: `@media only screen and (min-width: ${MEDIA_LG}px)`,
  MEDIA_XL_UP: `@media only screen and (min-width: ${MEDIA_XL}px)`,

  // applies below given breakpoint
  MEDIA_XS_DOWN: `@media only screen and (max-width: ${MEDIA_SM - 1}px)`,
  MEDIA_SM_DOWN: `@media only screen and (max-width: ${MEDIA_MD - 1}px)`,
  MEDIA_MD_DOWN: `@media only screen and (max-width: ${MEDIA_LG - 1}px)`,
  MEDIA_LG_DOWN: `@media only screen and (max-width: ${MEDIA_XL - 1}px)`,
};

export default THEME;
