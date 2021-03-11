import React, { useState } from "react";
import ReactNative, {
  TextInput,
  Text,
  View,
  StyleSheet,
  Input,
} from "react-native";

export default function AbsenceFormComponent() {
  const [emailAdress, setEmailAdress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [absenceType, setAbsenceType] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [totalOffDate, setTotalOffDate] = useState(0);
  const [includedSaturday, setIncludedSaturday] = useState(0);

  // function handleChange(event) {
  //   console.log(event);
  //   setEmailAdress((previous) => "event.target.value");
  // }

  return (
    <View>
      <Text>Your email:</Text>
      <TextInput
        style={styles.textEmail}
        placeHolder="Your email"
        onChangeText={(text) => setEmailAdress(text)}
        value={emailAdress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textEmail: {
    padding: 5,
    margin: 5,
    height: 40,
    width: "100%",
    color: "#000000",
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
});
