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

}

module.exports = Utility
