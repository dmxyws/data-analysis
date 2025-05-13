<template>
  <div class="page404">
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 class="text-[clamp(2rem,5vw,4rem)] font-bold text-gray-800 mb-4">
        404
      </h1>
      <p class="text-xl text-gray-600 mb-6">Page Not Found</p>
      <router-link
        to="/home"
        class="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all"
      >
        Return to Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.page404 {
  width: 100vw;
  height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
