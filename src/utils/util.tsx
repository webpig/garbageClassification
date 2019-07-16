function debounce (func: Function, delay: number) {
    let timer = 0
    return function () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, arguments)
      }, delay)
    }
}

export default {
    debounce
}