const router = require('express').Router();
const userRoutes = require('./user-routes')
const messageRoutes = require('./message-routes');
const conversationRoutes = require('./conversation-routes');

router.use('/user', userRoutes);
router.use('/message', messageRoutes);
router.use('/conversation', conversationRoutes);
router.get('/', (req, res) => {
    res.send('/api routes')
});


module.exports = router;