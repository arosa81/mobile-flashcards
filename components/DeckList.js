import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { fetchDeckResultsAsyncStorage } from '../utils/api';
import { connect } from 'react-redux';
import Deck from './Deck'
import DeckHeader from './DeckHeader'
import { gray } from '../utils/colors';
import { receiveDecks } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    fetchDeckResultsAsyncStorage()
      .then((decks) => this.props.receiveDecks(JSON.parse(decks)))
  }

  render() {
    const { decks } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        {Object.keys(decks).map((key) => {
          const { title, questions } = decks[key];

          return (
            <TouchableOpacity key={key}
              onPress={() => navigate('Deck', { deck: decks[key] }) }>
                <DeckHeader deck={decks[key]} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  deckContainer: {
    marginBottom: 10,
    borderRadius: 7,
    marginLeft: 30,
    marginRight: 30,
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
