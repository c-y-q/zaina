module.exports = new mongoose.Schema(
  {
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
    }
  },
  {
    collection: "zaina_app_user"
  }
);
