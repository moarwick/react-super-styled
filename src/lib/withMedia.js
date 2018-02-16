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

function getWindowWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/**
 * withMedia
 * HOC to supply a 'media' prop to its enhanced component, based on current browser width
 * Value will be one of: 'xs' (default), 'sm', 'md', 'lg', 'xl'
 */
const withMedia = (userTheme = {}) => EnhancedComponent => {
  const { MEDIA_XS, MEDIA_SM, MEDIA_MD, MEDIA_LG } = { ...THEME, ...userTheme };

  const mediaRanges = {
    xs: [0, MEDIA_XS],
    sm: [MEDIA_XS + 1, MEDIA_SM],
    md: [MEDIA_SM + 1, MEDIA_MD],
    lg: [MEDIA_MD + 1, MEDIA_LG],
    xl: [MEDIA_LG + 1, Infinity],
  };

  return class extends React.Component {
    state = {
      media: '',
    };

    async componentDidMount() {
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
      const media = getCurrentMedia(mediaRanges, getWindowWidth());
      this.setState({ media });
    };

    render() {
      if (window && !this.state.media) return null;
      return <EnhancedComponent media={this.state.media || 'xs'} {...this.props} />;
    }
  };
};

export default withMedia;
