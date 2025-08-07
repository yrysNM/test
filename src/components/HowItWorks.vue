<script setup lang="ts">
import { useMotion } from '@vueuse/motion';
import { ref, onMounted } from 'vue';

const titleRef = ref(null);
const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
});

const steps = [
  {
    id: 1,
    title: 'Create Your Account',
    description: 'Sign up for a free account to get started with PhotoFinder.',
    icon: '/step1.svg', // Placeholder for now
  },
  {
    id: 2,
    title: 'Upload Your Photos',
    description: 'Upload your photos or connect to your cloud storage services.',
    icon: '/step2.svg', // Placeholder for now
  },
  {
    id: 3,
    title: 'Automatic Processing',
    description: 'Our AI automatically detects and groups faces in your photos.',
    icon: '/step3.svg', // Placeholder for now
  },
];

const stepRefs = ref([]);

// Initialize the array with the correct length
for (let i = 0; i < steps.length; i++) {
  stepRefs.value[i] = null;
}

// Function to set refs
const setStepRef = (el, index) => {
  if (stepRefs.value && index >= 0 && index < steps.length) {
    stepRefs.value[index] = el || null;
  }
};

onMounted(() => {
  stepRefs.value.forEach((el, index) => {
    if (el) {
      useMotion(el, {
        initial: { opacity: 0, x: 20 },
        enter: { 
          opacity: 1, 
          x: 0,
          transition: { delay: 200 * (index + 1) } 
        },
      });
    }
  });
});
</script>

<template>
  <section id="how-it-works" class="section bg-gray-50">
    <div class="container">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 ref="titleRef" class="mb-4">How it works: Easy 3 Step</h2>
        <p class="text-xl text-gray-600">Getting started with PhotoFinder is quick and easy. Follow these simple steps.</p>
      </div>
      
      <!-- Steps -->
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          :ref="el => setStepRef(el, index)"
          class="flex flex-col items-center text-center"
        >
          <!-- Step Icon -->
          <div class="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6 relative">
            <!-- Number Badge -->
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              {{ step.id }}
            </div>
            
            <!-- Icon Placeholder -->
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <!-- Step Content -->
          <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
      
      <!-- CTA -->
      <div class="mt-16 text-center">
        <button class="btn-primary">Get Started Now</button>
      </div>
    </div>
  </section>
</template>