import React from 'react'
import PropTypes from 'prop-types'

import Style from './nav.scss'

export default class extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.object).isRequired,
    frenchParagraphs: PropTypes.arrayOf(PropTypes.object).isRequired,
    updatePage: PropTypes.func.isRequired,
    updateFrenchParagraphs: PropTypes.func.isRequired,
  }

  handleNextPageClick = () => {
    const { page, updatePage } = this.props
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    updatePage(page + 1)
  }

  handleTranslateClick = () => {
    const { page, paragraphs, updateFrenchParagraphs } = this.props

    // These variables get the index of the first paragraph on the current page
    // and the number of paragraphs
    const index = paragraphs.findIndex(paragraph => parseInt(paragraph.page, 10) === page)
    const lastIndex = paragraphs
      .slice()
      .reverse()
      .findIndex(paragraph => parseInt(paragraph.page, 10) === page)
    const number = paragraphs.length - lastIndex - index

    fetch(`/translation/${index}/${number}`)
      .then(response => response.json())
      .then((data) => {
        updateFrenchParagraphs(data)
      })
  }

  render() {
    const { frenchParagraphs } = this.props
    return (
      <nav className={Style.nav}>
        <button
          className={Style.button}
          onClick={this.handleNextPageClick}
        >
          Next Page
        </button>
        { frenchParagraphs.length === 0 &&
          <button
            className={Style.button}
            onClick={this.handleTranslateClick}
          >
            Translate
          </button>
        }
      </nav>
    )
  }
}
