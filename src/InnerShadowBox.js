import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import InnerShadowSvg from './InnerShadowSvg';

export default class InnerShadowBox extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      width: null,
      height: null,
    }
  }

  onLayout = (e) => {
    console.log(e.nativeEvent.layout);
    const data = e.nativeEvent.layout;
    this.setState({width: data.width, height: data.height});
  }

  render(){
    const {
      style,
      children
    } = this.props;
    const {
      width = this.state.width,
      height = this.state.height,
      shadowRadius = 0,
      shadowColor = 'black',
      shadowOpacity = 0,
      shadowOffset = {width: 0, height: 0},
      backgroundColor = 'transparent',
      borderRadius = 0,
      ...otherStyles
    } = style;

    return (
        <View 
          style={{
            ...otherStyles,
            width: width, 
            height: height, 
            borderRadius: borderRadius, 
            overflow: 'hidden',
            flex: 0,
          }}
          onLayout={(width && height) ? null : this.onLayout}
        >
          <InnerShadowSvg {...{
            width,
            height,
            borderRadius,
            shadowRadius,
            shadowOpacity,
            shadowColor,
            shadowOffset
          }}/>
          <View style={{
            ...otherStyles,
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            width: width, 
            height: height, 
            backgroundColor: backgroundColor, 
            borderRadius: borderRadius,
          }}>
            {children}
          </View>
        </View>
    );
  }
}

InnerShadowBox.defaultProps = {
  style: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    width: 0,
    height: 0,
    borderRadius: 0,
    backgroundColor: 'transparent'
  },
};
InnerShadowBox.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape({
    shadowColor: PropTypes.string,
    shadowOffset: PropTypes.shape({
      width: PropTypes.number, 
      height: PropTypes.number
    }),
    shadowOpacity: PropTypes.number,
    shadowRadius: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.string
  }),
}

