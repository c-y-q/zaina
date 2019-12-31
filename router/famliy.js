
const famlilySerive = require('../service/famliy');
/**
 * 获取孩子头像，孩子名字，孩子所在班级,孩子点评
 * todo:孩子考勤，进门出门时间
 */
router.post('/findChildrenByParentPhone', async (req, res, next) => {
    const account = req.user.account;
    const result = await famlilySerive.findChildrenByParentPhone(account);
    res.json({
        status: 200,
        result: result
    })
})
module.exports = router;