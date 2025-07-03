import { defineCustomElement } from 'vue'
// import SuperSearch from './main.js'

const SuperSearchElement = defineCustomElement(import('./main'))
customElements.define('super-search', SuperSearchElement)
