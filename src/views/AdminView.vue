<template>
  <div class="admin-view">
    <AdminPanel />
  </div>
</template>

<script setup lang="ts">
import AdminPanel from '@/components/AdminPanel.vue'
</script>

<style scoped>
.admin-view {
  min-height: 100vh;
  background: var(--color-background);
  position: relative;
}

.admin-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.02) 0%, transparent 50%),
    linear-gradient(
      45deg,
      transparent 48%,
      rgba(139, 69, 19, 0.005) 49%,
      rgba(139, 69, 19, 0.005) 51%,
      transparent 52%
    );
  pointer-events: none;
}
</style>
