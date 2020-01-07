const famlilySerive = require('../service/famliy');
const eleccarService = require("../service/eleccar");
/**
 * 获取孩子头像，孩子名字，孩子所在班级,孩子点评
 * todo:孩子考勤，进门出门时间
 */
router.post('/findChildrenByParentPhone', async (req, res) => {
    let phone = req.user.account;
    const result = await famlilySerive.findChildrenByParentPhone(phone);
    res.json({
        status: 200,
        result
    })
})

/**
 * 获取作业／通知列表
 */
router.post('/getHomeworkInformList', async (req, res) => {
    const account = req.user.account;
    let pageSize = parseInt(req.body.pageSize) || 5;
    let pageIndex = parseInt(req.body.pageIndex) || 1;
    const result = await famlilySerive.getHomeworkInformList(account, pageSize, pageIndex);
    res.json({
        status: 200,
        result
    })
})

router.post('/getGongGaoInformList', async (req, res) => {
    const account = req.user.account;
    let pageSize = parseInt(req.body.pageSize) || 5;
    let pageIndex = parseInt(req.body.pageIndex) || 1;
    const result = await famlilySerive.getGongGaoInformList(account, pageSize, pageIndex);
    res.json({
        status: 200,
        result
    })
})

/**
 * 获取孩子轨迹,学生徽章
 */
router.post('/getChildrenTrailPath', async (req, res) => {
    const carToken = req.user.cartoken;
    const studentId = req.body.studentId;
    /**
     * 查询学生有没有校徽
     */
    const student = await mongoModel.famlilyStudents.findOne({
        _id: studentId
    }, {
        _id: 0,
        badgeCode: 1
    });
    if (!(student && student.badgeCode)) {
        res.json({
            status: 200,
            result: {
                Result: 200,
                Description: "成功",
                Data: []
            }
        })
        return;
    }
    const startDate = req.body.startDate || moment().subtract(2, "days").format("YYYY/MM/DD HH:mm:ss");
    const endDate = req.body.endDate || moment().format("YYYY/MM/DD HH:mm:ss");
    const result = await eleccarService.getPeopleGuiJi(carToken, student.badgeCode, encodeURIComponent(startDate), encodeURIComponent(endDate));
    res.json({
        status: 200,
        result
    });
})
module.exports = router;