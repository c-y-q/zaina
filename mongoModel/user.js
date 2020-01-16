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
  }],
  eMoney: {
    money: { 
      type: Number, 
      default: 0, 
      required: true },
    signedDate: {
      type: String,
      default: () =>
        moment(new Date())
          .utcOffset(0)
          .format("YYYY-MM-DD"),
      required: true
    }
  }
}, {
  collection: "zaina_app_user"
});