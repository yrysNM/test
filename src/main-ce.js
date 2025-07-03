import { defineCustomElement } from 'vue'

import('./main.js').then((mod) => {
  const SuperSearchElement = defineCustomElement(mod.default)
  customElements.define('super-search', SuperSearchElement)
})
