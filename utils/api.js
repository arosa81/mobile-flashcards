import { AsyncStorage } from 'react-native';
import { UDACICARDS_STORAGE_KEY } from '../App';

export function fetchDeckResultsAsyncStorage () {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
}

export function addCardToDeckAsyncStorage (key, entry) {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
        .then((response) => {
          let deck = JSON.parse(response);
          deck[key] = {
            title: key,
            questions: deck[key].questions.concat(entry)
          }
          AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(deck))
        })
}
