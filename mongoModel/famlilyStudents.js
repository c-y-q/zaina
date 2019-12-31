module.exports = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: "default_student.png"
    },
    teacherCode: {
        type: String,
        required: true
    },
    parentCode: {
        type: String,
        required: true
    },
    badgeCode: {
        type: String
    },
    school: {
        type: String,
        required: true
    },
    usersOfSys: [{
        sysID: {
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
    state: {
        type: Number,
        default: 1,
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
        default: () => moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    modifyTime: {
        type: Date,
        required: true,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss"),
    }
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'modifyTime'
    },
    collection: 'students'
});