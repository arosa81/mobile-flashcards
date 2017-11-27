import { AsyncStorage } from 'react-native';
import { UDACICARDS_STORAGE_KEY } from '../App';

export function fetchDeckResults () {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
}

export function mergeCard ({ entry, key }) {
  return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
    [key]: entry,
  }))
}
