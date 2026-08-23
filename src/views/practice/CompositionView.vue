<script setup>
import RefFunction from '@/components/practice/composition/RefFunction.vue'
import ReactiveFunction from '@/components/practice/composition/ReactiveFunction.vue'
import ComputedFunction from '@/components/practice/composition/ComputedFunction.vue'
import WatchFunction from '@/components/practice/composition/WatchFunction.vue'
import MultiSourceWatch from '@/components/practice/composition/MultiSourceWatch.vue'
import DeepWatch from '@/components/practice/composition/DeepWatch.vue'
import ReactiveWatch from '@/components/practice/composition/ReactiveWatch.vue'
import WatchEffect from '@/components/practice/composition/WatchEffect.vue'
</script>

<template>
  <main class="container">
    <RefFunction />
    <ReactiveFunction />
    <ComputedFunction />
    <WatchFunction />
    <MultiSourceWatch />
    <DeepWatch />
    <ReactiveWatch />
    <WatchEffect />
  </main>
</template>
<style scoped>
.container {
  max-width: 1920px; /* 좀 더 넓게 */
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.container > * {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.container > * + * {
  border-top: 1px solid #e2e8f0;
  padding-top: 2rem;
}
</style>
