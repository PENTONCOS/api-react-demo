const jwt = require('jsonwebtoken');
// 对jwt相关的封装
// 生成token的方法
const secret = 'jiapandongisthebest66666';
let createToken = (data, expires) => {
    let obj = {};
    obj.data = data || {};//存入token的数据
    obj.ctime = (new Date()).getTime();//token的创建时间
    obj.expires = expires || 1000 * 60 * 60 * 24 * 7;//设定的过期时间
    let token = jwt.sign(obj, secret);
    return token;
}

// 查看token有无过期的方法
let verifyTokenExpires = (token) => {
    let result = null;
    try {
        let { data, ctime, expires } = jwt.verify(token, secret);//可以取到存入token的内容
        let currTime = (new Date()).getTime();
        if (currTime - ctime < expires) {
            // 若无过期
            result = data;
        }
    } catch (error) { };
    return result;//存入token的数据
}

module.exports = {
    createToken,
    verifyTokenExpires
}