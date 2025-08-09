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
    id: 2,
    name: 'Про',
    price: '9.99',
    description: 'Для частных лиц с большими коллекциями',
    features: [
      'До 10 000 фотографий',
      'Продвинутое распознавание лиц',
      'Более быстрая обработка',
      'Приоритетная поддержка по email',
      '2 учетные записи пользователей',
      'Интеграция с облачным хранилищем',
    ],
    cta: 'Начать бесплатную пробную версию',
    popular: false,
  },
  {
    id: 3,
    name: 'Бизнес',
    price: '29.99',
    description: 'Для профессиональных фотографов и команд',
    features: [
      'Неограниченное количество фотографий',
      'Премиум распознавание лиц',
      'Самая быстрая обработка',
      'Приоритетная поддержка 24/7',
      'Неограниченное количество учетных записей',
      'Расширенный доступ к API',
      'Настраиваемые варианты брендинга',
    ],
    cta: 'Связаться с отделом продаж',
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
        <h2 ref="titleRef" class="mb-4">Распознавание лиц: Мощное, но доступное</h2>
        <p class="text-xl text-gray-600">Выберите план, который подходит именно вам. Все планы включают 14-дневную бесплатную пробную версию.</p>
      </div>
      
      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div 
          v-for="(plan, index) in plans" 
          :key="plan.id"
          :ref="el => setPlanRef(el, index)"
          class="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg relative w-10/12"
          :class="{ 'md:-mt-4 md:mb-4 shadow-lg': plan.popular }"
        > 
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="bg-primary-600 text-white text-sm font-semibold py-1 px-3 absolute top-0 right-0 rounded-bl-lg">
            Самый популярный
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
        <p class="text-gray-600">Есть вопросы о наших ценах? <a href="#" class="text-primary-600 font-medium">Посмотрите наш FAQ</a></p>
      </div>
    </div>
  </section>
</template>