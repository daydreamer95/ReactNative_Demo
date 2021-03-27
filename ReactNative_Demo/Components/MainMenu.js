import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function MainMenu({ navigation }) {
  return (
    <View>
      <Text style={styles.headerTitle}>THIS IS MAIN MENU</Text>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("AbsenceFormComponent")}
        title="CREATE ABSENCE REPORT"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: "red",
  },
  button: {
    padding: 15,
  },
});
