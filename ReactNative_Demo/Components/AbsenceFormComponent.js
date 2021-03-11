import React, { useState } from "react";
import ReactNative, {
  TextInput,
  Text,
  View,
  StyleSheet,
  Input,
} from "react-native";
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function AbsenceFormComponent() {
  const [emailAdress, setEmailAdress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [absenceType, setAbsenceType] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [totalOffDate, setTotalOffDate] = useState(0);
  const [includedSaturday, setIncludedSaturday] = useState(0);
  const [show, setShow] = useState(false);

  // function handleChange(event) {
  //   console.log(event);
  //   setEmailAdress((previous) => "event.target.value");
  // }

  return (
    <View>
      <Text style={styles.textTitle}>Your email:</Text>
      <TextInput
        style={styles.textInput}
        placeHolder="Your email:"
        onChangeText={(text) => setEmailAdress(text)}
        value={emailAdress}
      />
      <Text style={styles.textTitle}>Project Name:</Text>
      <Picker style={styles.selectBox}
        selectedValue={projectName}
        onValueChange={(itemValue, itemIndex) => setProjectName(itemValue)}>
        <Picker.Item label="Admin" value="Admin"></Picker.Item>
        <Picker.Item label="CaseNet" value="CaseNet"></Picker.Item>
        <Picker.Item label="Agenda" value="Agenda"></Picker.Item>
        <Picker.Item label="Document Captuaring" value="Document Captuaring"></Picker.Item>
        <Picker.Item label="QA" value="QA"></Picker.Item>
        <Picker.Item label="Visual Analytics" value="Visual Analytics"></Picker.Item>
      </Picker>

      <Text style={styles.textTitle}>Absence Type:</Text>
      <Picker style={styles.selectBox}
        selectedValue={absenceType}
        onValueChange={(itemValue, itemIndex) => setAbsenceType(itemValue)}>
        <Picker.Item label="Nghỉ phép [Vacation]" value="Nghỉ phép [Vacation]"></Picker.Item>
        <Picker.Item label="Nghỉ ốm [Sick leave]" value="Nghỉ ốm [Sick leave]"></Picker.Item>
        <Picker.Item label="Nghỉ thai sản [Maternity leave]" value="Nghỉ thai sản [Maternity leave]"></Picker.Item>
        <Picker.Item label="A1 / A2 / A3" value="A1 / A2 / A3"></Picker.Item>
        <Picker.Item label="Huỷ phép [Cancel the absence request]" value="Huỷ phép [Cancel the absence request]"></Picker.Item>
      </Picker>
        
      <Text style={styles.textTitle}>From Date:</Text>

      <View>
      <Text style={styles.textInput}
            value={fromDate}
            onFocus={()=>setShow(true)}>
      </Text>
      {show && <DateTimePicker
          style ={styles.dateTimePicker}
          testID="dateTimePicker"
          value={fromDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={(event,seletecDate) => setFromDate(seletecDate)}
        />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    margin: 10,
    height: 40,
    color: "#000000",
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
  },
  selectBox: {
    padding:5,
    margin: 10,
    height: 40,
    color: "#000000",
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  textTitle: {
    padding: 5,
    margin: 5
  },
  dateTimePicker: {
    padding: 10,
    margin: 10,
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
  }
});
