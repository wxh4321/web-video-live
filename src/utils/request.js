import axios from "axios";
import lodash from "lodash";
import console from '@/utils/consoleprintControl';//控制打印

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    const { data: result } = response;
    // console.log('response-->', JSON.stringify(response.data))
    if (response.status) {
      // console.log('--->', codeMessage[response.status])
      if (response.status >= 200 && response.status < 300) {
        response.success = true; //eslint-disable-line
        return result;
      }
      const error = new Error(result);
      response.success = false;
      error.result = response;
      throw error;
    }
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const getParamValue = (url, key) => {
  if (lodash.isEmpty(url)) {
    return undefined;
  }
  var regex = new RegExp(key + "=([^&]*)", "i");
  const matchs = url.match(regex);
  if (!matchs) {
    return undefined;
  }
  return matchs[1];
};

export const get = url => {
  return axios.get(url).then(checkStatus);
};
export const get3 = url => {
  return axios.get(url,{
    Accept: 'application/x-www-form-urlencoded',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Access-Control-Allow-Origin': '*',  
    withCredentials: true,  
    credentials: 'same-origin',  
  }).then(checkStatus);
};
export const post3 = (url,params) => {
  return axios.post(url,params).then(checkStatus);
};

export const post = (url, params) => {
  return axios.post(url, params).then(checkStatus);
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} api       The URL we want to request
 * @param  {object} [options] The options we want to pass to "axios"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, api, options) {
    const defaultOptions = {
        credentials: 'include',
    };
    const newOptions = { ...defaultOptions, ...options };
    const token = localStorage.getItem('token');
    if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'GET') {
        newOptions.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            token,
            ...newOptions.headers,
        };
        newOptions.data = { ...newOptions.data };
    } else {
        newOptions.params = { ...newOptions.data, token };
    }
    
    return axios
        .create()
        .request({
            url: url + api,
            method: options && options.method ? options.method : 'get',
            timeout: 120000,
            ...newOptions,
        })
        .then(checkStatus)
        .catch(error => {
            const { response } = error;
            if ('stack' in error && 'message' in error) {
                const { message } = error;
                if (!message.indexOf('timeout')) {
                    console.log('请求超时, 请稍后再试');
                } else {
                    const { status } = response;
                    let code = status;
                    if(!code){
                      console.log('web error....',1.5);
                      return;
                    }
                    if (status === 401) {
                       
                        // @HACK
                        /* eslint-disable no-underscore-dangle */
                        // window.g_app._store.dispatch({
                        //     type: 'login/logout',
                        // });
                        console.log(status ? codeMessage[status] : '');
                        setTimeout(function(){
                          window.location.href= '/login';//token过期，去登陆
                        },2000)
                        return;
                    }
                    console.log(status ? codeMessage[status] : '');
                    if (status === 403) {
                        console.log("网络403错误");
                        return;
                    }
                    if (status <= 504 && status >= 500) {
                        console.log("网络500错误");
                        return;
                    }
                    if (status >= 404 && status < 422) {
                      console.log("网络404错误");
                    }
                }
            }
            const result = { success: false };
            return result;
        });
}

export const post1 = (url, api, params) =>
    request(url, api+params, {
        method: 'POST',
        data: {},
    });
export const get1 = (url, api, params) =>
    request(url, api+params, {
        method: 'GET',
        data: {},
    });
    
export const post2 = (url, api, params) =>
    request(url, api, {
        method: 'POST',
        data: params,
    });

export const get2 = (url, api, params) =>
    request(url, api, {
        method: 'GET',
        params,
    });