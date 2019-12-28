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
  const key = `verify_code${account}`;
  const sendSmsCode = await cache.get(key);
  if (sendSmsCode != vcode) {
    res.json({
      status: 402,
      msg: '验证码错误！'
    })
    return;
  }
  await userService.findUser(account);
  const audience = tools.md5(account);
  const tokenParam = {
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
    return
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
  const [data, vcode] = await tools.sendSMS(account);
  if (!(data.data && data.data.Code == 'OK')) {
    res.json({
      status: 201,
      msg: '验证码发送失败，请稍后重试！'
    })
    return;
  }
  res.json({
    status: 200,
    msg: '验证码发送成功,请注意查收！'
  })
  cache.set(key, vcode, 'EX', 60 * 2);

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