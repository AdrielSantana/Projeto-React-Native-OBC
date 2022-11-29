import React from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";

const DefaultButton = ({ buttonText, handlePress, width, height }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width: width, height: height }]}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF'
  }
})

export default DefaultButton;
