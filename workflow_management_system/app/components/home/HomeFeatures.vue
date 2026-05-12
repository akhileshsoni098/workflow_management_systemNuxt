<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
        Powerful Features for Modern Teams
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <UIcon :name="feature.icon" class="w-6 h-6 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800">{{ feature.title }}</h3>
          <p class="text-gray-600 mt-2">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: 'Role-Based Access',
    description: 'Admins, Managers, Employees – each with tailored permissions.',
    icon: 'i-heroicons-users'
  },
  {
    title: 'Real-Time Updates',
    description: 'Task changes appear instantly across all team members.',
    icon: 'i-heroicons-bolt'
  },
  {
    title: 'Kanban Board',
    description: 'Drag & drop tasks between Todo, In Progress, Review, Completed.',
    icon: 'i-heroicons-view-columns'
  }
];
</script>