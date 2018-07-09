const Translate = require('@google-cloud/translate')

const projectId = 'lazy-loader'

const translate = new Translate({
  projectId,
})

function getTranslation(text) {
  const target = 'fr'

  // Calls the translate API using the translate SDK
  return translate.translate(text, target)
    .then((results) => {
      const translation = results[0]
      return translation
    })
    .catch((error) => {
      console.error('ERROR:', error)
    })
}

module.exports = {
  getTranslation,
}
