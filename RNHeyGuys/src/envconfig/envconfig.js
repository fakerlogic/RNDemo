/**
 * 全局配置文件
 */
let baseURL
let imgUrl = '//elm.cangdu.org/img/'
if(process.env.NODE_ENV === 'development'){
  // baseURL = 'http://heyguys.ap88.com';
  baseURL = 'http://facebook.github.io'
}else{
  baseURL = 'http://facebook.github.io'
}


export default {imgUrl, baseURL}