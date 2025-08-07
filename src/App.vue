<script setup lang="ts">
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Features from './components/Features.vue';
import HowItWorks from './components/HowItWorks.vue';
import Testimonials from './components/Testimonials.vue';
import Pricing from './components/Pricing.vue';
import Footer from './components/Footer.vue';
import { MotionPlugin } from '@vueuse/motion';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
    </main>
    <Footer />
  </div>
</template>
