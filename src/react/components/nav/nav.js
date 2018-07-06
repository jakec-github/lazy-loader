import React from 'react'
import PropTypes from 'prop-types'

import Style from './nav.scss'

export default class extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    updatePage: PropTypes.func.isRequired,
  }

  someFunction = () => {

  }

  handleNextPageClick = () => {
    const { page, updatePage } = this.props
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    updatePage(page + 1)
  }

  handleTranslateClick = () => {
    
  }

  render() {
    return (
      <nav className={Style.nav}>
        <button
          className={Style.button}
          onClick={this.handleNextPageClick}
        >
          Next Page
        </button>
        <button
          className={Style.button}
          onClick={this.handleTranslateClick}
        >
          Translate
        </button>
      </nav>
    )
  }
}
