import React from 'react'
import PropTypes from 'prop-types'

import Style from './language.scss'

export default class extends React.Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    updateLanguage: PropTypes.func.isRequired,
  }

  handleButtonClick = ({ target }) => {
    const { updateLanguage } = this.props
    console.log(target.id)
    console.log(target)
    // updateLanguage(target.id)
  }

  render() {
    const { language } = this.props

    return (
      <nav className={Style.langauge}>
        <div
          className={language === 'en' ? Style['button-active'] : Style.button}
          onClick={this.handleButtonClick}
          id="en"
        >
          <p id="en" >English</p>
        </div>
        <div
          className={language === 'en' ? Style['button-active'] : Style.button}
          onClick={this.handleButtonClick}
          id="fr"
        >
          <p id="fr" >French</p>
        </div>
      </nav>
    )
  }
}
