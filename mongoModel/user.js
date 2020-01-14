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
    idNum: {
      type: String
    },
    userId: {
      type: String
    },
    _id: false
  }],
  family: [{
    phone: {
      type: String,
    },
    userId: {
      type: String
    },
    _id: false
  }]
}, {
  collection: "zaina_app_user"
});