import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { getDecksFlashCards } from '../utils/helpers';
import Deck from './Deck';
import { gray } from '../utils/colors';
import { fetchDeckResultsAsyncStorage } from '../utils/api';

class DeckHeader extends Component {
  render() {
    const { deck } = this.props;
    console.log("DECKHEADER props", this.props);
    console.log("DECKHEADER DECK props", deck);
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{deck.title}</Text>
        <Text style={styles.deckSubtitle}>{deck.questions.length} cards</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  deckTitle: {
    fontSize: 32,
    alignSelf: 'center',
  },
  deckSubtitle: {
    color: gray,
    alignSelf: 'center',
  }
})

export default DeckHeader;
