import React from 'react';
import PropTypes from 'prop-types';
import Svg, {
  LinearGradient, 
  RadialGradient, 
  Rect, 
  Defs,
  Stop,
  Path
} from 'react-native-svg';

const ShadowSvg = ({
  borderRadius,
  shadowRadius,
  shadowOpacity,
  shadowColor,
  shadowOffset,
  width,
  height,
}) => {

  const smallerSide = width < height ? width : height;
  let _borderRadius = borderRadius - shadowRadius;
  if(borderRadius < shadowRadius){
    _borderRadius = 0;
  }

  if(
    borderRadius >= width / 2 || 
    borderRadius >= height / 2 || 
    shadowRadius >= width / 2 || 
    shadowRadius >= height / 2
  ){
    _borderRadius = smallerSide / 2 - shadowRadius;
  }

  //opacity of svg component
  const diff = shadowRadius / smallerSide;
  let opacitySVGShadow = 1;
  //console.log(diff);
  if(diff >= 0.55){
    opacitySVGShadow = 0.9;
    if(diff >= 0.6){
      opacitySVGShadow = 0.8;
      if(diff >= 0.85){
        opacitySVGShadow = 0.6;
        if(diff >= 1.1){
          opacitySVGShadow = 0.4;
          if(diff >= 1.25){
            opacitySVGShadow = 0.3;
            if(shadowRadius >= 2){
              opacitySVGShadow = 0.2;
            }
          }
        }
      }
    }
  }

  const _shadowRadius = shadowRadius * 4;
  const s_r = _shadowRadius + _borderRadius;
  const s_w = width - (_borderRadius + shadowRadius) * 2;
  const s_h = height - (_borderRadius + shadowRadius) * 2;
  const s_o = shadowOpacity * .9;
  //const easeOpacityRange = [1, 0.6, 0.26, 0.11, 0.02];
  const easeOpacityRange = [1, 0.75, 0.49, 0.26, 0.1, 0.02, 0];

  let edge = ( _borderRadius / s_r ) || 0;
  if(edge < 0) edge = 0;
  const step = (1 - edge) / easeOpacityRange.length;

  const easeLinearGradient = (key) => {
    return [ ...[1, ...easeOpacityRange, 0].map((rangeValue, i) => 
      <Stop 
        offset={`${ i === 0 ? 0 : i === (easeOpacityRange.length + 1) ? 1 : (edge + step * (i - 1)) }`} 
        stopColor={shadowColor} 
        stopOpacity={`${s_o * rangeValue}`} 
        key={key + 'linear_' + i} 
      />
    )];
  }

  const easeRadialGradient = (key) => {
    return [ ...[1, ...easeOpacityRange, 0].map((rangeValue, i) => 
      <Stop 
        offset={`${ i === 0 ? 0 : i === (easeOpacityRange.length + 1) ? 1 : (edge + step * (i - 1)) }`} 
        stopColor={shadowColor} 
        stopOpacity={`${s_o * rangeValue}`} 
        key={key + 'radial_' + i} 
      />
    )];
  }

  const radialShapes = () => {
    const coord_1 = s_w + s_r;
    const coord_2 = coord_1 + s_r;
    const coord_3 = s_h + s_r;
    const coord_4 = coord_3 + s_r;
    return [
      <Path d={`M0,${s_r} a${s_r},${s_r} 0 0 1 ${s_r},-${s_r} V${s_r} z`} fill="url(#topLeft)" key={'radial_shape_0'}/>,
      <Path d={`M${coord_1},0 a${s_r},${s_r} 0 0 1 ${s_r},${s_r} L${coord_1},${s_r} z`} fill="url(#topRight)" key={'radial_shape_1'} />,
      <Path d={`M${s_r},${coord_4} a${s_r},${s_r} 0 0 1 -${s_r},-${s_r} L${s_r},${coord_3} z`} fill="url(#bottomLeft)" key={'radial_shape_2'} />,
      <Path d={`M${coord_2},${coord_3} a${s_r},${s_r} 0 0 1 -${s_r},${s_r} L${coord_1},${coord_3} z`} fill="url(#bottomRight)" key={'radial_shape_3'}/>,
    ];
  }

  const rectShapes = () => {
    return [
      <Rect x={s_r} width={s_w} height={s_r} key={'rect_shape_0'} fill="url(#top)" y={0}/>,
      <Rect x={s_r} width={s_w} height={s_r} key={'rect_shape_1'} fill="url(#bottom)" y={s_h + s_r} />,
      <Rect y={s_r} width={s_r} height={s_h} key={'rect_shape_2'} fill="url(#left)" x={0} />,
      <Rect y={s_r} width={s_r} height={s_h} key={'rect_shape_3'} fill="url(#right)" x={s_w + s_r} />,
    ];
  }

  return (
    <Svg width={width + s_r * 2 + s_w} height={height + s_r * 2 + s_h} style={{
      top: -_shadowRadius + shadowRadius + shadowOffset.height, 
      left: -_shadowRadius + shadowRadius + shadowOffset.width, 
      position: 'absolute',
      zIndex: 1,
      opacity: opacitySVGShadow
    }}>
      <Defs>
        <LinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">{easeLinearGradient('top')}</LinearGradient>
        <LinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">{easeLinearGradient('bottom')}</LinearGradient>
        <LinearGradient id="left" x1="100%" y1="0%" x2="0%" y2="0%">{easeLinearGradient('left')}</LinearGradient>
        <LinearGradient id="right" x1="0%" y1="0%" x2="100%" y2="0%" >{easeLinearGradient('right')}</LinearGradient>
        <RadialGradient id="topLeft" r="100%" cx="100%" cy="100%" fx="100%" fy="100%">{easeRadialGradient('topLeft')}</RadialGradient>
        <RadialGradient id="topRight" r="100%" cx="0%" cy="100%" fx="0%" fy="100%">{easeRadialGradient('topRight')}</RadialGradient>
        <RadialGradient id="bottomLeft" r="100%" cx="100%" cy="0%" fx="100%" fy="0%">{easeRadialGradient('bottomLeft')}</RadialGradient>
        <RadialGradient id="bottomRight" r="100%" cx="0%" cy="0%" fx="0%" fy="0%">{easeRadialGradient('bottomRight')}</RadialGradient>
      </Defs>
      <Rect width={s_w} height={s_h} y={s_r} x={s_r} fill={shadowColor} opacity={s_o}/>
      {rectShapes()}
      {radialShapes()}
    </Svg>
  );
}

ShadowSvg.propTypes = {
  shadowColor: PropTypes.string.isRequired,
  shadowOffset: PropTypes.shape({
    width: PropTypes.number, 
    height: PropTypes.number
  }).isRequired,
  shadowOpacity: PropTypes.number.isRequired,
  shadowRadius: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  borderRadius: PropTypes.number.isRequired,
}

export default ShadowSvg;

