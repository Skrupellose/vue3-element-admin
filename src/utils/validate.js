export const validEmail = value => {
  let regStr = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.([a-zA-Z]{2,4})$/
  return regStr.test(value)
}

export const validPwd = value => {
  let regStr = /^[a-zA-Z0-9]{6,20}$/
  return regStr.test(value)
}

export const validCode = value => {
  let regStr = /^[a-zA-Z0-9]{6}$/
  return regStr.test(value)
}
