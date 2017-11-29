import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform,
         TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { addCardToDeckAsyncStorage } from '../utils/api'
import { navy, white, red } from '../utils/colors';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    invalidQuestion: false,
    invalidAnswer: false,
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
    const { question, answer, validQuestion, validAnswer } = this.state;
    switch (question.length) {
      case 0:
        this.setState({ invalidQuestion: true });
        break;
      default:
        this.setState({ invalidQuestion: false });
    }

    switch (answer.length) {
      case 0:
        this.setState({ invalidAnswer: true });
        break;
      default:
        this.setState({ invalidAnswer: false });
    }

    if (question !== '' && answer !== '') {
      addCardToDeckAsyncStorage(key, { question, answer });
      addCard(key, { question, answer });
      navigation.goBack();
    }
  }

  render() {
    const { question, answer, invalidQuestion, invalidAnswer } = this.state;
    console.log("NEW CARD: ", this.props, this.state);
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput style={styles.input}
                   value={question}
                   placeholder='Enter a question to ask'
                   onChangeText={this.handleQuestionChange} />
        {invalidQuestion === true && <Text style={styles.invalidMessage}>
          Please enter a question</Text>}
        <TextInput style={styles.input}
                   value={answer}
                   placeholder='Enter the answer to your question'
                   onChangeText={this.handleAnswerChange} />
        {invalidAnswer === true && <Text style={styles.invalidMessage}>
          Please enter an answer</Text>}
        {Platform.OS === 'ios'
          ? <TouchableOpacity style={styles.iosSubmitBtn}
              onPress={() => this.submit()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          : <TouchableOpacity style={styles.androidSubmitBtn}
              onPress={() => this.submit()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        }
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 44,
    width: 300,
    padding: 8,
    borderColor: navy,
    borderWidth: 1,
    margin: 20
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
  },
  invalidMessage: {
    color: red,
    marginBottom: 10,
  },
})

export default connect(null, { addCard })(NewCard);
