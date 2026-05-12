<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
        Loved by Teams
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white p-6 rounded-xl shadow-md">
          <p class="text-gray-600 italic">“{{ testimonial.text }}”</p>
          <div class="mt-4 flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
            <div>
              <p class="font-semibold">{{ testimonial.name }}</p>
              <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    text: 'TaskFlow transformed how our team collaborates. The real-time Kanban board is a game changer.'
  },
  {
    name: 'Michael Chen',
    role: 'Lead Developer',
    text: 'Very intuitive and fast. The role-based access gives us perfect control over projects.'
  }
];
</script>