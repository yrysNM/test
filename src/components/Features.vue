<script setup lang="ts">
import { useMotion } from '@vueuse/motion';
import { ref, onMounted } from 'vue';

const titleRef = ref(null);
const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { delay: 200 } },
});

const features = [
  {
    id: 1,
    title: 'Автоматическое распознавание лиц',
    description: 'Наш ИИ автоматически обнаруживает и распознает лица на ваших фотографиях с высокой точностью.',
    icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 2,
    title: 'Групповая организация',
    description: 'Легко организуйте фотографии по группам, событиям или отдельным людям с помощью умной категоризации.',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
  {
    id: 3,
    title: 'Пакетная обработка',
    description: 'Обрабатывайте тысячи фотографий одновременно с помощью нашего мощного облачного процессора.',
    icon: 'M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z',
  },
  {
    id: 4,
    title: 'Ориентация на конфиденциальность',
    description: 'Ваши фотографии остаются приватными и защищенными благодаря нашему продвинутому шифрованию и контролю конфиденциальности.',
    icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
  },
  {
    id: 5,
    title: 'Кросс-платформенность',
    description: 'Получайте доступ к своим фотографиям с любого устройства с помощью наших веб, мобильных и настольных приложений.',
    icon: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  },
  {
    id: 6,
    title: 'ИИ-поиск',
    description: 'Мгновенно находите любую фотографию с помощью наших мощных поисковых возможностей на базе ИИ.',
    icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  },
];

const featureRefs = ref([]);

// Initialize the array with the correct length
for (let i = 0; i < features.length; i++) {
  featureRefs.value[i] = null;
}

// Function to set refs
const setFeatureRef = (el, index) => {
  if (featureRefs.value && index >= 0 && index < features.length) {
    featureRefs.value[index] = el || null;
  }
};

onMounted(() => {
  // Apply animations to each feature
  featureRefs.value.forEach((el, index) => {
    if (el) {
      useMotion(el, {
        initial: { opacity: 0, y: 20 },
        enter: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            delay: 300 + (index * 100) 
          } 
        },
      });
    }
  });
});
</script>

<template>
  <section id="features" class="section bg-white">
    <div class="container">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 ref="titleRef" class="mb-4">Мы для всех типов фотографий. Любого размера.</h2>
        <p class="text-xl text-gray-600">Наша передовая технология ИИ делает организацию и поиск ваших фотографий легкими.</p>
      </div>
      
      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.id"
          :ref="el => setFeatureRef(el, index)"
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary-600">
              <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>