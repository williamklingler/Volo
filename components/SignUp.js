import React from 'react';
import {Text, StyleSheet, View, TextInput, Button, TouchableOpacity} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class SignUp extends React.Component{
  constructor(props){
    super(props);
    self = this;
    this.state = {email: '', password: '', password2: '',errorMessage: '',};
  }
  signUpUser(){
    if (this.state.password === this.state.password2){
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('error');
        console.log(errorCode);
      self.setState((state) => ({
          errorMessage: errorMessage
        }));
      });
    }
      else {
        this.setState({errorMessage: 'Passwords do not match'});
      }
    }
    render(){
      return(
        <View style = {styles.container}>
        <View style = {styles.input}>
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
        <View style = {styles.input}>
        <TextInput
        placeholder = {'Retype Password'}
        autoCapitalize = {'none'}
        autoCorrect = {false}
        onChangeText = {(text) => this.setState({password2: text})}
        secureTextEntry = {true}
        />
        </View>
        <Button title  = {'Submit'} onPress = {() => this.signUpUser()} style = {styles.center}/>
        <Button title = {'Login'} onPress =  {() =>  {this.props.navigation.navigate('Login',{navigation: this.props.navigation})}} />
        <Text> {this.state.email} </Text>
        <Text> {this.state.password} </Text>
        <Text> {this.state.password2} </Text>
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

  /*<TouchableOpacity>
  <View style ={{width: '90%', height: '40%', borderRadius: 50, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center'}} >
  <Text> Submit </Text>
  </View>
  </TouchableOpacity>*/
