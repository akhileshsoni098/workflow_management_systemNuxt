<!-- <script setup lang="ts">
// import type { ApiResponse } from "~~/server/types";
// import { useAuth } from "~/composables/useAuth";

const name = ref("");
const email = ref("");
const password = ref("");
const age = ref<number | null>(null);
const isMarried = ref(false);
const loading = ref(false);
// const { register } = useAuth();

// const handleRegister = async () => {
//   loading.value = true;
//   try {
//     const res = await register(
//       name.value,
//       email.value,
//       password.value,
//       age.value || 0,
//       isMarried.value,
//     );

//     if (res.status) {
//       alert("Registration Successful! Please login.");
//       navigateTo("/login");
//     }
//   } catch (error: unknown) {
//     const fetchError = error as { data?: ApiResponse<never> };
//     const serverError = fetchError.data;
//     alert(serverError?.message || "Something went wrong");
//     console.error("Registration Error:", serverError);
//   } finally {
//     loading.value = false;
//   }
// };
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <h1>Create Account</h1>
      <p class="subtitle">Please fill in the details to register</p>

      <div class="form-group">
        <label>Name</label>
        <input v-model="name" type="text" placeholder="Enter your name" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Enter your email" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>

      <div class="form-group">
        <label>Age</label>
        <input v-model="age" type="number" placeholder="Enter your age" />
      </div>

      <div class="form-group checkbox-group">
        <label>
          <input v-model="isMarried" type="checkbox" />
          Married
        </label>
      </div>

      <button :disabled="loading" @click="handleRegister" class="register-btn">
        {{ loading ? "Registering..." : "Register" }}
      </button>

      <div class="footer-text">
        <p>
          Already have an account?
          <strong><NuxtLink to="/login">Login here</NuxtLink></strong>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.register-card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
h1 {
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  color: #333;
  text-align: center;
}
.subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}
.form-group {
  margin-bottom: 1.2rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.register-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.register-btn:hover {
  background-color: #0056b3;
}
.register-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.footer-text {
  text-align: center;
  margin-top: 1.5rem;
}
.footer-text a {
  color: #007bff;
}
.footer-text a:hover {
  text-decoration: underline;
}
.register-card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

</style> -->
