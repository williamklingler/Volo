import React from 'react';
import {Text, StyleSheet, View, TextInput, Button, TouchableOpacity} from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import LoaderNoFlash from './LoaderNoFlash';

export default class UploadImage extends React.Component{
  constructor(props){
    super(props);
    self = this;
    this.state={uploadProgress: 0};
  }
  uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var messageNumberString;
    var messageNumber;
    var uploadTask = firebase.storage().ref().child('my-image').put(blob);

    uploadTask.on('state_changed', function(snapshot) {

      self.setState((state) => ({uploadProgress: snapshot.bytesTransferred / snapshot.totalBytes*100}));
      self.forceUpdate();

    }, function(error){}, function(){

      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

        console.log('File available at', downloadURL);
        db.collection('users').doc(self.state.userEmail).get().then(function(doc){
          messageNumber = doc.data().messageNumber;
          db.collection('users').doc(self.state.userEmail).update({messageNumber: messageNumber +1});
          messageNumberString = messageNumber.toString();
          db.collection('users').doc(self.state.userEmail).set({
            ["post"+ messageNumberString]: downloadURL,
          },{merge: true});
        });
      });
    });
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        this.setState({ loggedIn: true, isLoading: false, userEmail: user.email });
      } else {
        console.log('not logged in');
        this.setState({ loggedIn: false, isLoading: false });
      }
    });
  }
  render(){
    return(
      <View>
      <Button title = {'Upload Image'} onPress ={() => this.uploadImage(this.props.navigation.state.params.imageUri)} />
      <LoaderNoFlash uploadProgress = {this.state.uploadProgress} />
      </View>
    )
  }
}
