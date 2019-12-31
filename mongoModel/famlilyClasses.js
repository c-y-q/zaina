module.exports = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true,
		default: "default_class.png"
	},
	grade: {
		type: String,
		required: true
	},
	teacherCode: {
		type: String,
		required: true
	},
	parentCode: {
		type: String,
		required: true
	},
	cameraCode: {
		type: String
	},
	school: {
		type: String,
		required: true
	},
	students: [{
		type: Schema.Types.ObjectId,
		ref: "famlilyStudents"
	}],
	subScore: [{
		_id: false,
		student: {
			type: Schema.Types.ObjectId,
			ref: "famlilyStudents"
		},
		teacher: {
			type: Schema.Types.ObjectId
		},
		score: {
			type: Number
		}
	}],
	plans: [{
		_id: false,
		planId: {
			type: Schema.Types.ObjectId
		},
		teacherId: {
			type: Schema.Types.ObjectId
		},
		planName: {
			type: String
		},
		createTime: {
			type: Date,
			required: true,
			default: () => moment().format("YYYY-MM-DD HH:mm:ss"),
		}
	}],
	groups: [{
		_id: false,
		planId: {
			type: Schema.Types.ObjectId
		},
		groupId: {
			type: Schema.Types.ObjectId
		},
		groupName: {
			type: String
		},
		groupAvatar: {
			type: String,
			required: true,
			default: "default_groupAvatar.png"
		},
		groupScore: {
			type: Number,
			default: 0,
			required: true
		},
		students: [{
			type: Schema.Types.ObjectId,
			ref: "famlilyStudents"
		}],
		createTime: {
			type: Date,
			required: true,
			default: () => moment().format("YYYY-MM-DD HH:mm:ss"),
		}
	}],
	subject: [{
		_id: false,
		teacher: {
			type: Schema.Types.ObjectId,
			ref: "famlilyUser"
		},
		name: {
			type: String
		}
	}],
	behaviors: [{
		_id: false,
		behaviorId: {
			type: Schema.Types.ObjectId
		},
		teacherId: {
			type: Schema.Types.ObjectId
		},
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
		},
		isCustom: {
			type: Number,
			default: 0,
			required: true
		},
		sort: {
			type: Number,
			required: true,
			default: 100
		}
	}],
	parents: [{
		_id: false,
		studentId: {
			type: Schema.Types.ObjectId,
			ref: "famlilyStudents"
		},
		parentId: {
			type: Schema.Types.ObjectId,
			ref: "famlilyUser"
		}
	}],
	isMe: {
		type: Boolean,
		default: true,
		required: true
	},
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
	collection: 'classes'
});