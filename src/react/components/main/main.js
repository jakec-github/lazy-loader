import React from 'react'
import PropTypes from 'prop-types'

import Style from './main.scss'

export default class extends React.Component {
  static propTypes = {
  }

  someFunction = () => {
  }

  render() {
    const paragraphs = 'Hey there paragraphs'
    return (
      <main className={Style.main}>
        <p className={Style.text}>{paragraphs}</p>
      </main>
    )
  }
}
