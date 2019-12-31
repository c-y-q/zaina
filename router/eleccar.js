/**
 * 电车平台
 */

const eleccarService = require("../service/eleccar");

/**
 * 获取电车列表
 */
router.post('/getElecCarList', async (req, res) => {
    let carToken = req.user.cartoken;
    const carUserId = req.user.carUserId;
    const carUserInfo = await eleccarService.getElecticCarUserInfo(carUserId, carToken);
    if (!carUserInfo || carUserInfo.length == 0 || carUserInfo.usersOfSys.length == 0) {
        return [];
    }

    const carUserIdNum = carUserInfo.usersOfSys.map(obj => obj.account);
    const result = await eleccarService.getElecCarList(carUserIdNum, carToken);
    res.json({
        status: 200,
        result
    })
})

/**
 * 获取人员轨迹
 */
router.post('/getPeopleGuiJi', async (req, res) => {
    const carToken = req.user.cartoken;
    const epc = req.body.epc;
    const startDate = req.body.startDate || moment().subtract(2, 'days').format('YYYY/MM/DD HH:mm:ss');
    const endDate = req.body.endDate || moment().format('YYYY/MM/DD HH:mm:ss');
    const result = await eleccarService.getPeopleGuiJi(carToken, epc, startDate, endDate);
    res.json({
        status: 200,
        result
    })

})

/**
 * 获取电车轨迹
 */
router.post('/getElectCarGuiJi', async (req, res) => {
    const carToken = req.user.cartoken;
    const chePaiCode = req.body.code;
    const startDate = req.body.startDate || moment().subtract(2, 'days').format('YYYY/MM/DD HH:mm:ss');
    const endDate = req.body.endDate || moment().format('YYYY/MM/DD HH:mm:ss');
    const result = await eleccarService.getElectCarGuiJi(chePaiCode, startDate, endDate, carToken);
    res.json({
        status: 200,
        result
    })

})

/**
 * 电车上锁解锁
 */
router.post('/lockElectricCar', async (req, res) => {
    const carToken = req.user.cartoken;
    const carUserId = req.user.carUserId;
    const eviId = req.body.eviId;
    const lockState = req.body.lockState && req.body.lockState == "lock" ? 0 : 1;
    const result = await eleccarService.lockElectricCar(carToken, carUserId, eviId, lockState);
    res.json({
        status: 200,
        result
    })
})
module.exports = router;