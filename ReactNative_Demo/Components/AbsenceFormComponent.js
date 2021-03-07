import React, { useState } from "react";
import ReactNative, { TextInput, Text, View, StyleSheet } from "react-native";

export default function AbsenceFormComponent() {
  const [emailAdress, setEmailAdress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [absenceType, setAbsenceType] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [totalOffDate, setTotalOffDate] = useState(0);
  const [includedSaturday, setIncludedSaturday] = useState(0);

  function handleChange() {}

  return (
    <View>
      <Text>Your email:</Text>
      <TextInput
        style={styles.textEmail}
        placeHolder="Your email"
        onChangeText={() => this.handleChange}
        value={emailAdress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textEmail: {
    height: "40px",
  },
});
