import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

import LifeStatus from "../../Components/Common/LifeStatus";
import CreateHabit from "../../Components/Home/CreateHabit";
import EditHabit from "../../Components/Home/EditHabit";
import StatusBar from "../../Components/Home/StatusBar";

const Home = () => {
  const [mindHabit, setMindHabit] = useState();
  const [moneyHabit, setMoneyHabit] = useState();
  const [bodyHabit, setBodyHabit] = useState();
  const [funHabit, setFunHabit] = useState();

  const navigation = useNavigation();

  const handleNavAppExplanation = () => {
    navigation.navigate("AppExplanation");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.dailyChecks}>❤️ 20 dias - ✅ 80 checks</Text>

          <LifeStatus />
          <StatusBar />

          {mindHabit ? (
            <EditHabit
              habit={mindHabit?.habitName}
              frequency={`${mindHabit?.habitTime} - ${mindHabit?.habitFrequency}`}
              habitArea={mindHabit?.habitArea}
              checkColor={"#90B7F3"}
            />
          ) : (
            <CreateHabit habitArea={"Mente"} borderColor={"#90B7F3"} />
          )}

          {moneyHabit ? (
            <EditHabit
              habit={moneyHabit?.habitName}
              frequency={`${moneyHabit?.habitTime} - ${moneyHabit?.habitFrequency}`}
              habitArea={moneyHabit?.habitArea}
              checkColor={"#85BB65"}
            />
          ) : (
            <CreateHabit habitArea={"Financeiro"} borderColor={"#85BB65"} />
          )}

          {bodyHabit ? (
            <EditHabit
              habit={bodyHabit?.habitName}
              frequency={`${bodyHabit?.habitTime} - ${bodyHabit?.habitFrequency}`}
              habitArea={bodyHabit?.habitArea}
              checkColor={"#FF0044"}
            />
          ) : (
            <CreateHabit habitArea={"Corpo"} borderColor={"#FF0044"} />
          )}

          {funHabit ? (
            <EditHabit
              habit={funHabit?.habitName}
              frequency={`${funHabit?.habitTime} - ${funHabit?.habitFrequency}`}
              habitArea={funHabit?.habitArea}
              checkColor={"#FE7F23"}
            />
          ) : (
            <CreateHabit habitArea={"Humor"} borderColor={"#FE7F23"} />
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
