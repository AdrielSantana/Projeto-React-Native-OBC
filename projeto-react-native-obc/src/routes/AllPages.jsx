import { NavigationContainer } from "@react-navigation/native";
import { createNavigateStackNavigator } from "@react-navigation/native-stack";

import Start from "../pages/Start";

const Start = createNavigateStackNavigator();

const AllPages = () => {
  return (
    <NavigationContainer>
      <Stack.Navigatior
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={Start} />
      </Stack.Navigatior>
    </NavigationContainer>
  );
};

export default AllPages;
