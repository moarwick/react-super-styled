import * as React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import {
  addTheme,
  basePropTypes,
  resolveUnits,
  toCssUnits,
  toNum,
  mediaStylesPropTypes,
  withMediaStyles,
} from './utils';

// ----- CONSTANTS -----

export const DEFAULT_VIEWBOX_SIZE = 24;
export const DEFAULT_VIEWBOX = `0 0 ${DEFAULT_VIEWBOX_SIZE} ${DEFAULT_VIEWBOX_SIZE}`;
export const DEFAULT_ICON_SIZE = 1.4;
const XMLNS = 'http://www.w3.org/2000/svg';

// ----- HELPER UTILS -----

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

// ----- SUB-COMPONENTS -----

const getWrapperCss = props => css`
  display: inline-block;
  position: relative;
  font-size: 0;
  height: ${props.outerHeight};
  width: ${props.outerWidth};
  ${withMediaStyles(props)};
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

// ----- MAIN COMPONENT -----

/**
 * SvgIcon
 *
 * An highly-configurable SVG content wrapper
 * Adapted from https://gist.github.com/moarwick/1229e9bd73ad52be73d54975cdac0d1e
 */
const propTypes = {
  // basic svg
  ...basePropTypes,
  color: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  viewBox: PropTypes.string,

  // complex, span-wrapped svg
  border: PropTypes.string,
  bgColor: PropTypes.string,
  inset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

const SvgIcon = props => {
  props = addTheme(props);
  let { inset, offsetX, offsetY, radius } = props;
  const { border, bgColor, children, color, onClick, stroke, viewBox, innerRef, styles } = props;

  const units = resolveUnits(`${props.width} ${props.height} ${inset} ${offsetX} ${offsetY}`);
  const [width, height] = parseDimensions(toNum(props.width), toNum(props.height), viewBox);
  const widthPx = units === 'px' ? width : width * 10; // assume 1rem === 10px
  const heightPx = units === 'px' ? height : height * 10; // assume 1rem === 10px

  const isAdvanced = border || bgColor || radius || inset || offsetX || offsetY || onClick;

  // if "advanced" functionality not required, render a "basic" svg-only version
  if (!isAdvanced) {
    return (
      <BasicSvg
        innerRef={innerRef}
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

  // otherwise, render the full wrapper...
  inset = toNum(inset);
  offsetX = toNum(offsetX);
  offsetY = toNum(offsetY);

  const widthUnits = `${width}${units}`;
  const heightUnits = `${height}${units}`;
  const innerHeight = Math.max(0, height - inset * 2);
  const innerWidth = Math.max(0, width - inset * 2);
  const innerHeightPx = units === 'px' ? innerHeight : innerHeight * 10;
  const innerWidthPx = units === 'px' ? innerWidth : innerWidth * 10;

  if (radius) {
    const radiusUnits = resolveUnits(String(radius || ''));
    radius = `${toNum(radius)}${radiusUnits}`;
  }

  const isBackground = !!(bgColor || border || inset);

  return (
    <Wrapper innerRef={innerRef} outerHeight={heightUnits} outerWidth={widthUnits} styles={styles}>
      <svg viewBox={viewBox} height={heightPx} width={widthPx} xmlns={XMLNS}>
        {/* sizing placeholder */}
      </svg>
      {isBackground && (
        <Background
          bgColor={bgColor}
          border={border}
          sizeY={heightUnits}
          sizeX={widthUnits}
          left={`${offsetX}${units}`}
          top={`${offsetY}${units}`}
          onClick={onClick}
          radius={radius}
        />
      )}
      <Svg
        height={innerHeightPx}
        width={innerWidthPx}
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
