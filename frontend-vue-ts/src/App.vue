<script setup lang="ts">
import ColorView from "./views/ColorView.vue";
import { logout } from "./stores/AuthStore";

const handleLogout = () => {
  logout();
};
</script>

<template>
  <header class="container mt-1">
    <div
      class="is-flex is-justify-content-space-between is-align-content-center"
    >
      <font-awesome-icon class="title is-3" icon="fa-wand-sparkles" />
      <span class="title is-3">Keycloak authentication and authorization</span>
      <button class="button is-rounded" @click="handleLogout">Logout</button>
    </div>
  </header>
  <main class="container mt-6">
    <ColorView />
  </main>
</template>
