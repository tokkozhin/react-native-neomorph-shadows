import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Neomorph from './Neomorph';

export default class NeomorphBlur extends React.PureComponent {
  render() {
    const { swapShadows, style, useArt, children, ...otherProps } = this.props;
    const { width = 0, height = 0, shadowRadius, shadowOffset } = style;

    const styleIn = {
      ...style,
      shadowOffset: shadowOffset
        ? { width: -shadowOffset.width, height: -shadowOffset.height }
        : { width: -shadowRadius, height: -shadowRadius },
      position: 'absolute',
      top: -1,
      left: -1,
      width: width + 2,
      height: height + 2,
    };

    return (
      <Neomorph
        {...otherProps}
        useArt={useArt}
        swapShadows={swapShadows}
        style={style}>
        <Neomorph swapShadows={swapShadows} inner style={styleIn}>
          {children}
        </Neomorph>
      </Neomorph>
    );
  }
}

NeomorphBlur.propTypes = {
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
