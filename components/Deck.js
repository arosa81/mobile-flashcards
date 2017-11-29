import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { fetchDeckResultsAsyncStorage } from '../utils/api';
import DeckHeader from './DeckHeader';
import { white, navy, gray } from '../utils/colors';

class Deck extends Component {

  render() {
    const { deck, navigation } = this.props;
    console.log("DECK: ", this.props);
    return (
      <View style={styles.container}>
        <DeckHeader deck={deck}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iosSubmitBtn}
          onPress={() => navigation.navigate('NewCard',
            { deck: deck })}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iosSubmitBtn}
          onPress={() => navigation.navigate('Quiz', { deck: deck })}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 100,
    borderRadius: 7,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
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
    backgroundColor: navy,
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 100,
    marginBottom: 20,
  },
  androidSubmitBtn: {
    backgroundColor: navy,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
  }
})

function mapStateToProps (decks, ownProps) {
  const { deck } = ownProps.navigation.state.params;

  return {
    deck: decks[deck.title]
  }
}

export default connect(mapStateToProps, { receiveDecks })(Deck);
