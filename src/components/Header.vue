<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useMotion } from "@vueuse/motion";

const { t, locale } = useI18n();
const isMenuOpen = ref(false);

const toggleLanguage = () => {
  locale.value = locale.value === "en" ? "ru" : "en";
};

// Create refs for motion elements
const logoRef = ref(null);
const navRef = ref(null);
const buttonRef = ref(null);

// Motion configurations using refs
const logoMotion = useMotion(logoRef, {
  initial: { opacity: 0, x: -20 },
  enter: { opacity: 1, x: 0, transition: { duration: 600 } },
});

const navMotion = useMotion(navRef, {
  initial: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0, transition: { duration: 600, delay: 200 } },
});

const buttonMotion = useMotion(buttonRef, {
  initial: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1, transition: { duration: 600, delay: 400 } },
});
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div ref="logoRef" class="flex items-center">
          <router-link
            to="/"
            class="text-3xl font-bold text-primary-600 flex items-center gap-2"
          >
            <img
              src="../assets/logo.svg"
              alt="PhotoFinder Логотип"
              class="h-14 w-14"
            />
            PhotoFinder
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav ref="navRef" class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="text-gray-600 hover:text-primary-600 transition-colors"
          >
            {{ t("header.navigation.features") }}
          </router-link>
          <router-link
            to="/#how-it-works"
            class="text-gray-600 hover:text-primary-600 transition-colors"
          >
            {{ t("header.navigation.howItWorks") }}
          </router-link>
          <router-link
            to="/pricing"
            class="text-gray-600 hover:text-primary-600 transition-colors"
          >
            {{ t("header.navigation.pricing") }}
          </router-link>
          <router-link
            to="/faq"
            class="text-gray-600 hover:text-primary-600 transition-colors"
          >
            {{ t("header.navigation.faq") }}
          </router-link>
        </nav>

        <!-- CTA Button and Language Toggle -->
        <div ref="buttonRef" class="hidden md:flex items-center space-x-4">
          <button
            @click="toggleLanguage"
            class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {{ t("header.languageToggle") }}
          </button>
          <button class="btn-primary">
            {{ t("header.cta") }}
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-gray-100">
        <div class="flex flex-col space-y-4">
          <router-link
            to="/"
            class="text-gray-600 hover:text-primary-600 transition-colors"
          >
            {{ t("header.navigation.features") }}
          </router-link>
          <router-link
            to="/"
            class="text-gray-600 hover:text-primary-600 transition-colors"
          >
            {{ t("header.navigation.howItWorks") }}
          </router-link>
          <router-link
            to="/pricing"
            class="text-gray-600 hover:text-primary-600 transition-colors"
          >
            {{ t("header.navigation.pricing") }}
          </router-link>
          <router-link
            to="/faq"
            class="text-gray-600 hover:text-primary-600 transition-colors"
          >
            {{ t("header.navigation.faq") }}
          </router-link>
          <div class="flex items-center space-x-4 pt-4">
            <button
              @click="toggleLanguage"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {{ t("header.languageToggle") }}
            </button>
            <button class="btn-primary">
              {{ t("header.cta") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
