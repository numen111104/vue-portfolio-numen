<template>
  <router-view />
</template>

<style>
/* Scrollbar Styling dari input.css (tetap global) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-brand-dark);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: var(--color-brand-light-gray);
  border-radius: 10px;
  border: 2px solid var(--color-brand-dark);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-brand-yellow);
  border-color: var(--color-brand-gray);
}

/* Vue Router Transition (tetap global) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
