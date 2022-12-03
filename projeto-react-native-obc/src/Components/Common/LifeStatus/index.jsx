import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import AnimationService from "../../../Service/AnimationService";

import Lottie from "lottie-react-native";

const LifeStatus = ({ mindHabit, moneyHabit, bodyHabit, funHabit }) => {
  const [mind, setMind] = useState();
  const [money, setMoney] = useState();
  const [robot, setRobot] = useState();

  useEffect(() => {
    AnimationService.animationStatus(
      mindHabit?.progressBar,
      moneyHabit?.progressBar,
      bodyHabit?.progressBar,
      funHabit?.progressBar,
      setMind,
      setMoney,
      setRobot
    );
  }, [mindHabit, moneyHabit, bodyHabit, funHabit]);

  return (
    <View style={styles.container}>
      <Lottie
        source={mind}
        autoPlay
        loop
        style={styles.educationAnimation}
      />

      <Lottie
        source={money}
        autoPlay
        loop
        style={styles.moneyAnimation}
      />

      <Lottie
        source={robot}
        autoPlay
        loop
        style={styles.robotAnimation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
  },
  robotAnimation: {
    width: 190,
    marginTop: 30,
    marginLeft: 25,
  },
  educationAnimation: {
    width: 100,
    marginTop: 50,
    marginLeft: 5,
    position: "absolute",
  },
  moneyAnimation: {
    width: 100,
    marginTop: 50,
    marginLeft: 95,
    position: "absolute",
  },
});

export default LifeStatus;
