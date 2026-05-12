<!-- <script setup lang="ts">
// import { useAuth } from "~/composables/useAuth";
// import type { ApiResponse } from "~~/server/types";

const email = ref("");
const password = ref("");
const loading = ref(false);

// const { login } = useAuth();

// const handleLogin = async () => {
//   loading.value = true;
//   try {
//     const res = await login(email.value, password.value);

//     if (res.status) {
//       alert("Login Successful!");
//       navigateTo("/dashboard");
//     }
//   } catch (error: unknown) {
//     const fetchError = error as { data?: ApiResponse<never> };
//     const serverError = fetchError.data;
//     alert(serverError?.message || "Something went wrong");
//     console.error("Login Error:", serverError);
//   } finally {
//     loading.value = false;
//   }
// };
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Welcome Back</h1>
      <p class="subtitle">Please enter your details</p>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Enter your email" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>

      <button :disabled="loading" class="login-btn">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <div class="footer-text">
        <p>New User? <strong><NuxtLink to="/register">Register here</NuxtLink></strong></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  font-family: 'Inter', sans-serif;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
}

h1 {
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  color: #111827;
  text-align: center;
}

.subtitle {
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box; 
}

input:focus {
  outline: none;
  border-color: #2563eb;
  ring: 2px solid #3b82f633;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.login-btn:hover {
  background-color: #1d4ed8;
}

.login-btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.footer-text {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #4b5563;
}

.footer-text strong a {
  color: #2563eb;
  text-decoration: none;
}

.footer-text strong a:hover {
  text-decoration: underline;
}
</style> -->