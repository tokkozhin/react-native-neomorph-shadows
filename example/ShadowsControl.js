/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { Shadow } from '../';

const ShadowsControl = () => {
  const [color, setColor] = useState(160);
  const [colorRed, setColorRed] = useState(160);
  const [colorGreen, setColorGreen] = useState(160);
  const [colorBlue, setColorBlue] = useState(160);
  const [borderRadius, setBorderRadius] = useState(20);
  const [shadowRadius, setShadowRadius] = useState(10);
  const colorStr = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;

  return (
    <View style={styles.main}>
      <Shadow
        inner
        style={{
          borderRadius: borderRadius,
          shadowColor: colorStr,
          shadowRadius: shadowRadius,
          ...styles.shadowStyle,
        }}>
        <Text style={styles.textShadow}>INNER ONLY{'\n'}ART SHADOW</Text>
      </Shadow>
      <View style={{ height: 20 }} />
      <View style={{ flexDirection: 'row' }}>
        <Shadow
          draw
          style={{
            borderRadius: borderRadius,
            shadowColor: colorStr,
            shadowRadius: shadowRadius,
            ...styles.shadowStyle,
          }}>
          <Text style={styles.textShadow}>ART{'\n'}SHADOW</Text>
        </Shadow>
        <View style={{ width: 40 }} />
        <Shadow
          style={{
            borderRadius: borderRadius,
            shadowColor: colorStr,
            shadowRadius: shadowRadius,
            ...styles.shadowStyle,
          }}>
          <Text style={styles.textShadow}>NATIVE IOS{'\n'}SHADOW</Text>
        </Shadow>
      </View>
      <View style={{ height: 50 }} />
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
          maximumValue={200}
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
    backgroundColor: '#ECF0F3',
    textAlign: 'center',
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
  shadowStyle: {
    shadowOpacity: 1,
    backgroundColor: '#ECF0F3',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShadowsControl;
