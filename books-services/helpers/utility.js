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

  static isValidBookPublishingYear(year) {
    const currentYear = new Date().getFullYear();
    const earliestPublishingYear = 1900
    const parsedYear = parseInt(year, 10);
    if (
      !isNaN(parsedYear) &&
      Number.isInteger(year) &&
      parsedYear <= currentYear &&
      parsedYear >= earliestPublishingYear
    ) return parsedYear
    else return null
  }

}

module.exports = Utility
