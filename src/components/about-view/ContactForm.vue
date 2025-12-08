<script setup lang="ts">
import { useTranslation } from 'i18next-vue';
import { ref } from 'vue';

const { i18next } = useTranslation() 

const name = ref<string>()
const email = ref<string>()
const message = ref<string>()


</script>

<template>
  <form class="p-6 rounded-md border-[1px] border-void-900/60 text-center max-w-[400px] font-display">
    <h2 class="text-3xl text-void-900 font-semibold">{{ $t("Let's talk!") }}</h2>

    <p class="leading-tight font-xl font-medium text-void-600 my-4">
      {{ $t('Send me an email with your proposal, project, or anything you´d like to discuss using this form or by contacting me through') }}
      <a 
        class="underline hover:text-void-900 font-semibold"
        href="https://www.linkedin.com/in/jorge-balsamo-dev/" 
        target="_blank">{{ $t('my LinkedIn profile.') }}
      </a>
    </p>

    <div class="w-full h-[1px] bg-void-600/30"/>

    <div class="flex flex-col items-center justify-center py-4">
      <label class="w-full flex flex-col items-start mb-2">
        <span class="font-medium text-void-800">{{ $t('Name') }}</span>
        <input
          class="w-full border-[1px] border-void-600/30 rounded-sm px-2 py-1"
          v-model="name" 
          type="name" 
          required
        />
      </label>

      <label class="w-full flex flex-col items-start my-2">
        <span class="font-medium text-void-800">{{ $t('Email') }}</span>
        <input 
          class="w-full border-[1px] border-void-600/30 rounded-sm px-2 py-1"
          v-model="email" 
          type="email" 
          required
        />
      </label>

      <label class="w-full flex flex-col items-start my-2">
        <span class="font-medium text-void-800">{{ $t('Message') }}</span>
        <textarea 
          class="w-full border-[1px] border-void-600/30 rounded-sm px-2 py-1 h-24"
          v-model="message" 
          required
        />
      </label>
    </div>

    <button
      :class="`w-full flex items-center justify-center py-2 rounded-sm border-[1px] border-void-600/30 text-void-600 font-semibold text-lg cursor-pointer
        hover:bg-void-900 hover:text-ghost-100 duration-300
      `" 
      type="submit"
    >
      {{ $t('SEND') }}
    </button>

  </form>
</template>

<style scoped>
  
</style>