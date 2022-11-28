import React from "react";
import { View, ScrollView, Text, Image } from "react-native";

const Start = () => {
  return (
    <View>
      <ScrollView showVerticalScrollIndicator={false}>
        <View>
          <Image source={require("../../assets/icons/logo3.png")} />
          <Text>
            Vamos transformar sua vida {"\n"} em jogo, buscando sempre {"\n"} o
            melhor nível.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Start;
