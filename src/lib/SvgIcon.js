// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import PropTypes from 'prop-types';
import Rule from 'lib/Rule';
import {
  addTheme,
  basePropTypes,
  cssSpacing,
  resolveUnits,
  toCssUnits,
  toNum,
  mediaStylesPropTypes,
  withMediaStyles,
} from './utils';

export const DEFAULT_VIEWBOX_SIZE = 24;
export const DEFAULT_VIEWBOX = `0 0 ${DEFAULT_VIEWBOX_SIZE} ${DEFAULT_VIEWBOX_SIZE}`;
export const DEFAULT_ICON_SIZE = 1.4;

/**
 * Calculate width-to-height aspect ratio from viewBox (default 1)
 */
export function parseViewBoxRatio(viewBox) {
  const coords = (viewBox || DEFAULT_VIEWBOX).split(' ').map(val => toNum(val));
  if (coords.length !== 4) return 1;
  const [x1, y1, x2, y2] = coords;
  return (x2 - x1) / (y2 - y1);
}

/**
 * Derive height & width of SVG per its viewBox ratio (default DEFAULT_ICON_SIZE)
 */
export function parseDimensions(width, height, viewBox) {
  const ratio = parseViewBoxRatio(viewBox);

  if (!width && !height) height = DEFAULT_ICON_SIZE;
  if (height && !width) width = toNum(height * ratio);
  if (width && !height) height = toNum(width / ratio);

  return [width, height];
}

/**
 * A highly flexible SVG icon wrapper
 * Adapted from https://gist.github.com/moarwick/1229e9bd73ad52be73d54975cdac0d1e
 */
const propTypes = {
  ...basePropTypes,
  //   block?: boolean,
  //   border?: string,
  //   color?: string,
  //   bgColor?: string,
  //   inset?: number | string,
  //   height?: number | string,
  //   width?: number | string,
  //   offsetX?: number | string,
  //   offsetY?: number | string,
  //   onClick?: Function,
  //   radius?: number | string,
  //   stroke?: number | string,
  //   styles?: Object | string,
  //   svg?: boolean,
  //   testId?: string,
  //   testSlug?: string,
  //   viewBox?: string,
  ...mediaStylesPropTypes,
};

const defaultProps = {
  inset: 0,
  height: DEFAULT_ICON_SIZE,
  width: DEFAULT_ICON_SIZE,
  viewBox: DEFAULT_VIEWBOX,
  theme: {},
};

const Svg = styled.svg`
  ${props => withMediaStyles(props)};
`;

const SvgIcon = props => {
  const {
    block,
    border,
    bgColor,
    // color,
    inset,
    // height,
    // width,
    offsetX,
    offsetY,
    onClick,
    radius,
    stroke,
    svg,
    viewBox,

    children,
    innerRef,
    theme,
    styles,
  } = props;

  props = addTheme(props);
  const units = resolveUnits(`${props.width} ${props.height || ''} ${inset || ''}`);
  let width = toNum(props.width);
  let height = toNum(props.height);
  [width, height] = parseDimensions(width, height, viewBox);
  const heightSvg = units === 'px' ? height : height * 10; // assume 10x for 'rem'
  const widthSvg = units === 'px' ? width : width * 10; // assume 10x for 'rem'
  const color = props.color || props.theme.COLOR_BLACK || '#000';

  return (
    <Svg {...props} height={heightSvg} width={widthSvg} xmlns="http://www.w3.org/2000/svg">
      <g fill={color} stroke={color} strokeWidth={toCssUnits(stroke)}>
        {children}
      </g>
    </Svg>
  );
};

SvgIcon.displayName = 'SvgIcon';
SvgIcon.propTypes = propTypes;
SvgIcon.defaultProps = defaultProps;
export default SvgIcon;
