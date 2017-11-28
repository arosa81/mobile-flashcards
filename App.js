import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, AsyncStorage } from 'react-native';
import DeckList from './components/DeckList';
import Deck from './components/Deck'
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { white, purple } from './utils/colors';
import { getDecksFlashCards } from './utils/helpers';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

export const UDACICARDS_STORAGE_KEY = 'udaciCards:decks';

function DeckStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-paper' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-paper' size={30} color={tintColor} />
    }
  },
},{
  navigationOptions: {
    header: null
  }, tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 50,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTitle: 'Deck',
    },
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      tabBarLabel: 'Add Card',
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      tabBarLabel: 'Quiz',
    }
  },
})

initializeData = () => {
  const deckInfo = getDecksFlashCards();

  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(deckInfo));
}

class App extends Component {

  render() {
    console.log("APP: ", this.props)
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <DeckStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
