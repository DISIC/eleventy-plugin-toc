// Replace list copied from https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
const _escText = text => {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const _buildLink = ({id, text, children}) => {
  let nestedList = ''

 if (children.length > 0) {
    nestedList = BuildList(children)
  }

  if (id && text) {
    return `<li><a class="fr-summary__link" href="#${id}">${_escText(
      text
    )}</a>${nestedList}</li>`
  } else {
    return nestedList
  }
}

const BuildList = (listItems) => {
  const list = listItems
    .sort((a, b) => a.order - b.order)
    .map(li => _buildLink(li))

  return list.length > 0
    ? `<ol class="fr-summary__list">${list.join('')}</ol>`
    : ''
}

module.exports = BuildList
