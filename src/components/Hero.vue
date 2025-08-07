<script setup lang="ts">
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';

const titleRef = ref(null);
const descriptionRef = ref(null);
const ctaRef = ref(null);
const imageRef = ref(null);

const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { delay: 300 } },
});

const descriptionMotion = useMotion(descriptionRef, {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { delay: 400 } },
});

const ctaMotion = useMotion(ctaRef, {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { delay: 500 } },
});

const imageMotion = useMotion(imageRef, {
  initial: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1, transition: { delay: 600, duration: 500 } },
});
</script>

<template>
  <section class="section bg-gradient-to-b from-white to-gray-50 overflow-hidden">
    <div class="container">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="space-y-8">
          <h1 ref="titleRef" class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Group-Based Photo and Video Face Recognition
          </h1>
          <p ref="descriptionRef" class="text-xl text-gray-600 max-w-lg">
            Automatically identify and organize photos by faces. Perfect for events, family albums, and professional photography.
          </p>
          <div ref="ctaRef" class="flex flex-col sm:flex-row gap-4">
            <button class="btn-primary">Get Started Free</button>
            <button class="btn-secondary">See How It Works</button>
          </div>
          
          <!-- Trusted By -->
          <div class="pt-8 border-t border-gray-200">
            <p class="text-sm text-gray-500 mb-4">Trusted by leading companies</p>
            <div class="flex flex-wrap gap-8 items-center opacity-70">
              <img src="https://placehold.co/100x40?text=Logo1" alt="Company logo" class="h-8">
              <img src="https://placehold.co/100x40?text=Logo2" alt="Company logo" class="h-8">
              <img src="https://placehold.co/100x40?text=Logo3" alt="Company logo" class="h-8">
              <img src="https://placehold.co/100x40?text=Logo4" alt="Company logo" class="h-8">
            </div>
          </div>
        </div>
        
        <!-- Hero Image -->
        <div ref="imageRef" class="relative">
          <div class="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <img 
              src="https://placehold.co/600x800?text=App+Screenshot" 
              alt="PhotoFinder App" 
              class="w-full h-auto"
            >
          </div>
          
          <!-- Decorative Elements -->
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full opacity-50 animate-bounce-slow"></div>
          <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-200 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  </section>
</template>