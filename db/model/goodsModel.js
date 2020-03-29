// 物品相关的数据模型

const mongoose = require('mongoose');

let goodsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    path: { type: String, required: true },
    desc: { type: Number, required: true },
    unit: { type: String, required: true },
    kind: { type: String, required: true },
    putaway: { type: Number, required: true },
})

let goodsModel = mongoose.model('goods', goodsSchema);

module.exports = goodsModel;