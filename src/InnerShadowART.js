/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ShadowARTType } from './types';
import { Surface, Shape, Group } from '@react-native-community/art';
import { getPathWithRadius, transformShadowPropsForAndroid } from './helpers';

export default class InnerShadowART extends React.PureComponent {
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

    const absOffsetX = Math.abs(shadowOffset.x);
    const absOffsetY = Math.abs(shadowOffset.y);
    let stroke = 30;
    if (absOffsetX >= absOffsetY) {
      stroke += absOffsetX;
    } else {
      stroke += absOffsetY;
    }
    const path = getPathWithRadius(
      width + stroke + 2,
      height + stroke + 2,
      borderRadius + stroke / 2,
    );

    return (
      <Surface height={height} width={width} style={{ position: 'absolute' }}>
        <Group x={-stroke / 2 - 1} y={-stroke / 2 - 1}>
          <Shape
            d={path}
            strokeWidth={stroke}
            stroke={backgroundColor || 'white'}
            {...shadowProps}
          />
        </Group>
      </Surface>
    );
  }
}

InnerShadowART.propTypes = ShadowARTType;
