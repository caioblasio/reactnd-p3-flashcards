import { defaultDecks } from '../utils/defaultData'
import { ADD_DECK } from '../actions/decks'


export default function decks (state = defaultDecks, action) {
  switch(action.type) {
    case ADD_DECK:
      return [...state, action.deck]
    default:
      return state
  }
}