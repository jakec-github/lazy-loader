import React from 'react'
import PropTypes from 'prop-types'

import Style from './language.scss'

import English from './english.png'
import French from './french.png'

export default class extends React.Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    updateLanguage: PropTypes.func.isRequired,
  }

  handleButtonClick = ({ target }) => {
    const { updateLanguage } = this.props
    updateLanguage(target.id)
  }

  render() {
    const { language } = this.props

    return (
      <nav className={Style.language}>
        <img
          id="en"
          className={language === 'en'
            ? Style['image-active']
            : Style.image}
          src={English}
          alt="English"
          onClick={this.handleButtonClick}
        />
        <img
          id="fr"
          className={language === 'fr'
            ? Style['image-active']
            : Style.image}
          src={French}
          alt="French"
          onClick={this.handleButtonClick}
        />
      </nav>
    )
  }
}
