import React from 'react';
import PropTypes from 'prop-types';
import { throttleEvent } from './utils';
import THEME from './THEME';

const MEDIA_DEFAULT = 'xs';

function getCurrentMedia(ranges, width = 0) {
  let media = MEDIA_DEFAULT;
  Object.keys(ranges).some(key => {
    const [min, max] = ranges[key];
    if (width >= min && width <= max) {
      media = key;
      return true;
    }
    return false;
  });
  return media;
}

function getWindowSize() {
  const width =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width, height };
}

/**
 * WindowSize
 *
 * Wrapper component to supply current 'window' sizing and 'media' breakpoint to the wrapped component
 * Value of 'media' will be one of: 'xs' (default), 'sm', 'md', 'lg', 'xl'
 * Supports "children as a function"
 */
const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  theme: PropTypes.object, // optional theme media overrides
};

export default class WindowSize extends React.Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.state = {
      media: MEDIA_DEFAULT,
      height: 0,
      width: 0,
    };

    const { MEDIA_SM, MEDIA_MD, MEDIA_LG, MEDIA_XL } = { ...THEME, ...(props.theme || {}) };

    this.mediaRanges = {
      xs: [0, MEDIA_SM - 1],
      sm: [MEDIA_SM, MEDIA_MD - 1],
      md: [MEDIA_MD, MEDIA_LG - 1],
      lg: [MEDIA_LG, MEDIA_XL - 1],
      xl: [MEDIA_XL, Infinity],
    };
  }

  componentDidMount() {
    if (window) {
      throttleEvent('resize', 'throttledWindowResize', window);
      window.addEventListener('throttledWindowResize', this.handleResize);
      this.handleResize();
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('throttledWindowResize', this.handleResize);
    }
  }

  handleResize = () => {
    const { width, height } = getWindowSize();
    const media = getCurrentMedia(this.mediaRanges, width);
    this.setState({ width, height, media });
  };

  render() {
    const { children } = this.props;
    const { width, height, media } = this.state;

    const windowProps = {
      media,
      windowSize: { width, height },
    };

    if (typeof children === 'function') {
      return children(windowProps);
    }

    return React.Children.map(children, child => React.cloneElement(child, windowProps));
  }
}
