/**
 * 获取电车列表
 */
exports.getElecCarList = async (idNum) => {
  const result = await axios({
    method: "POST",
    url: `https://app.hbzner.com/api/Vehicle/QueryAllList`,
    data: {
      "key": "",
      "UserID": "",
      "Data": {
        "Account": idNum
      }
    }
  });

  return (result && result.data.Data) || "";
};

exports.getElecCarnumber = async (idNum) => {
  const result = await axios({
    method: "POST",
    url: `https://app.hbzner.com/api/Vehicle/QueryAllList`,
    data: {
      "key": "",
      "UserID": "",
      "Data": {
        "Account": idNum
      }
    }
  });
  if (result.data.length == 0) {
    return '暂无车辆';
  }
  return (result && result.data.Data[0].code) || "暂无车辆";
};

/**
 * 获取用户信息
 */
exports.getElecticCarUserInfo = async (carUserId, carToken) => {
  const result = await axios({
    method: "get",
    url: `https://api.hbzner.com/v1/users/${carUserId}`,
    headers: {
      authorization: carToken
    }
  });
  return result && result.data;
};

/**
 * 获取人员轨迹
 */
exports.getPeopleGuiJi = async (epc, startDate, endDate) => {
  return this.getElectCarGuiJi(epc, startDate, endDate);
};

/**
 * 获取电车轨迹
 */
exports.getElectCarGuiJi = async (code, startDate, endDate) => {
  const url = `https://app.hbzner.com/api/Gis/QueryTrackList?code=${code}&startTime=${startDate}&endTime=${endDate}`;
  const result = await axios({
    method: "post",
    url: url
  });
  return result.data || [];
};

/**
 * 电车上锁
 */
exports.lockElectricCar = async (userId, eviId, lockState) => {
  const result = await axios({
    method: "post",
    url: "https://app.hbzner.com/api/Vehicle/Lock",
    data: {
      key: null,
      "UserId": `${userId}`,
      "Data": {
        "ID": `${eviId}`,
        "Lock": lockState
      }
    }
  });
  return result.data;
};
/**
 * 电车卫士消息列表
 */
exports.getEeticCarNoticeList = async (idNums) => {
  const pool = await msslqUtil();
  let idNumStr = '';
  if (idNums.length > 0) {
    for (let id of idNums) {
      idNumStr += `'${id}',`;
    }
    idNumStr = idNumStr.slice(0, -1);
  }
  const sql = `select b.*,p.address from (SELECT
    t.DeviceID,
    t.ID,
    t.VehicleEpc,
    t.AlarmTime,
    v.Code,
    v.OwnerName,
    v.OwnerId,
    v.OwnerPhone 
  FROM
    evi.LockAlarm t
    LEFT JOIN evi.Vehicle v ON t.VehicleID = v.ID 
  WHERE
    t.ID > 0 
    AND v.State = 1) b,pub.Device p where p.id = b.DeviceID and b.OwnerId in (${idNumStr}) order by b.AlarmTime desc`;
  const result = await pool.query(sql);
  return result.recordsets.length && result.recordsets.flat() || [];
}

exports.getEleticCarLastPoint = async (chePaiCode) => {
  const url = `https://app.hbzner.com/api/Gis/GetLastTrack?code=${encodeURIComponent(chePaiCode)}`;
  const result = await axios({
    method: "get",
    url: url
  });
  return result.data;
}

/**
 * 获取电车平台token
 */
exports.getEleticCarUserInfo = async (idNum, password) => {
  const result = await axios({
    method: 'POST',
    url: 'https://app.hbzner.com/api/User/Login',
    data: {
      "key": "",
      "UserID": "",
      "Data": {
        "Account": `${idNum}`,
        "Password": `${password}`
      }
    }
  })
  return result;
}

/**
 * idNumberToken获取列表
 */
exports.getCarListByIdNumToken = async (idNum) => {
  const result = await axios({
    method: "post",
    url: `https://app.hbzner.com/api/Vehicle/QueryAllList`,
    data: {
      "key": "",
      "UserID": "",
      "Data": {
        "Account": idNum
      }
    }
  });
  return result.data.Data;
}