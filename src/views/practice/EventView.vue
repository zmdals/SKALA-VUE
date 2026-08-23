<script setup>
import VOn from '@/components/practice/event/VOn.vue'
import VModel from '@/components/practice/event/VModel.vue'
import VModelForm from '@/components/practice/event/VModelForm.vue'
import VModelModifier from '@/components/practice/event/VModelModifier.vue'
import VStyle from '@/components/practice/event/VStyle.vue'
</script>

<template>
  <main class="container">
    <VOn />
    <VModel />
    <VModelForm />
    <VModelModifier />
    <VStyle />
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
