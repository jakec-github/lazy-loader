import React from 'react'
import PropTypes from 'prop-types'

import Style from './main.scss'

export default class extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.object).isRequired,
    language: PropTypes.string.isRequired,
    updatePage: PropTypes.func.isRequired,
    updateParagraphs: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      textSize: 0,
    }
  }

  componentDidMount() {
    // Retrieves the first paragraphs and sets listeners

    this.getText(2)
    this.lazyLoadListener()
  }

  getText = (number) => {
    const { index, textSize } = this.state
    const { page, updatePage, paragraphs, updateParagraphs } = this.props

    // Prevents paragraphs being requested once the total is reached
    if (textSize <= paragraphs.length && textSize) {
      return
    }

    // Allows state to keep track of which paragraphs have been requested
    // This is necessary to allow a fetch request to be made before the last has returned
    // however it is not a solution that handles errors robustly
    this.setState({
      index: index + number,
    })
    fetch(`/paragraphs/${index}/${number}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          textSize: data.total,
        })
        updateParagraphs(data.paragraphs)

        // Sets page correctly on first paragraph
        if (page === 0) {
          updatePage(parseInt(data.paragraphs[0].page, 10))
        }
      })
  }

  lazyLoadListener = () => {
    window.addEventListener('scroll', this.measureScroll)
    window.addEventListener('resize', this.measureScroll)
  }

  measureScroll = () => {
    const { page, paragraphs, language } = this.props

    // No lazyloading is required when translated
    if (language === 'fr') {
      return
    }

    const bottom = window.innerHeight -
      document.getElementById('height').getBoundingClientRect().bottom
    if (bottom > -50) {
      // Talking point
      // window.removeEventListener('resize', this.measureScroll)
      // window.removeEventListener('scroll', this.measureScroll)

      if (
        paragraphs.length
        && page >= parseInt(paragraphs[paragraphs.length - 1].page, 10)
      ) {
        this.getText(1)
      }
    }
  }

  render() {
    const { page, paragraphs, language } = this.props

    // Uses filter to select only paragraphs from the right page
    // Better solution could be to store paragraphs in arrays indexed to match page number
    const text = paragraphs
      .filter(paragraph => parseInt(paragraph.page, 10) === page)
      .map((paragraph, i) => (
        <p
          className={Style.text}
          key={i.toString()}
        >
          {language === 'en' ? paragraph.paragraph : paragraph.translation}
        </p>
      ))
    return (
      <main id="height" className={Style.main}>
        {text}
      </main>
    )
  }
}
