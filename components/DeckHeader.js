import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { getDecksFlashCards } from '../utils/helpers';
import Deck from './Deck';
import { gray, navy, orange } from '../utils/colors';
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  deckTitle: {
    fontSize: 32,
    color: navy,
    alignSelf: 'center',
  },
  deckSubtitle: {
    color: gray,
    fontWeight: 'bold',
    alignSelf: 'center',
  }
})

export default DeckHeader;
