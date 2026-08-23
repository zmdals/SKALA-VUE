<script setup>
import SampleOne from '@/components/practice/basic/SampleOne.vue'
import SampleTwo from '@/components/practice/basic/SampleTwo.vue'
import VHtml from '@/components/practice/basic/VHtml.vue'
import VBind from '@/components/practice/basic/VBind.vue'
import ClassBinding1 from '@/components/practice/basic/ClassBinding1.vue'
import ClassBinding2 from '@/components/practice/basic/ClassBinding2.vue'
import VConditions from '@/components/practice/basic/VConditions.vue'
import VShow from '@/components/practice/basic/VShow.vue'
import VFor from '@/components/practice/basic/VFor.vue'
import VPre from '@/components/practice/basic/VPre.vue'
import VCloak from '@/components/practice/basic/VCloak.vue'
import VOnce from '@/components/practice/basic/VOnce.vue'
import VMemo from '@/components/practice/basic/VMemo.vue'
</script>

<template>
  <main class="container">
    <SampleOne />
    <SampleTwo />
    <VHtml />
    <VBind />
    <ClassBinding1 />
    <ClassBinding2 />
    <VConditions />
    <VShow />
    <VFor />
    <VPre />
    <VCloak />
    <VOnce />
    <VMemo />
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
