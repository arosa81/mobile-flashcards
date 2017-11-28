import React, { Component } from 'react';
import { View, Text, StyleSheet,
         TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { fetchDeckResultsAsyncStorage, addCardToDeckAsyncStorage } from '../utils/api'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  handleQuestionChange = (question) => {
    this.setState({ question });
  }

  handleAnswerChange = (answer) => {
    this.setState({ answer });
  }

  submit = () => {
    const { navigation, addCard } = this.props;
    const key = navigation.state.params.deck.title;
    const entry = this.state;
    addCardToDeckAsyncStorage(key, entry);
    addCard(key, entry);
    navigation.goBack();
  }

  render() {
    console.log("NEW CARD: ", this.state, this.props);
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text>NewDeck</Text>
        <TextInput value={this.state.question} placeholder='Enter a question to ask'
                   onChangeText={this.handleQuestionChange} />
        <TextInput value={this.state.answer} placeholder='Enter the answer to your question'
                   onChangeText={this.handleAnswerChange} />
        <TouchableOpacity onPress={() => this.submit()}><Text>Submit</Text></TouchableOpacity>
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

export default connect(null, { addCard })(NewCard);
