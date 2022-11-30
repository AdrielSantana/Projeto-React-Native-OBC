import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

import LifeStatus from "../../Components/Common/LifeStatus";
import CreateHabit from "../../Components/Home/CreateHabit";
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
          <CreateHabit habitArea={"Mente"} borderColor={"#90B7F3"} />
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
