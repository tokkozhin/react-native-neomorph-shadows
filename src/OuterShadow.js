import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, ViewPropTypes } from 'react-native';
import OuterShadowART from './OuterShadowART';
import { transformStyleProps } from './helpers';

export default class OuterShadow extends React.PureComponent {
  /* only for ios by default */
  renderNativeIOS() {
    const {
      children,
      style: { shadowOffset = { width: 0, height: 0 }, ...otherStyle },
      ...otherProps
    } = this.props;
    return (
      <View style={{ shadowOffset, ...otherStyle }} {...otherProps}>
        {children}
      </View>
    );
  }

  renderArt() {
    const { style, children, ...containerProps } = this.props;
    let {
      outsideViewStyle,
      insideViewStyle,
      allShadowProps,
    } = transformStyleProps(style);
    const { width, height, borderRadius } = allShadowProps;
    const viewStyle = { borderRadius, width, height };

    return (
      <View style={{ ...viewStyle, ...outsideViewStyle }} {...containerProps}>
        <OuterShadowART {...allShadowProps} />
        <View style={{ ...viewStyle, ...insideViewStyle }}>{children}</View>
      </View>
    );
  }

  render() {
    return !this.props.useArt && Platform.OS === 'ios'
      ? this.renderNativeIOS()
      : this.renderArt();
  }
}

OuterShadow.defaultProps = {
  inner: false,
  useArt: false,
};
OuterShadow.propTypes = {
  ...ViewPropTypes,
  inner: PropTypes.bool,
  useArt: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.shape({
    ...ViewPropTypes.style,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};
