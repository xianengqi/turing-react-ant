import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete } from './autoComplete'

const SimpleComplete = () => {
  const lakers = ['bradley', 'pope', 'test']
  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query))
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
    />
  )
}

storiesOf('AutoComplete', module)
  .add('AutoComplete', SimpleComplete)