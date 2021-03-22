import React from "react";
import { StyleSheet, Text, View, Dimensions,SafeAreaView, Platform, StatusBar } from "react-native";
import MainMenu from "./Components/MainMenu";
import AbsenceFormComponent from "./Components/AbsenceFormComponent";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
var { height } = Dimensions.get("window");

var box_count = 3;
var box_height = height / box_count;
const Stack = createStackNavigator();

export default function App({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={[styles.header, styles.box]}>
        <Header></Header>
      </View> */}
      <View style={[styles.mainLayout, styles.box]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "MainMenu">
            <Stack.Screen name="MainMenu" component={MainMenu}/>
            <Stack.Screen name="AbsenceFormComponent" component={AbsenceFormComponent}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <View style={[styles.footer, styles.box]}>
        <Footer></Footer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? StatusBar.height : 0
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
