import React from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";

const Start = () => {
  return (
    <View style={styles.container}>
      <ScrollView showVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <Image 
          source={require("../../assets/icons/logo3.png")}
          style={styles.logo}
          />
          <Text style={styles.description}>
            Vamos transformar sua vida {"\n"} em jogo, buscando sempre {"\n"} o
            melhor nível.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },

  logo: {
    width: 300,
    height: 60,
    marginBottom: 20,
    marginTop: 60,
  },

  description: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 60,
  },
});

export default Start;
