import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Surface, Shape, Group } from "@react-native-community/art";
import { getPathWithRadius, transformShadowPropsForAndroid } from "./helpers";

export default class OuterShadowART extends React.PureComponent {
  render() {
    const {
      width = 0,
      height = 0,
      borderRadius,
      borderTopStartRadius,
      borderTopEndRadius,
      borderBottomStartRadius,
      borderBottomEndRadius,
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

    const path = getPathWithRadius(
      width,
      height,
      borderRadius,
      borderTopStartRadius,
      borderTopEndRadius,
      borderBottomStartRadius,
      borderBottomEndRadius
    );
    const absOffsetX = Math.abs(shadowOffset.x);
    const absOffsetY = Math.abs(shadowOffset.y);

    return (
      <Surface
        height={height + shadowRadius * 2 + absOffsetY * 2}
        width={width + shadowRadius * 2 + absOffsetX * 2}
        style={[
          styles.surface,
          { top: -shadowRadius - absOffsetY, left: -shadowRadius - absOffsetX },
        ]}
      >
        <Group x={shadowRadius + absOffsetX} y={shadowRadius + absOffsetY}>
          <Shape d={path} fill={backgroundColor} {...shadowProps} />
        </Group>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: "transparent",
    position: "absolute",
  },
});

OuterShadowART.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  borderRadius: PropTypes.number,
  borderTopStartRadius: PropTypes.number,
  borderTopEndRadius: PropTypes.number,
  borderBottomStartRadius: PropTypes.number,
  borderBottomEndRadius: PropTypes.number,
  shadowRadius: PropTypes.number,
  shadowOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  shadowOpacity: PropTypes.number,
  shadowColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};
