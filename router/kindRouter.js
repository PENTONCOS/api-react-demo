const  express = require('express')
const {insertKind,findKind,delKind,updateKindName} =require('../controls/kindControl')
const router = express.Router()

/**
 * @api {post} /admin/goodskind/add 添加物品种类
 * @apiName add
 * @apiGroup goodskind
 
 * @apiParam {String} kindName 物品种类名称
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 */
router.post('/add', (req, res) => {
  let { kindName } = req.body;

  insertKind({kindName})
      .then(() => {
          res.send({ err: 0, msg: '插入成功' })
      })
      .catch((data) => {
          if (data) {
            console.log(data)
              res.send({ err: -1, msg: '请勿输入相同种类名' });
          }
          res.send({ err: -1, msg: '插入失败请重试' })
      })
})

/**
 * @api {get} /admin/goodskind/infos 查询物品种类
 * @apiName infos
 * @apiGroup goodskind
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 * @apiSuccess {Array} list 查询到的数据
 */
router.get('/infos', (req, res) => {
  findKind()
      .then((infos) => {
          res.send({ list: infos, err: 0, msg: '查询成功' });
      })
      .catch(() => {
          res.send({ err: -1, msg: '查询失败，请重试' });
      })
})

/**
 * @api {post} /admin/goodskind/del 删除物品种类
 * @apiName del
 * @apiGroup goodskind
 *
 * @apiParam {String} _id 物品种类所对应的id值
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 */
router.post('/del', (req, res) => {
  let { _id } = req.body;
  delKind(_id)
  .then(() => {
      res.send({ err: 0, msg: '删除成功' });
  })
  .catch(() => {
      res.send({ err: -1, msg: '删除失败，请重试' });
  })
})

/**
 * @api {post} /admin/goodskind/updateKindName 更新上架信息
 * @apiName updateKindName
 * @apiGroup goodskind
 *
 * @apiParam {String} _id 物品所对应的id值
 * @apiParam {String} kindName 物品种类
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 */
router.post('/updateKindName', (req, res) => {
  let {  _id, kindName } = req.body;
  updateKindName(_id,  kindName)
      .then(() => {
          res.send({ err: 0, msg: '修改成功' });
      })
      .catch((data) => {
          console.log(data);
          res.send({ err: -1, msg: '修改失败，请重试' });
      })
})

module.exports = router;
