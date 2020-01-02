module.exports = new mongoose.Schema({
    classId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "famlilyClasses"
    },
    title: {
        type: String
    },
    content: {
        type: String
    }, //作业内容
    pictures: [{
        type: String
    }], //做多9张班务图片
    parents: [{
        type: Schema.Types.ObjectId,
        ref: "famlilyUser"
    }], //家长id数组，可从user信息中获取推送id
    state: {
        type: Number,
        default: 1,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "famlilyUser"
    },
    modifier: {
        type: Schema.Types.ObjectId
    },
    createTime: {
        type: Date,
        required: true,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss")
    },
    modifyTime: {
        type: Date,
        required: true,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss")
    }
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'modifyTime'
    },
    collection: 'bulletins'
});