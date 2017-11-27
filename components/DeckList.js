import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { getDecksFlashCards } from '../utils/helpers';
import Deck from './Deck'
import DeckHeader from './DeckHeader'
import { gray } from '../utils/colors';

class DeckList extends Component {
  render() {
    const deckInfo = getDecksFlashCards();
    const { navigate } = this.props.navigation;
    console.log("props", this.props);
    return (
      <View style={styles.container}>
        {Object.keys(deckInfo).map((key) => {
          const { title, questions } = deckInfo[key];

          return (
            <TouchableOpacity key={key} style={styles.deckContainer}
              onPress={() => navigate('Deck', { deck: deckInfo[key] }) }>
                <DeckHeader deck={{deck: deckInfo[key]}} />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
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
