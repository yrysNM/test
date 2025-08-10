<script setup lang="ts">
import { useMotion } from "@vueuse/motion";
import { ref, onMounted } from "vue";

const titleRef = ref(null);
const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
});

const steps = [
  {
    id: 1,
    title: "Создайте аккаунт",
    description:
      "Зарегистрируйтесь для бесплатного аккаунта, чтобы начать работу с PhotoFinder.",
    icon: "/going_up.svg", // Placeholder for now
  },
  {
    id: 2,
    title: "Загрузите фотографии",
    description:
      "Загрузите ваши фотографии или подключитесь к облачным сервисам хранения.",
    icon: "/selfi.svg", // Placeholder for now
  },
  {
    id: 3,
    title: "Автоматическая обработка",
    description:
      "Наш ИИ автоматически обнаруживает и группирует лица на ваших фотографиях.",
    icon: "/img_folder.svg", // Placeholder for now
  },
];

const stepRefs = ref<null[] | Element[]>([]);

// Initialize the array with the correct length
for (let i = 0; i < steps.length; i++) {
  stepRefs.value[i] = null;
}

// Function to set refs
const setStepRef = (el: Element, index: number) => {
  if (stepRefs.value && index >= 0 && index < steps.length) {
    stepRefs.value[index] = el || null;
  }
};

onMounted(() => {
  stepRefs.value.forEach((el, index) => {
    if (el) {
      useMotion(el as any, {
        initial: { opacity: 0, x: 20 },
        enter: {
          opacity: 1,
          x: 0,
          transition: { delay: 200 * (index + 1) },
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
        <h2 ref="titleRef" class="mb-4">Как это работает: Легкие 3 шага</h2>
        <p class="text-xl text-gray-600">
          Начать работу с PhotoFinder быстро и легко. Следуйте этим простым
          шагам.
        </p>
      </div>

      <!-- Steps -->
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div
          v-for="(step, index) in steps"
          :key="index"
          :ref="(el) => setStepRef(el, index)"
          class="flex flex-col items-center text-center"
        >
          <!-- Step Icon -->
          <div
            class="w-40 h-40 bg-white rounded-full shadow-md flex items-center justify-center mb-6 relative"
          >
            <!-- Number Badge -->
            <div
              class="absolute top-1 right-1 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold"
            >
              {{ step.id }}
            </div>

            <!-- Icon Placeholder -->
            <div class="w-24 h-24 flex items-center justify-center">
              <img class="text-primary-600" :src="`images/${step.icon}`" />
            </div>
          </div>

          <!-- Step Content -->
          <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 text-center">
        <button class="btn-primary">Начать сейчас</button>
      </div>
    </div>
  </section>
</template>
