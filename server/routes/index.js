const router = require('express').Router();
const userRoutes = require('./user-routes')
const messageRoutes = require('./message-routes');
const conversationRoutes = require('./conversation-routes');
const contactRoutes = require('./contact-routes');


router.use('/message', messageRoutes);
router.use('/conversation', conversationRoutes);
router.use('/contact', contactRoutes);
router.use('/', userRoutes);


module.exports = router;