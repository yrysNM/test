<script setup lang="ts">
import { ref } from "vue";
import { useMotion } from "@vueuse/motion";

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
  <section
    class="section bg-gradient-to-b from-white to-gray-50 overflow-hidden"
  >
    <div class="container">
      <div class="grid md:grid-cols-[60%_30%] gap-12 items-center">
        <!-- Text Content -->
        <div class="space-y-8">
          <h1
            ref="titleRef"
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            События в лицах
          </h1>
          <p ref="descriptionRef" class="text-xl text-gray-600 max-w-lg">
            Автоматически идентифицируйте и организуйте фотографии по лицам.
            Идеально для мероприятий, семейных альбомов и профессиональной
            фотографии.
          </p>
          <div ref="ctaRef" class="flex flex-col sm:flex-row gap-4">
            <button class="btn-primary">Создать событие</button>
            <a class="btn-secondary" href="/#how-it-works">Как это работает</a>
          </div>
        </div>

        <!-- Hero Image -->
        <div ref="imageRef" class="relative">
          <div
            class="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <img
              src="https://placehold.co/600x800?text=App+Screenshot"
              alt="Приложение PhotoFinder"
              class="w-full h-auto"
            />
          </div>

          <!-- Decorative Elements -->
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full opacity-50 animate-bounce-slow"
          ></div>
          <div
            class="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-200 rounded-full opacity-50"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
