#!/usr/bin/env nodejs
const express = require('express')
const cors = require('cors')

const transcript = require('./transcript')
const translate = require('./translate')

const app = express()

transcript.getTranscript()

app.use(express.static('dist'))

app.get('/paragraphs/:index/:number', cors(), (req, res) => {
  const index = parseInt(req.params.index, 10)
  const number = parseInt(req.params.number, 10)
  const total = transcript.getParagraphs().length
  const paragraphs = transcript.getParagraphs().slice(index, index + number)
  const formattedParagraphs = formatParagraphs(paragraphs)

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({
    total,
    paragraphs: formattedParagraphs,
  }))
})

app.get('/translation/:index/:number', cors(), (req, res) => {
  const index = parseInt(req.params.index, 10)
  const number = parseInt(req.params.number, 10)
  const paragraphs = transcript.getParagraphs().slice(index, index + number)
  const formattedParagraphs = formatParagraphs(paragraphs)
  const translatedParagraphs = []

  // Translation requests to the google API are carried out paragraph by paragraph
  // If multiple requests need to be made the promises are kept in this array
  const translateRequests = []

  formattedParagraphs.forEach((paragraph) => {
    translateRequests.push(translate.getTranslation(paragraph.paragraph)
      .then((translation) => {
        translatedParagraphs.push({
          page: paragraph.page,
          // This trims a whitepsace added during translation
          translation: translation.trim(),
        })
      }))
  })

  // All translaton requests must be resolved / rejected before a response is sent
  Promise.all(translateRequests)
    .then(() => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(translatedParagraphs))
    })
})

app.listen(3000, () => {
  console.log('Lazy loader listening on port 3000')
})

function formatParagraphs(paragraphs) {
  // Maps though each paragraph returned from transcript.js and reduces the words
  // into an object with a string and the page number
  // In this project this is done on request but there is no reason not to do it
  // when the data is retrieved from the s3 bucket

  return paragraphs.map(paragraph =>
    paragraph.reduce((value, word) => ({
      page: word.para.match(/\d/)[0],
      paragraph: `${value.paragraph} ${word.name}`,
    }), { paragraph: '' }))
}
