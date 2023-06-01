const Card = require('../models/Cards')

const getCard = async (req, res) => {
  try {
    const cards = await Card.find()
    if (cards.length === 0) {
      throw new Error('No cards found')
    }
    res.status(200).json(cards)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCardByID = async (req, res) => {
  const id = req.params.id
  try {
    const card = await Card.findById(id)
    if (!card) {
      throw new Error('Cannot locate the card')
    }
    res.status(200).send(card)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createCard = async (req, res) => {
  const { categoryID, deckID, frontContent, backContent, viewCount } = req.body
  try {
    const newCard = await Card.create({
      categoryID,
      deckID,
      frontContent,
      backContent,
      viewCount,
    })
    res.status(201).send(newCard)
  } catch (error) {
    res.status(400).send(error)
  }
}

const updateCard = async (req, res) => {
  const id = req.params.id
  const { categoryID, deckID, frontContent, backContent, viewCount } = req.body
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { categoryID, deckID, frontContent, backContent, viewCount },
      { new: true }
    )
    if (!updatedCard) {
      throw new Error('Cannot locate the card')
    }
    res.status(200).send(updatedCard)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
const deleteCard = async (req, res) => {
  try {
    const deletedCards = await Card.findByIdAndDelete(req.params.id)
    if (!deletedCards) {
      return res.status(404).send('Cannot locate the card')
    }
    res.status(204).send()
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = { getCard, getCardByID, createCard, updateCard, deleteCard }
