import Search from "./components/Search";
import List_result from "./components/List_result";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function App() {
  return (
      <NavigationContainer>
          <Tabs.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, size, color }) => {
                      let iconName;
                      if (route.name == "Recherche") {
                          iconName = focused ? "search" : "search-outline";
                      } else if (route.name == "Musique") {
                          iconName = focused ? "musical-notes" : "musical-notes-outline";
                      }
                      return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: "#11570f",
                  tabBarInactiveTintColor: "grey",
              })}
          >
              <Tabs.Screen
                  name="Recherche"
                  initialParams={{ addElement: null }}
                  component={Search}
              />
              <Tabs.Screen
                  name="Musique"
                  initialParams={{ addElement: null }}
                  component={List_result}
              />
          </Tabs.Navigator>
      </NavigationContainer>
  );
}
const Tabs = createBottomTabNavigator();
