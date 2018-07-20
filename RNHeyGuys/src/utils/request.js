import { encryptToken } from '../utils/encrypt'

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
}

const defaultHeader = {
  'Accept': 'application/json;text/plain, */*',
  'Content-Type': 'application/json',
  'source-type': 'ios',
  'encryptType': 2,
  'role-type': 'cs',
  'PLATFORM': 'HHJ',
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options, method='POST') {

  const token = await global.storage.load({
    key: 'token'
  }) 
  console.log(`request token: ${token}`)
  const defaultOptions = {
    method: method,
  }
  const newOptions = { ...defaultOptions, ...options }
  if (
    method === 'POST' ||
    method === 'PUT' ||
    method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        ...defaultHeader,
        ...newOptions.headers,
        token: token || null
      }
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      // newOptions.body is FormData
      console.log('...............FormData....................')
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      }
    }
  }
  console.log(`url===${url}, newOptions===${JSON.stringify(newOptions)}`)
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text()
      }
      const token = response.headers.map.token
      console.log(`fetch token++++: ${token}`)
      if (token !== null && token !== undefined) {
        saveToken(token)
      }
      return response.json()
    })
    .catch(e => {
      // const { dispatch } = store;
      const status = e.name
      console.log(`error name: ${status}`)
      if (status === 401) {
        // dispatch({
        //   type: 'login/logout',
        // });
        return
      }
      if (status === 403) {
        // dispatch(routerRedux.push('/exception/403'));
        return
      }
      if (status <= 504 && status >= 500) {
        // dispatch(routerRedux.push('/exception/500'));
        return
      }
      if (status >= 404 && status < 422) {
        // dispatch(routerRedux.push('/exception/404'));
      }
    })
}

saveToken = (e) => {
  // console.log('response: ' + JSON.stringify(response.headers.map.token))
  // 给内存中的token赋值
  // token = e
  // 将token缓存起来
  global.storage.save({
    key: 'token',
    data: encryptToken(e)
  })
}