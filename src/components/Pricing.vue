<script setup lang="ts">
import { useMotion } from '@vueuse/motion';
import { ref, onMounted } from 'vue';

const titleRef = ref(null);
const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
});

const plans = [
  {
    id: 1,
    name: 'Free',
    price: '0',
    description: 'Perfect for trying out the service',
    features: [
      'Up to 1,000 photos',
      'Basic face recognition',
      'Standard processing speed',
      'Email support',
      '1 user account',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 2,
    name: 'Pro',
    price: '9.99',
    description: 'For individuals with larger collections',
    features: [
      'Up to 10,000 photos',
      'Advanced face recognition',
      'Faster processing speed',
      'Priority email support',
      '2 user accounts',
      'Cloud storage integration',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 3,
    name: 'Business',
    price: '29.99',
    description: 'For professional photographers & teams',
    features: [
      'Unlimited photos',
      'Premium face recognition',
      'Fastest processing speed',
      '24/7 priority support',
      'Unlimited user accounts',
      'Advanced API access',
      'Custom branding options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const planRefs = ref([]);

// Initialize the array with the correct length
for (let i = 0; i < plans.length; i++) {
  planRefs.value[i] = null;
}

// Function to set refs
const setPlanRef = (el, index) => {
  if (planRefs.value && index >= 0 && index < plans.length) {
    planRefs.value[index] = el || null;
  }
};

onMounted(() => {
  planRefs.value.forEach((el, index) => {
    if (el) {
      useMotion(el, {
        initial: { opacity: 0, y: 20 },
        enter: { 
          opacity: 1, 
          y: 0,
          transition: { delay: 200 * (index + 1) } 
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
        <h2 ref="titleRef" class="mb-4">Face Recognition: Powerful yet affordable</h2>
        <p class="text-xl text-gray-600">Choose the plan that's right for you. All plans include a 14-day free trial.</p>
      </div>
      
      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div 
          v-for="(plan, index) in plans" 
          :key="plan.id"
          :ref="el => setPlanRef(el, index)"
          class="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg relative"
          :class="{ 'md:-mt-4 md:mb-4 shadow-lg': plan.popular }"
        >
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="bg-primary-600 text-white text-sm font-semibold py-1 px-3 absolute top-0 right-0 rounded-bl-lg">
            Most Popular
          </div>
          
          <!-- Plan Header -->
          <div class="p-6 border-b border-gray-100">
            <h3 class="text-2xl font-bold mb-1">{{ plan.name }}</h3>
            <p class="text-gray-600 mb-4">{{ plan.description }}</p>
            <div class="flex items-baseline mb-4">
              <span class="text-4xl font-bold">${{ plan.price }}</span>
              <span class="text-gray-500 ml-2">/month</span>
            </div>
            <button 
              class="w-full py-3 px-6 rounded-md font-medium transition-colors" 
              :class="plan.popular ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'"
            >
              {{ plan.cta }}
            </button>
          </div>
          
          <!-- Plan Features -->
          <div class="p-6">
            <ul class="space-y-3">
              <li v-for="(feature, i) in plan.features" :key="i" class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- FAQ Link -->
      <div class="text-center mt-12">
        <p class="text-gray-600">Have questions about our pricing? <a href="#" class="text-primary-600 font-medium">View our FAQ</a></p>
      </div>
    </div>
  </section>
</template>