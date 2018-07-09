import request from '../utils/request'
import { stringify } from 'qs'


export async function getCategoryType(params) {
  return request('http://heyguys.ap88.com/GOODSCORE-SERVICE/category/categroysByType.apec', {
    categroyType: '2'
  }).then(res => console.log(res))
}

export async function getCategoryEs(params) {
  
}
