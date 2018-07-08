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
      // paragraphs: [],
      index: 0,
      textSize: 0,
    }
  }

  componentDidMount() {
    this.getText(2)
    this.lazyLoadListener()

    // console.log(window.innerHeight)
    //
    // console.log(document.getElementById('height').getBoundingClientRect().bottom)
    // console.log(document.getElementById('height').offsetHeight)
    // console.log(document.getElementById('height').scrollHeight)
    //
    // setTimeout(() => {
    //   console.log(document.getElementById('height').clientHeight)
    //   console.log(document.getElementById('height').offsetHeight)
    //   console.log(document.getElementById('height').scrollHeight)
    // }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    const { index } = this.state

    if (index === prevState.index) {
      console.log('Trigggering measureScroll')
      this.measureScroll()
    }
  }

  getText = (number) => {
    const { index, textSize } = this.state
    const { page, updatePage, paragraphs, updateParagraphs } = this.props
    if (textSize <= paragraphs.length && textSize) {
      return
    }
    console.log('Fetching')
    console.log('index ' + index)
    console.log('number ' + number)
    this.setState({
      index: index + number,
    })
    fetch(`http://localhost:3000/paragraphs/${index}/${number}`)
      .then(response => response.json())
      .then((data) => {
        // console.log('data ' + data.paragraphs)
        console.log('-----')
        console.log(data)
        // console.log([...paragraphs, ...data.paragraphs])
        this.setState({
          // paragraphs: [...paragraphs, ...data.paragraphs],
          // index: index + number,
          textSize: data.total,
        })
        // updateParagraphs([...paragraphs, ...data.paragraphs])
        updateParagraphs(data.paragraphs)

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

    console.log('Checking for lazy load')

    if (language === 'fr') {
      return
    }
    // console.log('Screen has changed')
    // console.log((window.innerHeight) - document.getElementById('height').getBoundingClientRect().bottom)
    const bottom = window.innerHeight -
      document.getElementById('height').getBoundingClientRect().bottom
    if (bottom > -50) {
      // Is this breaking?
      // window.removeEventListener('resize', this.measureScroll)
      // window.removeEventListener('scroll', this.measureScroll)

      // console.log('lazy')
      if (
        paragraphs.length
        && page >= parseInt(paragraphs[paragraphs.length - 1].page, 10)
      ) {
        // console.log(paragraphs.length)
        // console.log(page)
        // console.log(paragraphs[paragraphs.length - 1].page)
        console.log('loading due to scroll')
        this.getText(1)
      }
    }
  }

  render() {
    // const { paragraphs } = this.state
    const { page, paragraphs, language } = this.props
    // console.log('rendering main')
    console.log(paragraphs)
    // console.log(page)
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
    // console.log(text)
    return (
      <main id="height" className={Style.main}>
        {text}
      </main>
    )
  }
}
