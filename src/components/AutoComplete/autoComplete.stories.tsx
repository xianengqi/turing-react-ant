import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'


interface LakerPlayerProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const SimpleComplete = () => {
  const lakers = ['bradley', 'pope', 'test']
  const lakersWithNumber = [
    { value: 'test', number: 11 },
    { value: 'bradley', number: 2 },
    { value: 'pope', number: 9 },
  ]
  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
  // }
  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter(player => player.value.includes(query))
  // }
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log('github请求数据 => ', items)
        return items.slice(0, 10).map(item => ({
          value: item.login,
          ...item
        }))
      })
  }
  const renderOption = (item: DataSourceType<GithubUserProps>) => {
    // const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        {/* <b>Name: { itemWithNumber.login }</b>
        <p>url: { itemWithNumber.number }</p> */}
         <b>Name: { item.login }</b>
        <p>url: { item.url }</p>
      </>
    )
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

storiesOf('AutoComplete', module)
  .add('AutoComplete', SimpleComplete)