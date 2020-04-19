/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { NeomorphBlur } from '../';

const NeomorphBlurControl = () => {
  const [color, setColor] = useState(235);
  const [colorRed, setColorRed] = useState(236);
  const [colorGreen, setColorGreen] = useState(240);
  const [colorBlue, setColorBlue] = useState(243);
  const [borderRadius, setBorderRadius] = useState(20);
  const [shadowRadius, setShadowRadius] = useState(10);
  const colorStr = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;
  return (
    <View style={[styles.main, { backgroundColor: colorStr }]}>
      <View style={{ flexDirection: 'row' }}>
        <NeomorphBlur
          style={{
            ...styles.neomorphBlurStyle,
            borderRadius: borderRadius,
            shadowRadius: shadowRadius,
            backgroundColor: colorStr,
          }}
        />
      </View>

      <View style={{ height: 80 }} />
      <View style={{ width: 300 }}>
        <View style={styles.blockValue}>
          <Text style={styles.blockValueText}>Color:</Text>
          <Text style={styles.blockValueText2}>{colorStr}</Text>
        </View>
        <Slider
          minimumTrackTintColor="red"
          maximumValue={255}
          minimumValue={0}
          style={{ width: '100%' }}
          onValueChange={val => setColorRed(val)}
          step={1}
          value={color}
        />
        <Slider
          minimumTrackTintColor="green"
          maximumValue={255}
          minimumValue={0}
          style={{ width: '100%' }}
          onValueChange={val => setColorGreen(val)}
          step={1}
          value={color}
        />
        <Slider
          minimumTrackTintColor="blue"
          maximumValue={255}
          minimumValue={0}
          style={{ width: '100%' }}
          onValueChange={val => setColorBlue(val)}
          step={1}
          value={color}
        />
        <Slider
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          maximumValue={255}
          minimumValue={0}
          style={{ width: '100%' }}
          onValueChange={val => {
            setColorRed(val);
            setColorGreen(val);
            setColorBlue(val);
            setColor(val);
          }}
          step={1}
          value={230}
        />
        <View style={{ height: 25 }} />
        <View style={styles.blockValue}>
          <Text style={styles.blockValueText}>Border radius:</Text>
          <Text style={styles.blockValueText2}>{Math.round(borderRadius)}</Text>
        </View>
        <Slider
          minimumTrackTintColor="black"
          maximumValue={100}
          minimumValue={0}
          style={{ width: '100%' }}
          onValueChange={val => setBorderRadius(val)}
          value={20}
          step={1}
        />
        <View style={{ height: 25 }} />
        <View style={styles.blockValue}>
          <Text style={styles.blockValueText}>Shadow radius:</Text>
          <Text style={styles.blockValueText2}>{Math.round(shadowRadius)}</Text>
        </View>
        <Slider
          minimumTrackTintColor="black"
          maximumValue={50}
          minimumValue={0}
          style={{ width: '100%' }}
          onValueChange={val => setShadowRadius(val)}
          value={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textShadow: {
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  blockValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockValueText: {
    fontSize: 14,
  },
  blockValueText2: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
  },
  neomorphBlurStyle: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NeomorphBlurControl;
