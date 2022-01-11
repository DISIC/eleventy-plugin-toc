# eleventy-plugin-toc

This Eleventy plugin will generate a TOC from page content using an Eleventy filter **with a DSFR touch**

## Default Options

```js
{
  tags: ['h2', 'h3', 'h4'], // which heading tags are selected headings must each have an ID attribute
  wrapper: 'nav',           // element to put around the root `ol`/`ul`
  wrapperClass: 'toc',      // class for the element around the root `ol`/`ul`
  ul: false,                // if to use `ul` instead of `ol`
}
```

## Usage

### 1. Install the plugin

```sh
npm i --save eleventy-plugin-toc
```

### 2. Make sure your headings have anchor IDs

**Your heading elements must have `id`s before this plugin will create a TOC.** If there aren't `id`s on your headings, there will be no anchors for this plugin to link to.

I use [`markdown-it-anchor`](https://www.npmjs.com/package/markdown-it-anchor) to add those `id`s to the headings: [Eleventy config example](https://github.com/jdsteinbach/jdsteinbach.github.io/blob/blog/.eleventy.js)

```js
// .eleventy.js

const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

module.exports = eleventyConfig => {
  // Markdown
  eleventyConfig.setLibrary(
    'md',
    markdownIt().use(markdownItAnchor)
  )
  // ... your other Eleventy config options
}
```

### 3. Add this plugin to your Eleventy config

```js
// .eleventy.js

const pluginTOC = require('eleventy-plugin-toc')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginTOC)
}
```

#### 3.1 You can override the default plugin options

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapper: 'div'
  })
}
```

### 4. Use the filter in your layout template(s)

Because Eleventy only provides the `content` variable to layout templates (not to content files), you'll need to put this markup in a layout template:

```liquid
<article>
  {{ content }}
</article>
<aside>
  {{ content | toc }}
</aside>
```

If you're using Nunjucks, include the `safe` filter:

```njk
<article>
  {{ content | safe }}
</article>
<aside>
  {{ content | toc | safe }}
</aside>
```

If you want to conditionally render a wrapper element, the filter will return `undefined` when no markup is generated:


```liquid
{% if content | toc %}
  <aside>
    {{ content | toc }}
  </aside>
{% endif %}
```


## Options

| Name | Default Value | Type | Purpose |
| --- | --- | --- | --- |
| tags | `['h2', 'h3', 'h4']` | array of strings | which heading tags are used to generate the table of contents |
| wrapper | `'nav'` | string | tag of element wrapping toc lists; `''` removes wrapper element |
| wrapperClass | `'toc'` | string | `class` on element wrapping toc lists |
| wrapperLabel | `undefined` | string | `aria-label` on element wrapping toc lists |
| ul | `false` | boolean | lists are `ul` if true, `ol` if `false` |

