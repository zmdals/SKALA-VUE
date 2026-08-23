<script setup>
const props = defineProps({
  member: {
    type: Object,
  },
})

const emit = defineEmits(['update-request'])
const handleLevelUp = () => {
  emit('update-request', props.member.id)
}
</script>
<template>
  <div>
    <span>이름: {{ member.name }},</span>
    <span> LV: {{ member.level }}</span>
    <button @click="handleLevelUp">레벨 ⬆️</button>
  </div>
</template>
