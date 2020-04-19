/* eslint-disable no-bitwise */
import { Platform, StyleSheet } from 'react-native';

export function getPathWithRadius(width, height, borderRadius) {
  if (borderRadius) {
    const APrefix = `A ${borderRadius}, ${borderRadius}, 0 0 1`;
    const ATopLeft = `${APrefix} ${borderRadius},0`;
    const ATopRight = `${APrefix} ${width},${borderRadius}`;
    const ABottomRight = `${APrefix} ${width - borderRadius},${height}`;
    const ABottomLeft = `${APrefix} 0,${height - borderRadius}`;
    return `M 0,${borderRadius} ${ATopLeft} H ${
      width - borderRadius
      } ${ATopRight} V ${
      height - borderRadius
      } ${ABottomRight} H ${borderRadius} ${ABottomLeft} Z`;
  } else {
    return `M 0,0 H ${width} V ${height} H 0 Z`;
  }
}

export function transformShadowPropsForAndroid(props) {
  const shadowProps = { ...props };
  if (Platform.OS === 'android') {
    shadowProps.shadowRadius = props.shadowRadius * 2;
    shadowProps.shadowOffset.x = props.shadowOffset.x * 3;
    shadowProps.shadowOffset.y = props.shadowOffset.y * 3;
  }
  return shadowProps;
}

export function transformStyleProps(styleProps, neomorph) {
  let {
    /* start shadow props */
    width,
    height,
    borderRadius = 0,
    backgroundColor,
    shadowOpacity = neomorph ? 0 : 1,
    shadowOffset = { width: 0, height: 0 },
    shadowRadius,
    shadowColor,
    /* end shadow props */
    bottom,
    direction,
    display,
    end,
    left,
    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,
    position,
    right,
    start,
    top,
    zIndex,
    backfaceVisibility,
    opacity,
    transform,

    alignSelf, //remove temporary
    borderBottomEndRadius, //remove temporary
    borderBottomLeftRadius, //remove temporary
    borderBottomRightRadius, //remove temporary
    borderBottomStartRadius, //remove temporary
    borderTopEndRadius, //remove temporary
    borderTopLeftRadius, //remove temporary
    borderTopRightRadius, //remove temporary
    borderTopStartRadius, //remove temporary

    flex, //remove
    flexBasis, //remove
    flexGrow, //remove
    flexShrink, //remove
    maxHeight, //remove
    maxWidth, //remove
    minHeight, //remove
    minWidth, //remove
    elevation, //remove

    ...insideViewStyle
  } = styleProps instanceof Array ? StyleSheet.flatten(styleProps) : styleProps;
  const outsideViewStyle = {
    bottom,
    direction,
    display,
    end,
    left,
    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,
    position,
    right,
    start,
    top,
    zIndex,
    backfaceVisibility,
    opacity,
    transform,
  };
  if (borderRadius > width / 2) {
    borderRadius = width / 2;
  }
  if (borderRadius > height / 2) {
    borderRadius = height / 2;
  }
  return {
    outsideViewStyle,
    insideViewStyle,
    allShadowProps: {
      width,
      height,
      borderRadius: borderRadius < 0 ? 0 : borderRadius,
      backgroundColor:
        backgroundColor === 'transparent' ? '#00000000' : backgroundColor,
      shadowOpacity,
      shadowOffset: { x: shadowOffset.width, y: shadowOffset.height },
      shadowRadius: shadowRadius ? shadowRadius * 2 : 0.1,
      shadowColor,
    },
  };
}

/* get brightness from rgb/hex color */
export function brightness(color) {
  let r, g, b, hsp;
  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
    );
    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  return hsp;
}

/* exponental transform brightness to opacity */
export function brightnessToOpacity(val) {
  const ratio = 50;
  const ratioBraghtness = val * (1 / 255);
  const opacity = ratio ** ratioBraghtness / ratio - 1 / ratio;
  return opacity;
}

/* calculate opacity from range [min, max] */
export function calcOpacityFromRange(val, min, max) {
  return min + (max - min) * val;
}
