import React from 'react';
import { ShadowFlexType } from './types';
import { View, Platform } from 'react-native';
import Shadow from './Shadow';

export default class ShadowFlex extends React.PureComponent {
  constructor(props) {
    super(props);
    const { style } = props;
    this.state = {
      shadowStyle: {
        shadowOffset: style?.shadowOffset,
        shadowOpacity: style?.shadowOpacity,
        shadowRadius: style?.shadowRadius,
        shadowColor: style?.shadowColor,
        borderRadius: style?.borderRadius,
        backgroundColor: style?.backgroundColor,
        width: 0,
        height: 0,
        position: 'absolute',
      },
      layoutFinished: false,
    };
  }

  _onLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout;
    console.log(nativeEvent.layout);
    this.setState({
      shadowStyle: {
        ...this.state.shadowStyle,
        width,
        height,
      },
      layoutFinished: true,
    });
  };

  render() {
    const { style, children, ...otherProps } = this.props;
    if (Platform.OS === 'android') {
      const { layoutFinished, shadowStyle } = this.state;
      const {
        elevation,
        shadowOpacity,
        shadowRadius,
        shadowOffset,
        shadowColor,
        backgroundColor,
        overflow,
        ...otherStyle
      } = style;
      return (
        <View onLayout={this._onLayout} style={otherStyle}>
          {layoutFinished && <Shadow style={shadowStyle} {...otherProps} />}
          {children}
        </View>
      );
    } else {
      return (
        <Shadow style={style} {...otherProps}>
          {children}
        </Shadow>
      );
    }
  }
}

ShadowFlex.propTypes = ShadowFlexType;
