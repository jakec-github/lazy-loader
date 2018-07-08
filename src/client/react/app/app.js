import React from 'react'
import PropTypes from 'prop-types'

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
    // console.log(`Updating page to ${page}`)
    // console.log(`Paragraphs: ${this.state.paragraphs}`)
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
    // console.log('Updating French Paragraphs')
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
    // console.log('rendering app')
    // console.log(language)
    console.log(paragraphs)
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

// export default function App() {
//   return (
//     <React.Fragment>
//       <Main />
//       <Nav />
//     </React.Fragment>
//   )
// }
