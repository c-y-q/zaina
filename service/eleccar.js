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
  log(42, result.data)
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
exports.getEeticCarNoticeList = async (mobile, page, carToken) => {
  const url = `https://api.hbzner.com/v1/notices/${mobile}/pages/${page}`;
  const result = await axios({
    method: "get",
    url: url,
    headers: {
      authorization: carToken
    }
  });
  return result.data || [];
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
exports.getCarListByIdNumToken = async (carToken, idNum) => {
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

/**
 * sqlserver获取电车列表,已废弃，2020-01-13 15:35:00
 */
// exports.queryCarListMssql = async (idnums) => {
//   if (idnums.length == 0 || !Array.isArray(idnums)) {
//     return [];
//   }
//   const idNumString = idnums.join(',');
//   const querySql = `SELECT
//               a.ID AS UserID,
//               v.ID AS EviID,
//               v.Code,
//               v.EPC,
//               v.OwnerID,
//               v.OwnerName,
//               v.RegistDate,
//               ifnull(l.State,0) State,
//               t.Battery 
//             FROM
//               RFID.evi.Vehicle v
//               LEFT JOIN rfid.evi.lockdispatch l ON v.ID = l.VehicleID
//               LEFT JOIN rfid.sso.appuser a ON v.ownerid = a.account
//               LEFT JOIN rfid.evi.TagBattery t ON v.EPC = t.VehicleEpc 
//             WHERE
//               v.state = 1 
//               AND v.OwnerID IN (${idNumString}) 
//             ORDER BY
//               v.id`;
//   const result = await msslqUtil.query(querySql);
//   return result.recordsets;
// }