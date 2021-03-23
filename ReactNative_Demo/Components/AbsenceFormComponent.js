import React, { useEffect, useState } from "react";
import ReactNative, {
  TextInput,
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  Alert
} from "react-native";
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'


export default function AbsenceFormComponent() {
  const [emailAdress, setEmailAdress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [absenceType, setAbsenceType] = useState("");
  //FromDate state value
  const [fromDate, setFromDate] = useState(new Date());
  const [showFromDatePicker, setshowFromDatePicker] = useState(false);
  const [modeFromDatePicker, setModeFromDatePicker] = useState('');
  //ToDate state value
  const [toDate, setToDate] = useState(new Date());
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [modeToDatePicker, setModeToDatePicker] = useState('');
  const [totalOffDate, setTotalOffDate] = useState("");
  const [includedSaturday, setIncludedSaturday] = useState(0);

  const formUrl =
    "https://docs.google.com/forms/u/2/d/e/1FAIpQLSduUaiV98kwYhBbHmvuhg5uF3-g2DJG3sYv6p9gSbssJtq6GA/formResponse";

  useEffect(() => {
    setProjectName("Admin");
    setAbsenceType("Nghỉ phép [Vacation]");
    setIncludedSaturday(0);
  });

  const handleSetTotalOffDate = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            //alert("please enter numbers only");
        }
    }
    setTotalOffDate(newText);
  }

  //From date picker
  function onClickFromDateButton(){
    setModeFromDatePicker('date');
    setshowFromDatePicker(true);
  }

  function onClickFromTimeButton(){
    setModeFromDatePicker('time');
    setshowFromDatePicker(true);
  }

  function onChangeFromDate(event, date){
    setFromDate(date); 
    setshowFromDatePicker(false);
  }
  //To date picker
  function onClickToDateButton(){
    setModeToDatePicker('date');
    setShowToDatePicker(true);
  }

  function onClickToTimeButton(){
    setModeToDatePicker('time');
    setShowToDatePicker(true);
  }

  function onChangeToDate(event, date){
    setToDate(date); 
    setShowToDatePicker(false);
  }

  handleSubmitForm = () => {
    var formBody = createFormBody();

    fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Fail, error:", error);
        navigation.navigate("MainMenu");
      });
  }

  function createFormBody(){
    var data = {
      "entry.631548922": projectName,
      "entry.1000001_minute": fromDate.getMinutes(),
      "entry.1000001_hour": fromDate.getHours(),
      "entry.1000001_month": fromDate.getMonth(),
      "entry.1000001_year": fromDate.getFullYear(),
      "entry.1000001_day": fromDate.getDay(),
      "entry.744351323_hour": toDate.getHours(),
      "entry.744351323_minute": toDate.getMinutes(),
      "entry.744351323_year": toDate.getFullYear(),
      "entry.744351323_month": toDate.getMonth(),
      "entry.744351323_day": toDate.getDay(),
      "entry.572387094": totalOffDate,
      "entry.1000000": absenceType,
      "entry.1785497431": includedSaturday,
      emailAddress: emailAdress
    }
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
  }

  return (
    <ScrollView>
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
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateContainer}>
          <Button style={styles.textInput}
                title={fromDate.toLocaleDateString()}
                onPress={()=>onClickFromDateButton()}>
          </Button>
        </View>
        <View style={styles.timeContainer}>
          <Button style={styles.textInput}
                  title={fromDate.toLocaleTimeString()}
                  onPress={()=>onClickFromTimeButton()}>
          </Button>
        </View>
      </View>
      {showFromDatePicker && <DateTimePicker
              style ={styles.dateTimePicker}
              testID="fromDateTimePicker"
              value={fromDate}
              mode={modeFromDatePicker}
              is24Hour={true}
              display="default"
              onChange={(event,date) => onChangeFromDate(event,date)}
            />}

      <Text style={styles.textTitle}>To Date:</Text>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateContainer}>
          <Button style={styles.textInput}
                title={toDate.toLocaleDateString()}
                onPress={()=>onClickToDateButton()}>
          </Button>
        </View>
        <View style={styles.timeContainer}>
          <Button style={styles.textInput}
                  title={toDate.toLocaleTimeString()}
                  onPress={()=>onClickToTimeButton()}>
          </Button>
        </View>
      </View>
      {showToDatePicker && <DateTimePicker
              style ={styles.dateTimePicker}
              testID="toDateTimePicker"
              value={toDate}
              mode={modeToDatePicker}
              is24Hour={true}
              display="default"
              onChange={(event,date) => onChangeToDate(event,date)}
            />}
      
      <Text style={styles.textTitle}>Tổng số ngày nghỉ [Total number of leave day]:</Text>
      <TextInput
        style={styles.textInput}
        placeHolder="Tổng số ngày nghỉ [Total number of leave day]:"
        onChangeText={(text) => handleSetTotalOffDate(text)}
        keyboardType='numeric'
        value={totalOffDate}
      />

      <Text style={styles.textTitle}>Tính cả ngày thứ 7:</Text>
      <Picker style={styles.selectBox}
        selectedValue={includedSaturday.toString()}
        onValueChange={(itemValue, itemIndex) => setIncludedSaturday(itemValue)}>
        <Picker.Item label="0" value="0"></Picker.Item>
        <Picker.Item label="1" value="1"></Picker.Item>
        <Picker.Item label="2" value="2"></Picker.Item>
      </Picker>

      <Button style={styles.textInput}
                title="Submit"
                onPress={()=>Alert.alert(confirmAlert.title,confirmAlert.message,confirmAlert.options,confirmAlert.cancelable)}>
          </Button>
    </ScrollView>
  );
}

const confirmAlert = {
  title: "CONFIRM",
  message: "Are you confirm to submit",
  options: [
    {       
      text: 'Cancel',       
      //onPress: () => console.log('Cancel Pressed'),       
      style: 'cancel',     
    },     
    {
      text: 'OK', 
      onPress: () => handleSubmitForm()
    },   
  ],
  cancelable: {cancelable: false}
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
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
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
  },
  dateTimeContainer: {
    flexDirection: "row"
  },
  dateContainer: {
    flex:2,
    padding: 5
  },
  timeContainer: {
    flex:2,
    padding: 5
  }
});
