import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainMenu from "./Components/MainMenu";
import AbsenceFormComponent from "./Components/AbsenceFormComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <AbsenceFormComponent></AbsenceFormComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
