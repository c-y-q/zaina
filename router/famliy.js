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

/**
 * 获取作业／通知列表
 */
router.post('/getHomeworkInformList', async (req, res, next) => {
    const account = req.user.account;
    let pageSize = parseInt(req.body.pageSize) || 5;
    let pageIndex = parseInt(req.body.pageIndex) || 1;
    const result = await famlilySerive.getHomeworkInformList(account, pageSize, pageIndex);
    res.json({
        status: 200,
        result
    })
})

router.post('/getGongGaoInformList', async (req, res, next) => {
    const account = req.user.account;
    let pageSize = parseInt(req.body.pageSize) || 5;
    let pageIndex = parseInt(req.body.pageIndex) || 1;
    const result = await famlilySerive.getGongGaoInformList(account, pageSize, pageIndex);
    res.json({
        status: 200,
        result
    })
})
module.exports = router;