// jwt模块
const { tokenCheck } = require('../controls/userControl');
const { verifyTokenExpires } = require('../utils/jwt')

let tokenMiddleware = (req, res, next) => {
    let { token } = req.body;
    //验证用户有没有传token
    if (!token) { return res.send({ err: -997, msg: 'token丢失' }) };
    //获取验证token的状态(有无过期)
    let tokenState = verifyTokenExpires(token);
    if (tokenState) {
        //判断一下数据库token 和用户传递的token 是否一致
        tokenCheck(tokenState._id, token)
            .then(() => {
                next();
            })
            .catch((err) => {
                res.send({ err: -999, msg: err });
            })
    } else {
        res.send({ err: -998, msg: 'token失效' });
    }
}

module.exports = tokenMiddleware;