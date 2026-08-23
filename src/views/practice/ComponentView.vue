<script setup>
import LifeCycleHook from '@/components/practice/component/LifeCycleHook.vue'
import MemberManger from '@/components/practice/component/MemberManger.vue'
import PropsEmitsParent from '@/components/practice/component/PropsEmitsParent.vue'
import SlotDefaultParent from '@/components/practice/component/SlotDefaultParent.vue'
import SlotNamedParent from '@/components/practice/component/SlotNamedParent.vue'
import SlotScopedParent from '@/components/practice/component/SlotScopedParent.vue'
</script>

<template>
  <main class="container">
    <LifeCycleHook />
    <PropsEmitsParent />
    <MemberManger />
    <SlotDefaultParent />
    <SlotNamedParent />
    <SlotScopedParent />
  </main>
</template>

<style scoped>
.container {
  max-width: 1920px;
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
