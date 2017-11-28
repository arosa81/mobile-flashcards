import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DeckHeader from './DeckHeader';
import { white, purple, red, green } from '../utils/colors';

class Quiz extends Component {
  state = {
    answer: false,
    score: 0,
    questionNum: 0,
    done: false,
  }

  checkAnswer = () => {
    this.setState({
      answer: !this.state.answer,
    })
  }

  submit = () => {
    const { questions } = this.props.navigation.state.params.deck;
    const { questionNum } = this.state;

    if ((questions.length - 1) === this.state.questionNum) {
      this.setState({
        done: !this.state.done
      })
    }

    this.setState({
      questionNum: this.state.questionNum + 1
    })
  }

  render() {
    const { questions } = this.props.navigation.state.params.deck;
    const { answer, score, questionNum, done } = this.state;
    console.log("Quiz: ", this.props, this.state);
    return (
      <View style={styles.container}>
      {console.log("Quiz: ", this.props, this.state, questions.length)}
        {!done ?
          <View style={styles.deckContainer}>
            <Text style={styles.deckTitle}>{questions[questionNum].question}</Text>
            <Text style={styles.questionHelper}
              onPress={this.checkAnswer}>{answer ? '>>Answer' : '>>Question'}</Text>
            <TouchableOpacity style={styles.iosCorrectBtn}
              onPress={this.submit}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iosIncorrectBtn}
              onPress={() => console.log("Incorrect")}>
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.deckContainer}>
            <Text style={styles.deckTitle}>Congrats! You are done!</Text>
            <Text style={styles.questionHelper}>{score}</Text>
            <TouchableOpacity style={styles.iosSubmitBtn}
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
          </View>
        }

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
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
    alignSelf: 'center',
  },
  questionHelper: {
    color: red,
    alignSelf: 'center',
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
