<script setup lang="ts">

import IconInfoCircel from "@/components/icons/IconInfoCircel.vue";

const { label, type, placeholder, error, modelValue } = defineProps<{
  label: string;
  type: string;
  placeholder: string;
  error: string;
  modelValue: string | number;
}>();

const emit = defineEmits();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="input-container">
    <label :for="label.trim().replace(' ', '').toLowerCase()">{{ label }}</label>
    <input
        :value="modelValue"
        @input="onInput"
        :type="type"
        :name="label.trim().replace(' ', '').toLowerCase()"
        :id="label.trim().replace(' ', '').toLowerCase()"
        :placeholder="placeholder"
    />
    <div v-if="error" class="form-input-error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Your styles here */
</style>
