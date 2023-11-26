exports.validateEmail = (email) => {
  const regex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/
  return regex.test(email.toLowerCase())
}

exports.validateMobile = (mobile) => {
  const regex = /^[0-9]{10}$/ // it is not country specific.
  return regex.test(mobile)
}
