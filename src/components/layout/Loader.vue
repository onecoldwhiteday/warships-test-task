<script setup lang=ts></script>
<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>
<style lang="scss">
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  margin: auto;
}

.loader {
  border: 12px solid #0b344d;
  border-top: 12px solid var(--accent-orange-peel);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>