const lang = {
  en: {
    close: 'Close',
    submit: 'Submit'
  },
  pt: {
    close: 'Fechar',
    submit: 'Confirmar'
  }
}

export default language => key =>
  (lang[language] || lang.en || {})[key] || key
