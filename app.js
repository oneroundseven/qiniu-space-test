// Copyright 2017 FOCUS Inc.All Rights Reserved.

/**
 * @fileOverview qiniu
 * @author sheny@made-in-china.com
 */

const express = require('express');
const qiniu = require("qiniu");
const path = require('path');
const fs = require('fs');
const app = express();


app.set('views', path.join(__dirname, ''));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var accessKey = 'HFWGuxLq2h8shWIw5NxiKJnkIERkrXFn-AjgUFGw';
var secretKey = 'Ilx69JDVL9TlKm5FBhpu-z_d3mjwu201P5Rqb0tT';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);

// 注意 此处的域名中必须携带 http | https 不然会报 download token auth failed
var privateBuckDomain = 'http://7o51lp.com2.z0.glb.qiniucdn.com';
var publicBuckDomain = 'http://osnx7v6td.bkt.clouddn.com';

var key = 'TQ0MDA1MTc3NTg3MF82MDgyMjExMzRfMDBudWxsM';

var deadline = parseInt(Date.now() / 1000) + 3600;
var privateDownLoadURL = bucketManager.privateDownloadUrl(privateBuckDomain, key, deadline);
var publicDownLoadURL = bucketManager.publicDownloadUrl(publicBuckDomain, 'tester-video-mp4');

app.get('/', (req, res) => {
    res.render('home.html', {
        privateDownLoadURL: privateDownLoadURL,
        publicDownLoadURL: publicDownLoadURL
    });
});

var server = app.listen(9999, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});