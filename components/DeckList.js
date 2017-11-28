import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage  } from 'react-native';
import { getDecksFlashCards } from '../utils/helpers';
import { fetchDeckResultsAsyncStorage } from '../utils/api';
import { connect } from 'react-redux';
import Deck from './Deck'
import DeckHeader from './DeckHeader'
import { gray } from '../utils/colors';
import { receiveDecks } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    console.log("DECKLIST componentDidMount: ", this.props);
    fetchDeckResultsAsyncStorage()
      .then((decks) => this.props.receiveDecks(JSON.parse(decks)))
  }

  render() {
    const deckInfo = getDecksFlashCards();
    const { decks } = this.props;
    const { navigate } = this.props.navigation;
    console.log("props", this.props);
    return (
      <View style={styles.container}>
        {Object.keys(decks).map((key) => {
          const { title, questions } = decks[key];

          return (
            <TouchableOpacity key={key} style={styles.deckContainer}
              onPress={() => navigate('Deck', { deck: decks[key] }) }>
                <DeckHeader deck={decks[key]} />
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
  },
  deckTitle: {
    fontSize: 32,
  },
  deckSubtitle: {
    color: gray,
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps, { receiveDecks })(DeckList);
