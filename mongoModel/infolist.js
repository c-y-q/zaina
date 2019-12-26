module.exports = new mongoose.Schema({
    hit: {
        type: Number,
        default: 0
    },
    keywords: {
        type: String
    },
    description: {
        type: String
    },
    links: {
        type: String,
        default: '' //文章连接
    },
    summary: { //摘要
        type: String
    },
    lanmu: {
        type: Number,
        default: 0 //1,新闻中心,2,客户案例
    },
    title: { //标题
        type: String
    },
    author: { //作者编辑
        type: String
    },
    content: { //详细内容
        type: String
    },
    picurl: { //缩略图片
        type: String
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    delstate: { //删除状态
        type: Boolean,
        default: false
    },
    deltime: { //删除时间
        type: Date,
        default: Date.now
    }
}, {
    collection: 'infolists'
})