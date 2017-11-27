import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { getDecksFlashCards } from '../utils/helpers';
import Deck from './Deck';
import { gray } from '../utils/colors';

class DeckList extends Component {
  render() {
    const { deck } = this.props;
    console.log("props", deck);
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{deck.deck.title}</Text>
        <Text style={styles.deckSubtitle}>{deck.deck.questions.length} cards</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  deckContainer: {
    padding: 10,
    borderRadius: 7,
    marginLeft: 30,
    marginRight: 30,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  deckTitle: {
    fontSize: 32,
  },
  deckSubtitle: {
    color: gray,
  }
})

export default DeckList;
