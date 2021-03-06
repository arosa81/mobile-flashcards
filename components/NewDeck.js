import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform,
         TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { navy, white, red } from '../utils/colors';

class NewDeck extends Component {
  state = {
    deckTitle: '',
    invalidTitle: false,
  }

  componentDidMount () {
    this.setState({ invalidTitle: false });
  }

  handleTitleChange = (deckTitle) => {
    this.setState({ deckTitle });
  }

  submit = (deckTitle) => {
    const { validTitle } = this.state;
    if (deckTitle === '') {
      this.setState({ invalidTitle: true });
    } else {
      this.setState({ invalidTitle: false });
      const { navigation, addDeck } = this.props;
      const newDeck = {
        [deckTitle]: {
          title: deckTitle,
          questions: [],
        }
      }
      addDeck(newDeck);
      navigation.navigate('Deck', { deck: newDeck[deckTitle]});
      this.setState({ validTitle: false });
    }
  }

  render() {
    const { deckTitle, invalidTitle } = this.state;
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput style={styles.input}
                   value={this.state.deckTitle}
                   placeholder='Enter a deck title'
                   onChangeText={this.handleTitleChange} />
        {invalidTitle === true &&
          <Text style={styles.invalidMessage}>Please enter a deck title</Text>}
        {Platform.OS === 'ios'
          ? <TouchableOpacity style={styles.iosSubmitBtn}
              onPress={() => this.submit(deckTitle)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          : <TouchableOpacity style={styles.androidSubmitBtn}
              onPress={() => this.submit(deckTitle)}>
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
    padding: 20,
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
    marginRight: 30,
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

export default connect(null, { addDeck })(NewDeck);
