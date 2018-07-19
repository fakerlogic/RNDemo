import request from '../utils/request'
import { stringify } from 'qs'


export default class Api {

   /**
    * 获取分类页分类
    *
    * @static
    * @param {*} params
    * @returns
    * @memberof Api
    */
   static getCategoryType(params) {
    return request('http://heyguys.ap88.com/GOODSCORE-SERVICE/category/categroysByType.apec', {
      body: {
        categoryType: '2'
      }
    }).then(res => console.log(`getCategoryType: ${res}`))
  }
  

  /**
   * 获取购物车列表
   *
   * @static
   * @param {boolean} reload
   * @returns
   * @memberof Api
   */
  static getShopCartList(reload: boolean = false) {
    return request('http://heyguys.ap88.com/settle-service/settleFromShopCar.apec', {
      body: {
        reload: reload
      }
    }).then(res => console.log(`getShopCartList: ${res}`))
  }
  
  
   /**
    * 获取验证码
    *
    * @static
    * @param {*} phone
    * @param {*} type type=1, 注册; 3, 登录; 5, 忘记密码
    * @returns
    * @memberof Api
    */
   static getCapcha(phone, type) {
    console.log(`get capcha ====> phone: ${phone}, type: ${type}`)
    return request('http://heyguys.ap88.com/shop-login-service/getSmsCode.apec', {
      body: {
        mobile: phone,
        type: type
      }
    })
  }

  /**
   * 登录
   *
   * @static
   * @param {*} phone
   * @param {*} capcha
   * @param {*} type  “1” ： 注册; “3” ： 登录
   * @returns
   * @memberof Api
   */
  static login(phone, capcha, type) {
    console.log(`login ====> phone: ${phone}, capcha: ${capcha}, type: ${type}`)
    return request('http://heyguys.ap88.com/shop-login-service/userLogin/register.apec', {
      body: {
        phone: phone,
        code: capcha,
        smsType: type
      }
    })
  }

}
