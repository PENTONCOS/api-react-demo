const  express = require('express')
const  {userReg,userLogin,logOut,findUser,delUser} = require("../controls/userControl.js")
const tokenMiddlWare = require('../middleware/tokenMiddleware')
const router = express.Router()

 /**
 * @api {post} /admin/user/reg  用户注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} user  注册用户名.
 * @apiParam {String} pass  注册密码.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * 
 *  @apiParamExample {json} Request-Example:
 *     {
 *      "err": 0,
        "msg": "注册ok"
 *     }
 */
router.post('/reg',(req,res)=>{
  let {user,pass} = req.body 
  userReg(user,pass)
  .then(()=>{res.send({err:0,msg:'注册ok'})})
  .catch((err)=>{res.send({err:-2,msg:err})})
})

 /**
 * @api {post} /admin/user/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} user  用户名.
 * @apiParam {String} pass  密码.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *      "err": 0,
        "msg": "登录成功",
        "userInfo": {
          "_id": "5e78b637b602b89a64211ec5",
          "user": "wuyanzu",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlNzhiNjM3YjYwMmI4OWE2NDIxMWVjNSIsInVzZXIiOiJ3dXlhbnp1In0sImN0aW1lIjoxNTg1MDA3MTU2MzQxLCJleHBpcmVzIjo2MDQ4MDAwMDAsImlhdCI6MTU4NTAwNzE1Nn0.spVKc-cdRgjG5UOzRBAgt_7S9gqhDRhQio3lmrnLrQ4"
        }
 *     }
 */
router.post('/login',(req,res)=>{
  let {user,pass} = req.body 
  userLogin(user,pass)
  .then((info)=>{ 
    // // 登录成功之后产生token 并返回
    // let token =createToken()
    res.send({err:0,msg:'登录成功',userInfo:info})
  })
  .catch((err)=>{ res.send({err:-1,msg:err})})
})

 /**
 * @api {post} /admin/user/logout  退出登录
 * @apiName logout
 * @apiGroup User
 *
 * @apiParam {String} _id  用户名对应的id.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * 
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *      "err": -997,
 *       msg": "token丢失"
 *     }
 */
// 退出登录 也需要验证token 
router.post('/logout',tokenMiddlWare,(req,res)=>{
  let {_id} = req.body 
  // 数据库里的token的清空
  logOut(_id)
  .then(()=>{
    res.send({err:0,msg:'退出ok'})
  })

})

 /**
 * @api {post} /admin/user/infos  用户查询
 * @apiName infos
 * @apiGroup User
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {Array} list 查询到的数据
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *      "list": [
        {
            "_id": "5e78b637b602b89a64211ec5",
            "user": "wuyanzu",
            "pass": "123456",
            "__v": 0,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlNzhiNjM3YjYwMmI4OWE2NDIxMWVjNSIsInVzZXIiOiJ3dXlhbnp1In0sImN0aW1lIjoxNTg1MDA3MTU2MzQxLCJleHBpcmVzIjo2MDQ4MDAwMDAsImlhdCI6MTU4NTAwNzE1Nn0.spVKc-cdRgjG5UOzRBAgt_7S9gqhDRhQio3lmrnLrQ4"
        },
        {
            "_id": "5e78cd572614aa36e1e613fd",
            "user": "zhansan",
            "pass": "123",
            "__v": 0,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlNzhjZDU3MjYxNGFhMzZlMWU2MTNmZCIsInVzZXIiOiJ6aGFuc2FuIn0sImN0aW1lIjoxNTg0OTc1MjAwNzgyLCJleHBpcmVzIjo2MDQ4MDAwMDAsImlhdCI6MTU4NDk3NTIwMH0.wq_ZNN2xXeFzZsnFiLMrx6EZ_cNlEKPSwMh-of2wNaA"
        },
        {
            "_id": "5e7950b3a488e13a4b80c52a",
            "user": "zhoujielun",
            "pass": "123456",
            "__v": 0,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlNzk1MGIzYTQ4OGUxM2E0YjgwYzUyYSIsInVzZXIiOiJ6aG91amllbHVuIn0sImN0aW1lIjoxNTg1MDE3MTU4NjgwLCJleHBpcmVzIjo2MDQ4MDAwMDAsImlhdCI6MTU4NTAxNzE1OH0.y7ecEHzpw3yjV2zf1HrQ9PLcKEbt1gBQWqh9z0Qbhgo"
        }
    ],
    "err": 0,
    "msg": "查询成功"
 *     }
 */
router.post('/infos', (req, res) => {
  findUser()
      .then((infos) => {
          res.send({ list: infos, err: 0, msg: '查询成功' });
      })
      .catch(() => {
          res.send({ err: -1, msg: '查询失败，请重试' });
      })
})

/**
 * @api {post} /admin/user/del 删除用户
 * @apiName del
 * @apiGroup User
 *
 * @apiParam {String} _id 用户所对应的id值
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 * @apiParamExample {json} Request-Example:
 *     {
 *      "err": 0,
        "msg": "删除成功"
 *     }
 */
router.post('/del', (req, res) => {
  let { _id } = req.body;
  delUser(_id)
      .then(() => {
          res.send({ err: 0, msg: '删除成功' });
      })
      .catch(() => {
          res.send({ err: -1, msg: '删除失败，请重试' });
      })
})

module.exports = router