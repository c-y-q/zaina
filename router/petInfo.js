const petService = require('../service/petInfo');
router.post('/getPetInfo', async (req, res, next) => {
    const phone = req.user.account;
    const result = await petService.getPetInfo(phone);
    res.json({
        status: 200,
        result
    })
})

router.post("/directBindDogRegNum", async (req, res) => {
    const phone = req.user.account;
    let isfree = await petService.isPetMaster(phone);
      if (isfree.length > 0) {
        log("验证通过");
      } else {
        res.json({
          status: 405,
          respMsg: "验证失败"
        });
      }
    const flag = await petService.isBinwxRef(
      isfree[0].dogRegNum,
      isfree[0].id,
    );
    if (flag.length > 0) {
      throw {
        status: 405,
        respMsg: " 已绑定过该号码，请勿重复绑定 "
      };
    }
    const judePetExists = await petService.judePetExists(isfree[0].id);
    if (!judePetExists) {
      throw {
        status: 405,
        respMsg: " the dog not exists "
      };
    }
    await petService.directBindDogRegNum(
      isfree[0].id,
      isfree[0].dogRegNum
    );
    res.json({
      
      status: 200,
      respMsg: "bind success "
    });
  });
module.exports = router;