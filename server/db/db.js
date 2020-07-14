module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.set('useFindAndModify', false)
    mongoose.connect('mongodb://localhost:27017/wzadmin', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) // 连接成功
        .then(() => console.log('数据库连接成功'))
        // 连接失败
        .catch(err => console.log(err, '数据库连接失败'));
}