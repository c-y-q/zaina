exports.getPetInfo = async (phone) => {
    const db = await mysqlUtil();
    const sql = ` SELECT
    REPLACE ( p.pet_photo_url, '${config.pet.replaceImgPath}', '${config.pet.imgHttp}' ) pet_photo_url,
    p.pet_name,
    p.gender,
    p.birthday,
    p.area_code,
    p.breed,
    p.coat_color,
    p.id,
    p.dog_reg_num,
    m.id_number,
    m.real_name,
    m.residential_address,
    m.contact_phone 
  FROM
    pet_master m,
    pet_register_info p,
    sys_branch s 
  WHERE
    p.area_code = s.CODE 
    AND m.id = p.master_id 
    AND p.pet_state IN ( 1, 3 ) 
    AND m.contact_phone = ? `;
    const result = await db.query(sql, [phone]);
    for (let i = 0; i < result.length; i ++) {
      result[i].id_number = result[i].id_number.replace(
        /^(.{6})(?:\d+)(.{4})$/,
        "$1********$2"
      );
      result[i].contact_phone = result[i].contact_phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
    db.close();
    return tools.toTuoFeng(result);
}

exports.isPetMaster = async (phone) => {
  const db = await mysqlUtil();
  const sql = ` SELECT r.* FROM pet_register_info r LEFT JOIN pet_master m ON r.master_id = m.id WHERE m.contact_phone = ? and r.pet_state in (0,1,3) `;
  const result = await db.query(sql, [phone]);
  db.close();
  return tools.toTuoFeng(result);
};

exports.isBinwxRef = async (dogRegNum, dogRegId) => {
  const db = await mysqlUtil();
  const sql = ` select id from  wx_binding_petinf where  dog_reg_num = ? and pet_reg_id = ? `;
  const result = await db.query(sql, [
      dogRegNum,
      dogRegId
  ]);
  db.close();
  return tools.toTuoFeng(result);
};

exports.judePetExists = async id => {
  const db = await mysqlUtil();
  const sql = `select id from pet_register_info where id = ? `;
  const result = await db.query(sql, [id]);
  db.close();
  return tools.toTuoFeng(result);
};

exports.directBindDogRegNum = async (petRegId, dogRegNum) => {
  const db = await mysqlUtil();
  const wx_pet_ref_sql = " insert into wx_binding_petinf set ? ";
  const wxPubPetInfRel = {
      pet_reg_id: petRegId,
      dog_reg_num: dogRegNum
  };
  const result = await db.query(wx_pet_ref_sql, wxPubPetInfRel);
  db.close();
  return result;
};