/**
 * 获取电车列表
 */
exports.getElecCarList = async (idNum, carToken) => {
  const result = await axios({
    method: "POST",
    url: `https://api.hbzner.com/v1/vehicles`,
    headers: {
      authorization: carToken
    },
    data: idNum
  });
  return (result && result.data) || "";
};

exports.getElecCarnumber = async (idNum, carToken) => {
  const result = await axios({
    method: "POST",
    url: `https://api.hbzner.com/v1/vehicles`,
    headers: {
      authorization: carToken
    },
    data: idNum
  });
  if (result.data.length == 0) {
    return '暂无车辆';
  }
  return (result && result.data[0].code) || "暂无车辆";
};

/**
 * 获取用户信息
 */
exports.getElecticCarUserInfo = async (carUserId, carToken) => {
  const result = await axios({
    method: "GET",
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
exports.getPeopleGuiJi = async (carToken, epc, startDate, endDate) => {
  // const result = await axios({
  //     method: 'post',
  //     url: "http://183.196.90.14:9016/api/Gis/QueryEVITrackList",
  //     headers: {
  //         'authorization': carToken
  //     },
  //     data: {
  //         epc: epc,
  //         starttime: startDate,
  //         endtime: endDate
  //     }
  // })
  // return result.data || [];
  return this.getElectCarGuiJi(epc, startDate, endDate, carToken);
};

/**
 * 获取电车轨迹
 */
exports.getElectCarGuiJi = async (code, startDate, endDate, carToken) => {
  const url = `https://app.hbzner.com/api/Gis/QueryTrackList?code=${code}&startTime=${startDate}&endTime=${endDate}`;
  const result = await axios({
    method: "post",
    url: url,
    headers: {
      authorization: carToken
    }
  });
  return result.data || [];
};

/**
 * 电车上锁
 */
exports.lockElectricCar = async (carToken, userId, eviId, lockState) => {
  const result = await axios({
    method: "post",
    url: `https://app.hbzner.com/api/Vehicle/Lock`,
    headers: {
      authorization: carToken
    },
    data: {
      UserID: userId,
      Key: "",
      Data: {
        ID: eviId,
        Lock: lockState
      }
    }
  });
  return result && result.data;
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