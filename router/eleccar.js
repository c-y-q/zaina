/**
 * 电车平台
 */

const eleccarService = require("../service/eleccar");

/**
 * 获取电车列表
 */
router.post("/getElecCarList", async (req, res) => {
  const carToken = req.user.cartoken;
  const carUserId = "5cb945a0cce17f3e61ab69ea"; //req.user.carUserId;
  const carUserInfo = await eleccarService.getElecticCarUserInfo(carUserId, carToken);
  if (!carUserInfo || carUserInfo.length == 0 || carUserInfo.usersOfSys.length == 0) {
    res.json({
      status: 200,
      result: []
    });
    return;
  }
  const carUserIdNum = carUserInfo.usersOfSys.map(obj => obj.account);
  const result = await eleccarService.getElecCarList(carUserIdNum, carToken);
  res.json({
    status: 200,
    result
  });
});

/**
 * 获取人员轨迹
 */
router.post("/getPeopleGuiJi", async (req, res) => {
  const carToken = req.user.cartoken;
  const epc = req.body.epc;
  if (!epc) {
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
  const startDate = req.body.startDate || moment().subtract(2, "days").format("YYYY/MM/DD HH:mm:ss");
  const endDate = req.body.endDate || moment().format("YYYY/MM/DD HH:mm:ss");
  const result = await eleccarService.getPeopleGuiJi(carToken, encodeURIComponent(epc), encodeURIComponent(startDate), encodeURIComponent(endDate));
  res.json({
    status: 200,
    result
  });
});

/**
 * 获取电车轨迹
 */
router.post("/getElectCarGuiJi", async (req, res) => {
  const carToken = req.user.cartoken;
  const chePaiCode = req.body.code;
  if (!chePaiCode) {
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
  const startDate = req.body.startDate || moment().subtract(2, "days").format("YYYY/MM/DD HH:mm:ss");
  const endDate = req.body.endDate || moment().format("YYYY/MM/DD HH:mm:ss");
  const result = await eleccarService.getElectCarGuiJi(encodeURIComponent(chePaiCode), encodeURIComponent(startDate), encodeURIComponent(endDate), carToken);
  res.json({
    status: 200,
    result
  });
});

/**
 * 电车上锁解锁
 */
router.post("/lockElectricCar", async (req, res) => {
  const carToken = req.user.cartoken;
  const carUserId = req.user.carUserId;
  const eviId = req.body.eviId;
  const lockState = req.body.lockState && req.body.lockState == "lock" ? 0 : 1;
  const carUserInfo = await eleccarService.getElecticCarUserInfo(carUserId, carToken);
  if (!carUserInfo || carUserInfo.length == 0 || carUserInfo.usersOfSys.length == 0 || !eviId) {
    res.json({
      status: 200,
      msg: "无电车信息"
    });
    return;
  }
  const carUserIdNum = carUserInfo.usersOfSys.map(obj => obj.account);
  const carInfo = await eleccarService.getElecCarList(carUserIdNum, carToken);
  if (carInfo.length == 0) {
    res.json({
      status: 200,
      msg: "无电车信息"
    });
    return;
  }
  const result = await eleccarService.lockElectricCar(carToken, carUserId, eviId, lockState);
  res.json({
    status: 200,
    result
  });
});

/**
 * 电车卫士消息列表
 */
router.post('/getEeticCarNoticeList', async (req, res) => {
  const mobile = '17831001423' || req.user.account;
  const carToken = req.user.cartoken;
  const page = parseInt(req.body.page) || 1;
  const noticeList = await eleccarService.getEeticCarNoticeList(mobile, page, carToken);
  const regChepai = /^[A-Z]{2}\d{6,}/;
  const regTime = /\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}/;
  const result = [];
  if (noticeList.length > 0) {
    for (let rs of noticeList) {
      let content = rs.content;
      let notice = {
        title: rs.title || '',
        chePai: content.match(regChepai) && content.match(regChepai)[0] || '',
        noticeTime: content.match(regTime) && content.match(regTime)[0] || '',
        noticeAddr: content.substring(content.lastIndexOf(':') + 1) || '',
      }
      result.push(notice);
    }
  }
  res.json({
    status: 200,
    result
  })
})
module.exports = router;