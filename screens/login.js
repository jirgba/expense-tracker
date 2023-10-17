import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export let details
console.log(details);

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

 const submit = () => {
  fetch("http://localhost/Project1/MyApp/api/login.php", {
    method: "POST",
    header: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email:email,
      password:password,
    })
  })
  .then ((response)=>response.json())
  .then((response)=>{
    if(response.msg == "Success"){
      navigation.navigate("Profile");
      details = {
        username: response.db.username,
        email: response.db.email,
        phoneNumber: response.db.phoneNumber
      };
    } else {
      alert("Invalid Login details")
    } 
  }).catch((error)=>{
    alert(error)
  })
};

  return (
    <ImageBackground
      source={require("../assets/exo.jpg")}
      resizeMode="cover"
      style={styles.firstContainer}
    >
      <View style={styles.firstView}>
        <Text style={{ color: "#fff", fontSize: 40, fontWeight: "bold" }}>
          Veritas Soft
        </Text>
        <Text style={{ color: "#fff", fontSize: 20 }}>
          Learn . Share . Progress
        </Text>
      </View>

      <View style={styles.secondContainer}>
        <View style={styles.signUpView}>
          <Text style={{ fontSize: 30 }}>Sign In</Text>
        </View>
        <View style={styles.buttonView}>
          <TextInput placeholder="Email" style={styles.inputStyle} onChangeText={setEmail} />
          <TextInput placeholder="Password" style={styles.inputStyle} onChangeText={setPassword} />
          <TouchableOpacity
            onPress={submit}
            style={{ marginTop: 10, padding: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: 'black' }}
          >
            <Text style={{ color: "white" }}>LOG IN </Text>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 20}}>If don't have an account <Text style={{color: 'blue'}} onPress={() => navigation.push('Register')}>Register</Text></Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
  },
  secondContainer: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  firstView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpView: {
    marginTop: 10,
    alignItems: "center",
  },
  buttonView: {
    margin: 30,
  },
  inputStyle: {
    height: 60,
    width: "100%",
    borderWidth: 0.2,
    padding: 15,
    fontSize: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },
});