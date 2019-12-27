const userService = require("../service/user/user");
/**
 * 在哪app用户
 */

router.post("/login", async (req, res) => {
  const account = req.body.account;
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
router.get('/getData', async (req, res) => {
  res.json({
    result: 'pl'
  })
})
module.exports = router;