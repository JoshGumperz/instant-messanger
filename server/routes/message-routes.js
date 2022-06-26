const router = require('express').Router();
const Message = require('../models/message');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndOwner } = require('../utils/verifyToken');

// GET ALL MESSAGES BY USER ID -> /API/MESSAGE/FIND/:userId
router.get('find/user/:userId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const messages =  await Message.find({userId: req.params.userId});
        res.status(200).json(messages)
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET MESSAGE BY ID -> /API/MESSAGE/FIND/:id
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const message =  await Message.findById(req.params.id)
        res.status(200).json(message)
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET ALL MESSAGES -> /API/MESSAGE/FIND
router.get('/find', verifyTokenAndAdmin, async (req, res) => {
    try {
        const messages =  await Message.find();
        res.status(200).json(messages)
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET MESSAGES BY CONVERSATION -> /API/MESSAGE/:conversationId 
router.get('/:conversationId', verifyToken, async (req, res) => {
    try {
        const messages =  await Message.find({conversationId: req.params.conversationId});
        res.status(200).json(messages)
    } catch (err) {
        return res.status(500).json(err);
    }
})

// CREATE NEW MESSAGE -> /API/MESSAGE/
router.post("/", verifyToken, async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedmessage = await newMessage.save();
        res.status(200).json(savedmessage);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// EDIT MESSAGE -> /API/MESSAGE/:id
router.put('/:id', verifyTokenAndOwner, async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedMessage);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})

// // DELETE MESSAGE -> /API/MESSAGE/:id
router.delete('/:id', verifyTokenAndOwner, async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "message deleted successfully"})
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})


module.exports = router;