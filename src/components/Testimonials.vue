<script setup lang="ts">
import { useMotion } from '@vueuse/motion';
import { ref, onMounted } from 'vue';

const titleRef = ref(null);
const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
});

const testimonials = [
  {
    id: 1,
    content: 'PhotoFinder has completely transformed how I organize my event photography. The face recognition is incredibly accurate!',
    author: 'Sarah Johnson',
    role: 'Professional Photographer',
    avatar: 'https://placehold.co/100x100?text=SJ',
  },
  {
    id: 2,
    content: 'As a family historian, this tool has been invaluable. I can now easily sort through decades of family photos in minutes.',
    author: 'Michael Chen',
    role: 'Family Historian',
    avatar: 'https://placehold.co/100x100?text=MC',
  },
  {
    id: 3,
    content: 'The group organization feature is a game-changer for our marketing team. We can quickly find all photos from specific events.',
    author: 'Emily Rodriguez',
    role: 'Marketing Director',
    avatar: 'https://placehold.co/100x100?text=ER',
  },
];

const testimonialRefs = ref([]);

// Initialize the array with the correct length
for (let i = 0; i < testimonials.length; i++) {
  testimonialRefs.value[i] = null;
}

// Function to set refs
const setTestimonialRef = (el, index) => {
  if (testimonialRefs.value && index >= 0 && index < testimonials.length) {
    testimonialRefs.value[index] = el || null;
  }
};

onMounted(() => {
  testimonialRefs.value.forEach((el, index) => {
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

// Stats
const stats = [
  { id: 1, value: '5M+', label: 'Photos Processed' },
  { id: 2, value: '99.7%', label: 'Recognition Accuracy' },
  { id: 3, value: '10K+', label: 'Happy Users' },
];

const statRefs = ref([]);

// Initialize the array with the correct length
for (let i = 0; i < stats.length; i++) {
  statRefs.value[i] = null;
}

// Function to set refs
const setStatRef = (el, index) => {
  if (statRefs.value && index >= 0 && index < stats.length) {
    statRefs.value[index] = el || null;
  }
};

onMounted(() => {
  statRefs.value.forEach((el, index) => {
    if (el) {
      useMotion(el, {
        initial: { opacity: 0, scale: 0.9 },
        enter: { 
          opacity: 1, 
          scale: 1,
          transition: { delay: 100 * (index + 1) } 
        },
      });
    }
  });
});
</script>

<template>
  <section id="testimonials" class="section bg-white">
    <div class="container">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 ref="titleRef" class="mb-4">What our users have to say</h2>
        <p class="text-xl text-gray-600">Thousands of users trust PhotoFinder for their photo organization needs.</p>
      </div>
      
      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          :ref="el => setTestimonialRef(el, index)"
          class="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <!-- Quote Icon -->
          <svg class="w-10 h-10 text-primary-200 mb-4" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.722 6.422c-5.644 0-10.222 4.578-10.222 10.222s4.578 10.222 10.222 10.222 10.222-4.578 10.222-10.222-4.578-10.222-10.222-10.222zM10.722 24.889c-4.533 0-8.244-3.711-8.244-8.244s3.711-8.244 8.244-8.244 8.244 3.711 8.244 8.244-3.711 8.244-8.244 8.244z"/>
            <path d="M21.333 6.422c-5.644 0-10.222 4.578-10.222 10.222s4.578 10.222 10.222 10.222 10.222-4.578 10.222-10.222-4.578-10.222-10.222-10.222zM21.333 24.889c-4.533 0-8.244-3.711-8.244-8.244s3.711-8.244 8.244-8.244 8.244 3.711 8.244 8.244-3.711 8.244-8.244 8.244z"/>
          </svg>
          
          <!-- Testimonial Content -->
          <p class="text-gray-700 mb-6">{{ testimonial.content }}</p>
          
          <!-- Author Info -->
          <div class="flex items-center">
            <img :src="testimonial.avatar" :alt="testimonial.author" class="w-12 h-12 rounded-full mr-4">
            <div>
              <h4 class="font-semibold">{{ testimonial.author }}</h4>
              <p class="text-gray-500 text-sm">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="bg-primary-50 rounded-2xl p-8 md:p-12">
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div 
            v-for="(stat, index) in stats" 
            :key="stat.id"
            :ref="el => setStatRef(el, index)"
            class=""
          >
            <div class="text-4xl md:text-5xl font-bold text-primary-600 mb-2">{{ stat.value }}</div>
            <div class="text-gray-700">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>