const petService = require('../service/petInfo');
const userService = require("../service/user");
router.post('/getPetInfo', async (req, res, next) => {
  const phone = req.user.account;
  const userRes = await userService.findUserByAccount(phone);
  const petInfoArr = userRes && userRes.pet || [];
  let phones = [phone];
  if (petInfoArr.length > 0) {
    let petPhones = petInfoArr.map(item => item.phone);
    phones = phones.concat(petPhones);
  }
  const result = await petService.getPetInfo(phones);
  res.json({
    status: 200,
    result
  })
})

/**
 * 1.通过前端传入的手机号进行绑定
 * 2.将要绑定的手机号和登陆的手机号进行比对
 * 3.验证验证码是否正确
 * 4.将传入的手机号push进petmodel中
 */
router.post("/directBindDogRegNum", async (req, res) => {
  const phone = req.user.account;
  const {
    account,
    vcode
  } = req.body;
  if (phone == account) {
    res.json({
      status: 405,
      msg: "无法绑定本用户"
    });
    return;
  }
  try {
    await axios({
      method: "post",
      url: "https://api.hbzner.com/v1/getToken",
      data: {
        type: "sye",
        account: account,
        password: vcode
      }
    });
  } catch (error) {
    log(45, error)
    res.json({
      status: 1002,
      msg: " 验证码错误"
    })
    return;
  }

  let isfree = await petService.isPetMaster(account);
  if (!isfree.length) {
    res.json({
      status: 405,
      msg: "暂无犬证!"
    });
    return;
  }
  // const flag = await petService.isBinwxRef(
  //   isfree[0].dogRegNum,
  //   isfree[0].id,
  // );
  // if (flag.length > 0) {
  //   throw {
  //     status: 405,
  //     msg: " 已绑定过该号码，请勿重复绑定"
  //   };
  // }
  // const judePetExists = await petService.judePetExists(isfree[0].id);
  // if (!judePetExists) {
  //   throw {
  //     status: 405,
  //     msg: " the dog not exists"
  //   };
  // }
  await petService.directBindDogRegNum(
    account,
    phone
  );
  res.json({
    status: 200,
    respMsg: "bind success !"
  });
});
module.exports = router;