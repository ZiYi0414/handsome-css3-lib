import { useCallback, useRef } from 'react'

export default function useDebounce(fn, delay = 0, deps = []) {
  const ref = useRef({
    fn,
    timer: null
  })

  return useCallback(function f(...args) {
    const { timer, fn } = ref.current
    if (timer) {
      clearTimeout(timer)
    }
    ref.current.timer = setTimeout(() => {
      fn.call(this, ...args)
      ref.current.timer = null
    }, delay)
  }, deps)
}
