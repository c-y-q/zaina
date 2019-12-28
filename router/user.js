/**
 * 在哪app用户
 */

const userService = require("../service/user");

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
      msg: " 手机格式错误！"
    })
    return;
  }

  await userService.findUser(account);
  const audience = tools.md5(account);
  const carInfo = await axios({
    method: 'post',
    url: 'https://api.hbzner.com/v1/getToken',
    data: {
      type: "sye",
      account: account,
      password: vcode
    }
  })
  const cartoken = `Bearer ${carInfo && carInfo.data.token }`;
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
  }
  const token = tools.createToken(tokenParam, cert.private);
  cache.set(audience, JSON.stringify(tokenParam), 'EX', 60 * 120);
  res.json({
    token
  });
});

/**
 * 发送手机验证码
 */
router.post('/sendSMS', async (req, res, next) => {
  const account = req.body.account;
  if (!validate.phone(account)) {
    res.json({
      status: 401,
      msg: " 手机格式错误！"
    })
    return;
  }
  const key = `verify_code${account}`;
  const sendSmsCode = await cache.get(key);
  if (sendSmsCode) {
    res.json({
      status: 405,
      msg: '验证码已发送，请2分钟后重试！'
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
      msg: " 验证码发送次数已达到最大限制！"
    })
    return;
  }
  res.json({
    status: 200,
    msg: '验证码发送成功,请注意查收！'
  })

})

/**
 * 退出登录
 */
router.post('/logout', async (req, res, next) => {
  const audience = req.user.audience;
  await cache.del(audience);
  res.json({
    status: 200,
    msg: '已退出登录！'
  })

})

module.exports = router;