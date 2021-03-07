import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function MainMenu() {
  const formUrl =
    "https://docs.google.com/forms/u/2/d/e/1FAIpQLSduUaiV98kwYhBbHmvuhg5uF3-g2DJG3sYv6p9gSbssJtq6GA/formResponse";

  function createFakeData() {
    var data = {
      "entry.631548922": "CaseNet",
      "entry.1000001_minute": "22",
      "entry.1000001_hour": "11",
      "entry.1000001_month": "3",
      "entry.1000001_year": "2021",
      "entry.1000001_day": "3",
      "entry.744351323_hour": "11",
      "entry.744351323_minute": "22",
      "entry.744351323_year": "2021",
      "entry.744351323_month": "3",
      "entry.744351323_day": "24",
      "entry.572387094": "12321",
      "entry.1000000": "Nghỉ phép [Vacation]",
      "entry.1785497431": "0",
      emailAddress: "fdasfsdaf@gmail.com",
    };

    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // result["entry.1000001_hour"] = 22;
    // result["entry.1000001_minute"] = 22;
    // result["entry.1000001_year"] = 2021;
    // result["entry.1000001_month"] = 33;
    // result["entry.1000001_day"] = 33;
    // result["entry.744351323_hour"] = 22;
    // result["entry.744351323_minute"] = 34;
    // result["entry.744351323_year"] = 2022;
    // result["entry.744351323_month"] = 12;
    // result["entry.744351323_day"] = 3;
    // result["entry.572387094"] = 3;
    // result["entry.1000000"] = "Nghỉ phép [Vacation]";
    // result["entry.1785497431"] = 0;
    // result["emailReceipt"] = true;
    // result["entry.631548922"] = "CaseNet";
    // result["emailAddress"] = "hahahareactnative@gmail.com";
    console.log("data:", formBody);
    return formBody;
  }

  function submitForm() {
    let data = createFakeData();

    fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Fail, error:", error);
      });
  }

  return (
    <View>
      <Text>Press button for test</Text>
      <Button onPress={() => submitForm()} title="Click me"></Button>
    </View>
  );
}
