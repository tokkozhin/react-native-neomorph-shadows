import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import InnerShadow from './InnerShadow';
import OuterShadow from './OuterShadow';

export default class Shadow extends React.PureComponent {
  render() {
    const { inner, ...other } = this.props;
    return inner ? <InnerShadow {...other} /> : <OuterShadow {...other} />;
  }
}

Shadow.defaultProps = {
  inner: false,
  useArt: false,
};
Shadow.propTypes = {
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
