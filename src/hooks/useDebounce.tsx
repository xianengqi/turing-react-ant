// 函数截流
import {useState, useEffect} from 'react'

function useDebounce(value: any, delay: 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // 清除副作用
    return () => {
      clearTimeout(handle)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce;