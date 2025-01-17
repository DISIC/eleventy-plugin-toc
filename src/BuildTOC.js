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
}

const BuildTOC = (text, opts) => {
  const {tags, wrapper, wrapperClass, wrapperLabel, ul} = ParseOptions(
    opts,
    defaults
  )

  const $ = cheerio.load(text)

  const headings = NestHeadings(tags, $)

  if (headings.length === 0) {
    return undefined
  }

  return wrapper
    ? `<${wrapper} class="${wrapperClass}" role="navigation" aria-labelledby="fr-summary-title">
        <p class="fr-summary__title" id="fr-summary-title">${wrapperLabel}</p>
        ${BuildList(headings, ul)}
        </${wrapper}>`
    : BuildList(headings, ul)
}

module.exports = BuildTOC
