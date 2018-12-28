const _ = require('lodash')

function ownerId(repository) {
  let owner = repository.full_name.split('/')[0]
  let id = repository.id
  return `${owner}/${id}`
}

function ownerName(repository) {
  return repository.full_name
}

function flattenObject(object) {
  let flattenedObjs = _.toPairs(object).map((obj) => {
    let flattenedObj = obj[1]
    flattenedObj.key = obj[0]
    return flattenedObj
  })
  return flattenedObjs
}

function createActualPath(path) {
  let varsPresent = true
  while (varsPresent) {
    let dollar = path.indexOf('$')
    if (dollar !== -1) {
      let slash = path.indexOf('\\', dollar)
      let variable = ''
      if (slash === -1) {
        variable = path.substring(dollar)
      } else {
        variable = path.substring(dollar, slash)
      }
      path = path.replace(variable, process.env[variable.substring(1)])
    } else {
      varsPresent = false
    }
  }
  return path
}

export {
  ownerId,
  ownerName,
  flattenObject,
  createActualPath
}
