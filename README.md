spider-fis3-deploy
===
提供对fis3远程发布的支持, 可用于在测试服实时发布测试

Example:
```
// fis-conf.js

fis
.media('test')
.match('**', {
   deploy: [
    fis.plugin('http-push', {
        // 如果配置了receiver，fis会把文件逐个post到接收端上
        receiver: 'http://172.16.0.124:6030/fis3-deploy',
        // 这个参数会跟随post请求一起发送, 将所有文件发送到这个文件夹下面
        // hd 对应活动
        // 所有项目都存放在测试服务器中的/data/h5目录中
        to: '/hd/everyDaySpecial'
    })
   ]
});

// ...

// 这样 所有的文件都会被传到测试服务器对应的文件夹中 并且是监听到文件修改后实时传送
$ fis3 release test -wcLl 
```