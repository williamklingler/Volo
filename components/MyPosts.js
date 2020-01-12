import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, TouchableOpacity, ScrollView, Button, Text} from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

var postsObject;
export default class MyPosts extends React.Component{
  constructor(props){
    super(props);
    self = this;
    collectionThumbnails = [];
    this.state = {x: collectionThumbnails.length};
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        this.setState({ loggedIn: true, isLoading: false, userEmail: user.email });
        db.collection('users').doc(this.state.userEmail).get().then(function(doc){
          postsObject = doc.data();
          for (var i = 0; i < postsObject.messageNumber; i++){
              var url = postsObject["post" + i.toString()];
              console.log(url);
              collectionThumbnails.push({key: collectionThumbnails.length, source: url});
              self.setState({x: collectionThumbnails.length});
          }
        });
      }
      else {
        console.log('not logged in');
        this.setState({ loggedIn: false, isLoading: false });
      }
    });
  }
  render(){
    return(
      <View style = {styles.container}>
      <Button title = {'Post an Image'} onPress ={() => this.props.navigation.navigate('ImagePicker', {navigation: this.props.navigation})} />
      <ScrollView>
      <FlatList
      extraData = {this.state}
      data={collectionThumbnails}
      renderItem={ ({item}) => {
        return (
          <TouchableOpacity onPress = {() =>  {/*this.props.navigation.navigate('Collection', {collectionName: item.collectionIdentifier})*/}} >
          <View style = {styles.box}>
          <Image source = {{uri: item.source}} style = {styles.image}/>
          </View>
          </TouchableOpacity>
        )}}
        numColumns={2}
        />
        </ScrollView>
        <View> <Text> hello </Text> </View>
        </View>
      )
    }
  }
  const styles = StyleSheet.create({
    image: {
      width: w/2.2,
      height: h/2.7,
      marginHorizontal: ((w-w/2.2*2)/6),
      marginVertical: h/150,
      borderWidth: h*w/1050000,
      borderColor: 'black',

    },
    container: {
      flex: 1,
      paddingTop: 22
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
    box: {
      marginHorizontal: ((w-w/2.2*2)/6),
      marginVertical: h/150,
      width: w/2.15,
      height:  h/2.6,
      backgroundColor: 'black',
    },
  });
