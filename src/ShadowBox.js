import React from 'react';
import PropTypes from 'prop-types';
import InnerShadowBox from './InnerShadowBox';
import OuterShadowBox from './OuterShadowBox';

const ShadowBox = ({children, ...props}) => {
  const renderInnerShadowBox = () => <InnerShadowBox {...props}>{children}</InnerShadowBox>;
  const renderOuterShadowBox = () => <OuterShadowBox {...props}>{children}</OuterShadowBox>;
  return props.inner ? renderInnerShadowBox() : renderOuterShadowBox();
}

ShadowBox.defaultProps = {
  inner: false,
  useSvg: false,
};
ShadowBox.propTypes = {
  inner: PropTypes.bool,
  useSvg: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.shape({
    shadowColor: PropTypes.string,
    shadowOffset: PropTypes.shape({
      width: PropTypes.number, 
      height: PropTypes.number
    }),
    shadowOpacity: PropTypes.number,
    shadowRadius: PropTypes.number,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.string
  }),
}

export default ShadowBox;

