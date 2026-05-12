<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-4xl font-bold text-blue-600">{{ stat.value }}</div>
          <div class="text-gray-600 mt-2">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// const { data: statsData, pending } = useFetch('/api/public/stats');
const stats = computed(() => [
  {
    label: "Active Users",
    value: "12,540",
  },
  {
    label: "Projects Created",
    value: "3,280",
  },
  {
    label: "Tasks Completed",
    value: "48,920",
  },
]);
// const stats = computed(() => [
//   { label: 'Active Users', value: statsData.value?.totalUsers?.toLocaleString() || '...' },
//   { label: 'Projects Created', value: statsData.value?.totalProjects?.toLocaleString() || '...' },
//   { label: 'Tasks Completed', value: statsData.value?.totalTasks?.toLocaleString() || '...' }
// ]);
</script>
