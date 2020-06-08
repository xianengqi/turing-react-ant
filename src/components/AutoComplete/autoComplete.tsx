import React, { FC, useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickSide from '../../hooks/useClickSide'
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  const [ inputValue, setInputValue ] = useState(value as string)
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [ highLightIndex, setHighLightIndex ] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue, 300)
  useClickSide(componentRef, () => { setSuggestions([]) })

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        console.log('触发了');
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighLightIndex(-1)
  }, [debounceValue])

  const highLight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighLightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13: // 回车键
        if (suggestions[highLightIndex]) {
          handleSelect(suggestions[highLightIndex])
        }
        break
      case 38: // 向上箭头
        highLight(highLightIndex - 1)
        break
      case 40: // 向下箭头
        highLight(highLightIndex + 1)
        break
      case 27: // esc键
        setSuggestions([])
        break
      default:
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateGroupdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestions-item', {
            'item-hightlighted': index === highLightIndex
          })
          return (
            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="turing-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handleKeyDown}
      />
      { loading  && <ul><Icon icon="spinner" spin /></ul>}
      {(suggestions.length > 0) && generateGroupdown()}
    </div>
  )
}

export default AutoComplete;