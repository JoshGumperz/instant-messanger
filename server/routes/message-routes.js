const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('/api/message routes')
});

module.exports = router;