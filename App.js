import React from "react";
import "react-native-gesture-handler";
import ExpenseTrackerApp from "./expenseTracker";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native";
export default function App() {
  const Nav = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      <Nav.Navigator>
        <Nav.Screen component={ExpenseTrackerApp} name="Expense Tracker" />
      </Nav.Navigator>
    </NavigationContainer>
  );
}
