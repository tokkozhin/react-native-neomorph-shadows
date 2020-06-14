import { ViewPropTypes } from 'react-native';
import { number, shape, string, node, bool } from 'prop-types';

export const ShadowARTType = {
  width: number.isRequired,
  height: number.isRequired,
  borderRadius: number,
  shadowRadius: number,
  shadowOffset: shape({
    x: number,
    y: number,
  }),
  shadowOpacity: number,
  shadowColor: string,
  backgroundColor: string,
};

export const InnerShadowType = {
  ...ViewPropTypes,
  children: node,
  style: shape({
    ...ViewPropTypes.style,
    width: number.isRequired,
    height: number.isRequired,
  }),
};

export const OuterShadowType = {
  ...InnerShadowType,
  inner: bool,
  useArt: bool,
};

export const NeomorphType = {
  ...OuterShadowType,
  darkShadowColor: string,
  lightShadowColor: string,
  swapShadows: bool,
};

export const NeomorphFlexType = {
  ...NeomorphType,
  style: ViewPropTypes.style,
};

export const ShadowFlexType = {
  ...OuterShadowType,
  style: ViewPropTypes.style,
};
