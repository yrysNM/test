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
    content: 'ФотоПоиск полностью изменил то, как я организую свои фотографии с мероприятий. Распознавание лиц невероятно точное!',
    author: 'Сара Джонсон',
    role: 'Профессиональный фотограф',
    avatar: 'https://placehold.co/100x100?text=SJ',
  },
  {
    id: 2,
    content: 'Как семейному историку, этот инструмент оказался бесценным. Теперь я могу легко просматривать десятилетия семейных фотографий за считанные минуты.',
    author: 'Михаил Чен',
    role: 'Семейный историк',
    avatar: 'https://placehold.co/100x100?text=MC',
  },
  {
    id: 3,
    content: 'Функция групповой организации - настоящий прорыв для нашей маркетинговой команды. Мы можем быстро найти все фотографии с определенных мероприятий.',
    author: 'Эмили Родригес',
    role: 'Директор по маркетингу',
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
  { id: 1, value: '5M+', label: 'Обработанных фотографий' },
  { id: 2, value: '99.7%', label: 'Точность распознавания' },
  { id: 3, value: '10K+', label: 'Довольных пользователей' },
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
  <section id="testimonials" class="py-16 bg-gray-50">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <div class="inline-block bg-primary-50 text-primary-600 text-sm font-medium px-3 py-1 rounded-full mb-3">Мнения клиентов</div>
        <h2 ref="titleRef" class="text-3xl font-semibold text-secondary-900 mb-3">Отзывы</h2>
        <p class="text-lg text-secondary-700">Узнайте, что говорят наши пользователи о нашей технологии распознавания лиц.</p>
      </div>
      
      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          :ref="el => setTestimonialRef(el, index)"
          class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <!-- Rating Stars -->
          <div class="flex items-center mb-4">
            <div class="text-primary-500">
              <svg class="h-4 w-4 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="h-4 w-4 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="h-4 w-4 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="h-4 w-4 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="h-4 w-4 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          
          <!-- Testimonial Content -->
          <blockquote class="text-secondary-700 text-sm mb-6">{{ testimonial.content }}</blockquote>
          
          <!-- Author Info -->
          <div class="flex items-center">
            <img :src="testimonial.avatar" :alt="testimonial.author" class="h-10 w-10 rounded-full mr-3">
            <div>
              <h4 class="font-medium text-secondary-900 text-sm">{{ testimonial.author }}</h4>
              <p class="text-secondary-600 text-xs">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.id"
          :ref="el => setStatRef(el, index)"
          class="text-center py-4"
          :class="{'border-t md:border-t-0 md:border-l md:border-r border-gray-100': index === 1, 'border-t md:border-t-0': index === 2}"
        >
          <div class="text-3xl font-semibold text-primary-600 mb-1">{{ stat.value }}</div>
          <div class="text-secondary-700 text-sm">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>