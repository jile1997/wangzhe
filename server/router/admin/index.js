module.exports = (app) => {
    let express = require('express')
    let router = express.Router({
            mergeParams: true
        })
        //合并动态路由params 可以去掉了 因为挂载到req对象上了
        // let editlb = require('../../model/')
    let assert = require('http-assert') //错误抛出的包
    let jwt = require('jsonwebtoken')

    router.post('/', async(req, res) => {
        let result = await req.model.create(req.body)
        res.send(result)
    })
    router.put('/:id', async(req, res) => {
        let result = await req.model.findByIdAndUpdate(req.params.id, req.body)
        res.send(result)
    })
    router.delete('/:id', async(req, res) => {
        await req.model.findByIdAndDelete(req.params.id)
        res.send({
            "msg": "删除成功"
        })
    })
    router.get('/', async(req, res) => {
        // console.log(req.model.modelName)不知道为啥有个modelName属性
        let isparent = {}
        if (req.params.resource === 'editlb') {
            isparent.populate = 'parent'
        }
        let result = await req.model.find().setOptions(isparent)
        res.send(result)
    })
    router.get('/:id', async(req, res) => {
        let result = await req.model.findById(req.params.id)
        res.send(result)
    })

    // 登陆校验中间件
    const auth = require('../../middleware/auth')


    // npm i inflection 处理首字母变大写 复数变单数形式
    //inflection.classify(值)  editlbs Editlb
    app.use('/admin/api/restful/:resource', auth(), async(req, res, next) => {
        req.model = require(`../../model/${req.params.resource}`)
        next()
    }, router)

    app.post('/admin/api/login', async(req, res, next) => {
        let { username, password } = req.body
        let adminuser = require('../../model/adminuser')
        let user = await adminuser.findOne({ username }).select('+password')
            // if (!user) {
            //     return res.status(422).send({
            //         err: -1,
            //         msg: '用户不存在'
            //     })
            // }
        assert(user, 422, '用户不存在')
        let ispass = require('bcryptjs').compareSync(password, user.password)
            // if (!ispass) {
            //     return res.status(422).send({
            //         err: -2,
            //         msg: '密码错误'
            //     })
            // }
        assert(ispass, 422, '密码错误')

        let token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    // 引入文件上传模块
    const multer = require('multer');
    const upload = multer({ dest: "./upload" })
    const fs = require('fs')

    // 更改文件名称
    const rename = (req) => {
        // destination随机名称没有后缀名 orientation原名称有后缀名
        let oldPath = req.file.destination + "/" + req.file.filename;
        let newPath = req.file.destination + "/" + req.file.filename + req.file.originalname;
        fs.renameSync(oldPath, newPath, () => {
            //console.log("改名成功")
        })
        return {
            state: 'ok',
            imgUrl: "http://localhost:3000/upload/" + req.file.filename + req.file.originalname
        }
    }
    app.post('/admin/api/upload', auth(), upload.single('file'), (req, res) => {
        if (req.file == undefined) {
            return res.send({
                err: -1,
                msg: '上传文件不能为空'
            })
        } else {
            let { size, mimetype } = req.file
            let types = ['jpg', 'jpeg', 'png', 'gif']
                // console.log(req.file)
                // 因为传上来格式为 image/jpeg image/gif 所以要分割一下
            let tmpType = mimetype.split('/')[1]
            if (size > 5000000) {
                return res.send({
                    err: -2,
                    msg: '文件过大'
                })
            } else if (types.indexOf(tmpType) == -1) {
                return res.send({
                    err: -3,
                    msg: '文件格式不符合规定'
                })
            } else {
                let result = rename(req)
                return res.send(result)

            }


        }

    })


    // 错误处理函数
    app.use(async(err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            msg: err.message
        })
    })
}