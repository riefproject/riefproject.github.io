<template>
  <div class="cv-builder-container">
    <header class="global-topbar">
      <div class="brand">CV Editor</div>
      <div class="actions">
        <button @click="formatCode" class="action-btn">Format</button>
        <button @click="saveSource" class="action-btn" :disabled="isSavingSource">
          {{ isSavingSource ? 'Saving...' : 'Save' }}
        </button>
        <button @click="generatePdf" class="action-btn primary" :disabled="isGenerating">
          {{ isGenerating ? 'Exporting...' : 'Export PDF' }}
        </button>
      </div>
    </header>

    <div class="workspace">
      <div class="editor-pane">
        <div class="chrome-tabs">
          <button 
            :class="['tab-btn', { active: activeTab === 'html' }]"
            @click="activeTab = 'html'"
          >
            source.html <span v-if="isHtmlDirty" class="dirty-dot">•</span>
          </button>
          <button 
            :class="['tab-btn', { active: activeTab === 'css' }]"
            @click="activeTab = 'css'"
          >
            source.css <span v-if="isCssDirty" class="dirty-dot">•</span>
          </button>
        </div>
        <div class="editor-wrapper">
          <codemirror
            v-show="activeTab === 'html'"
            v-model="htmlContent"
            placeholder="<h1>Your CV HTML here</h1>"
            :style="{ height: '100%' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="htmlExtensions"
          />
          <codemirror
            v-show="activeTab === 'css'"
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
        <div class="preview-header">
          <span class="pane-title">Output</span>
          <div class="zoom-controls">
            <span class="zoom-label">{{ Math.round(zoom * 100) }}%</span>
            <input type="range" v-model.number="zoom" min="0.3" max="1.5" step="0.1" class="zoom-slider" />
          </div>
        </div>
        <div class="preview-scroll">
          <div class="scale-container" :style="{ width: `calc((210mm + 2rem) * ${zoom})`, margin: '0 auto' }">
            <div class="a4-page-wrapper" :style="{ transform: `scale(${zoom})`, transformOrigin: 'top left', width: 'calc(210mm + 2rem)' }">
              <iframe 
                ref="previewIframe"
                :srcdoc="iframeSrcdoc"
                frameborder="0"
                style="width: 100%; height: 100%; min-height: 297mm; background: transparent;"
              ></iframe>
              <!-- Hidden div for html2pdf to use -->
              <div ref="cvContent" style="display: none;">
                <div v-html="htmlContent"></div>
              </div>
            </div>
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

const baseHtml = ref(props.initialHtml || defaultHtml);
const baseCss = ref(props.initialCss || defaultCss);

const isHtmlDirty = ref(false);
const isCssDirty = ref(false);

watch(htmlContent, (newVal) => {
  isHtmlDirty.value = newVal !== baseHtml.value;
});

watch(cssContent, (newVal) => {
  isCssDirty.value = newVal !== baseCss.value;
});

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
      border: 1px solid #a1a1aa !important;
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
    
    // Update base state after successful save
    baseHtml.value = htmlContent.value;
    baseCss.value = cssContent.value;
    
    isHtmlDirty.value = false;
    isCssDirty.value = false;
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
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        onclone: (documentClone: Document) => {
          const style = documentClone.createElement('style');
          style.innerHTML = cssContent.value;
          documentClone.head.appendChild(style);
        }
      },
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
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: var(--bg);
  overflow: hidden;
  font-family: var(--font-sans, "Inter", system-ui, sans-serif);
}

.global-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 0 1.5rem;
  flex-shrink: 0;
}

.brand {
  font-weight: 600;
  color: var(--text);
  font-size: 0.9rem;
  letter-spacing: -0.01em;
}

.workspace {
  display: flex;
  flex: 1;
  overflow: hidden;
  padding: 1rem;
  gap: 1rem;
  background: var(--bg); /* Back to normal app background */
}

.editor-pane, .preview-pane {
  flex: 1 1 50%;
  width: 50%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 8px; /* Classic modern radius */
  overflow: hidden;
  border: 1px solid var(--border); /* Subtle native border */
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15); /* Elegant soft shadow */
}

.editor-pane {
  /* Force dark mode for the editor regardless of global theme */
  background: #18181b; 
}

.preview-pane {
  background: var(--bg-elevated); /* Elevated from the base */
}

.chrome-tabs {
  display: flex;
  align-items: flex-end;
  height: 44px;
  background: #18181b; /* Matches outer pane */
  padding: 0 0.5rem;
  gap: 4px;
  border-bottom: 1px solid #27272a;
}

.tab-btn {
  background: transparent;
  border: 1px solid transparent;
  border-bottom: none;
  color: #a1a1aa; /* Muted text */
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0 1.25rem;
  height: 32px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans, system-ui, sans-serif);
}

.tab-btn:hover {
  background: #27272a;
  color: #e4e4e7;
}

.tab-btn.active {
  color: #e4e4e7;
  background: #1e1e1e; /* Match editor bg */
  border-color: #27272a;
}

.dirty-dot {
  color: #eab308;
  font-size: 1.2rem;
  line-height: 0;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  height: 44px;
  flex-shrink: 0;
}

.pane-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.action-btn:hover:not(:disabled) {
  border-color: var(--muted);
  background: var(--bg);
  transform: translateY(-1px);
}

.action-btn.primary {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

.action-btn.primary:hover:not(:disabled) {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.editor-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #1e1e1e;
}

:deep(.cm-editor) {
  height: 100%;
  background: transparent !important;
}

:deep(.cm-scroller) {
  overflow: auto;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.85rem;
}

:deep(.cm-gutters) {
  background: #1e1e1e !important;
  border-right: 1px solid #27272a !important;
  color: #71717a !important;
}

:deep(.cm-activeLine), :deep(.cm-activeLineGutter) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

.preview-scroll {
  flex: 1;
  overflow: auto;
  padding: 2rem;
  background: var(--bg-elevated);
}

.scale-container {
  position: relative;
  transition: width 0.2s ease;
}

.a4-page-wrapper {
  transition: transform 0.2s ease;
}

.a4-page {
  position: relative;
  text-align: left;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.zoom-label {
  font-size: 0.75rem;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.zoom-slider {
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  background: #a1a1aa;
  border-radius: 2px;
  outline: none;
}

.zoom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--text);
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

@media (max-width: 1024px) {
  .workspace {
    flex-direction: column;
  }
  .editor-pane, .preview-pane {
    flex: none;
    width: 100%;
    height: 50vh;
  }
}
</style>
