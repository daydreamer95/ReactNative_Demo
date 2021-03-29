import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Google from "expo-google-app-auth";

export default function LoginScreen(props) {
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        clientId:
          "1014057597814-ila7th1d5a0vu0mncv9b0ra1rchc7o2f.apps.googleusercontent.com",
        // androidStandaloneAppClientId: `67:6D:5F:D6:E1:5A:9E:5A:26:75:45:57:2B:52:00:0B:CD:7F:4B:F8`,
        scopes: ["profile", "email"],
      });
      console.log("props =", props);
      await props.route.params.onAppLoginAsign();
      navigation.navigate("MainMenu");
    } catch (error) {
      return { error: true };
    }
  };

  return (
    <View>
      <Text>Sign In With Google</Text>
      <Button
        title="Sign In With Google"
        onPress={() => this.signInWithGoogleAsync()}
      />
    </View>
  );
}
