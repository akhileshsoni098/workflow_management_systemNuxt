<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
  >
    <!-- Navbar -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div
        class="container mx-auto px-4 py-3 flex justify-between items-center"
      >
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600"
          >TaskFlow</NuxtLink
        >
        <div class="space-x-4">
          <NuxtLink to="/user/login" class="text-gray-700 hover:text-blue-600"
            >Login</NuxtLink
          >
          <NuxtLink
            to="/user/register"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main>
      <HomeHero @open-auth="openAuthModal" />
      <HomeStats />
      <HomeFeatures />
      <HomeTestimonials />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 mt-16">
      <div class="container mx-auto px-4 text-center">
        <p>
          &copy; {{ new Date().getFullYear() }} TaskFlow – Workflow Management
          System
        </p>
      </div>
    </footer>

    <!-- Auth Modal -->
    <AuthModal
      v-model="showAuthModal"
      :initial-tab="authTab"
      @success="handleAuthSuccess"
    />
  </div>
</template>

<script setup>
const showAuthModal = ref(false);
const authTab = ref("login");

const openAuthModal = (tab) => {
  authTab.value = tab;
  showAuthModal.value = true;
};

const handleAuthSuccess = (user) => {
  showAuthModal.value = false;
  navigateTo("/dashboard");
};
</script>
