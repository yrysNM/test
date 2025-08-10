<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMotion } from '@vueuse/motion'

const {t, tm } = useI18n({useScope: "global"})
const activeCategory = ref('faceRecognition')
const expandedItems = ref<Set<number>>(new Set())
const categories = computed(() => [
  { id: 'faceRecognition', name: t('faq.categories.faceRecognition') },
  { id: 'photos', name: t('faq.categories.photos') },
  { id: 'events', name: t('faq.categories.events') },
  { id: 'pricing', name: t('faq.categories.pricing') },
  { id: 'sellPhotos', name: t('faq.categories.sellPhotos') },
  { id: 'privacy', name: t('faq.categories.privacy') },
  { id: 'others', name: t('faq.categories.others') }
])

const faqItems = computed(() => {
  try {
    const questions = tm('faq.questions') as Record<string, any[]>
    
    if (questions && typeof questions === 'object') {
      const categoryQuestions = questions[activeCategory.value]
        return Array.isArray(categoryQuestions) ? categoryQuestions : []
    }
    
    return []
  } catch (error) {
    console.error('Error getting FAQ items:', error)
    return []
  }
})

// Remove filteredFAQs completely and use faqItems directly
const filteredFAQs = computed(() => {
  return Array.isArray(faqItems.value) ? faqItems.value : []
})

const toggleItem = (index: number) => {
  if (expandedItems.value.has(index)) {
    expandedItems.value.delete(index)
  } else {
    expandedItems.value.add(index)
  }
}

const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId
  expandedItems.value.clear()
}

// Motion configurations using refs
const headerRef = ref()
const sidebarRef = ref()
const contentRef = ref()

const headerMotion = useMotion(headerRef, {
  initial: { opacity: 0, y: -20 },
  enter: { opacity: 1, y: 0, transition: { duration: 600 } }
})

const sidebarMotion = useMotion(sidebarRef, {
  initial: { opacity: 0, x: -20 },
  enter: { opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }
})

const contentMotion = useMotion(contentRef, {
  initial: { opacity: 0, x: 20 },
  enter: { opacity: 1, x: 0, transition: { duration: 600, delay: 400 } }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div ref="headerRef" class="bg-white border-b border-gray-200 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ t('faq.title') }}</h1>
        <!-- <p class="mt-2 text-gray-600">Find answers to common questions</p> -->
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar -->
        <div ref="sidebarRef" class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <nav class="space-y-2">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="setActiveCategory(category.id)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  activeCategory === category.id
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                ]"
              >
                {{ category.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div ref="contentRef" class="lg:w-3/4">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">
                {{ categories.find(c => c.id === activeCategory)?.name }}
              </h2>
              
              <div v-if="faqItems.length > 0" class="space-y-4">
                <div
                  v-for="(item, index) in faqItems"
                  :key="index"
                  class="border border-gray-200 rounded-lg"
                >
                  <button
                    @click="toggleItem(index)"
                    class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span class="font-medium text-gray-900">{{ item.question }}</span>
                    <svg
                      :class="[
                        'w-5 h-5 text-gray-500 transition-transform',
                        expandedItems.has(index) ? 'rotate-180' : ''
                      ]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div
                    v-if="expandedItems.has(index)"
                    v-motion
                    :initial="{ opacity: 0, height: 0 }"
                    :enter="{ opacity: 1, height: 'auto', transition: { duration: 300 } }"
                    :leave="{ opacity: 0, height: 0, transition: { duration: 300 } }"
                    class="px-6 pb-4 text-gray-600 border-t border-gray-200"
                  >
                    <div class="pt-4">{{ item.answer }}</div>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-8 text-gray-500">
                {{ t('faq.emptyCategory') }}
              </div>
            </div>
          </div>

          <!-- Contact CTA -->
          <!-- <div class="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p class="text-gray-600 mb-4">Can't find the answer you're looking for? Please chat to our friendly team.</p>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Get in touch
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>