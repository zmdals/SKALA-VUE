<script setup>
//import { ref } from 'vue'

const welcomeMessage = 'Welcome to SKALA-Vue'
</script>

<template>
  <div class="practice-section">
    <h1>2.Sample Two</h1>
    <h2>{{ welcomeMessage }}</h2>
    <p>{{ welcomeMessage.toUpperCase() }}</p>
    <p>{{ 'Random Number: ' + Math.ceil(Math.random() * 100) }}</p>
  </div>
</template>
