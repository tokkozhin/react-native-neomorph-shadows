import React from 'react';
import { NeomorphFlexType } from './types';
import { View } from 'react-native';
import Neomorph from './Neomorph';

export default class NeomorphFlex extends React.PureComponent {
  constructor(props) {
    super(props);
    const { style } = props;
    this.state = {
      neomorphStyle: {
        shadowOffset: style?.shadowOffset,
        shadowOpacity: style?.shadowOpacity,
        shadowRadius: style?.shadowRadius,
        borderRadius: style?.borderRadius,
        backgroundColor: style?.backgroundColor,
        width: 0,
        height: 0,
        position: 'absolute',
      },
      layoutFinished: false,
    };
  }
  
  componentDidUpdate(_prevProps, prevState) {
    const { style } = this.props;

    if (
      prevState?.neomorphStyle?.shadowOffset !== style?.shadowOffset ||
      prevState?.neomorphStyle?.shadowOpacity !== style?.shadowOpacity ||
      prevState?.neomorphStyle?.shadowRadius !== style?.shadowRadius ||
      prevState?.neomorphStyle?.shadowColor !== style?.shadowColor ||
      prevState?.neomorphStyle?.borderRadius !== style?.borderRadius ||
      prevState?.neomorphStyle?.backgroundColor !== style?.backgroundColor
    )
      this.setState({
        ...prevState,
        neomorphStyle: {
          ...prevState?.neomorphStyle,
          shadowOffset: style?.shadowOffset,
          shadowOpacity: style?.shadowOpacity,
          shadowRadius: style?.shadowRadius,
          shadowColor: style?.shadowColor,
          borderRadius: style?.borderRadius,
          backgroundColor: style?.backgroundColor,
        },
      });
  }

  _onLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout;
    this.setState({
      neomorphStyle: {
        ...this.state.neomorphStyle,
        width,
        height,
      },
      layoutFinished: true,
    });
  };

  render() {
    const { style, children, ...otherProps } = this.props;
    const { layoutFinished, neomorphStyle } = this.state;
    const {
      elevation,
      shadowOpacity,
      shadowRadius,
      shadowOffset,
      overflow,
      backgroundColor,
      ...otherStyle
    } = style;
    return (
      <View onLayout={this._onLayout} style={otherStyle}>
        {layoutFinished && <Neomorph style={neomorphStyle} {...otherProps} />}
        {children}
      </View>
    );
  }
}

NeomorphFlex.propTypes = NeomorphFlexType;
