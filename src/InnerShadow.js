import React from 'react';
import { InnerShadowType } from './types';
import { StyleSheet, View } from 'react-native';
import InnerShadowART from './InnerShadowART';
import { transformStyleProps } from './helpers';


export default class InnerShadow extends React.PureComponent {
  render() {
    const { style, children, ...containerProps } = this.props;
    let {
      outsideViewStyle,
      insideViewStyle,
      allShadowProps,
    } = transformStyleProps(style);
    const { backgroundColor, width, height, borderRadius } = allShadowProps;
    const viewStyle = { borderRadius, width, height };

    return (
      <View style={{ ...viewStyle, ...outsideViewStyle }} {...containerProps}>
        <View style={[styles.container, { ...viewStyle, backgroundColor }]}>
          <InnerShadowART {...allShadowProps} />
        </View>
        <View style={{ ...viewStyle, ...insideViewStyle }}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    overflow: 'hidden',
  },
});

InnerShadow.propTypes = InnerShadowType;
