/**
 * 电车平台
 */

const eleccarService = require("../service/eleccar");
const diffChePaiReg = /^(ps|PER|PS|PR)/;
/**
 * 获取电车列表
 */
router.post("/getElecCarList", async (req, res) => {
  const carToken = req.user.cartoken;
  const carUserId = process.env.NODE_ENV == 'dev' ? "5cb945a0cce17f3e61ab69ea" : req.user.carUserId;
  const carUserInfo = await eleccarService.getElecticCarUserInfo(carUserId, carToken);
  if (!carUserInfo || carUserInfo.length == 0 || carUserInfo.usersOfSys.length == 0) {
    res.json({
      status: 200,
      result: []
    });
    return;
  }
  const carUserIdNum = carUserInfo.usersOfSys.map(obj => obj.account)[0] || '';
  const electicCarList = await eleccarService.getElecCarList(carUserIdNum);
  let result = [];
  if (electicCarList.length > 0) {
    result = electicCarList.filter(obj => !(diffChePaiReg.test(obj.code)))
  }
  if (result.length > 0) {
    result = result.map(obj => {
      return {
        "userId": userStr.elecCarUserId || '',
        "eviId": obj.ID || '',
        "code": obj.Code,
        "registDate": obj.RegistDate,
        "ownerID": obj.OwnerID,
        "ownerName": obj.OwnerName,
        "lockState": obj.State, //1:lock,0:unlock
        "battery": obj.BatteryState || 0
      }
    })
  }
  res.json({
    status: 200,
    result
  });
});

/**
 * 获取人员轨迹
 */
router.post("/getPeopleGuiJi", async (req, res) => {
  const code = req.body.code;
  if (!code) {
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
  const result = await eleccarService.getPeopleGuiJi(encodeURIComponent(code), encodeURIComponent(startDate), encodeURIComponent(endDate));
  res.json({
    status: 200,
    result
  });
});

/**
 * 获取电车轨迹
 */
router.post("/getElectCarGuiJi", async (req, res) => {
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
  const result = await eleccarService.getElectCarGuiJi(encodeURIComponent(chePaiCode), encodeURIComponent(startDate), encodeURIComponent(endDate));
  res.json({
    status: 200,
    result
  });
});

/**
 * 电车上锁解锁
 */
router.post("/lockElectricCar", async (req, res) => {
  const elecCarUserId = req.body.elecCarUserId;
  const eviId = req.body.eviId;
  if (!elecCarUserId) {
    res.json({
      status: 1001,
      msg: "缺少elecCarUserId参数"
    });
    return;
  }
  const lockState = parseInt(req.body.lockState || 0);
  const result = await eleccarService.lockElectricCar(elecCarUserId, eviId, lockState);
  res.json({
    status: 200,
    result: result
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
        chePai: content.match(regChepai) && content.match(regChepai)[0] || content,
        noticeTime: content.match(regTime) && content.match(regTime)[0] || content,
        noticeAddr: content.substring(content.lastIndexOf(':') + 1) || content,
      }
      result.push(notice);
    }
  }
  res.json({
    status: 200,
    result
  })
})

/**
 * 获取最后一个点位
 */
router.post('/getEleticCarLastPoint', async (req, res) => {
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
  const result = await eleccarService.getEleticCarLastPoint(chePaiCode);
  res.json({
    status: 200,
    result: result
  })
})


/**
 * 获取守护人员列表
 */
router.post("/getProtectPersonList", async (req, res) => {
  const carToken = req.user.cartoken;
  const carUserId = process.env.NODE_ENV == 'dev' ? "5cb945a0cce17f3e61ab69ea" : req.user.carUserId;
  const carUserInfo = await eleccarService.getElecticCarUserInfo(carUserId, carToken);
  if (!carUserInfo || carUserInfo.length == 0 || carUserInfo.usersOfSys.length == 0) {
    res.json({
      status: 200,
      result: []
    });
    return;
  }
  const carUserIdNum = carUserInfo.usersOfSys.map(obj => obj.account)[0] || '';
  const electicCarList = await eleccarService.getElecCarList(carUserIdNum);
  let result = [];
  if (electicCarList.length > 0) {
    result = electicCarList.filter(obj => (diffChePaiReg.test(obj.code)))
  }
  res.json({
    status: 200,
    result
  });
});

/**
 * 身份证号和密码登录
 */
router.post('/loginByIdNum', async (req, res) => {
  const {
    idNum,
    password
  } = req.body;
  const account = req.user.account;
  if (!idNum || !password) {
    res.json({
      status: 1001,
      msg: "缺少idNum |password 参数"
    });
    return;
  }
  if (!validate.idCardNum(idNum)) {
    res.json({
      status: 1001,
      msg: "身份证格式错误!"
    });
    return;
  }
  try {
    const carUserInfoRes = await eleccarService.getEleticCarUserInfo(idNum, password);
    if (!(carUserInfoRes.data && carUserInfoRes.data.Result == 200)) {
      res.json({
        status: 205,
        msg: "账号或密码错误!"
      })
      return;
    }
    const tokenParam = {
      carUserInfo: carUserInfoRes && carUserInfoRes.data.Data || '',
      elecCarUserId: carUserInfoRes && carUserInfoRes.data.Data.UserID || '',
      account: account,
      uuid: tools.uuid(),
      visitIP: req.ip,
      expires: new Date().getTime()
    };
    const idCardNumToken = tools.createToken(tokenParam, cert.private);
    cache.set(`eletric_${account}`, JSON.stringify(tokenParam), "EX", 60 * 120 * 1000);
    res.json({
      status: 200,
      idCardNumToken
    })
  } catch (error) {
    res.json({
      status: 205,
      msg: "账号或密码错误!"
    })
  }

})

/**
 * 当手机号登录没有电车信息时，根据输入的身份证号和密码登录，获取电车信息列表
 */
router.post('/getElecticListByIdCardNumToken', async (req, res) => {
  const idCardNumToken = req.body.idCardNumToken;
  const account = req.user.account;
  const idCardNumTokenKey = `eletric_${account}`;
  const tokenObj = tools.verifyToken(idCardNumToken, cert.public);
  const redisUserInfo = await cache.get(idCardNumTokenKey);
  const userStr = redisUserInfo && JSON.parse(redisUserInfo);
  if (!redisUserInfo || !(tokenObj.uuid == userStr.uuid)) {
    res.json({
      status: 403,
      msg: "token is wrong!"
    })
    return;
  }
  const idNum = userStr && userStr.carUserInfo.Account || '';
  const electicCarList = await eleccarService.getCarListByIdNumToken(idCardNumToken, idNum);
  let result = [];
  if (electicCarList.length > 0) {
    result = electicCarList.filter(obj => !(diffChePaiReg.test(obj.code)))
  }
  if (result.length > 0) {
    result = result.map(obj => {
      return {
        "userId": userStr.elecCarUserId || '',
        "eviId": obj.ID || '',
        "code": obj.Code,
        "registDate": obj.RegistDate,
        "ownerID": obj.OwnerID,
        "ownerName": obj.OwnerName,
        "lockState": obj.State, //1:lock,0:unlock
        "battery": obj.BatteryState || 0
      }
    })
  }
  res.json({
    status: 200,
    result
  });
})

/**
 * 当手机号登录没有守护人员信息时，根据输入的身份证号和密码登录，获取守护人员信息列表
 */
router.post('/getProtectedPeopleListByIdCardNumToken', async (req, res) => {
  const idCardNumToken = req.body.idCardNumToken;
  const account = req.user.account;
  const idCardNumTokenKey = `eletric_${account}`;
  const tokenObj = tools.verifyToken(idCardNumToken, cert.public);
  const redisUserInfo = await cache.get(idCardNumTokenKey);
  const userStr = redisUserInfo && JSON.parse(redisUserInfo);
  if (!redisUserInfo || !(tokenObj.uuid == userStr.uuid)) {
    res.json({
      status: 403,
      msg: "token is wrong!"
    })
    return;
  }
  const idNum = userStr && userStr.carUserInfo.Account || '';
  log(290, idNum)
  const electicCarList = await eleccarService.getCarListByIdNumToken(idCardNumToken, idNum);
  let result = [];
  if (electicCarList.length > 0) {
    result = electicCarList.filter(obj => (diffChePaiReg.test(obj.code)));

  }
  if (result.length > 0) {
    result = result.map(obj => {
      return {
        "userId": userStr.elecCarUserId || '',
        "eviId": obj.ID || '',
        "code": obj.Code,
        "registDate": obj.RegistDate,
        "ownerID": obj.OwnerID,
        "ownerName": obj.OwnerName,
        "lockState": obj.State,
        "battery": obj.BatteryState || 0
      }
    })
  }

  res.json({
    status: 200,
    result
  });
})

module.exports = router;