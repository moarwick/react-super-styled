import * as React from 'react';
import PropTypes from 'prop-types';

const TRANSITION = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
  EXITED: 'exiting',
};

/**
 * Transition (Beta)
 *
 * Wrapper component to handle transition states (alternative to react-transition-group)
 *
 * Listens on its 'trigger' prop changing (bool), passes down a 'transition' prop to any child(ren)
 *  - Whenever 'trigger' changes false -> true, 'transition' value is set to 'entering', followed by 'entered'
 *  - Whenever 'trigger' changes true -> false, 'transition' value is set to 'exiting', followed by 'exited'
 *
 *    The second value arrives after specified 'delay' (default ~1/60 sec)
 *
 * Plus:
 *  - Supports delayed unmounting of child(ren) via 'unmountAfterExit' prop
 *  - Supports "children as a function" (receives 'transition' arg)
 */
const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  delay: PropTypes.number,
  trigger: PropTypes.bool.isRequired,
  mountOnInit: PropTypes.bool, // render 'children' initially even if 'trigger' is false
  unmountAfterExit: PropTypes.number, // delay before removing 'children' after exit (should match your css transition duration)
};

export default class Transition extends React.Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.state = {
      isRender: props.mountOnInit || props.trigger !== false,
      transition: props.trigger === true ? TRANSITION.ENTERING : '',
    };

    this.durationTm = null;
    this.removalTm = null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { ENTERING, ENTERED, EXITING, EXITED } = TRANSITION;

    // if 'trigger' prop is changing to true, start an 'on' transition
    if (this.props.trigger === true && !prevProps.trigger && this.state.transition !== ENTERING) {
      this.setState({ isRender: true, transition: ENTERING });
    }

    // if 'trigger' prop is changing to false, start an 'off' transition
    if (this.props.trigger === false && prevProps.trigger && this.state.transition !== EXITING) {
      this.setState({ isRender: true, transition: EXITING });
    }

    // if enter/exit just started, begin delay to transition it
    const isInitEnter = this.state.transition === ENTERING && prevState.transition !== ENTERING;
    const isInitExit = this.state.transition === EXITING && prevState.transition !== EXITING;

    if (isInitEnter || isInitExit) {
      this.durationTm = window.setTimeout(() => {
        this.setState({ transition: this.state.transition === ENTERING ? ENTERED : EXITED });
      }, this.props.delay || 16); // ~1/60 sec

      // if exit started, begin delay to unmount children (if specified)
      if (this.state.transition === EXITING && this.props.unmountAfterExit) {
        this.removalTm = window.setTimeout(() => {
          this.setState({ isRender: false });
        }, this.props.unmountAfterExit);
      }
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.durationTm);
    window.clearTimeout(this.removalTm);
  }

  render() {
    if (!this.state.isRender) return null;

    const { children } = this.props;
    const { transition } = this.state;

    return typeof children === 'function'
      ? children(transition)
      : React.Children.map(children, child => React.cloneElement(child, { transition }));
  }
}
