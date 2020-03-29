// 将数据库相关的操作抽离处理
const goodsModel = require('../db/model/goodsModel');

// 插入物品
let insertGoods = async (obj) => {
    // console.log(obj.name);
    let data = await goodsModel.find({ name: obj.name })
    if (data.length > 0) {
        throw new Error('请勿输入相同物品');
    } else {
        let result = await goodsModel.insertMany(obj);
        return result;//是一个promise对象
    }
}
// 查询物品
let findGoods = async () => {
    let result = await goodsModel.find();
    return result;
}
// 根据id查询物品
let findGoodsById = async (_id) => {
    let result = await goodsModel.find({ _id });
    return result;
}
// 根据id更新上架信息
let updatePutaway =async (_id, putaway) =>{
    let result = await goodsModel.updateOne({_id},{putaway})
    return result;
}
// 删除物品
let delGoods = async (_id) => {
    let result = await goodsModel.deleteOne({ _id })
    return result;
}
// 更新信息
let updateGoods = async (_id, updateInfos) => {
    let result = await goodsModel.updateOne({ _id }, updateInfos)
    return result;
}
//分页查询
let findGoodsByPage = async (page, pageSize) => {
    let allGoodss = await goodsModel.find();
    let sumCount = allGoodss.length;
    if (page > Math.ceil(sumCount / pageSize)) {
        page = Math.ceil(sumCount / pageSize);
    }
    if (pageSize >= sumCount) {
        pageSize = sumCount;
    }
    let result = await goodsModel.find().skip((Number(page) - 1) * pageSize).limit(Number(pageSize));

    return { result, sumCount };
}
//分类查询
let findGoodsByBrand = async (brand, page, pageSize) => {
    console.log(brand);
    if (!brand) {
        throw new Error('输入物品品牌不能为空');
    }
    let allGoodss = await goodsModel.find({ brand });
    let sumCount = allGoodss.length;
    if (page > Math.ceil(sumCount / pageSize)) {
        page = Math.ceil(sumCount / pageSize);
    }
    if (pageSize >= sumCount) {
        pageSize = sumCount;
    }
    let result = await goodsModel.find({ brand }).skip((Number(page) - 1) * pageSize).limit(Number(pageSize));

    return { result, sumCount };
}
//模糊查询 关键字查询
let findGoodsByKw = async (page, pageSize, keyword) => {
    let regex = new RegExp(keyword);

    let allGoodss = await goodsModel.find({ $or: [{ name: { $regex: regex } }, { brand: { $regex: regex } }, { desc: { $regex: regex } }] });
    let sumCount = allGoodss.length;
    if (page > Math.ceil(sumCount / pageSize)) {
        page = Math.ceil(sumCount / pageSize);
    }
    if (pageSize >= sumCount) {
        pageSize = sumCount;
    }
    let result = await goodsModel.find({ $or: [{ name: { $regex: regex } }, { brand: { $regex: regex } }, { desc: { $regex: regex } }] }).skip((Number(page) - 1) * pageSize).limit(Number(pageSize));

    return { result, sumCount };
}


module.exports = { insertGoods, findGoods, findGoodsById, updatePutaway,delGoods, updateGoods, findGoodsByPage, findGoodsByBrand, findGoodsByKw };