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
  famlily: [{
    phone: {
      type: String,
    },
    _id: false
  }],
  pet: [{
    phone: {
      type: String,
    },
    _id: false
  }]
}, {
  collection: "zaina_app_user"
});