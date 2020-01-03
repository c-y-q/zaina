/**
 * 家长提交作业集合
 */

module.exports = new mongoose.Schema({
	classId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "famlilyClasses"
	},
	homeworkId: {
		type: Schema.Types.ObjectId,
		ref: "famlilyHomework"
	},

	content: {
		type: String
	}, //答案内容
	audio: {
		type: String
	}, //3分钟以内音频
	pictures: [{
		type: String
	}], //做多9张作业图片
	submitTime: {
		type: Date,
		required: true,
		default: () => moment().format("YYYY-MM-DD HH:mm:ss")
	}, //提交时间

	comment: {
		type: String
	}, //评语
	score: {
		type: Number
	}, //评分
	teacherId: {
		type: Schema.Types.ObjectId,
		ref: "famlilyUser"
	}, //评价老师

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
		default: () => new Date()
	},
	modifyTime: {
		type: Date,
		required: true,
		default: () => new Date()
	}
}, {
	timestamps: {
		createdAt: 'createTime',
		updatedAt: 'modifyTime',
		createdAt: 'submitTime'
	},
	collection: 'homeworkAnswers'
});