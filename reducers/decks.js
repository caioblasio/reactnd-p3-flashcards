import { defaultDecks } from '../utils/defaultData'
import { ADD_DECK, ADD_QUESTION } from '../actions/decks'


export default function decks (state = defaultDecks, action) {
  switch(action.type) {
    case ADD_DECK:
      return [...state, action.deck]
    case ADD_QUESTION:
      return state.map(deck => (
        deck.id === action.deckId
          ? {...deck, questions: [...deck.questions, action.question]}
          : deck
      ))
    default:
      return state
  }
}