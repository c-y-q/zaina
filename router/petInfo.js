const petService = require('../service/petInfo');
router.post('/getPetInfo', async (req, res, next) => {
    const phone = req.user.account;
    const result = await petService.getPetInfo(phone);
    res.json({
        status: 200,
        result
    })
})
module.exports = router;