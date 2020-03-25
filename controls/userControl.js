const UserModel = require("../db/model/userModel")
const { createToken } = require('../utils/jwt')
let userReg = async (user, pass) => {
  //  1. 用户名是否重复
  let isExst = await UserModel.findOne({ user })
  let result
  // 如果查询到数据 返回查到的数据 没有返回假 
  if (isExst) {
    throw '用户名已注册'
  } else {
    result = await UserModel.insertMany({ user, pass })
  }
  //  2. 插入数据库
  return result
}

// 用户登录
let userLogin = async (user, pass) => {
  let result = await UserModel.findOne({ user, pass })

  if (result) {
    //  登录成功 产生新的token
    let { _id, user } = result
    let token = createToken({ _id, user })
    //将token更新数据库
    let updateResult = await UserModel.updateOne({ _id }, { token })
    // 错误处理判断
    console.log(updateResult)
    return { _id, user, token }
  } else {
    throw '用户名或密码不存在'
  }
}
//  判断token 和用户是否统一 
let tokenCheck = async (_id, token) => {
  let result = await UserModel.findOne({ _id, token })
  if (result) {
    return result
  } else {
    throw '用户token不匹配'
  }
}
// 退出登录
let logOut = async (_id) => {
  let result = await UserModel.updateOne({ _id }, { token: '' })
  if (result) {
    return result
  } else {
    throw '退出失败请重试'
  }
}
// 查询所有用户
let findUser = async () => {
  let result = await UserModel.find();
  return result;
}

// 删除用户
let delUser = async (_id) => {
  let result = await UserModel.deleteOne({ _id })
  return result;
}
module.exports = {
  userReg,
  userLogin,
  tokenCheck,
  logOut,
  findUser,
  delUser
}