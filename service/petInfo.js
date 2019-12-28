exports.getPetInfo = async (phone) => {
    const db = await mysqlUtil();
    const sql = ` select 
                    replace(p.pet_photo_url, '${config.pet.replaceImgPath}', '${config.pet.imgHttp}')  pet_photo_url,
                    p.gender,p.breed,p.coat_color, p.id,m.id_number,p.dog_reg_num,
                    m.real_name,m.residential_address,m.contact_phone
                   from 
                      pet_master m, pet_register_info p,sys_branch s
                    where
                    p.area_code = s.code
                    and m.id = p.master_id 
                    and p.pet_state in(1,3)
                    and m.contact_phone = ? `;
    const result = await db.query(sql, [phone]);
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