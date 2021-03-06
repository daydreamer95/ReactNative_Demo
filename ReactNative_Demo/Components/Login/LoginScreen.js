import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Google from "expo-google-app-auth";

import { firebaseConfig } from "../../fire-base-config";
import * as firebase from "firebase";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function LoginScreen(props) {
  function onSignIn(googleUser) {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        // var credential = firebase.auth.GoogleAuthProvider.credential(
        //     googleUser.getAuthResponse().id_token);
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            console.log("user sign in");
            firebase
              .database()
              .ref("/users/" + result.user.uid)
              .set({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
              })
              .then(function (snapshot) {});
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  }

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        clientId:
          "921783557922-kuabsiefu1tvsh059dcjjufc5ljuu5tf.apps.googleusercontent.com",
        // "1014057597814-ila7th1d5a0vu0mncv9b0ra1rchc7o2f.apps.googleusercontent.com",
        // androidStandaloneAppClientId: `67:6D:5F:D6:E1:5A:9E:5A:26:75:45:57:2B:52:00:0B:CD:7F:4B:F8`,
        scopes: ["profile", "email"],
      });

      if (result.type == "success") {
        console.log("props =", props);
        onSignIn(result);
        await props.route.params.onAppLoginAsync();
        navigation.navigate("MainMenu");
      } else {
        return { cancelled: true };
      }
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
