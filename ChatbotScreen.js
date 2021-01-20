// App.js
import React, {Component} from 'react';
import {View, StyleSheet, Pressable, Text, Image} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Dialogflow_V2} from 'react-native-dialogflow';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {dialogflowConfig} from './env';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://i.imgur.com/WFNNnIr.png',
};

class ChatbotScreen extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am CHAC 🤖 from UPSI. Type 'Need Help' if you need any assistant.`,
        createdAt: new Date(),
        user: BOT_USER,
      },
    ],
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error),
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  render() {
    return (
      <>
        <Pressable style={styles.actionBar}>
          <Image
            style={styles.chacLogo}
            source={{uri: 'https://i.imgur.com/tk0Uhfp.png'}}
          />
          <View style={styles.headerMiddleText}>
            <Text style={styles.headerText}>ChacBot</Text>
            <View style={styles.headerBottomText}>
              <Image
                style={styles.onlineLogo}
                source={{
                  uri:
                    'https://www.pinclipart.com/picdir/middle/33-330310_snowboarding-clip-art-green-circle-logo-transparent-png.png',
                }}
              />
              <Text style={styles.smallHeaderText}>Online Now</Text>
            </View>
          </View>
          <Entypo
            name="dots-three-vertical"
            size={30}
            color="#fff"
            style={styles.headerLogo}
          />
        </Pressable>
        <View style={styles.container}>
          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actionBar: {
    backgroundColor: '#b570cf',
    height: 88,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  chacLogo: {
    borderRadius: 30,
    borderColor: '#fff',
    borderWidth: 2,
    width: 60,
    height: 60,
    marginLeft: 15,
    padding: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  headerBottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineLogo: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginRight: 4,
  },
  smallHeaderText: {
    color: '#dec0ea',
    fontSize: 15,
    fontFamily: 'Roboto',
  },

  headerMiddleText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    padding: 15,
  },
});

export default ChatbotScreen;
