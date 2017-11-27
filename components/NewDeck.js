import React, { Component } from 'react';
import { View, Text, StyleSheet,
         TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';

class NewDeck extends Component {
  state = {
    deckTitle: '',
  }

  handleTitleChange = (deckTitle) => {
    this.setState({ deckTitle });
  }

  submit = (deckTitle) => {
    const { navigation, addDeck } = this.props;
    const newDeck = {
      [deckTitle]: {
        title: deckTitle,
        questions: [],
      }
    }
    addDeck(newDeck);
    navigation.navigate('Home', { deck: newDeck[deckTitle]});
  }

  render() {
    const { deckTitle } = this.state;
    console.log("NEW DECK: ", this.state, this.props);
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text>NewDeck</Text>
        <TextInput value={this.state.deckTitle} placeholder='Enter a deck title'
                   onChangeText={this.handleTitleChange} />
        <TouchableOpacity onPress={() => this.submit(deckTitle)}><Text>Submit</Text></TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default connect(null, { addDeck })(NewDeck);
