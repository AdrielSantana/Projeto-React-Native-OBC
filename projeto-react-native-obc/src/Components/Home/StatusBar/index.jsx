import React from "react";
import { StyleSheet, View, Image } from "react-native";

import { ProgressBar } from "react-native-paper";

const StatusBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBarContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/educationIcon.png")}
        />

        <ProgressBar progress={1} color="#90B7F3" style={styles.progress} />
      </View>

      <View style={styles.statusBarContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/moneyIcon.png")}
        />

        <ProgressBar progress={0} color="#85BB65" style={styles.progress} />
      </View>

      <View style={styles.statusBarContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/bodyIcon.png")}
        />

        <ProgressBar progress={1} color="#FF0044" style={styles.progress} />
      </View>

      <View style={styles.statusBarContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/funIcon.png")}
        />

        <ProgressBar progress={1} color="#FE7F23" style={styles.progress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#151515",
    borderRadius: 10,
    marginVertical: 10,
  },
  statusBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  progress: {
    borderRadius: 10,
    width: 250,
    height: 8,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
});

export default StatusBar;
