import React, { useEffect, useState } from "react";
import ReactNative, { TextInput, Text, View, StyleSheet, Button, ScrollView, Alert } from "react-native";
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
export default function AbsenceFormComponent() {
    <Formik
        initialValues={{ email : ''}}
        onSubmit = {( value => console.log(values))}>
            {({ handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                    <TextInput
                        style={styles.textInput}
                        placeHolder="Your email:"
                        onChangeText={(text) => setEmailAdress(text)}
                        value={emailAdress}
                    />
                    <Button onPress={handleSubmit} title="Submit"></Button>
                </View>
            )}
    </Formik>

}