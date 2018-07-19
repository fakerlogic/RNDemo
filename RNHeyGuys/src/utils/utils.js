

let utils = {

/* --------------------------- 时间处理类 ----------------------------- */
  /**
   * 时间戳处理辅助方法 - 小于10的数字自动在前面加0
   * @param  {number||String} number 数字
   * @return {number||String}        数字
   */
  add0: function (number) {
    return number < 10 ? '0' + number : String(number)
  },
  /**
   * 时间戳转日期 eg: 1505174400000 => 2017-09-12
   * @param  {String} timestamp 时间戳
   * @return {String}           时间日期
   */
  formatTime: function (timestamp) {
    let self = this
    let time = new Date(timestamp)
    let y = time.getFullYear()
    let m = time.getMonth() + 1
    let d = time.getDate()
    let hh = time.getHours()
    let mm = time.getMinutes()
    let ss = time.getSeconds()
    return (
      y +
      '-' +
      self.add0(m) +
      '-' +
      self.add0(d) +
      ' ' +
      self.add0(hh) +
      ':' +
      self.add0(mm) +
      ':' +
      self.add0(ss)
    )
  },
  /**
   * 时间戳转日期 eg: 1505174400000 => 2017-09-12
   * @param  {String} timestamp 时间戳
   * @return {Object}           时间日期
   */
  formatTimeObj: function (timestamp) {
    let self = this
    let time = new Date(timestamp)
    let obj = {
      y: self.add0(time.getFullYear()),
      m: self.add0(time.getMonth() + 1),
      d: self.add0(time.getDate()),
      hh: self.add0(time.getHours()),
      mm: self.add0(time.getMinutes()),
      ss: self.add0(time.getSeconds())
    }
    return obj
  },
  /**
   * 日期转时间戳 eg: 2017-09-12 => 1505174400000
   * @param  {String} datetime 日期字符串
   * @return {number}          时间戳
   */
  unixTime: function (datetime) {
    let self = this
    let tmp_datetime = ''
    let now = ''
    tmp_datetime = datetime.replace(/:|\/| /g, '-')
    // tmp_datetime = tmp_datetime.replace(/ /g, '-');
    // tmp_datetime = tmp_datetime.replace(/\//g, '-');
    let arr = tmp_datetime.split('-')
    if (datetime.indexOf(':') === -1) {
      now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2]))
    } else {
      now = new Date(
        Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5])
      )
    }

    return parseInt(now.getTime())
  },
  /**
   * 获取当前时间戳
   * @return {number} 时间戳
   */
  getTimestamp: function () {
    return new Date().getTime()
  },
  /**
   * 根据时间戳返回 距离此时间戳还有多少时分秒【倒计时用】
   * @param  {string} timestamp 时间戳
   * @return {object}           时间对象
   */
  getTimeDetailRemain: function (timestamp, nowStamp) {
    const self = this
    const now = nowStamp || self.getTimestamp()
    let date = {
      // dd: '00',
      hh: '00',
      mm: '00',
      ss: '00',
      timeout: true
    }
    if (timestamp < now) {
      return date
    }
    let timeRemain = timestamp - now
    // date.dd = self.add0(Math.floor(timeRemain / (60 * 60 * 24 * 1000)));
    // date.hh = self.add0(Math.floor((timeRemain % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000)));
    date.hh = self.add0(Math.floor(timeRemain / (60 * 60 * 1000)))
    date.mm = self.add0(
      Math.floor((timeRemain % (60 * 60 * 1000)) / (60 * 1000))
    )
    date.ss = self.add0(Math.floor((timeRemain % (60 * 1000)) / 1000))
    date.timeout = false
    return date
  },

/* --------------------------- base64处理类 ----------------------------- */
  /**
   * base64编码
   *
   */
  base64encode: function (str) {
    var keyStr =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var output = ''
    var chr1,
      chr2,
      chr3 = ''
    var enc1,
      enc2,
      enc3,
      enc4 = ''
    var i = 0
    var input = this.utf16to8(str)
    do {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output =
        output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4)
      chr1 = chr2 = chr3 = ''
      enc1 = enc2 = enc3 = enc4 = ''
    } while (i < input.length)
    return output
  },
  /*
   * utf16转utf8    和base64转码配合使用
   * */
  utf16to8: function (str) {
    var out, i, len, c
    out = ''
    len = str.length
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i)
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i)
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f))
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
      }
    }
    return out
  },

}

export default utils