module.exports = new mongoose.Schema({
	classesId: {
		type: Schema.Types.ObjectId,
		ref: "famlilyClasses"
	},
	studentId: {
		type: Schema.Types.ObjectId,
		ref: "famlilyStudents"
	},
	behavior: {
		name: {
			type: String
		},
		avatar: {
			type: String
		},
		classify: {
			type: String
		},
		score: {
			type: Number
		},
		type: {
			type: String
		}
	},
	subject: {
		type: String
	},
	workDate: {
		type: String,
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
	collection: 'scores'
});