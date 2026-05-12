<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="close">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">{{ activeTab === 'login' ? 'Welcome Back' : 'Create Account' }}</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      <div class="flex gap-2 mb-6">
        <button 
          @click="activeTab = 'login'" 
          :class="activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          class="flex-1 py-2 rounded-lg transition"
        >Login</button>
        <button 
          @click="activeTab = 'register'" 
          :class="activeTab === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          class="flex-1 py-2 rounded-lg transition"
        >Register</button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="activeTab === 'register'">
          <input v-model="form.name" type="text" placeholder="Full Name" class="w-full border px-3 py-2 rounded-lg" required />
        </div>
        <div>
          <input v-model="form.email" type="email" placeholder="Email" class="w-full border px-3 py-2 rounded-lg" required />
        </div>
        <div>
          <input v-model="form.password" type="password" placeholder="Password" class="w-full border px-3 py-2 rounded-lg" required />
        </div>
        <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          {{ loading ? 'Processing...' : activeTab === 'login' ? 'Login' : 'Register' }}
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  initialTab: { type: String, default: 'login' }
});
const emit = defineEmits(['update:modelValue', 'success']);

const activeTab = ref(props.initialTab);
const form = reactive({ name: '', email: '', password: '' });
const loading = ref(false);
const error = ref('');

const { login, register } = useAuth();

const close = () => emit('update:modelValue', false);

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  let result;
  if (activeTab.value === 'login') {
    result = await login(form.email, form.password);
  } else {
    result = await register({ ...form, role: 'Employee' }); // default role
  }
  if (result?.token) {
    emit('success', result);
    close();
  } else {
    error.value = result?.message || 'Authentication failed';
  }
  loading.value = false;
};
</script>