// 改本文件需要重启node服务
module.exports = {
  dev: {
    host: 'http://121.40.87.90:8005', // 请求根路径
    relativePath: 'mobile',
    version: 'v10', // 接口版本
    token: '5f0f3609dfc31a3c9dd0e06c8efbdec3' // 测试用户token
  },
  mock: {
    host: 'http://121.40.171.1:8080/mockjsdata/40', // 请求根路径
    relativePath: 'mobile',
    version: 'vxxx' // 接口版本
  },
  production: {
    // 生产环境，要打包好部署到服务中
    relativePath: 'mobile',
    version: 'v10' // 接口版本
  }
}