#!/usr/bin/env nodejs
const express = require('express')
const bodyParser = require('body-parser')

const transcript = require('./transcript')

const app = express()

transcript.getTranscript()

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/confirm.html`)
})

app.get('/paragraph/:index', (req, res) => {
  // Should validate that index parses as integer
  // and that it doesn't exceed highest paragraph index
  const { index } = req.params
  const total = transcript.getParagraphs().length
  const paragraph = transcript.getParagraphs()[parseInt(index, 10)]

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({
    total,
    paragraph,
  }))
})

app.listen(3000, () => {
  console.log('Lazy loader listening on port 3000')
})
