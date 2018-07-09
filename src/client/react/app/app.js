import React from 'react'

import Language from './../components/language/language'
import Main from './../components/main/main'
import Nav from './../components/nav/nav'

import Style from './app.scss'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      paragraphs: [],
      frenchParagraphs: [],
      page: 0,
      language: 'en',
    }
  }

  updatePage = (page) => {
    this.setState({
      page,
      language: 'en',
      frenchParagraphs: [],
    })
  }

  updateParagraphs = (data) => {
    const { paragraphs } = this.state
    this.setState({
      paragraphs: [...paragraphs, ...data],
    })
  }

  updateFrenchParagraphs = (frenchParagraphs) => {
    this.setState({
      frenchParagraphs,
      language: 'fr',
    })
  }

  updateLanguage = (language) => {
    this.setState({
      language,
    })
  }

  render() {
    const { page, paragraphs, language, frenchParagraphs } = this.state

    // frenchParagraphs.length is used to determine if a translation is available
    return (
      <div className={Style.app} >
        { frenchParagraphs.length > 0 &&
          <Language
            language={language}
            updateLanguage={this.updateLanguage}
          />
        }
        <Main
          page={page}
          paragraphs={language === 'en'
            ? paragraphs
            : frenchParagraphs
          }
          language={language}
          updatePage={this.updatePage}
          updateParagraphs={this.updateParagraphs}
        />
        <Nav
          page={page}
          paragraphs={paragraphs}
          updatePage={this.updatePage}
          frenchParagraphs={frenchParagraphs}
          updateFrenchParagraphs={this.updateFrenchParagraphs}
        />
      </div>
    )
  }
}
