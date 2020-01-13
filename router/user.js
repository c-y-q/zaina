/**
 * 在哪app用户
 */

const userService = require("../service/user");
const petService = require('../service/petInfo');
const eleccarService = require("../service/eleccar");
const famlilySerive = require('../service/famliy');

router.post("/findUserInfo", async (req, res) => {
  const account = req.user.account;
  const pet = await petService.getPetNum(account);
  // 查询本用户金币
  const signmoney = await famlilySerive.findmoney(account);
  const user = await userService.findUser(account);
  user.money = signmoney.money;
  // 判断今日是否可以签到
  let panduan = true;
  let todayDate = moment(new Date()).utcOffset(8).format('YYYY-MM-DD');
  if (todayDate < signmoney.signedDate) {
    panduan = false;
  }
  const family = await famlilySerive.queryStudentsList(account);
  const userRes = await userService.findUserByAccount(account);
  const idNums = userRes && userRes.car && userRes.car.length > 0 && userRes.car.map(obj => obj.idNums)[0] || '';
  const eleccar = await eleccarService.getElecCarnumber(idNums);
  res.json({
    status: 200,
    result: {
      pet,
      eleccar,
      user,
      student: family,
      keeper: '暂无信息',
      signed: panduan
    }
  });
})

router.post('/sign', async (req, res) => {
  const phone = req.user.account;
  const result = await famlilySerive.sign(phone);
  if (result) {
    res.json({
      status: 200,
      msg: '签到成功'
    })
    return;
  }
  res.json({
    status: 201,
    msg: '今日已经签到'
  })
})

/**
 * 登录
 */
router.post("/login", async (req, res) => {
  const {
    account,
    vcode
  } = req.body;
  if (!validate.phone(account)) {
    res.json({
      status: 401,
      msg: " 手机格式错误"
    })
    return;
  }
  await userService.findUser(account);
  const audience = tools.md5(account);
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
    const cartoken = `Bearer ${carInfo && carInfo.data.token}`;
    const carUserId = carInfo && carInfo.data._id;
    //carToken:请求电车平台需要的token,id
    const tokenParam = {
      cartoken,
      carUserId,
      account,
      uuid: tools.uuid(),
      visitIP: req.ip,
      audience,
      expires: new Date().getTime()
    };
    const token = tools.createToken(tokenParam, cert.private);
    cache.set(audience, JSON.stringify(tokenParam), "EX", 60 * 120 * 1000);
    res.json({
      token
    });
  } catch (error) {
    res.json({
      status: 1002,
      msg: " 验证码错误"
    })
  }

});

/**
 * 发送手机验证码
 */
router.post('/sendSMS', async (req, res) => {
  const account = req.body.account;
  if (!validate.phone(account)) {
    res.json({
      status: 401,
      msg: " 手机格式错误"
    })
    return;
  }
  const sendSMsRes = await axios({
    method: 'get',
    url: `https://api.hbzner.com/v1/verificationCode/${account}`
  })
  if (sendSMsRes && sendSMsRes.data && sendSMsRes.data.times == 3) {
    res.json({
      status: 405,
      msg: " 验证码发送次数已达到最大限制"
    })
    return;
  }
  res.json({
    status: 200,
    msg: '验证码发送成功,请注意查收'
  })

})

/**
 * 退出登录
 */
router.post('/logout', async (req, res) => {
  const audience = req.user.audience;
  await cache.del(audience);
  res.json({
    status: 200,
    msg: '已退出登录！'
  })
})

module.exports = router;