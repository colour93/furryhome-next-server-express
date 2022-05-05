/**
 * mongo.js
 * 数据库入口文件
 */

// 引入库
const mongoose = require('mongoose');

// 引入配置文件
const {host, user, pwd, db} = require('./config.json').mongo;

// 连接操作
console.log("初始化 moogoDB 连接");

mongoose.connect(`mongodb://${user}:${pwd}@${host}/${db}`, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.once('open',async (err)=>{ 
    if(!err){
        console.log('moogoDB 连接成功');
    }else{
        console.log('moogoDB 连接失败');
        console.log(err);
    }
})

// 退出前发送释放指令
process.on('SIGINT', async () => {
    console.log("正在断开 mongoDB 连接");
    await mongoose.disconnect();
    process.exit();
});

// 导出
module.exports = mongoose;