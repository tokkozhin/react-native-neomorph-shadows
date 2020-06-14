declare module 'react-native-neomorph-shadows' {
  import * as React from 'react';
  import type { ViewProps, ViewStyle } from 'react-native';

  /**
   * Defines all flex properties
   */
  type FlexStyleProperties =
    | 'flex'
    | 'alignSelf'
    | 'flexGrow'
    | 'flexShrink'
    | 'flexBasis';

  /**
   * View styles without flex properties because they are not supported
   */
  type ViewStyleWithoutFlex = Pick<
    ViewStyle,
    Exclude<keyof ViewStyle, FlexStyleProperties>
  >;

  interface ViewStyleWithShadow extends ViewStyleWithoutFlex {
    shadowOffset?: {
      width: number;
      height: number;
    };
    shadowOpacity?: number;
    shadowColor?: string;
    shadowRadius?: number;
    borderRadius?: number;
    backgroundColor?: string;
    width: number;
    height: number;
  }

  interface ViewStyleWithNeomorphShadow extends ViewStyleWithoutFlex {
    shadowRadius?: number;
    borderRadius?: number;
    backgroundColor?: string;
    width: number;
    height: number;
  }

  interface ShadowProps extends ViewProps {
    inner?: boolean;
    useArt?: boolean;
    style?: ViewStyleWithShadow;
  }

  interface ShadowFlexProps extends ShadowProps {
    style?: ViewStyle;
  }

  const Shadow: React.FC<ShadowProps>;
  const ShadowFlex: React.FC<ShadowFlexProps>;

  interface NeomorphProps extends ViewProps {
    inner?: boolean;
    swapShadows?: boolean;
    style?: ViewStyleWithNeomorphShadow;
    lightShadowColor?: string;
    darkShadowColor?: string;
  }

  interface NeomorphFlexProps extends NeomorphProps {
    style?: ViewStyle;
  }

  const Neomorph: React.FC<NeomorphProps>;
  const NeomorphFlex: React.FC<NeomorphFlexProps>;

  interface NeomorphBlurProps extends ViewProps {
    inner?: boolean;
    useArt?: boolean;
    style?: ViewStyleWithNeomorphShadow;
  }

  const NeomorphBlur: React.FC<NeomorphBlurProps>;

  export { Shadow, ShadowFlex, Neomorph, NeomorphFlex, NeomorphBlur };
}
