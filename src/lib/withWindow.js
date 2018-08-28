import React from 'react';
import { throttleEvent } from './utils';
import THEME from './THEME';

function getCurrentMedia(ranges, width = 0) {
  let media = 'xs';
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
 * withWindow
 * HOC to supply current 'window' sizing and 'media' breakpoint to the enhanced component
 * Value of 'media' will be one of: 'xs' (default), 'sm', 'md', 'lg', 'xl'
 */
const withWindow = (EnhancedComponent, userTheme = {}) => {
  const { MEDIA_SM, MEDIA_MD, MEDIA_LG, MEDIA_XL } = { ...THEME, ...userTheme };

  const mediaRanges = {
    xs: [0, MEDIA_SM - 1],
    sm: [MEDIA_SM, MEDIA_MD - 1],
    md: [MEDIA_MD, MEDIA_LG - 1],
    lg: [MEDIA_LG, MEDIA_XL - 1],
    xl: [MEDIA_XL, Infinity],
  };

  return class extends React.Component {
    state = {
      media: '',
      window: { width: 0, height: 0 },
    };

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
      const window = getWindowSize();
      const media = getCurrentMedia(mediaRanges, window.width);
      this.setState({ media, window });
    };

    render() {
      if (window && !this.state.media) return null;
      return (
        <EnhancedComponent
          media={this.state.media || 'xs'}
          window={this.state.window}
          {...this.props}
        />
      );
    }
  };
};

export default withWindow;
