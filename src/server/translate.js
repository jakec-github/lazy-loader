const Translate = require('@google-cloud/translate')

// Your Google Cloud Platform project ID
const projectId = 'lazy-loader'

// Instantiates a client
const translate = new Translate({
  projectId,
})

function getTranslation(text) {
  // The target language
  const target = 'fr'

  // Translates some text into French
  return translate.translate(text, target)
    .then((results) => {
      const translation = results[0]

      console.log(`Text: ${text}`)
      console.log(`Translation: ${translation}`)
      return translation
    })
    .catch((error) => {
      console.error('ERROR:', error)
    })
}

// getTranslation('I speak French')

module.exports = {
  getTranslation,
}
