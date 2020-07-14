const express = require('express')
const app = express()



app.use(express.json())
app.use(require('cors')())
app.set("secret", 'sfajklfjkgjdfkl')
    // 静态文件托管
app.use('/upload', express.static(__dirname + '/upload'))
require('./db/db')(app)
require('./router/admin/index')(app)


app.listen(3000, () => {

})