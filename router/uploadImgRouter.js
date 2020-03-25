//此路由负责文件上传
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const upload = multer({})
const router = express.Router()


router.post('/img', upload.single('submit'), (req, res) => {
    // console.log(req.file);
    let { buffer, mimetype, size } = req.file;
    //限制图片尺寸
    if (size >= 400000) {
        return res.send({ err: -1, msg: '上传的图片过大' });
    }
    //限制文件类型
    let types = ['jpeg', 'gif', 'png', 'jpg'];
    let extName = mimetype.split('/')[1];

    if (types.indexOf(extName) === -1) {
        return res.send({ err: -2, msg: '图片类型错误' })
    }
    //满足上面条件后 将文件写入静态目录下
    let name = (new Date().getTime()) + `_` + parseInt(Math.random() * 99999) + parseInt(Math.random() * 99999);
    fs.writeFile(path.join(__dirname, `../public/img/${name}.${extName}`), buffer, (err) => {
        if (err) {
            // console.log(err);
            res.send({ err: -3, msg: '上传失败，请重试' })
        } else {
            res.send({ err: 0, msg: '上传成功', path: `/public/img/${name}.${extName}` })
        }
    })
})

module.exports = router;

