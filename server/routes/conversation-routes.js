const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('/api/conversation routes')
});

module.exports = router;