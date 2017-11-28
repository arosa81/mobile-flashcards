import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DeckHeader from './DeckHeader';
import NewCard from './NewCard';
import { white, purple, red, green } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {
  state = {
    answer: false,
    score: 0,
    questionNum: 0,
    done: false,
  }

  checkAnswer = () => {
    const { answer, opacityQuestion, opacityAnswer } = this.state;

    this.setState({
      answer: !this.state.answer,
    })
  }

  submit = (correct) => {
    const { questions } = this.props.navigation.state.params.deck;
    const { questionNum } = this.state;

    if ((questions.length - 1) === this.state.questionNum) {
      this.setState({ done: !this.state.done });

      clearLocalNotification()
      .then(setLocalNotification)
    }

    if (correct === 'Correct') {
      this.setState({ score: this.state.score + 1, answer: false, })
    }

    this.setState({
      questionNum: this.state.questionNum + 1
    })
  }

  render() {
    const { deck} = this.props.navigation.state.params;
    const { answer, score, questionNum, done, spinQuestion } = this.state;
    console.log("Quiz: ", this.props, this.state, deck.questions.length)
    if (deck.questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.deckTitle}>You need to have questions to play.</Text>
          <Text style={styles.deckTitle}>Please go back and add some :)</Text>
        </View>
      )
    } else {
    return (
      <View style={styles.container}>
        <Text style={{flex: 1, alignSelf:'flex-start'}}>{questionNum} / {deck.questions.length}</Text>
        {!done ?
          <View style={styles.deckContainer}>
            <Text style={styles.deckTitle}>
              {answer === false
                ? deck.questions[questionNum].question
                : deck.questions[questionNum].answer}
            </Text>
            <Text style={styles.questionHelper}
              onPress={this.checkAnswer}>{answer === false ? '>>Answer' : '<<Question'}</Text>
            <TouchableOpacity style={styles.iosCorrectBtn}
              onPress={() => this.submit('Correct')}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iosIncorrectBtn}
              onPress={this.submit}>
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.deckContainer}>
            <Text style={styles.deckTitle}>Congrats! You are done!</Text>
            <Text style={styles.questionHelper}>Score: {(score/deck.questions.length) * 100}%</Text>
            <TouchableOpacity style={styles.iosSubmitBtn}
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 100,
  },
  deckTitle: {
    fontSize: 32,
    textAlign: 'center',
    justifyContent: 'center',
  },
  questionHelper: {
    color: red,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  iosCorrectBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 100,
    marginBottom: 20,
  },
  iosIncorrectBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: red,
    padding: 10,
    height: 45,
    width: 100,
    borderRadius: 2,
    marginBottom: 20,
  },
  iosSubmitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 100,
    marginBottom: 20,
  },
  buttonText: {
    color: white,
  }
})

export default Quiz;
