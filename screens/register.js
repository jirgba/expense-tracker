import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity
  } from "react-native";
  import { useState } from "react";
  
  export default function Register() {
    const [ username, setName ]  = useState('')
    const [ phoneNumber, setPhonenumber]  = useState('')
    const [ email, setEmail]  = useState('')
    const [ password, setPassword]  = useState('')
    
  
    const submit = () => {
      fetch("http://localhost/Project1/MyApp/api/register.php", {
        method: "POST",
        header: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username:username,
          phoneNumber:phoneNumber,
          password:password,
          email:email,
        })
      })
      .then ((response)=>response.json())
      .then((data)=>{
        alert(data);
      }).catch((error)=>{
        alert(error)
      })
    };
    return (
      <ImageBackground
        resizeMode="cover"
        source={require("../assets/exo.jpg")}
        style={styles.firstContainer}
      >
        <View style={styles.secondContainer}>
          <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>
            Veritas Soft
          </Text>
          <Text style={{ color: "white", fontSize: 18 }}>
            Learn . Share . Progress
          </Text>
          <Text style={{ color: "white", fontSize: 13}}>by Ernest</Text>
        </View>
        <View style={styles.thirdContainer}>
          <View style={styles.signUpViewStyle}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Register</Text>
          </View>
          <View style={styles.inputStyleView}>
            <TextInput onChangeText={setName} placeholder="Userame" style={styles.inputstyles} />
            <TextInput onChangeText={setPhonenumber} placeholder="Phone Number" style={styles.inputstyles} />
            <TextInput onChangeText={setEmail} placeholder="Email" style={styles.inputstyles} />
            <TextInput onChangeText={setPassword} placeholder="Password" style={styles.inputstyles} />
            <TouchableOpacity onPress={submit} style={styles.loginsTyles}>
              <Text style={{color: 'white'}}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create(
    {
    firstContainer: {
      flex: 1,
    },
    secondContainer: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    thirdContainer: {
      flex: 3.8,
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    signUpViewStyle: {
      marginTop: 15,
      alignItems: "center",
    },
    inputStyleView: {
      margin: 30,
    },
    inputstyles: {
      borderWidth: 0.3,
      height: 60,
      width: "100%",
      padding: 15,
      fontSize: 20,
      borderRadius: 20,
      marginTop: 20,
    },
    loginsTyles: {
      borderWidth: 0.3,
      height: 60,
      width: "100%",
      padding: 15,
      fontSize: 20,
      borderRadius: 30,
      marginTop: 20,
      backgroundColor: 'black',
      alignItems: 'center'
    }
  });