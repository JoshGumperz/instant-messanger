const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('/api/contact routes')
});

module.exports = router;