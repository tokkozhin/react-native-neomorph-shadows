/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { NeomorphType } from './types';
import { StyleSheet, View, Platform } from 'react-native';
import {
  transformStyleProps,
  brightnessToOpacity,
  brightness,
  calcOpacityFromRange,
} from './helpers';
import InnerShadowART from './InnerShadowART';
import OuterShadowART from './OuterShadowART';

export default class Neomorph extends React.PureComponent {
  render() {
    const {
      style,
      inner,
      useArt,
      children,
      darkShadowColor,
      lightShadowColor,
      swapShadows,
      ...otherProps
    } = this.props;
    let {
      outsideViewStyle,
      insideViewStyle,
      allShadowProps: {
        width,
        height,
        borderRadius,
        backgroundColor,
        shadowOpacity,
        shadowOffset,
        shadowRadius,
      },
    } = transformStyleProps(style, true);

    let opacity, shOpacityLight, shOpacityDark;
    if (shadowOpacity) {
      shOpacityLight = shadowOpacity;
      shOpacityDark = shadowOpacity;
    } else {
      opacity = brightnessToOpacity(brightness(backgroundColor));
      shOpacityLight = calcOpacityFromRange(opacity, 0.025, 1);
      shOpacityDark = calcOpacityFromRange(1 - opacity, 0, 0.35);
    }
    const styleAll = {
      backgroundColor,
      shadowRadius,
      borderRadius,
      width,
      height,
    };

    const viewStyle = {
      borderRadius,
      width,
      height,
    };

    let _shadowOffset = { x: shadowRadius / 2, y: shadowRadius / 2 };
    if (shadowOffset.x !== 0 || shadowOffset.y !== 0) {
      _shadowOffset = {
        x: shadowOffset.x || 0,
        y: shadowOffset.y || 0,
      };
    }

    let styleDark = {
      ...styleAll,
      shadowOffset: _shadowOffset,
      shadowOpacity: shadowRadius ? shOpacityDark : 0,
      shadowColor: darkShadowColor || 'black',
    };

    let styleLight = {
      ...styleAll,
      shadowOffset: {
        x: -_shadowOffset.x,
        y: -_shadowOffset.y,
      },
      shadowOpacity: shadowRadius ? shOpacityLight : 0,
      shadowColor: lightShadowColor || 'white',
    };

    if (swapShadows) {
      let bubble = { ...styleLight };
      styleLight = { ...styleDark };
      styleDark = bubble;
    }

    const renderOuter = () => {
      if (useArt || Platform.OS !== 'ios') {
        return (
          <View pointerEvents={'none'}>
            <OuterShadowART {...styleDark} />
            <OuterShadowART {...styleLight} />
          </View>
        );
      } else {
        const shadowOffsetDark = {
          width: styleDark.shadowOffset.x,
          height: styleDark.shadowOffset.y,
        };
        const shadowOffsetLight = {
          width: styleLight.shadowOffset.x,
          height: styleLight.shadowOffset.y,
        };
        const shadowRadiusOuter = this.props.style?.shadowRadius;
        return (
          <>
            <View
              style={[
                styleDark,
                {
                  position: 'absolute',
                  shadowRadius: shadowRadiusOuter,
                  shadowOffset: shadowOffsetDark,
                },
              ]}
            />
            <View
              style={[
                styleLight,
                {
                  position: 'absolute',
                  shadowRadius: shadowRadiusOuter,
                  shadowOffset: shadowOffsetLight,
                },
              ]}
            />
          </>
        );
      }
    };

    if (inner) {
      return (
        <View
          style={{
            backgroundColor,
            ...viewStyle,
            ...outsideViewStyle,
          }}
          {...otherProps}>
          <View style={[styles.containerInnerLayers, viewStyle]}>
            <InnerShadowART {...styleDark} />
            <InnerShadowART {...styleLight} />
          </View>
          <View style={{ ...viewStyle, ...insideViewStyle }}>{children}</View>
        </View>
      );
    } else {
      return (
        <View style={{ ...viewStyle, ...outsideViewStyle }} {...otherProps}>
          {renderOuter()}
          <View
            style={{
              backgroundColor,
              ...viewStyle,
              ...insideViewStyle,
            }}>
            {children}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerInnerLayers: {
    overflow: 'hidden',
    position: 'absolute',
  },
});

Neomorph.defaultProps = {
  inner: false,
  useArt: false,
  darkShadowColor: 'black',
  lightShadowColor: 'white',
  swapShadows: false,
};
Neomorph.propTypes = NeomorphType;
