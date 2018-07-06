import React from 'react'
import PropTypes from 'prop-types'

import Main from './components/main/main'
import Nav from './components/nav/nav'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
    }
  }

  updatePage = (page) => {
    console.log('called')
    console.log(page)
    this.setState({
      page,
    })
  }

  render() {
    const { page } = this.state
    console.log('rendering app')
    console.log(page)
    return (
      <React.Fragment>
        <Main
          page={page}
          updatePage={this.updatePage}
        />
        <Nav
          page={page}
          updatePage={this.updatePage}
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
