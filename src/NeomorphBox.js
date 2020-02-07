import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import OuterShadowBox from './OuterShadowBox';
import InnerShadowBox from './InnerShadowBox';

//get brightness from rgb/hex color
function brightness(color) {
  // Variables for red, green, blue values
  let r, g, b, hsp;
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
      // If HEX --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = color[1];
      g = color[2];
      b = color[3];
  } else {
      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +("0x" + color.slice(1).replace( 
      color.length < 5 && /./g, '$&$&'));

      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
  }
  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
  0.299 * (r * r) +
  0.587 * (g * g) +
  0.114 * (b * b)
  );
  return hsp;
}

//exponental transform brightness to opacity
const brightnessToOpacity = (val) => {
  const ratio = 50;
  const ratioBraghtness = val * (1 / 255); 
  const opacity = (ratio ** ratioBraghtness) / ratio - 1 / ratio;
  return opacity;
}

//interpolate val in range [min, max]
const interpolate = (val, min, max) => {
  return min + (max - min) * val;
}

const NeomorphBox = ({
  style: {
    shadowOffset = null,
    borderRadius = 0,
    shadowRadius = 0,
    backgroundColor = 'rgb(230,230,230)',
    shadowOpacity = 0,
    width = 0,
    height = 0,
    ...otherStyle
  },
  inner,
  useSvg,
  children,
  darkShadowColor,
  lightShadowColor,
  swapShadowLevel
}) => {
  let opacity, shOpacityLight, shOpacityDark;
  if(shadowOpacity){
    shOpacityLight = shadowOpacity;
    shOpacityDark = shadowOpacity;
  } else {
    opacity = brightnessToOpacity(brightness(backgroundColor));
    shOpacityLight =  interpolate(opacity, 0.025, 1);
    shOpacityDark = interpolate(1 - opacity, 0, 0.35); 
  }
  
  const styleAll = {
    backgroundColor: backgroundColor, 
    shadowRadius: shadowRadius, 
    borderRadius: borderRadius,
    width: width,
    height: height
  };

  let _shadowOffset = {width: shadowRadius, height: shadowRadius}
  if(shadowOffset) _shadowOffset = {width: shadowOffset.width || 0, height: shadowOffset.height || 0};

  let styleDark = {
    ...styleAll,
    shadowOffset: _shadowOffset,
    shadowOpacity: shadowRadius ? shOpacityDark : 0
  };

  let styleLight = {
    ...styleAll,
    shadowOffset: {width: -_shadowOffset.width, height: -_shadowOffset.height},
    shadowOpacity: shadowRadius ? shOpacityLight : 0
  };

  if(darkShadowColor){
    styleDark = {
      ...styleDark,
      shadowColor: darkShadowColor,
    }
  }

  if(lightShadowColor){
    styleLight = {
      ...styleLight,
      shadowColor: lightShadowColor,
    }
  }

  const styleDarkShadowBox = {...styles.neomorphDark, ...styleDark};
  const styleLightShadowBox = {...styles.neomorphLight, ...styleLight};

  return inner ? (
    <View style={{ 
      ...otherStyle, 
      width: width,  
      height: height, 
      borderRadius: borderRadius,
      backgroundColor: backgroundColor,
      borderWidth: 0,
    }}>
      <InnerShadowBox style={swapShadowLevel ? styleLightShadowBox : styleDarkShadowBox}>
        <InnerShadowBox style={swapShadowLevel ? styleDarkShadowBox : styleLightShadowBox}/>
      </InnerShadowBox>
      {children}
    </View>
  ) : (
    <View style={{ 
      ...otherStyle, 
      width: width,  
      height: height, 
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      borderWidth: 0,
    }}>
      <OuterShadowBox style={swapShadowLevel ? styleDarkShadowBox : styleLightShadowBox} useSvg={useSvg}/>
      <OuterShadowBox style={swapShadowLevel ? styleLightShadowBox : styleDarkShadowBox} useSvg={useSvg}/>
      {children}
    </View>
  )
}

NeomorphBox.defaultProps = {
  inner: false,
  useSvg: false,
  swapShadowLevel: false,
  style: {
    backgroundColor: 'rgb(230,230,230)',
    width: 0,
    height: 0,
    borderRadius: 0,
    shadowRadius: 0,
    shadowOpacity: 0,
    shadowOffset: null
  }
};
NeomorphBox.propTypes = {
  inner: PropTypes.bool,
  swapShadowLevel: PropTypes.bool,
  useSvg: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.shape({
    backgroundColor: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    borderRadius: PropTypes.number,
    shadowRadius: PropTypes.number,
    shadowOpacity: PropTypes.number,
    shadowOffset: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    })
  }),
  darkShadowColor: PropTypes.string,
  lightShadowColor: PropTypes.string,
};

const styles = StyleSheet.create({
  neomorphLight: {
    shadowColor: 'white',
    position: 'absolute',
  },
  neomorphDark: {
    shadowColor: 'black',
    position: 'absolute',
  },
});

export default NeomorphBox;

