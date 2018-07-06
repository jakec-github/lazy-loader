import React from 'react'
import PropTypes from 'prop-types'

import Style from './main.scss'

export default class extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    updatePage: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      paragraphs: [],
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

  componentDidUpdate() {
    this.measureScroll()
  }

  getText = (number) => {
    const { index, textSize, paragraphs } = this.state
    const { page, updatePage } = this.props
    if (textSize <= paragraphs.length && textSize) {
      return
    }
    console.log('Fetching')
    // console.log('index ' + index)
    // console.log('number ' + number)
    fetch(`http://localhost:3000/paragraphs/${index}/${number}`)
      .then(response => response.json())
      .then((data) => {
        // console.log('data ' + data.paragraphs)
        console.log('-----')
        console.log([...paragraphs, ...data.paragraphs])
        this.setState({
          paragraphs: [...paragraphs, ...data.paragraphs],
          index: index + number,
          textSize: data.total,
        })

        if (page === 0) {
          console.log('++++++++')
          console.log(data.paragraphs[0].page)
          updatePage(parseInt(data.paragraphs[0].page, 10))
        }
      })
  }

  lazyLoadListener = () => {
    window.addEventListener('scroll', this.measureScroll)

    window.addEventListener('resize', this.measureScroll)
  }

  measureScroll = () => {
    const { paragraphs } = this.state
    const { page } = this.props
    // console.log('Screen has changed')
    // console.log((window.innerHeight) - document.getElementById('height').getBoundingClientRect().bottom)
    const bottom = window.innerHeight - document.getElementById('height').getBoundingClientRect().bottom
    if (bottom > -300) {
      window.removeEventListener('resize', this.measureScroll)
      // console.log('lazy')
      if (page >= paragraphs[paragraphs.length - 1].page) {
        this.getText(1)
      }
    }
  }

  render() {
    const { paragraphs } = this.state
    const { page } = this.props
    console.log('rendering main')
    console.log(page)
    const text = paragraphs
      .filter(paragraph => parseInt(paragraph.page, 10) === page)
      .map((paragraph, i) => (
        <p
          className={Style.text}
          key={i.toString()}
        >
          {paragraph.paragraph}
        </p>
      ))

    return (
      <main id="height" className={Style.main}>
        {text}
      </main>
    )
  }
}
