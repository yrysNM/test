<script setup lang="ts">
import { useMotion } from "@vueuse/motion";
import { ref, onMounted } from "vue";
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();

const titleRef = ref(null);
const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
});

const planRefs = ref<null[] | Element[]>([]);

// Function to set refs
const setPlanRef = (el: Element, index: number) => {
  if (planRefs.value && index >= 0) {
    planRefs.value[index] = el || null;
  }
};

onMounted(() => {
  planRefs.value.forEach((el, index) => {
    if (el) {
      useMotion(el as any, {
        initial: { opacity: 0, y: 20 },
        enter: {
          opacity: 1,
          y: 0,
          transition: { delay: 200 * (index + 1) },
        },
      });
    }
  });
});
</script>

<template>
  <section id="pricing" class="section bg-gray-50">
    <div class="container">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 ref="titleRef" class="mb-4">
          {{ t('pricing.title') }}
        </h2>
        <p class="text-xl text-gray-600">
          {{ t('pricing.subtitle') }}
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
        <!-- Single Event Plan -->
        <div
          :ref="(el) => setPlanRef(el as any, 0)"
          class="bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 hover:shadow-lg flex-1 max-w-md"
        >
          <!-- Plan Header -->
          <div class="mb-8">
            <div class="text-gray-600 text-sm font-medium mb-2">
              {{ t('pricing.plans.single.type') }}
            </div>
            <div class="mb-4">
              <span class="text-4xl font-bold text-gray-900">{{ t('pricing.plans.single.price') }}</span>
              <span class="text-gray-600 ml-1">{{ t('pricing.plans.single.unit') }}</span>
            </div>
            <div class="text-gray-600 text-sm mb-1">
              {{ t('pricing.plans.single.priceDescription') }}
            </div>
            <div class="text-gray-600 text-sm">
              <span class="font-semibold text-gray-900">{{ t('pricing.plans.single.bestFor.label') }}</span> {{ t('pricing.plans.single.bestFor.description') }}
            </div>
          </div>

          <!-- Features -->
          <div class="space-y-4 mb-8">
            <div v-for="(feature, index) in tm('pricing.plans.single.features', [], { returnObjects: true })" :key="index" class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <div class="font-medium text-gray-900">{{ feature.title }}</div>
                <div class="text-gray-600 text-sm">{{ feature.description }}</div>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <button class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors">
            {{ t('pricing.plans.single.cta') }}
          </button>
          
          <div class="text-center text-gray-500 text-sm mt-3">
            <!-- {{ t('pricing.plans.single.note') }} -->
          </div>
        </div>

        <!-- Recurring Plan -->
        <div
          :ref="(el) => setPlanRef(el as any, 1)"
          class="bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 hover:shadow-lg flex-1 max-w-md"
        >
          <!-- Plan Header -->
          <div class="mb-8">
            <div class="text-gray-600 text-sm font-medium mb-2">
              {{ t('pricing.plans.recurring.type') }}
            </div>
            <div class="mb-4">
              <span class="text-4xl font-bold text-gray-900">{{ t('pricing.plans.recurring.price') }}</span>
            </div>
            <div class="text-gray-600 text-sm">
              <span class="font-semibold text-gray-900">{{ t('pricing.plans.recurring.bestFor.label') }}</span> {{ t('pricing.plans.recurring.bestFor.description') }}
            </div>
          </div>

          <!-- Features -->
          <div class="space-y-4 mb-8">
            <div v-for="(feature, index) in tm('pricing.plans.recurring.features', [], { returnObjects: true })" :key="index" class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <div class="font-medium text-gray-900">{{ feature.title }}</div>
                <div class="text-gray-600 text-sm">{{ feature.description }}</div>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <button class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors">
            {{ t('pricing.plans.recurring.cta') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
