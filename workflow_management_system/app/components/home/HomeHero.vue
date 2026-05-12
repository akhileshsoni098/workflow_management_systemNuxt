<template>
  <section class="container mx-auto px-4 py-20 text-center">
    <h1
      class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
    >
      Multi-User Task & Workflow Management
    </h1>
    <p class="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
      Organize projects, assign tasks, track progress in real‑time. Built for
      teams of all sizes.
    </p>
    <div class="mt-10 flex justify-center gap-4">
      <button
        @click="$emit('openAuth', 'register')"
        class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
      >
        Start Free Trial
      </button>
      <button
        @click="$emit('openAuth', 'login')"
        class="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
      >
        Sign In
      </button>
    </div>
    <div class="mt-16">
      <!-- <img src="/hero-dashboard-preview.png" alt="Dashboard preview" class="rounded-xl shadow-2xl mx-auto" /> -->
    </div>
  </section>
</template>

<script setup>
defineEmits(["openAuth"]);
</script>
