module.exports = new mongoose.Schema({
	classId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "famlilyClasses"
	},
	title: {
		type: String,
		required: true
	}, //作业标题
	subject: {
		type: String,
		required: true
	}, //课目描述
	deadline: {
		type: String,
		required: true
	}, //截止日期
	content: {
		type: String
	}, //作业内容
	audio: {
		type: String
	}, //3分钟以内音频
	pictures: [{
		type: String
	}], //做多9张作业图片
	needParent: {
		type: Boolean,
		required: true,
		default: false
	}, //是否需要家长督促完成
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
	collection: 'homeworks'
});