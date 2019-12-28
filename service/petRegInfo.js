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