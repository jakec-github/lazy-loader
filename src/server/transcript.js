const https = require('https')

// Should be able to return directly
let paragraphs = ['hey']

function getTranscript() {
  https.get('https://s3.amazonaws.com/com.trint.misc.challenge/transcript.json', (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      paragraphs = JSON.parse(data).transcript.words.reduce(
        (value, word) => {
          if (value.length && value[value.length - 1][0].para === word.para) {
            return [...value.slice(0, -1), [...value[value.length - 1], word]]
          }
          return [...value, [word]]
        },
        [],
      )
      // console.log(paragraphs)
    })
  })
    .on('error', (error) => {
      console.log(error.message)
    })
}

function getParagraphs() {
  return paragraphs
}

module.exports = {
  getTranscript,
  getParagraphs,
}
