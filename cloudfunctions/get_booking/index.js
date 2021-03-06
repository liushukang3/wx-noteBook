// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取数据库引用
const db = cloud.database();

// 云函数入口函数 async当前函数可以进行异步
exports.main = async(event, context) => {
    try {
        // await 等待所有异步完成
        // 添加记账数据
        return await db.collection('bookingData').where({
            detailData:{
              date:event.date
            },
            userInfo: event.userInfo
        }).get()
    } catch (err) {
        //console.log("云函数出错 err=> ", err)
    }
}