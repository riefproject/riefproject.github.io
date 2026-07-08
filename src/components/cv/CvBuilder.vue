<template>
  <div class="cv-builder-container">
    <div class="editor-pane">
      <div class="pane-header">
        <div class="tabs">
          <button 
            :class="['tab-btn', { active: activeTab === 'html' }]"
            @click="activeTab = 'html'"
          >HTML</button>
          <button 
            :class="['tab-btn', { active: activeTab === 'css' }]"
            @click="activeTab = 'css'"
          >CSS</button>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button @click="formatCode" class="btn ghost">
            ✨ Format
          </button>
          <button @click="saveSource" class="btn ghost" :disabled="isSavingSource">
            {{ isSavingSource ? 'Saving...' : '💾 Save Draft' }}
          </button>
          <button @click="generatePdf" class="btn primary" :disabled="isGenerating">
            {{ isGenerating ? 'Exporting...' : '📄 Export PDF' }}
          </button>
        </div>
      </div>
      <div class="editor-wrapper">
        <codemirror
          v-if="activeTab === 'html'"
          v-model="htmlContent"
          placeholder="<h1>Your CV HTML here</h1>"
          :style="{ height: '100%' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="htmlExtensions"
        />
        <codemirror
          v-if="activeTab === 'css'"
          v-model="cssContent"
          placeholder="/* Your CV CSS here */"
          :style="{ height: '100%' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="cssExtensions"
        />
      </div>
    </div>
    
    <div class="preview-pane">
      <div class="pane-header">
        <h2 class="text-xl font-semibold">Live Preview (A4)</h2>
        <div class="zoom-controls">
          <span class="text-sm text-muted mr-2">Zoom: {{ Math.round(zoom * 100) }}%</span>
          <input type="range" v-model.number="zoom" min="0.3" max="1.5" step="0.1" />
        </div>
      </div>
      <div class="preview-scroll">
        <div class="a4-page-wrapper" :style="{ transform: `scale(${zoom})`, transformOrigin: 'top center', width: '210mm', height: '100%' }">
          <iframe 
            ref="previewIframe"
            :srcdoc="iframeSrcdoc"
            frameborder="0"
            style="width: 100%; height: 100%; min-height: 297mm; background: transparent;"
          ></iframe>
          <!-- Hidden div for html2pdf to use -->
          <div ref="cvContent" style="display: none;">
            <component :is="'style'" v-html="cssContent"></component>
            <div v-html="htmlContent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import html2pdf from 'html2pdf.js';
import * as prettier from 'prettier/standalone';
import * as parserHtml from 'prettier/plugins/html';
import * as parserCss from 'prettier/plugins/postcss';

const props = defineProps<{
  initialHtml?: string | null;
  initialCss?: string | null;
}>();

const activeTab = ref<'html' | 'css'>('html');

const defaultHtml = `
<div class="page">
  <div class="cv-header">
    <h1>Arief F-sa Wijaya</h1>
    <p>Software Engineer | Bandung, Indonesia</p>
  </div>
  <hr>
  <h2>Experience</h2>
  <ul>
    <li>
      <strong>Rolling Glory</strong> - Software Engineer
      <p>Building cool stuff.</p>
    </li>
  </ul>
</div>

<div class="page">
  <h2>Education</h2>
  <ul>
    <li>
      <strong>Universitas Komputer Indonesia</strong>
      <p>Informatics Engineering</p>
    </li>
  </ul>
</div>
`.trim();

const defaultCss = `
.page {
  width: 210mm;
  height: 297mm;
  overflow: hidden;
  /* Use border as "padding" so overflow:hidden clips exactly at the inner edge! */
  border: 20mm solid white; 
  margin: 10mm auto;
  background: white;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  box-sizing: border-box;
}
.cv-header { text-align: center; }
h1 { font-size: 24pt; margin-bottom: 4px; }
h2 { font-size: 16pt; margin-top: 16px; border-bottom: 1px solid #ccc; }
p { font-size: 11pt; margin: 0; }
ul { padding-left: 20px; font-size: 11pt; }
`.trim();

const htmlContent = ref(props.initialHtml || defaultHtml);
const cssContent = ref(props.initialCss || defaultCss);

const cvContent = ref<HTMLElement | null>(null);
const isGenerating = ref(false);
const isSavingSource = ref(false);
const zoom = ref(0.8);

const iframeSrcdoc = ref('');

let debounceTimer: ReturnType<typeof setTimeout>;
watch([htmlContent, cssContent], () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    iframeSrcdoc.value = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"><\/script>
  <style>
    body { margin: 0; background-color: transparent; }
    
    /* Styling khusus dari kita biar antar kertas ada jarak estetik */
    .pagedjs_page {
      background-color: white !important;
      margin: 24px auto !important;
      border: 1px solid #e2e8f0 !important;
      /* box-shadow dihilangkan karena terkesan norak */
    }
    
    .pagedjs_pages {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
    }
    /* Inject user's CSS */
    ${cssContent.value}
  </style>
</head>
<body>
  ${htmlContent.value}
</body>
</html>`;
  }, 800);
}, { immediate: true });

const htmlExtensions = shallowRef([html(), oneDark]);
const cssExtensions = shallowRef([css(), oneDark]);

const formatCode = async () => {
  try {
    if (activeTab.value === 'html') {
      htmlContent.value = await prettier.format(htmlContent.value, {
        parser: 'html',
        plugins: [parserHtml],
        printWidth: 80,
      });
    } else {
      cssContent.value = await prettier.format(cssContent.value, {
        parser: 'css',
        plugins: [parserCss],
        printWidth: 80,
      });
    }
  } catch (err) {
    console.error('Failed to format code:', err);
    alert('Failed to format code. There might be a syntax error.');
  }
};

const saveSource = async () => {
  isSavingSource.value = true;
  try {
    // Format both tabs before saving
    try {
      htmlContent.value = await prettier.format(htmlContent.value, {
        parser: 'html',
        plugins: [parserHtml],
        printWidth: 80,
      });
      cssContent.value = await prettier.format(cssContent.value, {
        parser: 'css',
        plugins: [parserCss],
        printWidth: 80,
      });
    } catch (err) {
      console.warn('Skipping format on save due to syntax error:', err);
    }

    const formData = new FormData();
    formData.append('html', htmlContent.value);
    formData.append('css', cssContent.value);
    
    await fetch('/api/save-cv-source', {
      method: 'POST',
      body: formData
    });
    // Optional: could show a tiny toast here, but we'll keep it silent for fast saving
  } catch (err) {
    console.error('Failed to save source:', err);
    alert('Failed to save source code.');
  } finally {
    isSavingSource.value = false;
  }
};

const generatePdf = async () => {
  if (!cvContent.value) return;
  
  isGenerating.value = true;
  try {
    const opt = {
      margin: [0, 0, 0, 0],
      filename: 'cv-arief.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Generate PDF as blob
    const pdfBlob = await html2pdf().set(opt).from(cvContent.value).output('blob');
    
    // Create form data
    const formData = new FormData();
    formData.append('cv', pdfBlob, 'cv-arief-in.pdf');
    formData.append('html', htmlContent.value);
    formData.append('css', cssContent.value);
    
    // Upload via our local API
    const res = await fetch('/api/upload-cv', {
      method: 'POST',
      body: formData
    });
    
    if (res.ok) {
      alert('CV PDF successfully generated and replaced!');
    } else {
      alert('Failed to replace CV PDF. Check console.');
      console.error(await res.text());
    }
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Error generating PDF.');
  } finally {
    isGenerating.value = false;
  }
};

// Add Cmd+S / Ctrl+S shortcut
import { onMounted, onUnmounted } from 'vue';
const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    saveSource();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.cv-builder-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background: var(--bg);
  overflow: hidden;
}

.editor-pane, .preview-pane {
  flex: 1 1 50%;
  width: 50%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid var(--border);
}

.pane-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
  height: 70px;
  flex-shrink: 0;
}

.tabs {
  display: flex;
  gap: 0.5rem;
}

.tab-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--muted);
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.tab-btn:hover {
  background: var(--surface-muted);
}
.tab-btn.active {
  color: var(--text);
  background: var(--surface-muted);
  border-color: var(--border);
}

.pane-header h2 {
  margin: 0;
}

.editor-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* Ensure codemirror takes full height */
:deep(.cm-editor) {
  height: 100%;
}
:deep(.cm-scroller) {
  overflow: auto;
  font-family: 'Fira Code', monospace;
}

.preview-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: #f1f5f9; /* Fixed light gray for contrast */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.a4-page-wrapper {
  transition: transform 0.2s ease;
}

.a4-page {
  /* We remove the fixed A4 styling from the container itself */
  /* and let the user's .page classes handle the physical pages */
  position: relative;
  text-align: left;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.zoom-controls input[type="range"] {
  width: 100px;
}

/* On mobile, stack them vertically */
@media (max-width: 1024px) {
  .cv-builder-container {
    flex-direction: column;
  }
  .editor-pane, .preview-pane {
    flex: none;
    width: 100%;
    height: 50vh;
  }
}
</style>
