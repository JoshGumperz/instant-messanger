const router = require('express').Router();
const Contact = require('../models/Contact');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndOwner } = require('../utils/verifyToken');

// GET ALL CONTACTS -> /API/CONTACT/FIND
router.get('/find', verifyTokenAndAdmin, async (req, res) => {
    try {
        const Contacts =  await Contact.find();
        return res.status(200).json(Contacts)
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET ALL CONTACTS FOR A SPEFIFIC USER *AND* SEARCH THROUGH A USERS CONTACT LIST -> /API/CONTACT/:userId
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const search = req.query.search
        let contacts
        if (search) {
            let pipeline = [
                {
                    '$search': {
                        'index': 'searchContacts',
                        'text': {
                            'query': `${search}`,
                            'path': 'contactName',
                            'fuzzy': {}
                        }
                    }
                },
                {
                    '$match': {'userId': {$eq: req.params.userId}}
                }
            ]
             contacts = await Contact.aggregate(pipeline)
        } else {
            contacts =  await Contact.find({userId: req.params.userId});
        }
        return res.status(200).json(contacts)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

// CREATE NEW CONTACT -> /API/CONTACT/
router.post("/", verifyToken, async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        return res.status(200).json(savedContact);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// // DELETE CONTACT -> /API/CONTACT/:id
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        const isOwner = verifyTokenAndOwner(req, contact)
        if(isOwner) {
            await contact.deleteOne()
            return res.status(200).json({ message: "Contact deleted successfully"})
        } else {
            return res.status(403).json({ message: "you are not allowed to do that" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})


module.exports = router;