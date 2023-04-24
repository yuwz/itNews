// 封装所有与 localstoage 相关的操作
// 存储数据
function localSet (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function suoyinSet (key, value) {
  window.localStorage.setItem(key, value)
}
// 获取数据
function suoyinGet (key) {
  // 这个 return 一定要加：因为以前好多同学都在这里出现 bug
  return window.localStorage.getItem(key)
}

// 获取数据
function localGet (key) {
  // 这个 return 一定要加：因为以前好多同学都在这里出现 bug
  return JSON.parse(window.localStorage.getItem(key))
}

// 删除数据
function localDel (key) {
  window.localStorage.removeItem(key)
}

export { localSet, localGet, localDel, suoyinGet, suoyinSet }
