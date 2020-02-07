import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
} from 'react-native';
import OuterShadowSvg from './OuterShadowSvg';

export default class OuterShadowBox extends React.PureComponent {

  constructor(props){
    super(props);
    this.useSvg = this.props.useSvg;
    this.state = {
      width: null,
      height: null,
    }
  }

  onLayout = (e) => {
    //console.log(e.nativeEvent.layout);
    const data = e.nativeEvent.layout;
    this.setState({width: data.width, height: data.height});
  }

  renderNative(){
    const {
      shadowOffset = { width: 0, height: 0 },
      ...otherStyles
    } = this.props.style;
    return (
      <View style={{shadowOffset: shadowOffset, ...otherStyles}}>
        {this.props.children}
      </View>
    );
  }

  renderSvg(){
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
      shadowOffset = { width: 0, height: 0 },
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
            borderWidth: 0,
            flex: 0
          }} 
          onLayout={(width && height) ? null : this.onLayout}
          ref={ref => this.shadowBox = ref}
        >
          <OuterShadowSvg {...{
            width,
            height,
            borderRadius,
            shadowRadius,
            shadowOpacity,
            shadowColor,
            shadowOffset
          }}/>
          <View style={{
            zIndex: 2,
            width: width, 
            height: height, 
            borderRadius: borderRadius,
            backgroundColor: backgroundColor,
            position: 'absolute',
            top: 0,
            left: 0,
          }} >
            {children}
          </View>
        </View>
    );
  }

  render(){
    if(this.useSvg || Platform.OS === 'android'){
      return this.renderSvg();
    } else {
      return this.renderNative();
    }
  }
}

OuterShadowBox.defaultProps = {
  useSvg: false,
  style: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    borderRadius: 0,
    backgroundColor: 'white'
  },
};
OuterShadowBox.propTypes = {
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
    width: PropTypes.number,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.string
  }),
}

