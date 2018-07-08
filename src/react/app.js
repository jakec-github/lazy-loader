import React from 'react'
import PropTypes from 'prop-types'

import Main from './components/main/main'
import Nav from './components/nav/nav'

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
    })
  }

  updateParagraphs = (data) => {
    const { paragraphs } = this.state
    // console.log('Updating paragraphs')
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
    return (
      <React.Fragment>
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
          // updateLanguage={this.updateLanguage}
          updateFrenchParagraphs={this.updateFrenchParagraphs}
        />
      </React.Fragment>
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
