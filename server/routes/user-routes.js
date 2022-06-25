const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('/api/user routes')
});

module.exports = router;