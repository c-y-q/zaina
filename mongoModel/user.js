module.exports = new mongoose.Schema({
  userName: {
    type: String
  },
  nickName: {
    type: String
  },
  avatar: {
    type: String
  },
  money: {
    type: Number
  },
  car: [{
    _id: false,
    idNum: {
      type: String
    },
    userId: {
      type: String
    }
  }],
  family: [{
    _id: false,
    phone: {
      type: String,
    },
    userId: {
      type: String
    }
  }]
}, {
  collection: "zaina_app_user"
});