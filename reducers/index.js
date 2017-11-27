import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
      case ADD_DECK:
        console.log("ACTION: ", action.deck);
        return {
          ...state,
          ...action.deck
        }
      case ADD_CARD:
        return {
          ...state,
          [action.title]: {
            title: action.title,
            questions: state[action.title].questions.concat(action.card),
          }
        }
    default:
      return state;
  }
}

export default decks;
