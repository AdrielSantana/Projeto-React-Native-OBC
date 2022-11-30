import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const EditHabit = ({ habit, frequency, habitArea, checkColor }) => {
  const handleEdit = () => {
    console.log(`editando ${habitArea}`);
  };

  const handleCheck = () => {
    console.log(`checando ${habitArea}`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={handleEdit}
    >
      <View style={styles.habitText}>
        <Text style={styles.habitTitle}>{habit}</Text>
        <Text style={styles.habitFrequency}>{frequency}</Text>
      </View>

      <TouchableOpacity
        style={[styles.check, { borderColor: checkColor }]}
        activeOpacity={0.8}
        onPress={handleCheck}
      ></TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#151515",
    borderRadius: 5,
    width: 320,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  habitTitle: {
    color: "white",
    fontWeight: "bold",
  },
  habitFrequency: {
    color: "white",
  },
  check: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default EditHabit;
