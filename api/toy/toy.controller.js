const toyService = require('./toy.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')

async function getToys(req, res) {
  try {
    const queryParams = req.query
    const toys = await toyService.query(queryParams)
    res.json(toys)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    const toy = await toyService.getById(toyId)
    res.json(toy)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addToy(req, res) {
  const toy = req.body
  console.log(toy);
  try {
    const addedToy = await toyService.add(toy)
    console.log(req);
    broadcast({ type: 'something-changed', userId:req.session?.user._id })
    res.json(addedToy)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateToy(req, res) {
  try {
    const toy = req.body
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function addReview(req, res) {
  const toyId = req.params.id
  const review = req.body
  try {
    const addedReview = await toyService.addReview(review, toyId)
    res.send(addedReview)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  addReview,
}
