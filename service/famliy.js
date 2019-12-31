/**
 * 根据家长手机号查询小孩数据
 */
exports.findChildrenByParentPhone = async (phone) => {
    const parent = await getParentId(phone);
    if (!parent) {
        return [];
    }
    const parentId = parent._id;
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
    if (!(classesParents[0].parents[0].studentId)) {
        return classesInfos;
    }

    /**
     * 有学生，查询得分情况
     */
    const classesInfos = JSON.parse(JSON.stringify(classesParents).replace(/(studentId)/g, 'student'));
    for (let i = 0; i < classesInfos.length; i++) {
        let parents = classesInfos[i].parents;
        for (let p = 0; p < parents.length; p++) {
            let studentId = parents[p].student._id;
            let score = await mongoModel.famlilyScore.find({
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
                for (let sc of score) {
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

/**
 * 家校惠通，根据手机号找到parentID;即userId
 */
async function getParentId(account) {
    return await mongoModel.famlilyUser.findOne({
        account: account
    }, {
        _id: 1
    })
}