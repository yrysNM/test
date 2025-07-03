import { defineCustomElement } from 'vue'
import SuperSearch from './App.vue'

const SuperSearchElement = defineCustomElement(SuperSearch)
customElements.define('super-search', SuperSearchElement)
