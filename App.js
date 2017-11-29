import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { getDecksFlashCards, setLocalNotification } from './utils/helpers';
import { white, navy } from './utils/colors';
import DeckList from './components/DeckList';
import Deck from './components/Deck'
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

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
      tabBarIcon: ({ tintColor }) => Platform.OS === 'ios'
        ? <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} />
        : <Ionicons name='md-add' size={30} color={tintColor} />
    }
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? navy : white,
    style: {
      height: 50,
      backgroundColor: Platform.OS === 'ios' ? white : navy,
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
      headerTintColor: white,
      headerStyle: {
        backgroundColor: navy,
      }
    }
  },
  NewCard: {
    screen: NewCard,
    Back: 'Deck',
    navigationOptions: {
      tabBarLabel: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: navy,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      tabBarLabel: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: navy,
      }
    }
  },
})

initializeData = () => {
  const deckInfo = getDecksFlashCards();

  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(deckInfo));
}

export default class App extends React.Component {
  componentDidMount() {
    initializeData();
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <DeckStatusBar backgroundColor={navy} barStyle='light-content' />
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
