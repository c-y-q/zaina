const famlilySerive = require("../service/famliy");
const eleccarService = require("../service/eleccar");
const userService = require("../service/user");
/**
 * 获取孩子头像，孩子名字，孩子所在班级,孩子点评
 * todo:孩子考勤，进门出门时间
 */
router.post("/findChildrenByParentPhone", async (req, res) => {
    const account = req.user.account;
    const userRes = await userService.findUserByAccount(account);
    const carInfoArr = userRes && userRes.famlily || [];
    let accounts = [account];
    if (carInfoArr.length > 0) {
        let famlilyPhones = carInfoArr.map(obj => obj.phone);
        accounts = accounts.concat(famlilyPhones);
    }
    log(17, accounts)
    const result = await famlilySerive.findChildrenByParentPhone(accounts);
    res.json({
        status: 200,
        result
    });
});

/**
 * 获取作业／通知列表
 */
router.post("/getHomeworkInformList", async (req, res) => {
    const account = req.user.account;
    const userRes = await userService.findUserByAccount(account);
    const carInfoArr = userRes && userRes.famlily || [];
    let accounts = [account];
    if (carInfoArr.length > 0) {
        let famlilyPhones = carInfoArr.map(obj => obj.phone);
        accounts = accounts.concat(famlilyPhones);
    }
    let pageSize = parseInt(req.body.pageSize) || 5;
    let pageIndex = parseInt(req.body.pageIndex) || 1;
    const result = await famlilySerive.getHomeworkInformList(
        accounts,
        pageSize,
        pageIndex
    );
    res.json({
        status: 200,
        result
    });
});

router.post("/getGongGaoInformList", async (req, res) => {
    const account = req.user.account;
    let pageSize = parseInt(req.body.pageSize) || 5;
    let pageIndex = parseInt(req.body.pageIndex) || 1;
    const userRes = await userService.findUserByAccount(account);
    const carInfoArr = userRes && userRes.famlily || [];
    let accounts = [account];
    if (carInfoArr.length > 0) {
        let famlilyPhones = carInfoArr.map(obj => obj.phone);
        accounts = accounts.concat(famlilyPhones);
    }
    const result = await famlilySerive.getGongGaoInformList(
        accounts,
        pageSize,
        pageIndex
    );
    res.json({
        status: 200,
        result
    });
});

/**
 * 获取孩子轨迹,学生徽章
 */
router.post("/getChildrenTrailPath", async (req, res) => {
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
        });
        return;
    }
    const startDate =
        req.body.startDate ||
        moment()
        .subtract(2, "days")
        .format("YYYY/MM/DD HH:mm:ss");
    const endDate = req.body.endDate || moment().format("YYYY/MM/DD HH:mm:ss");
    const result = await eleccarService.getPeopleGuiJi(
        student.badgeCode,
        encodeURIComponent(startDate),
        encodeURIComponent(endDate)
    );
    res.json({
        status: 200,
        result
    });
});

/**
 * 登录
 */
router.post("/familyLogin", async (req, res) => {
    const userAccount = req.user.account;
    const {
        account,
        vcode
    } = req.body;
    if (!validate.phone(account)) {
        res.json({
            status: 401,
            msg: " 手机格式错误"
        });
        return;
    }
    if (account == userAccount) {
        res.json({
            status: 401,
            msg: "请勿重复登录！"
        });
        return;
    }
    try {
        const carInfo = await axios({
            method: "post",
            url: "https://api.hbzner.com/v1/getToken",
            data: {
                type: "sye",
                account: account,
                password: vcode
            }
        });
        await userService.pushFamlilyPhone(userAccount, account);
        //carToken:请求电车平台需要的token,id
        const tokenParam = {
            account,
            uuid: tools.uuid(),
            visitIP: req.ip,
            expires: new Date().getTime()
        };
        const token = tools.createToken(tokenParam, cert.private);
        cache.set(
            `fam_${userAccount}`,
            JSON.stringify(tokenParam),
            "EX",
            60 * 120 * 1000
        );
        res.json({
            status: 200,
            famlilyToken: token
        });
    } catch (error) {
        log(168, error)
        res.json({
            status: 1002,
            msg: " 验证码错误"
        });
    }
});
/**
 *用手号登录后没有孩子，用另一个手机号登录，获取孩子列表
 */
router.post("/findChildrenByParentAnotherPhone", async (req, res) => {
    const account = req.user.account;
    const famlilyToken = req.body.famlilyToken;
    const famlilyTokenKey = `fam_${account}`;
    const tokenObj = tools.verifyToken(famlilyToken, cert.public);
    const redisUserInfo = await cache.get(famlilyTokenKey);
    const userStr = redisUserInfo && JSON.parse(redisUserInfo);
    if (!redisUserInfo || !(tokenObj.uuid == userStr.uuid)) {
        res.json({
            status: 403,
            msg: "token is wrong!"
        });
        return;
    }
    const phone = (userStr && userStr.account) || "";
    let accounts = [phone];
    const result = await famlilySerive.findChildrenByParentPhone(accounts);
    res.json({
        status: 200,
        result
    });
});
module.exports = router;