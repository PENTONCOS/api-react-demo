// 将数据库相关的操作抽离处理
const kindModel = require('../db/model/kindModel');

// 增加物品种类
let insertKind = async (obj)=>{
  let data = await kindModel.find({kindName:obj.kindName})
  if (data.length > 0) {
    throw new Error('请勿输入相同种类名');
  } else {
      let result = await kindModel.insertMany(obj);
      return result;//是一个promise对象
  }
}
// 查询物品种类
let findKind = async () => {
  let result = await kindModel.find();
  return result;
}
// 删除物品种类
let delKind = async (_id) => {
  let result = await kindModel.deleteOne({ _id })
  return result;
}

// 根据id更新上架信息
let updateKindName =async (_id, kindName) =>{
  let result = await kindModel.updateOne({_id},{kindName})
  return result;
}

module.exports = {
  insertKind,
  findKind,
  delKind,
  updateKindName
}