<script setup lang="ts">
import { ref } from 'vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useMotion } from '@vueuse/motion';

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logoRef = ref(null);
const navRef = ref(null);
const buttonRef = ref(null);

const logoMotion = useMotion(logoRef, {
  initial: { opacity: 0, y: -20 },
  enter: { opacity: 1, y: 0, transition: { delay: 100 } },
});

const navMotion = useMotion(navRef, {
  initial: { opacity: 0, y: -20 },
  enter: { opacity: 1, y: 0, transition: { delay: 200 } },
});

const buttonMotion = useMotion(buttonRef, {
  initial: { opacity: 0, y: -20 },
  enter: { opacity: 1, y: 0, transition: { delay: 300 } },
});
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container py-4 flex items-center justify-between">
      <!-- Logo -->
      <div ref="logoRef" class="flex items-center">
        <a href="#" class="text-2xl font-bold text-primary-600 flex items-center gap-2">
          <img src="../assets/logo.svg" alt="PhotoFinder Logo" class="h-8 w-8" />
          PhotoFinder
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav ref="navRef" class="hidden md:flex items-center space-x-8">
        <a href="#features" class="text-gray-600 hover:text-primary-600 font-medium">Features</a>
        <a href="#how-it-works" class="text-gray-600 hover:text-primary-600 font-medium">How it works</a>
        <a href="#testimonials" class="text-gray-600 hover:text-primary-600 font-medium">Testimonials</a>
        <a href="#pricing" class="text-gray-600 hover:text-primary-600 font-medium">Pricing</a>
      </nav>

      <!-- CTA Button -->
      <div ref="buttonRef" class="hidden md:block">
        <button class="btn-primary">Get Started</button>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-gray-600 hover:text-primary-600">
        <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-gray-100 animate-slide-down">
      <div class="container py-4 space-y-4">
        <a href="#features" class="block text-gray-600 hover:text-primary-600 font-medium py-2">Features</a>
        <a href="#how-it-works" class="block text-gray-600 hover:text-primary-600 font-medium py-2">How it works</a>
        <a href="#testimonials" class="block text-gray-600 hover:text-primary-600 font-medium py-2">Testimonials</a>
        <a href="#pricing" class="block text-gray-600 hover:text-primary-600 font-medium py-2">Pricing</a>
        <button class="btn-primary w-full">Get Started</button>
      </div>
    </div>
  </header>
</template>