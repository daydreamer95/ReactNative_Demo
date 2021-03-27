import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainMenu from "./Components/MainMenu";
import AbsenceFormComponent from "./Components/AbsenceFormComponent";
import Footer from "./Components/Footer";
import LoginScreen from "./Components/Login/LoginScreen";
import LoadingScreen from "./Components/Login/LoadingScreen";

import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import { firebaseConfig } from "./fire-base-config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.initializeApp(firebaseConfig);

var { height } = Dimensions.get("window");

var box_count = 3;
var box_height = height / box_count;
const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkIfLoggedIn();
    console.log("isLogin:", isLogin);
  }, [isLogin]);

  checkIfLoggedIn = () => {
    if (isLogin) {
      navigation.navigate("MainMenu");
    }
    firebase.auth().onAuthStateChanged((respone) => {
      if (respone != null && respone.type == "success") {
        isLogin = true;
        console.log(user);
      }
    });
  };

  function onAppLoginAsign() {
    setIsLogin(true);
    console.log("onAppLoginAsign -isLogin:", isLogin);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={[styles.header, styles.box]}>
        <Header></Header>
      </View> */}
      <View style={[styles.mainLayout, styles.box]}>
        <NavigationContainer>
          <Stack.Navigator>
            {isLogin ? (
              <>
                <Stack.Screen name="MainMenu" component={MainMenu} />
                <Stack.Screen
                  name="AbsenceFormComponent"
                  component={AbsenceFormComponent}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  initialParams={{ onAppLoginAsign: onAppLoginAsign }}
                />
              </>
            )}
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
    paddingTop: Platform.OS === "android" ? StatusBar.height : 0,
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
