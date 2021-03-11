import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MainMenu from "./Components/MainMenu";
import AbsenceFormComponent from "./Components/AbsenceFormComponent";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

var { height } = Dimensions.get("window");

var box_count = 3;
var box_height = height / box_count;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.box]}>
        <Footer></Footer>
      </View>
      <View style={[styles.mainLayout, styles.box]}>
        <AbsenceFormComponent></AbsenceFormComponent>
      </View>
      <View style={[styles.footer, styles.box]}>
        <Footer></Footer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  box: {
    height: box_height,
  },
  header: {
    flex: 1,
    backgroundColor: "#2196F3",
  },
  mainLayout: {
    flex: 10,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    flex: 1,
    backgroundColor: "#e3aa1a",
  },
});
