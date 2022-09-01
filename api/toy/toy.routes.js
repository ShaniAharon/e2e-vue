const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy, addReview } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/:id', getToyById)
// router.post('/', addToy)
// router.put('/:id', updateToy)
// router.delete('/:id', removeToy)
router.post('/', requireAuth, requireAdmin, addToy)
// router.put('/:id', requireAuth, requireAdmin, updateToy)
router.put('/:id', requireAuth, updateToy)
router.delete('/:id', requireAuth, requireAdmin, removeToy)
router.post('/:id/review', addReview)

module.exports = router
