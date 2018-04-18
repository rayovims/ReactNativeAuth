import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import { Header, Button, CardSection, Spinner } from "./components/common";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyClWVNgQZ4PLv75V2AVi8DOCk0ja88H_bY",
      authDomain: "authentication-18eae.firebaseapp.com",
      databaseURL: "https://authentication-18eae.firebaseio.com",
      projectId: "authentication-18eae",
      storageBucket: "authentication-18eae.appspot.com",
      messagingSenderId: "1019545095021"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
