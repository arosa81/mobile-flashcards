import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DeckHeader from './DeckHeader';
import { white, purple, gray } from '../utils/colors';

class Deck extends Component {
  render() {
    const { navigation } = this.props;
    console.log("eeee", this.props);
    return (
      <View style={styles.container}>
        <DeckHeader deck={navigation.state.params.deck}/>
          <TouchableOpacity style={styles.iosSubmitBtn}
            onPress={() => navigation.navigate('NewCard', { deck: navigation.state.params.deck })}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iosSubmitBtn}
            onPress={() => navigation.navigate('Quiz', { deck: navigation.state.params.deck })}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deckContainer: {
    padding: 10,
    borderRadius: 7,
    marginLeft: 30,
    marginRight: 30,
    height: 100,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderBottomColor: '#bbb',
  },
  deckTitle: {
    fontSize: 32,
  },
  deckSubtitle: {
    color: gray,
  },
  iosSubmitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 100,
    marginBottom: 20,
  },
  androidSubmitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: purple,
    padding: 10,
    height: 45,
    width: 100,
    borderRadius: 2,
    marginBottom: 20,
  },
  buttonText: {
    color: white,
  }
})

export default Deck;
