// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

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
const XMLNS = 'http://www.w3.org/2000/svg';
/**
 * Calculate width-to-height aspect ratio from viewBox (default 1)
 */
export function parseViewBoxRatio(viewBox) {
  const coords = (viewBox || DEFAULT_VIEWBOX).split(' ').map(val => toNum(val));
  if (coords.length !== 4) return 1;
  const [x1, y1, x2, y2] = coords;
  return (x2 - x1) / (y2 - y1) || 1;
}

/**
 * Derive height & width of SVG per its viewBox ratio (default DEFAULT_ICON_SIZE)
 */
export function parseDimensions(width, height, viewBox) {
  const ratio = parseViewBoxRatio(viewBox);

  if (!width && !height) height = DEFAULT_ICON_SIZE;
  if (height && !width) width = toNum(height) * ratio;
  if (width && !height) height = toNum(width) / ratio;

  return [width, height];
}

/**
 * A highly flexible SVG icon wrapper
 * Adapted from https://gist.github.com/moarwick/1229e9bd73ad52be73d54975cdac0d1e
 */
const propTypes = {
  ...basePropTypes,
  //   basic?: boolean,
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
  //   testId?: string,
  //   testSlug?: string,
  //   viewBox?: string,
  ...mediaStylesPropTypes,
};

const defaultProps = {
  color: '#000',
  inset: 0,
  height: 0,
  width: 0,
  viewBox: DEFAULT_VIEWBOX,
  theme: {},
};

const getWrapperCss = props => css`
  display: ${props.block ? 'block' : 'inline-block'};
  position: relative;
  font-size: 0;
  height: ${props.outerHeight};
  width: ${props.outerWidth};
`;

const getBackgroundCss = props => css`
  display: inline-block;
  position: absolute;
  left: ${props.left};
  top: ${props.top};
  background-color: ${props.bgColor || 'transparent'};
  ${props.border ? `border: ${props.border};` : ''}
  ${props.radius ? `border-radius: ${props.radius};` : ''}
  box-sizing: border-box;
  ${props.onClick ? 'cursor: pointer;' : ''}
  height: ${props.sizeX};
  width: ${props.sizeY};
  transition: all 0.25s ease;
  z-index: 1;
`;

const getSvgCss = props => css`
  position: absolute;
  left: ${props.left};
  top: ${props.top};
  cursor: ${props.cursor};
  pointer-events: ${props.pointerEvents};
  transition: all 0.25s ease;
  z-index: 2;
`;

const BasicSvg = styled.svg`
  ${props => withMediaStyles(props)};
`;

const Wrapper = styled.span`
  ${props => getWrapperCss(props)};
`;

const Background = styled.span`
  ${props => getBackgroundCss(props)};
`;

const Svg = styled.svg`
  ${props => getSvgCss(props)};
`;

const SvgIcon = props => {
  const {
    basic,
    block,
    border,
    bgColor,
    color,
    onClick,
    stroke,
    viewBox,
    children,
    innerRef,
    styles,
  } = props;
  props = addTheme(props);
  let { inset, offsetX, offsetY, radius } = props;
  const units = resolveUnits(`${props.width} ${props.height} ${inset} ${offsetX} ${offsetY}`);
  let width = toNum(props.width);
  let height = toNum(props.height);
  [width, height] = parseDimensions(width, height, viewBox);

  const widthPx = units === 'px' ? width : width * 10; // assume 1rem === 10px
  const heightPx = units === 'px' ? height : height * 10; // assume 1rem === 10px

  // render "simple" svg-only version
  // TODO: can be derived, based on props passed in?
  if (basic) {
    return (
      <BasicSvg
        ref={innerRef}
        height={heightPx}
        width={widthPx}
        viewBox={viewBox}
        xmlns={XMLNS}
        styles={styles}
      >
        <g fill={color} stroke={color} strokeWidth={toCssUnits(stroke)}>
          {children}
        </g>
      </BasicSvg>
    );
  }

  // render the full wrapper...
  inset = toNum(inset);
  offsetX = toNum(offsetX);
  offsetY = toNum(offsetY);

  const outerHeight = inset * 2 + height;
  const outerWidth = inset * 2 + width;
  const outerHeightPx = units === 'px' ? outerHeight : outerHeight * 10; // assume 1rem === 10px
  const outerWidthPx = units === 'px' ? outerWidth : outerWidth * 10; // assume 1rem === 10px
  const outerHeightUnits = toCssUnits(outerHeight, units); // TODO just templ?
  const outerWidthUnits = toCssUnits(outerWidth, units); // TODO just templ?
  const isBackground = !!(bgColor || border || inset);

  if (radius) {
    const rUnits = resolveUnits(String(radius || ''));
    radius = `${toNum(radius)}${rUnits}`;
  }

  return (
    <Wrapper
      ref={innerRef}
      block={block}
      outerHeight={outerHeightUnits}
      outerWidth={outerWidthUnits}
    >
      <svg viewBox={viewBox} height={outerHeightPx} width={outerWidthPx} xmlns={XMLNS}>
        {/* sizing placeholder */}
      </svg>
      {isBackground && (
        <Background
          bgColor={bgColor}
          sizeY={outerHeightUnits}
          sizeX={outerWidthUnits}
          left={`${offsetX}${units}`}
          top={`${offsetY}${units}`}
          onClick={onClick}
          radius={radius}
        />
      )}
      <Svg
        height={heightPx}
        width={widthPx}
        viewBox={viewBox}
        xmlns={XMLNS}
        left={`${offsetX + inset}${units}`}
        top={`${offsetY + inset}${units}`}
        cursor={onClick && !isBackground ? 'pointer' : 'default'}
        pointerEvents={onClick && isBackground ? 'none' : 'auto'}
      >
        <g fill={color} stroke={color} strokeWidth={toCssUnits(stroke)}>
          {children}
        </g>
      </Svg>
    </Wrapper>
  );
};

SvgIcon.displayName = 'SvgIcon';
SvgIcon.propTypes = propTypes;
SvgIcon.defaultProps = defaultProps;
export default SvgIcon;
