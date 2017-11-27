import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DeckHeader from './DeckHeader';
import { white, purple } from '../utils/colors';

class Deck extends Component {
  render() {
    const { state } = this.props.navigation
    console.log("eeee", state);
    return (
      <View style={styles.container}>
        <DeckHeader deck={state.params}/>
        <View style={styles.container}>
          <TouchableOpacity style={styles.iosSubmitBtn}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iosSubmitBtn}>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
          <Text>{state.params.deck.title}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckContainer: {
    padding: 10,
    borderRadius: 7,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  deckTitle: {
    fontSize: 32,
  },
  iosSubmitBtn: {
  backgroundColor: purple,
  padding: 10,
  borderRadius: 7,
  height: 45,
  marginLeft: 40,
  marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Deck;
