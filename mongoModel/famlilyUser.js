module.exports = new mongoose.Schema({
  isOpenFinger: {
    type: Boolean,
    default: false
  }, //是否开启指纹
  remarks: {
    type: String
  },
  account: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  safetycode: {
    type: String
  },
  nickName: {
    type: String
  },
  avatar: {
    type: String
  },
  school: {
    type: String
  },
  usersOfSys: [{
    sysID: {
      type: String
    },
    name: {
      type: String
    },
    account: {
      type: String
    },
    sysType: {
      type: String
    },
    auth: {
      type: Boolean,
      default: false,
      required: true
    }
  }],
  wxOpenId: {
    type: String
  },
  aliOpenId: {
    type: String
  },
  jPush: {
    jgId: {
      type: String
    },
    jgTag: {
      type: String
    },
    osType: {
      type: String
    },
    isClose: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  name: {
    type: String
  },
  sex: {
    type: String
  },
  birthDay: {
    type: String
  },
  token: {
    type: String
  },
  eMoney: {
    money: {
      type: Number,
      default: 0,
      required: true
    },
    signedDate: {
      type: String,
      default: () => moment().format("YYYY-MM-DD"),
      required: true
    }
  },
  userType: {
    type: String,
    default: "where",
    required: true
  },
  state: {
    type: Number,
    default: 1,
    required: true
  },
  isWxPushMsg: {
    type: Boolean,
    default: false,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId
  },
  modifier: {
    type: Schema.Types.ObjectId
  },
  createTime: {
    type: Date,
    required: true,
    default: () => moment().format("YYYY-MM-DD"),
  },
  modifyTime: {
    type: Date,
    required: true,
    default: () => moment().format("YYYY-MM-DD"),
  }
}, {
  timestamps: {
    createdAt: "createTime",
    updatedAt: "modifyTime"
  },
  collection: "usersOfApp"
});