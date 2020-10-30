import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();

    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;
  return (
    <View style={styles.sensor}>
      <Text style={styles.text}>Acelerômetro: (Mexa o celular para mudar o valor de X, Y e Z)</Text>
      <Text style={styles.text}>
        X: {round(x)} Y: {round(y)} Z: {round(z)}
      </Text>
      <Text  style={styles.text1}>Funcões: </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={_toggle} style={styles.button}>
          <Text style={styles.text1}>Pausar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text style={styles.text1}>Devagar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text style={styles.text1}>Rápido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#FF1493",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#836FFF',
    padding: 15,
    display: 'flex',
    

  },
  middleButton: {
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderColor: '#000000',
  },
  sensor: {
    marginTop: 250,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  text1: {
    fontSize: 15,
    marginLeft: 5,
    fontStyle: 'italic'
  },
});

