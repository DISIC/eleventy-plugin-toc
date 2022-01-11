const cheerio = require('cheerio')

const ParseOptions = require('./ParseOptions')
const NestHeadings = require('./NestHeadings')
const BuildList = require('./BuildList')

const defaults = {
  tags: ['h2', 'h3', 'h4'],
  wrapper: 'nav',
  wrapperClass: 'toc',
  wrapperLabel: undefined,
  ul: false,
  flat: false,
}

const BuildTOC = (text, opts) => {
  const {tags, wrapper, wrapperClass, wrapperLabel, ul, flat} = ParseOptions(
    opts,
    defaults
  )

  const $ = cheerio.load(text)

  const headings = NestHeadings(tags, $)

  if (headings.length === 0) {
    return undefined
  }

//const label = wrapperLabel

  return wrapper
    ? `<${wrapper} class="${wrapperClass}" role="navigation" aria-labelledby="fr-summary-title">
        <p class="fr-summary__title" id="fr-summary-title">${wrapperLabel}</p>
        ${BuildList(headings, ul, flat)}
        </${wrapper}>`
    : BuildList(headings, ul, flat)
}

module.exports = BuildTOC
