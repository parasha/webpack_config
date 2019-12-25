import Axios from 'axios';

//
const headers = {
  'Content-Type': 'application/json; charset=utf-8'
};


//
const Ajax = Axios.create({
  withCredentials: true,
  timeout: 10000,
  headers: headers,
  xsrfCookieName: null
});


//
Ajax.interceptors.request.use(config => {
  // 初始化时无token, 追加token
  const currentToken = Utils.store.get('DLB_TOKEN');
  if (currentToken) {
    config.headers.token = currentToken;
  }
  if (config.method.toLowerCase() == 'get') {
    config.params = config.params || {};
    config.params.r = Math.random();
  } else if (config.method.toLowerCase() == "post" || config.method.toLowerCase() == "put" || config.method.toLowerCase() == "patch") {
    config.data = JSON.stringify(config.data)
  }
  return config;
});


//
Ajax.interceptors.response.use(res => {
  return Promise.resolve(res.data);
}, res => {

  if (res.response) {
    // 错误提示
    window.Toast('错误码：' + res.response.status + '\n错误内容：' + res.response.statusText)
  } else {
    window.Toast('系统繁忙，请稍后再试。')
  }
  return Promise.reject(res);
})

//
export default Ajax;
