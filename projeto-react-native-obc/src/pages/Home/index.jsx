import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

import LifeStatus from "../../Components/Common/LifeStatus";
import CreateHabit from "../../Components/Home/CreateHabit";
import EditHabit from "../../Components/Home/EditHabit";
import StatusBar from "../../Components/Home/StatusBar";
import DefaultButton from "../../Components/Common/DefaultButton";

import ChangeNavigationService from "../../Service/ChangeNavigationService";
import HabitsService from "../../Service/HabitsService";
import CheckService from "../../Service/CheckService";

import db from "../../Database";

const Home = ({ route }) => {
  const [mindHabit, setMindHabit] = useState();
  const [moneyHabit, setMoneyHabit] = useState();
  const [bodyHabit, setBodyHabit] = useState();
  const [funHabit, setFunHabit] = useState();

  const [robotDaysLife, setRobotDaysLife] = useState();
  const [checks, setChecks] = useState();
  const [gameOver, setGameOver] = useState(false);

  const today = new Date();

  const excludeArea = route.params?.excludeArea;

  useEffect(() => {
    HabitsService.findByArea("Mente").then((mind) => {
      setMindHabit(mind[0]);
    });
    HabitsService.findByArea("Financeiro").then((money) => {
      setMoneyHabit(money[0]);
    });
    HabitsService.findByArea("Corpo").then((body) => {
      setBodyHabit(body[0]);
    });
    HabitsService.findByArea("Humor").then((fun) => {
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
        const month = `${today.getMonth() + 1}`.padStart(2, "0");
        const day = `${today.getDate()}`.padStart(2, "0");
        const formDate = `${today.getFullYear()}-${month}-${day}`;
        const checkDays =
          new Date(formDate) - new Date(showHome.appStartData) + 1;

        if (checkDays === 0) {
          setRobotDaysLife(checkDays.toString().padStart(2, "0"));
        } else {
          setRobotDaysLife(parseInt(checkDays / (1000 * 3600 * 24)));
        }
      })
      .catch((err) => console.log(err));
  }, [route.params]);

  useEffect(() => {
    CheckService.removeCheck(mindHabit, moneyHabit, bodyHabit, funHabit);
    CheckService.checkStatus(mindHabit, moneyHabit, bodyHabit, funHabit);

    const mindChecks = mindHabit ? mindHabit?.habitChecks : 0;
    const moneyChecks = moneyHabit ? moneyHabit?.habitChecks : 0;
    const bodyChecks = bodyHabit ? bodyHabit?.habitChecks : 0;
    const funChecks = funHabit ? funHabit?.habitChecks : 0;

    setChecks(mindChecks + moneyChecks + bodyChecks + funChecks);

    if (
      mindHabit?.progressBar === 0 ||
      moneyHabit?.progressBar === 0 ||
      bodyHabit?.progressBar === 0 ||
      funHabit?.progressBar === 0
    ) {
      setGameOver(true);
    }
  }, [mindHabit, moneyHabit, bodyHabit, funHabit]);

  const navigation = useNavigation();

  const handleNavAppExplanation = () => {
    navigation.navigate("AppExplanation");
  };

  function handleGameOver() {
    navigation.navigate("Start");

    db.transaction((tx) => {
      tx.executeSql("DROP TABLE habits;");

      tx.executeSql("DROP TABLE change_navigation;");

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS change_navigation (id INTEGER PRIMARY KEY AUTOINCREMENT, showHome BOOLEAN, appStartData TEXT);",
        [],
        (_, error) => {
          console.log(
            "Transaction ChangeNavigationService Error: " +
              JSON.stringify(error)
          );
        }
      );

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY AUTOINCREMENT, habitArea TEXT, habitName TEXT, habitFrequency TEXT, habitHasNotification BOOLEAN, habitNotificationFrequency TEXT, habitNotificationTime TEXT, lastCheck TEXT, daysWithoutChecks INTEGER, progressBar INTEGER, habitIsChecked BOOLEAN, habitChecks INTEGER);",
        [],
        (_, error) => {
          console.log(
            "Transaction HabitService Error: " + JSON.stringify(error)
          );
        }
      );
    });
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          {!gameOver ? (
            <Text style={styles.dailyChecks}>
              ❤️ {robotDaysLife} {robotDaysLife === "1" ? "dia" : "dias"} - ✅{" "}
              {checks} {checks === 1 ? "Check" : "Checks"}
            </Text>
          ) : (
            <Text style={styles.gameOverTitle}>Game Over</Text>
          )}

          <LifeStatus
            mindHabit={mindHabit}
            moneyHabit={moneyHabit}
            bodyHabit={bodyHabit}
            funHabit={funHabit}
          />

          <StatusBar
            mindHabit={mindHabit?.progressBar}
            moneyHabit={moneyHabit?.progressBar}
            bodyHabit={bodyHabit?.progressBar}
            funHabit={funHabit?.progressBar}
          />

          {!gameOver ? (
            <View>
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

              <Text
                style={styles.explanationText}
                onPress={() => {
                  handleNavAppExplanation();
                }}
              >
                Ver explicações novamente
              </Text>
            </View>
          ) : (
            <View style={{ marginVertical: 40 }}>
              <DefaultButton
                buttonText={"Resetar o Game"}
                handlePress={handleGameOver}
                width={250}
                height={50}
              />
            </View>
          )}
        </View>
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
  gameOverTitle: {
    marginVertical: 25,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default Home;
