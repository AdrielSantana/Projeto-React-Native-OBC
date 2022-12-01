import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

import LifeStatus from "../../Components/Common/LifeStatus";
import CreateHabit from "../../Components/Home/CreateHabit";
import EditHabit from "../../Components/Home/EditHabit";
import StatusBar from "../../Components/Home/StatusBar";

import ChangeNavigationService from "../../Service/ChangeNavigationService";
import HabitService from "../../Service/HabitService";

const Home = ({ route }) => {
  const [mindHabit, setMindHabit] = useState();
  const [moneyHabit, setMoneyHabit] = useState();
  const [bodyHabit, setBodyHabit] = useState();
  const [funHabit, setFunHabit] = useState();

  const [robotDaysLife, setRobotDaysLife] = useState();
  const today = new Date();

  const excludeArea = route.params?.excludeArea;

  useEffect(() => {
    HabitService.findByArea("Mente").then((mind) => {
      setMindHabit(mind[0]);
    });
    HabitService.findByArea("Financeiro").then((money) => {
      setMoneyHabit(money[0]);
    });
    HabitService.findByArea("Corpo").then((body) => {
      setBodyHabit(body[0]);
    });
    HabitService.findByArea("Humor").then((fun) => {
      setFunHabit(fun[0]);
    });

    if (excludeArea) {
      if (excludeArea == "Mente") {
        setMindHabit(null);
      }
      if (excludeArea == "Financeiro") {
        setMoneyHabit(null);
      }
      if (excludeArea == "Corpo") {
        setBodyHabit(null);
      }
      if (excludeArea == "Humor") {
        setFunHabit(null);
      }
    }

    ChangeNavigationService.checkShowHome(1)
      .then((showHome) => {
        const formDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
        const checkDays =
          new Date(formDate) - new Date(showHome.appStartData) + 1;

        setRobotDaysLife(checkDays.toString().padStart(2, "0"));
      })
      .catch((err) => console.log(err));
  }, [route.params]);

  const navigation = useNavigation();

  const handleNavAppExplanation = () => {
    navigation.navigate("AppExplanation");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.dailyChecks}>
            ❤️ {robotDaysLife} {robotDaysLife === "01" ? "dia" : "dias"} - ✅ 80
            Checks
          </Text>

          <LifeStatus />
          <StatusBar />

          {mindHabit ? (
            <EditHabit habit={mindHabit} checkColor="#90B7F3" />
          ) : (
            <CreateHabit habitArea="Mente" borderColor="#90B7F3" />
          )}
          {moneyHabit ? (
            <EditHabit habit={moneyHabit} checkColor="#85BB65" />
          ) : (
            <CreateHabit habitArea="Financeiro" borderColor="#85BB65" />
          )}
          {bodyHabit ? (
            <EditHabit habit={bodyHabit} checkColor="#FF0044" />
          ) : (
            <CreateHabit habitArea="Corpo" borderColor="#FF0044" />
          )}
          {funHabit ? (
            <EditHabit habit={funHabit} checkColor="#FE7F23" />
          ) : (
            <CreateHabit habitArea="Humor" borderColor="#FE7F23" />
          )}
        </View>

        <Text
          style={styles.explanationText}
          onPress={() => {
            handleNavAppExplanation();
          }}
        >
          Ver explicação novamente
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  dailyChecks: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 40,
  },
  explanationText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    paddingBottom: 25,
    paddingTop: 15,
    fontWeight: "bold",
  },
});

export default Home;
