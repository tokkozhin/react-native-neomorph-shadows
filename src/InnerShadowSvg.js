import React from 'react';
import PropTypes from 'prop-types';
import Svg, {
  LinearGradient, 
  RadialGradient, 
  Rect, 
  Defs,
  Stop
} from 'react-native-svg';

const InnerShadowSvg = ({
  borderRadius,
  shadowRadius,
  shadowOpacity,
  shadowColor,
  shadowOffset,
  width,
  height,
}) => {
  const smallerSide = width < height ? width : height;
  const shadowOpacityRatio = 4;
  let easeOpacityRange = [0, 0.02, 0.1, 0.26, 0.49, 0.75];

  let _shadowRadius = shadowRadius;
  let _borderRadius;

  if((_shadowRadius * (shadowOpacityRatio - 1)) >= smallerSide / 2){
    _shadowRadius = _shadowRadius && smallerSide / (2 * (shadowOpacityRatio - 1));
    if(smallerSide * 2 >= shadowRadius){
      easeOpacityRange = easeOpacityRange.map(item => {
        let result = item + ((1 - item) / (smallerSide * 2 / shadowRadius));
        return result >= 1 ? 1 : result;
      })
      //console.log(easeOpacityRange);
    } else {
      easeOpacityRange = [1]
    }
    
  }

  if(borderRadius >= smallerSide / 2){
    _borderRadius = smallerSide / 2 - _shadowRadius * (shadowOpacityRatio - 1);
  } else {
    _borderRadius = borderRadius - _shadowRadius * (shadowOpacityRatio - 1);
  }
  if(_borderRadius < 0) _borderRadius = 0;

  const s_r = _shadowRadius * shadowOpacityRatio + _borderRadius;
  const s_w = width - (s_r - _shadowRadius) * 2;
  const s_h = height - (s_r - _shadowRadius) * 2;
  const s_o = shadowOpacity * .9;

  let edge = ( _borderRadius / s_r ) || 0;
  //console.log(edge);
  if(edge < 0) edge = 0;
  if(edge === 1) edge = 0.999;
  const step = (1 - edge) / easeOpacityRange.length;

  const easeLinearGradient = (key) => {
    return [ ...[0, ...easeOpacityRange, 1].map((rangeValue, i) => 
      <Stop 
        offset={`${ i === 0 ? 0 : i === (easeOpacityRange.length + 1) ? 1 : (edge + step * (i - 1)) }`} 
        stopColor={shadowColor} 
        stopOpacity={`${rangeValue}`} 
        key={key + 'linear_' + i} 
      />
    )];
  }

  const easeRadialGradient = (key) => {
    return [ ...[0, ...easeOpacityRange, 1].map((rangeValue, i) => 
      <Stop 
        offset={`${ i === 0 ? 0 : i === (easeOpacityRange.length + 1) ? 1 : (edge + step * (i - 1)) }`} 
        stopColor={shadowColor} 
        stopOpacity={`${rangeValue}`} 
        key={key + 'radial_' + i} 
      />
    )];
  }

  const radialShapes = () => {
    const coord_1 = width + s_w + s_r;
    const coord_3 = height + s_h + s_r;
    return [
      <Rect width={s_r} height={s_r} key={'radial_shape_0'} fill="url(#topLeft)" x={width} y={height} />,
      <Rect width={s_r} height={s_r} key={'radial_shape_1'} fill="url(#topRight)" x={coord_1} y={height} />,
      <Rect width={s_r} height={s_r} key={'radial_shape_2'} fill="url(#bottomLeft)" x={width} y={coord_3} />,
      <Rect width={s_r} height={s_r} key={'radial_shape_3'} fill="url(#bottomRight)" x={coord_1} y={coord_3}/>,
    ];
  }

  const rectShapes = () => {
    const wsr = width + s_r;
    const hsr = height + s_r;
    return [
      <Rect x={wsr} width={s_w} height={s_r} key={'rect_shape_0'} fill="url(#top)" y={height}/>,
      <Rect x={wsr} width={s_w} height={s_r} key={'rect_shape_1'} fill="url(#bottom)" y={hsr + s_h} />,
      <Rect y={hsr} width={s_r} height={s_h} key={'rect_shape_2'} fill="url(#left)" x={width} />,
      <Rect y={hsr} width={s_r} height={s_h} key={'rect_shape_3'} fill="url(#right)" x={wsr + s_w} />,
    ];
  }

  const rectShapesBack = () => {
    const sr2 = s_r * 2;
    const shsr2 = s_h + sr2;
    const swsr2 = s_w + sr2;
    return [
      <Rect key={'rect_shape_back_3'} fill={shadowColor} width={width * 2 + swsr2} height={height} x={0} y={height + shsr2}/>,
      <Rect key={'rect_shape_back_0'} fill={shadowColor} width={width * 2 + swsr2} height={height} x={0} y={0}/>,
      <Rect key={'rect_shape_back_1'} fill={shadowColor} width={width} height={shsr2} y={height} x={width + swsr2}/>,
      <Rect key={'rect_shape_back_2'} fill={shadowColor} width={width} height={shsr2} y={height} x={0}/>,
    ];
  }

  return (
    <Svg width={width * 2 + s_w + s_r * 2} height={height * 2 + s_h + s_r * 2} style={{
      top: -_shadowRadius + (Math.abs(shadowOffset.height) > height ? Math.sign(shadowOffset.height) * height : shadowOffset.height) - height, 
      left: -_shadowRadius + (Math.abs(shadowOffset.width) > width ? Math.sign(shadowOffset.width) * width : shadowOffset.width) - width, 
      position: 'absolute',
      zIndex: 2,
      opacity: s_o,
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
      {rectShapes()}
      {radialShapes()}
      {rectShapesBack()}
    </Svg>
  );
}

InnerShadowSvg.propTypes = {
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

export default InnerShadowSvg;

