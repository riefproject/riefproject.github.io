<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { Achievement } from "../types/profile.types";

const props = defineProps<{
  achievement: Achievement | null;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const copySuccess = ref(false);

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.isOpen) {
    emit("close");
  }
};

const handleBackdropClick = (e: MouseEvent) => {
  if ((e.target as HTMLElement).classList.contains("modal-backdrop")) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && achievement"
        class="modal-backdrop fixed inset-0 z-[18000] bg-black/70 backdrop-blur-sm"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        "
        @click="handleBackdropClick">
        <div
          class="modal-content relative bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto rounded-2xl border border-gray-200 dark:border-gray-700 w-[90vw] max-h-[85vh] md:w-full md:max-w-5xl md:h-auto md:max-h-[90vh]"
          @click.stop>
          <!-- Close Button -->
          <button
            @click="emit('close')"
            class="sticky top-3 right-3 z-10 p-1.5 md:p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors float-right mt-3 mr-3"
            aria-label="Close modal">
            <svg
              class="w-5 h-5 md:w-4 md:h-4 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Content -->
          <div class="p-4 md:p-6 clear-both">
            <div class="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <!-- Left: Certificate Image (Show first on mobile) -->
              <div
                v-if="achievement.certificateImage"
                class="lg:flex-1 flex items-center justify-center lg:order-1 order-1">
                <div
                  class="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 w-full max-w-md lg:max-w-none mx-auto">
                  <img
                    :src="achievement.certificateImage"
                    :alt="`${achievement.title.en} Certificate`"
                    class="w-full h-auto" />
                </div>
              </div>

              <!-- Right: Info (Show second on mobile) -->
              <div class="lg:w-80 flex flex-col lg:order-2 order-2">
                <!-- Header -->
                <div class="mb-4 flex flex-col items-start">
                  <div class="flex items-center gap-2 mb-1.5">
                    <img
                      v-if="achievement.logo"
                      :src="achievement.logo"
                      :alt="achievement.issuer.en"
                      class="w-8 h-8 object-contain" />
                    <div>
                      <h2
                        class="text-xl text-start font-bold text-gray-900 dark:text-white">
                        {{ achievement.title.en }}
                      </h2>
                      <p
                        class="text-xs text-start text-gray-600 dark:text-gray-400">
                        {{ achievement.issuer.en }} · {{ achievement.date }}
                      </p>
                    </div>
                  </div>
                  <span
                    class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {{ achievement.highlight?.en || "" }}
                  </span>
                </div>

                <!-- Credential Info -->
                <div class="space-y-4 flex-1">
                  <!-- Credential ID -->
                  <div v-if="achievement.credentialId">
                    <label
                      class="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Credential ID
                    </label>
                    <div
                      class="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
                      <code
                        class="flex-1 text-sm font-mono text-gray-900 dark:text-white break-all">
                        {{ achievement.credentialId }}
                      </code>
                      <button
                        @click="copyToClipboard(achievement.credentialId)"
                        class="flex-shrink-0 p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                        :class="{
                          'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-500':
                            copySuccess,
                        }"
                        aria-label="Copy credential ID">
                        <svg
                          v-if="!copySuccess"
                          class="w-4 h-4 text-gray-600 dark:text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <svg
                          v-else
                          class="w-4 h-4 text-green-600 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Verification Link -->
                  <div v-if="achievement.credentialUrl">
                    <a
                      :href="achievement.credentialUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md">
                      <span>Verify Credential</span>
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  animation: slideUp 0.3s ease-out;
}

.modal-enter-active {
  transition: opacity 0.2s ease-out;
}

.modal-leave-active {
  transition: opacity 0.15s ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  transition: transform 0.3s ease-out;
}

.modal-leave-active .modal-content {
  transition: transform 0.2s ease-in;
}

.modal-enter-from .modal-content {
  transform: translateY(20px);
}

.modal-leave-to .modal-content {
  transform: translateY(10px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
