const router = require('express').Router();
const Conversation = require('../models/Conversation');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndOwner } = require('../utils/verifyToken');

// CREATE NEW CONVERSATION -> /API/CONVERSATION/
router.post("/", verifyToken, async (req, res) => {
    try {
        const newConversation = new Conversation({
            members: [req.body.user1, req.body.user2], 
            lastMessage: req.body.lastMessage
        })
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET CONVERSATION BY ID -> /API/CONVERSATION/:id
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const conversation =  await Conversation.findById(req.params.id)
        res.status(200).json(conversation)
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET ALL CONVERSATIONS -> /API/CONVERSATION/FIND
router.get('/find', verifyTokenAndAdmin, async (req, res) => {
    try {
        const conversations =  await Conversation.find();
        res.status(200).json(conversations)
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET ALL CONVERSATIONS BY USER ID -> /API/CONVERSATION/:userId
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const conversations =  await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(conversations)
    } catch (err) {
        return res.status(500).json(err);
    }
})

// EDIT CONVERSATION -> /API/CONVERSATION/:id
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id) 
        const access = verifyTokenAndOwner(req, conversation)
        if (access) {
            await conversation.update({
                $set: req.body
            }, {new: true})
            return res.status(200).json({ message: "conversation updated" });
        } else {
            return res.status(403).json({ message: "you are not allowed to do that"})
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})

// // DELETE CONVERSATION -> /API/CONVERSATION/:id
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id)
        const isOwner = verifyTokenAndOwner(req, conversation)
        if(isOwner) {
            await conversation.deleteOne()
            return res.status(200).json({ message: "conversation deleted successfully"})
        } else {
            return res.status(403).json({ message: "you are not allowed to do that" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})


module.exports = router;