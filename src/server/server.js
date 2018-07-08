#!/usr/bin/env nodejs
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const transcript = require('./transcript')
const translate = require('./translate')

const app = express()

// Should return full transcript to server
transcript.getTranscript()

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/confirm.html`)
})

app.get('/paragraphs/:index/:number', cors(), (req, res) => {
  // Should validate that index parses as integer
  // and that it doesn't exceed highest paragraph index
  const index = parseInt(req.params.index, 10)
  const number = parseInt(req.params.number, 10)
  const total = transcript.getParagraphs().length

  // // ///////
  // transcript.getParagraphs().forEach((paragraph) => {
  //   console.log(paragraph[0])
  //   console.log('-----')
  // })

  console.log('index: ' + index)
  console.log('number: ' + number)

  const paragraphs = transcript.getParagraphs().slice(index, index + number)

  // paragraphs.forEach((paragraph) => {
  //   console.log(paragraph[0])
  // })

  const formattedParagraphs = formatParagraphs(paragraphs)

  // console.log(formattedParagraphs)
  // [parseInt(index, 10)]
  console.log('Returning')
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({
    total,
    paragraphs: formattedParagraphs,
  }))
})

app.get('/translation/:index/:number', cors(), (req, res) => {
  console.log('-----')
  const index = parseInt(req.params.index, 10)
  const number = parseInt(req.params.number, 10)

  // transcript.getParagraphs().forEach((paragraph) => {
  //   console.log(paragraph[0])
  //   console.log('-----')
  // })

  const paragraphs = transcript.getParagraphs().slice(index, index + number)

  // paragraphs.forEach((paragraph) => {
  //   console.log(paragraph[0])
  // })
  const formattedParagraphs = formatParagraphs(paragraphs)
  const translatedParagraphs = []
  const translateRequests = []
  // console.log('index: ' + index)
  // console.log('number: ' + number)
  // console.log('index: ' + index)
  // console.log(formattedParagraphs)
  formattedParagraphs.forEach((paragraph) => {
    translateRequests.push(translate.getTranslation(paragraph.paragraph)
      .then((translation) => {
        console.log(translation)
        translatedParagraphs.push({
          page: paragraph.page,
          translation,
        })
      }))
  })
  Promise.all(translateRequests)
    .then(() => {
      console.log('Returning')
      // console.log(translatedParagraphs)
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(translatedParagraphs))
    })
})

app.listen(3000, () => {
  console.log('Lazy loader listening on port 3000')
})

function formatParagraphs(paragraphs) {
  console.log(paragraphs[0])
  return paragraphs.map(paragraph =>
    paragraph.reduce((value, word) => ({
      page: word.para.match(/\d/)[0],
      paragraph: `${value.paragraph} ${word.name}`, // value.paragraph.concat(`${word.name}`),
    }), { paragraph: '' }))
}
