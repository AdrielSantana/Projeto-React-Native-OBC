import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import DefaultButton from "../../Components/Common/DefaultButton";
import ExplanationCard from "../../Components/Explanation/ExplanationCard";
import ChangeNavigationService from "../../Service/ChangeNavigationService";

const AppExplanation = () => {
  const navigation = useNavigation();
  const [showHome, setShowHome] = useState(false);
  const startDate = new Date();
  const month = `${startDate.getMonth() + 1}`.padStart(2, "0");
  const day = `${startDate.getDate()}`.padStart(2, "0");
  const appStartData = `${startDate.getFullYear()}-${month}-${day}`;

  const handleNavHome = () => {
    navigation.navigate("Home");
  };

  function handleSetShowHome() {
    if (!showHome) {
      setShowHome(true);
      ChangeNavigationService.setShowHome({ showHome: true, appStartData })
        .then(() => console.log(`Sucesso! ${showHome} ${appStartData}`))
        .catch((err) => console.log(err));

      handleNavHome();
    }

    handleNavHome();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>
            Antes, deixa {"\n"} eu te explicar...
          </Text>
          <ExplanationCard />
          <Text style={styles.descriptonCta}>
            Pronto(a) para subir de nível na vida?
          </Text>
          <Text style={styles.descripton}>
            Na próxima tela você vai poder escolher {"\n"} seus 4 hábitos de
            forma individual.
          </Text>
          <DefaultButton
            buttonText={"Continuar"}
            handlePress={handleSetShowHome}
            width={250}
            height={50}
          />
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
  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 40,
  },
  descriptonCta: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  descripton: {
    color: "#FFF",
    textAlign: "center",
    marginBottom: 30,
  },
});

export default AppExplanation;
