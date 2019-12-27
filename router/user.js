router.get('/getData', async (req, res) => {
    const db = await mysqlUtil();
    const sql = 'select * from wx_order where id =1';
    const user = await mongoModel.user.find({});
    const infolist = await mongoModel.infolist.find({})
    const result = await db.query(sql);
    await db.close();
    res.json({
        // result: result,
        // user
        infolist
    })
})



module.exports = router;