import React from 'react';
import { ShadowARTType } from './types';
import { StyleSheet } from 'react-native';
import { Surface, Shape, Group } from '@react-native-community/art';
import { getPathWithRadius, transformShadowPropsForAndroid } from './helpers';

export default class OuterShadowART extends React.PureComponent {
  render() {
    const {
      width = 0,
      height = 0,
      borderRadius,
      shadowRadius,
      shadowOffset,
      shadowOpacity,
      shadowColor,
      backgroundColor,
    } = this.props;

    const shadowProps = transformShadowPropsForAndroid({
      shadowOpacity,
      shadowOffset,
      shadowRadius,
      shadowColor,
    });

    const path = getPathWithRadius(width, height, borderRadius);
    const absOffsetX = Math.abs(shadowOffset.x);
    const absOffsetY = Math.abs(shadowOffset.y);

    return (
      <Surface
        height={height + shadowRadius * 2 + absOffsetY * 2}
        width={width + shadowRadius * 2 + absOffsetX * 2}
        style={[
          styles.surface,
          { top: -shadowRadius - absOffsetY, left: -shadowRadius - absOffsetX },
        ]}>
        <Group x={shadowRadius + absOffsetX} y={shadowRadius + absOffsetY}>
          <Shape d={path} fill={backgroundColor} {...shadowProps} />
        </Group>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

OuterShadowART.propTypes = ShadowARTType;
