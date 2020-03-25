// 物品管理平台
const express = require('express');
const router = express.Router();
const { insertGoods, findGoods,findGoodsById, delGoods, updateGoods, findGoodsByPage } = require('../controls/goodsControl');

/**
 * @api {post} /admin/goods/add 添加物品
 * @apiName add
 * @apiGroup goods
 *
 * @apiParam {String} name 物品型号
 * @apiParam {Number} stock 物品库存
 * @apiParam {Number} price 物品价格
 * @apiParam {String} path 物品缩略图
 * @apiParam {String} desc 物品性能描述
 * @apiParam {String} unit 物品单位
 * @apiParam {String} kind 物品类别
 * @apiParam {Number} putaway 物品状态
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 */
router.post('/add', (req, res) => {
    let { name, stock, price, path, desc, unit, kind, putaway } = req.body;

    insertGoods({ name, stock, price, path, desc, unit,kind, putaway })
        .then(() => {
            res.send({ err: 0, msg: '插入成功' })
        })
        .catch((data) => {
            if (data) {
                res.send({ err: -1, msg: '请勿输入相同物品' });
            }
            res.send({ err: -1, msg: '插入失败请重试' })
        })
})

/**
 * @api {post} /admin/goods/infos 查询物品
 * @apiName infos
 * @apiGroup goods
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 * @apiSuccess {Array} list 查询到的数据
 */
router.post('/infos', (req, res) => {
    findGoods()
        .then((infos) => {
            res.send({ list: infos, err: 0, msg: '查询成功' });
        })
        .catch(() => {
            res.send({ err: -1, msg: '查询失败，请重试' });
        })
})

/**
 * @api {post} /admin/goods/getInfoById  查询(通过id)
 * @apiName getInfoById
 * @apiGroup goods
 *
 * @apiParam {number} _id 物品id
 *
 * @apiSuccess {String} err 状态码
 * @apiSuccess {String} msg  信息提示
 * @apiSuccess {Array} list  查询到的数据
 */
// 根据id获取商品 
router.post('/getInfoById', (req, res) => {
    let { _id } = req.body
    findGoodsById(_id)
        .then((infos) => { res.send({ list: infos, err: 0, msg: '查询成功' }) })
        .catch((err) => { res.send({ err: -1, msg: '查询失败请重试' }) })
})

/**
 * @api {post} /admin/goods/del 删除物品
 * @apiName del
 * @apiGroup goods
 *
 * @apiParam {String} _id 物品所对应的id值
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 */
router.post('/del', (req, res) => {
    let { _id } = req.body;
    delGoods(_id)
    .then(() => {
        res.send({ err: 0, msg: '删除成功' });
    })
    .catch(() => {
        res.send({ err: -1, msg: '删除失败，请重试' });
    })
})

/**
 * @api {post} /admin/goods/update 更新信息
 * @apiName update
 * @apiGroup goods
 *
 * @apiParam {String} name 物品型号
 * @apiParam {Number} stock 物品库存
 * @apiParam {Number} price 物品价格
 * @apiParam {String} path 物品缩略图
 * @apiParam {String} desc 物品性能描述
 * @apiParam {String} unit 物品单位
 * @apiParam {String} kind 物品类别
 * @apiParam {Number} putaway 物品状态
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 */
router.post('/update', (req, res) => {
    let {  name, stock, price, path, desc, unit,kind, putaway } = req.body;
    updateGoods(name, {  name, stock, price, path, desc, unit,kind, putaway})
        .then(() => {
            res.send({ err: 0, msg: '修改成功' });
        })
        .catch((data) => {
            console.log(data);
            res.send({ err: -1, msg: '修改失败，请重试' });
        })
})

/**
 * @api {post} /admin/goods/getInfos 分页查询
 * @apiName getInfos
 * @apiGroup goods
 *
 * @apiParam {Number} page 页数
 * @apiParam {Number} pageSize 每页显示几项
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 * @apiSuccess {Array} list 查询到的数据
 * @apiSuccess {Number} sumCount 总项数
 * 
 */
router.post('/getInfos', (req, res) => {
    let page = req.body.page || 1;
    let pageSize = req.body.pageSize || 2;
    findGoodsByPage(page, pageSize)
        .then((data) => {
            let { result, sumCount } = data;
            res.send({ err: 0, msg: '查询成功', list: result, sumCount });
        })
        .catch(() => {
            res.send({ err: -1, msg: '查询失败请重试' })
        })
})

/**
 * @api {post} /admin/goods/getInfosByKw 模糊查询
 * @apiName getInfosByKw
 * @apiGroup goods
 *
 * @apiParam {String} keyword 查询的关键字
 * @apiParam {Number} page 页数
 * @apiParam {Number} pageSize 每页显示几项
 *
 * @apiSuccess {Number} err 状态码
 * @apiSuccess {String} msg 信息提示
 * @apiSuccess {Array} list 查询到的数据
 * 
 */
router.post('/getInfosByKw', (req, res) => {
    let page = req.body.page || 1;
    let pageSize = req.body.pageSize || 2;
    let keyword = req.body.keyword;
    findGoodsByKw(page, pageSize, keyword)
        .then((data) => {
            console.log(keyword);
            let { result, sumCount } = data;
            res.send({ err: 0, msg: '查询成功', list: result, sumCount });
        })
        .catch(() => {
            res.send({ err: -1, msg: '查询失败请重试' })
        })
})

module.exports = router;
