export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
})

export const addQuestion = (deckId, question) => ({
  type: ADD_QUESTION,
  deckId,
  question,
})