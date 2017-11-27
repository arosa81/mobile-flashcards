import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';

class NewDeck extends Component {
  state = {
    deckTitle: '',
  }

  render() {
    const { deckTitle } = this.state;
    return (
      <View style={styles.container}>
        <Text>NewDeck</Text>
        <TextInput value={deckTitle} placeholder='Enter a deck title'></TextInput>
        <TouchableOpacity><Text>Submit</Text></TouchableOpacity>
      </View>
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

export default NewDeck;
