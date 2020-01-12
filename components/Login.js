import React from 'react';
import {TextInput, Text, View, StyleSheet, Button} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Login extends React.Component{
  constructor(props){
    super(props);
    self = this;
    this.state = {email: '', password: '', errorMessage: ''}
  }
  LoginUser(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  this.setState({errorMessage: errorMessage});
  // ...
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    self.props.navigation.popToTop();
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(email);
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
  }
  render(){
    return(
      <View style = {styles.container}>
      <View style = {styles.input} >
      <TextInput
      placeholder = {'Email'}
      autoCapitalize = {'none'}
      keyboardType = {'email-address'}
      autoCorrect = {false}
      onChangeText={(text) => this.setState({email: text})}
      />
      </View>
      <View style = {styles.input}>
      <TextInput
      placeholder = {'Password'}
      autoCapitalize = {'none'}
      autoCorrect = {false}
      onChangeText = {(text) => this.setState({password: text})}
      secureTextEntry = {true}
      />
      </View>
      <Button title  = {'Submit'} onPress = {() => this.LoginUser()} style = {styles.center}/>
      <Text> {this.state.email} </Text>
      <Text> {this.state.password} </Text>
      <Text style = {{color: 'red'}}> {this.state.errorMessage} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
   flex: 1,
   paddingTop: 22
  },
})
