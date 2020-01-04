/**
 * 根据家长手机号查询小孩数据
 */
exports.findChildrenByParentPhone = async (account) => {
    const parentId = await getParentId(account);
    if (!parentId) {
        return [];
    }
    const classesParents = await mongoModel.famlilyClasses.find({
        'parents.parentId': parentId
    }, {
        _id: 1,
        grade: 1,
        school: 1,
        name: 1,
        'parents.studentId': 1
    }).populate({
        path: 'parents.studentId',
        select: '_id name avatar' //-_id
    })
    if (classesParents.length == 0) {
        return [];
    }

    /**
     * 如果没有学生
     */
    if (!(classesParents[0].parents.map(obj => obj.studentId).length > 0)) {
        return classesInfos;
    }

    /**
     * 有学生，查询得分情况
     */
    const classesInfos = JSON.parse(JSON.stringify(classesParents).replace(/(studentId)/g, 'student'));
    for (const i = 0; i < classesInfos.length; i++) {
        const parents = classesInfos[i].parents;
        for (const p = 0; p < parents.length; p++) {
            const studentId = parents[p].student._id;
            const score = await mongoModel.famlilyScore.find({
                classesId: classesInfos[i]._id,
                studentId: studentId
            }, {
                _id: 0,
                subject: 1,
                behavior: 1
            })
            /**
             * 为得分的行为分组，积极的，
             */
            const jieji = [],
                xiaoji = [];
            if (score.length > 0) {
                for (const sc of score) {
                    if (sc.behavior.type == '积极的') {
                        jieji.push(sc)
                    } else {
                        xiaoji.push(sc)
                    }
                }
            }
            classesInfos[i].parents[p].student.score = {
                jieji,
                xiaoji
            };
        }
    }
    return classesInfos;
}

exports.findmoney = async (account) => {

    const result = await mongoModel.famlilyUser.findOne({
        account: account
    },{
        _id: 0,
        'eMoney.money': 1,
        'eMoney.signedDate': 1
    })
    return result.eMoney;
}

exports.queryStudentsList = async (account) => {
    const parentId = await getParentId(account);
    if (!parentId) {
        return [];
    }
    const classesParents = await mongoModel.famlilyClasses.aggregate([
        {'$unwind': '$parents'},
        {'$match': {'parents.parentId': parentId}},
        {'$project': {'parents.studentId': 1, _id: 0}}
    ])
    const result = [];
    for(let i = 0; i < classesParents.length; i++) {
        const studentId = classesParents[i].parents.studentId;

        const StudentInfo = await mongoModel.famlilyStudents.find({
            _id: studentId
        },{
            __v: 0
        })

        result.push(StudentInfo[0])
    }

    if (result.length == 0) {
        return '暂无信息';
    }

    return result[0] && result[0].name || '暂无信息';
}

/**
 * 获取作业列表
 */
exports.getHomeworkInformList = async (account, pageSize, pageIndex) => {
    if (pageIndex < 1) {
        pageIndex = 1;
    }
    if (pageSize < 0) {
        pageSize = 5;
    }
    const resTempate = {
        totalPage: 1,
        totalCount: 0,
        pageIndex,
        pageSize,
        homeworkList: []
    };
    const parentId = await getParentId(account);
    if (!parentId) {
        return resTempate;
    }
    const classIds = await mongoModel.famlilyClasses.find({
        "parents.parentId": parentId
    }, {
        _id: 1
    })
    if (!classIds.length) {
        return resTempate;
    }
    const classIdArr = classIds.map(obj => obj._id);
    resTempate.totalCount = await mongoModel.famlilyHomework.countDocuments({
        classId: {
            $in: classIdArr
        }
    })
    resTempate.totalPage = Math.ceil(resTempate.totalCount / pageSize);
    if (pageIndex > resTempate.totalPage) {
        return resTempate;
    }
    const homeworkArr = await mongoModel.famlilyHomework.find({
        classId: {
            $in: classIdArr
        }
    }).populate({
        path: "classId",
        select: "name avatar grade school"
    }).populate({
        path: "creator",
        select: "name account nickName avatar"
    }).sort({
        modifyTime: -1
    }).limit(pageSize).skip(pageSize * (resTempate.pageIndex - 1));
    if (!homeworkArr.length) {
        return resTempate;
    }
    for (let i = 0; i < homeworkArr.length; i++) {
        let homeworkDb = homeworkArr[i];
        const homeAswer = await mongoModel.famlilyHomeworkAnswer.find({
            homeworkId: homeworkDb._id,
            creator: parentId
        });
        const homework = {
            isSubmitHomework: homeAswer.length > 0,
            needParent: homeworkDb.needParent,
            homeworkId: homeworkDb._id,
            className: `${homeworkDb.classId.school}${homeworkDb.classId.grade}${homeworkDb.classId.name}`,
            classAvatar: homeworkDb.classId.avatar || '',
            title: homeworkDb.title,
            content: homeworkDb.content,
            audio: homeworkDb.audio,
            pictures: homeworkDb.pictures,
            subject: homeworkDb.subject,
            deadline: homeworkDb.deadline,
            teacherName: homeworkDb.creator.name || homeworkDb.creator.nickName || homeworkDb.creator.account.substring(homeworkDb.creator.account.length - 4) + "老师",
            teacherAvatar: homeworkDb.creator.avatar ? homeworkDb.creator.avatar : "",
            modifyTime: moment(homeworkDb.modifyTime).utcOffset(8).format('YYYY/MM/DD HH:mm:ss')
        }
        resTempate.homeworkList.push(homework);
    }
    return resTempate;
}

/**
 * 
 * 获取通知列表
 */
exports.getGongGaoInformList = async (account, pageSize, pageIndex) => {
    if (pageIndex < 1) {
        pageIndex = 1;
    }
    if (pageSize < 0) {
        pageSize = 5;
    }
    const resTempate = {
        totalPage: 1,
        totalCount: 0,
        pageIndex,
        pageSize,
        gongGaoList: []
    };
    const parentId = await getParentId(account);
    if (!parentId) {
        return resTempate;
    }
    const classIds = await mongoModel.famlilyClasses.find({
        "parents.parentId": parentId
    }, {
        _id: 1
    })
    if (!classIds.length) {
        return resTempate;
    }
    const classIdArr = classIds.map(obj => obj._id);
    resTempate.totalCount = await mongoModel.famlilyBulletins.countDocuments({
        classId: {
            $in: classIdArr
        }
    })
    resTempate.totalPage = Math.ceil(resTempate.totalCount / pageSize);
    if (pageIndex > resTempate.totalPage) {
        return resTempate;
    }
    const bulletinsDb = await mongoModel.famlilyBulletins.find({
        classId: {
            $in: classIdArr
        }
    }).populate({
        path: "classId",
        select: "name avatar grade school"
    }).populate({
        path: "creator",
        select: "name account nickName avatar"
    }).sort({
        modifyTime: -1
    }).limit(pageSize).skip(pageSize * (resTempate.pageIndex - 1));
    if (bulletinsDb.length == 0) {
        return resTempate;
    }
    //拼接公告信息
    for (let i = 0; i < bulletinsDb.length; i++) {
        let bulletin = bulletinsDb[i];
        let gongGao = {
            bulletinId: bulletin._id,
            title: bulletin.title,
            className: `${bulletin.classId.school}${bulletin.classId.grade}${bulletin.classId.name}`,
            classAvatar: bulletin.classId.avatar || '',
            content: bulletin.content,
            teacherName: bulletin.creator.name || bulletin.creator.nickName || bulletin.creator.account.substring(bulletin.creator.account.length - 4) + "老师",
            pictures: bulletin.pictures,
            teacherAvatar: bulletin.creator.avatar || '',
            modifyTime: moment(bulletin.modifyTime).utcOffset(8).format('YYYY/MM/DD HH:mm:ss'),
        };
        resTempate.gongGaoList.push(gongGao);
    }
    return resTempate;
}
exports.sign = async (account) => {
    const parentId = await getParentId(account);
    if (!parentId) {
        return [];
    }
    let todayDate = moment(new Date()).utcOffset(8).format('YYYY-MM-DD');
    let addDate = moment(new Date()).utcOffset(8).add(1, 'days').format('YYYY-MM-DD');
    const result = mongoModel.famlilyUser.findOneAndUpdate({_id: parentId, "eMoney.signedDate": {$lte : todayDate}}, {$inc:{"eMoney.money": 10}, "eMoney.signedDate": addDate});
    return result;
}
/**
 * 家校惠通，根据手机号找到parentID;即userId
 */
async function getParentId(account) {
    const result = await mongoModel.famlilyUser.findOne({
        account: account
    }, {
        _id: 1
    })
    return result && result._id || '';
}