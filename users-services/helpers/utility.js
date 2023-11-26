const bcrypt = require('bcrypt')


class Utility {
  // eslint-disable-next-line default-param-last
  static successRes(message = '', data) {
    return {
      status: 'success',
      message,
      data,
    }
  }

  static errorRes(message, errorStatus = 'error') {
    return { status: errorStatus, message }
  }

  static conflictRes(message, errorStatus = 'conflict') {
    return { status: errorStatus, message }
  }

  static isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }


  static saltRounds() {
    return Math.round(Math.random() * 10)
  }

  static hashPassword(password) {
    const saltRounds = this.saltRounds()
    return bcrypt.hashSync(password, saltRounds)
  }

  static capitalizeString(str) {
    if (!str) return null
    const trimmedStr = str.trim()
    const normalizedStr = trimmedStr.replace(/\s{2,}/g, ' ')
    const words = normalizedStr.split(' ')
    const capitalizedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase()
      const restOfWord = word.slice(1).toLowerCase()
      return firstLetter + restOfWord
    })
    return capitalizedWords.join(' ')
  }

  static generateOTP(length = 6) {
    const chars = '0123456789'
    let otp = ''

    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      otp += chars[randomIndex]
    }
    return otp
  }


}

module.exports = Utility
