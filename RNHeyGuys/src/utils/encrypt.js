import utils from './utils'
import sha1 from './sha1'

function encryptToken(token) {
  console.log(`============> encryptToken start`)
  let currentTime = Math.round(new Date().getTime())//获取毫秒数
  let token_head = utils.base64encode(token + '.' + currentTime)
  let token_body_string = "secret=APEC2017&time=" + currentTime + "&token=" + token
  let token_body = sha1.SHA1(token_body_string, { asString: true })
  console.log(`============> encryptToken: ${token_head}.${token_body}`)
  return token_head + '.' + token_body
}

export {
  encryptToken
}

