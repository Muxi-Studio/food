import Taro from '@tarojs/taro';

// Fetch(url, data).then((res) => { console.log(res)})

//  const preHttp = 'http://food.test.muxixyz.com';
const Fetch = (url, data = {}, method = 'GET') => {
  const header = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  };
  return Taro.request({
    url:url,
    data,
    method,
    header
  }).then(res => {
    switch (res.statusCode) {
      case 200:
        if (res.data) {
          return res.data;
        } else {
          return res.code; // 业务逻辑错误，返回业务错误码
        }
      case 400:
        throw new Error('没有权限访问');
      case 401:
        throw new Error('未授权');
      case 404:
        throw new Error('not found');
      case 500:
        throw new Error('服务器错误');
    }
  });
};

export default Fetch;
