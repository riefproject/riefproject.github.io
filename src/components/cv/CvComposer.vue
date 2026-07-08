<template>
  <div class="cv-builder-container">
    <header class="global-topbar">
      <div class="brand">CV Visual Composer</div>
      <div class="actions">
        <button @click="saveSource" class="action-btn" :disabled="isSavingSource">
          {{ isSavingSource ? 'Saving...' : 'Save Draft' }}
        </button>
        <button @click="generatePdf" class="action-btn primary" :disabled="isGenerating">
          {{ isGenerating ? 'Exporting...' : 'Export PDF' }}
        </button>
      </div>
    </header>

    <div class="workspace">
      <div class="editor-pane blocks-pane">
        <div class="chrome-tabs">
          <div class="tab-btn active">
            Sections Builder
          </div>
        </div>
        <div class="blocks-wrapper">
          <p class="helper-text">Drag and drop to reorder. Click a list section to expand its items.</p>
          <div class="blocks-list" @dragover.prevent @drop="onDropParent($event, blocks.length)">
            <div 
              v-for="(block, index) in blocks" 
              :key="block.id" 
              class="block-card-wrapper"
              :class="{ 'is-inactive': !block.active, 'is-dragover': dragOverParentIndex === index }"
              @dragover.prevent
              @dragenter.prevent="onDragEnterParent(index)"
              @drop.stop="onDropParent($event, index)"
            >
              <div class="block-card" draggable="true" @dragstart="onDragStartParent($event, index)" @dragend="onDragEnd">
                <div class="drag-handle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg>
                </div>
                <div class="block-info" @click="block.children ? (block.isExpanded = !block.isExpanded) : null" :style="{ cursor: block.children ? 'pointer' : 'default' }">
                  <div class="block-title">
                    <span v-if="block.children" class="expand-icon">{{ block.isExpanded ? '▼' : '▶' }}</span>
                    {{ block.title }}
                  </div>
                  <div class="block-class" v-if="block.className">.{{ block.className }}</div>
                </div>
                <div class="block-actions">
                  <button @click.stop="openEditModal(block)" class="icon-btn" title="Edit HTML">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <label class="toggle-switch" title="Toggle Visibility">
                    <input type="checkbox" v-model="block.active" @click.stop />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              
              <!-- Sub-items Accordion -->
              <div v-if="block.children && block.isExpanded" class="sub-blocks-list" @dragover.prevent @drop.stop="onDropSub($event, index, block.children.length)">
                <div 
                  v-for="(subBlock, subIndex) in block.children" 
                  :key="subBlock.id"
                  class="sub-block-card"
                  :class="{ 'is-inactive': !subBlock.active, 'is-dragover': dragOverSubIndex === subIndex && dragOverSubParent === index }"
                  draggable="true"
                  @dragstart.stop="onDragStartSub($event, index, subIndex)"
                  @dragenter.prevent.stop="onDragEnterSub(index, subIndex)"
                  @dragend.stop="onDragEnd"
                  @dragover.prevent.stop
                  @drop.stop="onDropSub($event, index, subIndex)"
                >
                  <div class="drag-handle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg>
                  </div>
                  <div class="block-info">
                    <div class="block-title sub">{{ subBlock.title }}</div>
                  </div>
                  <div class="block-actions">
                    <button @click="openEditModal(subBlock)" class="icon-btn" title="Edit HTML">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <label class="toggle-switch small" title="Toggle Visibility">
                      <input type="checkbox" v-model="subBlock.active" />
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="preview-pane">
        <div class="preview-header">
          <span class="pane-title">Live Preview</span>
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
              <div ref="cvContent" style="display: none;">
                <div v-html="finalHtml"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editingBlock" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Editing: {{ editingBlock.title }}</h3>
          <button @click="closeEditModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <codemirror
            v-model="editingHtml"
            placeholder="<div>Your HTML here</div>"
            :style="{ height: '400px' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="htmlExtensions"
          />
        </div>
        <div class="modal-footer">
          <button @click="closeEditModal" class="action-btn">Cancel</button>
          <button @click="saveEditModal" class="action-btn primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, shallowRef } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import html2pdf from 'html2pdf.js';

const props = defineProps<{
  initialHtml?: string | null;
  initialCss?: string | null;
}>();

const htmlExtensions = shallowRef([html(), oneDark]);

interface CvBlock {
  id: string;
  title: string;
  className: string;
  html: string;
  active: boolean;
  isExpanded?: boolean;
  children?: CvBlock[];
}

const blocks = ref<CvBlock[]>([]);
const cssContent = ref(props.initialCss || '');
const zoom = ref(0.8);
const isGenerating = ref(false);
const isSavingSource = ref(false);

const editingBlock = ref<CvBlock | null>(null);
const editingHtml = ref('');

// Drag and drop state
const draggedParentIndex = ref<number | null>(null);
const draggedSubParent = ref<number | null>(null);
const draggedSubIndex = ref<number | null>(null);

const dragOverParentIndex = ref<number | null>(null);
const dragOverSubParent = ref<number | null>(null);
const dragOverSubIndex = ref<number | null>(null);

const onDragStartParent = (e: DragEvent, index: number) => {
  draggedParentIndex.value = index;
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', 'parent');
  }
};

const onDragStartSub = (e: DragEvent, parentIndex: number, subIndex: number) => {
  draggedSubParent.value = parentIndex;
  draggedSubIndex.value = subIndex;
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', 'sub');
  }
};

const onDragEnterParent = (index: number) => {
  if (draggedParentIndex.value !== null && draggedParentIndex.value !== index) {
    dragOverParentIndex.value = index;
  }
};

const onDragEnterSub = (parentIndex: number, subIndex: number) => {
  if (draggedSubParent.value === parentIndex && draggedSubIndex.value !== subIndex) {
    dragOverSubParent.value = parentIndex;
    dragOverSubIndex.value = subIndex;
  }
};

const onDragEnd = () => {
  draggedParentIndex.value = null;
  draggedSubParent.value = null;
  draggedSubIndex.value = null;
  dragOverParentIndex.value = null;
  dragOverSubParent.value = null;
  dragOverSubIndex.value = null;
};

const onDropParent = (e: DragEvent, toIndex: number) => {
  const fromIndex = draggedParentIndex.value;
  if (fromIndex !== null && fromIndex !== toIndex) {
    // If dragging down, adjust the insertion index
    const actualToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
    const item = blocks.value.splice(fromIndex, 1)[0];
    blocks.value.splice(actualToIndex, 0, item);
  }
  onDragEnd();
};

const onDropSub = (e: DragEvent, parentIndex: number, toIndex: number) => {
  if (draggedSubParent.value === parentIndex && draggedSubIndex.value !== null) {
    const fromIndex = draggedSubIndex.value;
    if (fromIndex !== toIndex) {
      const parent = blocks.value[parentIndex];
      if (parent && parent.children) {
        const actualToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
        const item = parent.children.splice(fromIndex, 1)[0];
        parent.children.splice(actualToIndex, 0, item);
      }
    }
  }
  onDragEnd();
};

const openEditModal = (block: CvBlock) => {
  editingBlock.value = block;
  editingHtml.value = block.html;
};

const closeEditModal = () => {
  editingBlock.value = null;
};

const saveEditModal = () => {
  if (editingBlock.value) {
    editingBlock.value.html = editingHtml.value;
  }
  closeEditModal();
};

const parseHtmlToBlocks = (htmlStr: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlStr, 'text/html');
  const pageDiv = doc.querySelector('.page');
  
  if (!pageDiv) return [];
  
  const extractedBlocks: CvBlock[] = [];
  
  Array.from(pageDiv.children).forEach((child, index) => {
    if (child.tagName.toLowerCase() === 'br') return;
    
    let title = 'Section ' + (index + 1);
    const h2 = child.querySelector('h2');
    const h1 = child.querySelector('h1');
    if (h2) title = h2.textContent || title;
    else if (h1) title = h1.textContent || title;
    else if (child.className) {
      title = child.className.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' ');
    }
    
    // Convert to HTMLElement for easier querying
    const el = child as HTMLElement;
    const eduItems = Array.from(el.querySelectorAll(':scope > .edu-item'));
    
    if (eduItems.length > 0) {
      const children: CvBlock[] = eduItems.map((item, i) => {
        item.parentNode?.removeChild(item);
        
        let subTitle = 'Item ' + (i + 1);
        const subH3 = item.querySelector('h3');
        const subName = item.querySelector('.edu-name');
        if (subH3) subTitle = subH3.textContent || subTitle;
        else if (subName) subTitle = subName.textContent || subTitle;

        return {
          id: 'sub-' + Date.now() + '-' + index + '-' + i,
          title: subTitle,
          className: item.className,
          html: item.outerHTML,
          active: true
        };
      });
      
      const placeholder = '__CHILDREN_PLACEHOLDER__';
      el.appendChild(doc.createTextNode(placeholder));
      
      extractedBlocks.push({
        id: 'block-' + Date.now() + '-' + index,
        title,
        className: el.className || '',
        html: el.outerHTML,
        active: true,
        isExpanded: false,
        children
      });
    } else {
      extractedBlocks.push({
        id: 'block-' + Date.now() + '-' + index,
        title,
        className: el.className || '',
        html: el.outerHTML,
        active: true
      });
    }
  });
  
  return extractedBlocks;
};

onMounted(() => {
  if (props.initialHtml) {
    blocks.value = parseHtmlToBlocks(props.initialHtml);
  }
});

const finalHtml = computed(() => {
  const activeBlocks = blocks.value.filter(b => b.active).map(b => {
    if (b.children) {
      const activeChildren = b.children.filter(c => c.active).map(c => c.html).join('\n');
      return b.html.replace('__CHILDREN_PLACEHOLDER__', activeChildren);
    }
    return b.html;
  }).join('\n<br/>\n');
  return `<div class="page">\n${activeBlocks}\n</div>`;
});

const iframeSrcdoc = ref('');
let debounceTimer: ReturnType<typeof setTimeout>;

watch([finalHtml, cssContent], () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    iframeSrcdoc.value = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"><\/script>
  <style>
    body { margin: 0; background-color: transparent; font-family: sans-serif; }
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
    ${cssContent.value}
  </style>
</head>
<body>
  ${finalHtml.value}
</body>
</html>`;
  }, 800);
}, { immediate: true });

const saveSource = async () => {
  isSavingSource.value = true;
  try {
    const formData = new FormData();
    formData.append('html', finalHtml.value);
    formData.append('css', cssContent.value);
    
    await fetch('/api/save-cv-source', {
      method: 'POST',
      body: formData
    });
  } catch (err) {
    console.error('Failed to save draft:', err);
    alert('Failed to save. Check console.');
  } finally {
    isSavingSource.value = false;
  }
};

const generatePdf = async () => {
  isGenerating.value = true;
  try {
    const el = cvContent.value;
    if (!el) return;
    
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

    const pdfBlob = await html2pdf().set(opt).from(el).output('blob');
    
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'cv-arief.pdf');
    
    const res = await fetch('/api/upload-cv', {
      method: 'POST',
      body: formData
    });
    
    if (res.ok) alert('CV PDF successfully generated and replaced!');
    else alert('Failed to replace CV PDF.');
  } catch (err) {
    console.error('Error generating PDF:', err);
  } finally {
    isGenerating.value = false;
  }
};
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

.brand { font-weight: 600; color: var(--text); font-size: 0.9rem; }
.workspace { display: flex; flex: 1; overflow: hidden; padding: 1rem; gap: 1rem; background: var(--bg); }
.editor-pane, .preview-pane {
  flex: 1 1 50%; width: 50%; min-width: 0; display: flex; flex-direction: column; height: 100%;
  border-radius: 8px; overflow: hidden; border: 1px solid var(--border);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}
.editor-pane { background: #18181b; }
.preview-pane { background: var(--bg-elevated); }

.chrome-tabs { display: flex; align-items: flex-end; height: 44px; background: #18181b; padding: 0 0.5rem; gap: 4px; border-bottom: 1px solid #27272a; }
.tab-btn {
  background: transparent; border: 1px solid transparent; border-bottom: none;
  color: #a1a1aa; font-size: 0.8125rem; font-weight: 500; padding: 0 1.25rem; height: 32px;
  border-radius: 8px 8px 0 0; cursor: default; position: relative; display: flex; align-items: center;
}
.tab-btn.active { color: #e4e4e7; background: #1e1e1e; border-color: #27272a; }

.blocks-wrapper { flex: 1; overflow-y: auto; background: #1e1e1e; padding: 1rem; }
.helper-text { color: #a1a1aa; font-size: 0.8rem; margin-top: 0; margin-bottom: 1rem; text-align: center; }

.blocks-list { display: flex; flex-direction: column; gap: 0.75rem; }
.block-card-wrapper { display: flex; flex-direction: column; gap: 0.25rem; transition: all 0.2s; }
.block-card-wrapper.is-dragover > .block-card { border-top: 2px solid #3b82f6; }
.block-card {
  display: flex; align-items: center; gap: 0.75rem; background: #27272a; border: 1px solid #3f3f46;
  border-radius: 8px; padding: 0.75rem; cursor: grab; transition: all 0.2s; color: #e4e4e7;
}
.block-card:active { cursor: grabbing; opacity: 0.8; }
.block-card-wrapper.is-inactive .block-card { opacity: 0.5; background: #18181b; border-color: #27272a; }

.sub-blocks-list {
  display: flex; flex-direction: column; gap: 0.25rem; padding-left: 2rem; border-left: 2px solid #27272a; margin-left: 1rem; margin-top: 0.25rem;
}
.sub-block-card {
  display: flex; align-items: center; gap: 0.5rem; background: #18181b; border: 1px solid #27272a;
  border-radius: 6px; padding: 0.5rem 0.75rem; cursor: grab; color: #a1a1aa; transition: all 0.2s;
}
.sub-block-card.is-inactive { opacity: 0.4; border-color: transparent; }
.sub-block-card.is-dragover { border-top: 2px solid #3b82f6; }

.expand-icon { display: inline-block; width: 14px; font-size: 0.7rem; color: #71717a; margin-right: 4px; }

.drag-handle { color: #71717a; display: flex; align-items: center; justify-content: center; cursor: grab; }
.drag-handle:active { cursor: grabbing; }

.block-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.2rem; }
.block-title { font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; user-select: none; }
.block-title.sub { font-size: 0.85rem; font-weight: 500; }
.block-class { font-size: 0.75rem; color: #a1a1aa; font-family: monospace; }

.block-actions { display: flex; align-items: center; gap: 0.75rem; }
.icon-btn { background: transparent; border: none; color: #a1a1aa; cursor: pointer; border-radius: 4px; padding: 4px; display: flex; transition: 0.2s; }
.icon-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

/* Toggle Switch */
.toggle-switch { position: relative; display: inline-block; width: 36px; height: 20px; }
.toggle-switch.small { width: 28px; height: 16px; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #52525b; transition: .3s; border-radius: 34px; }
.slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
.toggle-switch.small .slider:before { height: 10px; width: 10px; }
input:checked + .slider { background-color: #3b82f6; }
input:checked + .slider:before { transform: translateX(16px); }
.toggle-switch.small input:checked + .slider:before { transform: translateX(12px); }

.preview-header {
  display: flex; justify-content: space-between; align-items: center; padding: 0 1.5rem;
  background: var(--bg-elevated); border-bottom: 1px solid var(--border); height: 44px; flex-shrink: 0;
}
.pane-title { font-size: 0.8125rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }

.actions { display: flex; align-items: center; gap: 0.5rem; }
.action-btn {
  background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text);
  font-size: 0.8125rem; font-weight: 500; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; transition: all 0.2s;
}
.action-btn:hover:not(:disabled) { border-color: var(--muted); background: var(--bg); transform: translateY(-1px); }
.action-btn.primary { background: #2563eb; color: #fff; border-color: #2563eb; }
.action-btn.primary:hover:not(:disabled) { background: #1d4ed8; border-color: #1d4ed8; }
.action-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.preview-scroll { flex: 1; overflow: auto; padding: 2rem; background: var(--bg-elevated); }
.scale-container { position: relative; transition: width 0.2s ease; }
.a4-page-wrapper { transition: transform 0.2s ease; }

.zoom-controls { display: flex; align-items: center; gap: 0.5rem; }
.zoom-label { font-size: 0.75rem; color: var(--muted); font-variant-numeric: tabular-nums; }
.zoom-slider { width: 80px; height: 4px; -webkit-appearance: none; background: #a1a1aa; border-radius: 2px; outline: none; }
.zoom-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: var(--text); cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }

/* Modal */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(2px); }
.modal-container { background: #18181b; width: 800px; max-width: 90vw; border-radius: 12px; border: 1px solid #27272a; box-shadow: 0 20px 40px rgba(0,0,0,0.4); display: flex; flex-direction: column; overflow: hidden; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #27272a; }
.modal-header h3 { margin: 0; font-size: 1.1rem; color: #fff; }
.close-btn { background: transparent; border: none; color: #a1a1aa; font-size: 1.5rem; cursor: pointer; line-height: 1; }
.close-btn:hover { color: #fff; }
.modal-body { padding: 0; background: #1e1e1e; }
.modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #27272a; display: flex; justify-content: flex-end; gap: 0.5rem; background: #18181b; }

:deep(.cm-editor) { height: 100%; background: transparent !important; }
:deep(.cm-scroller) { overflow: auto; font-family: 'Fira Code', 'JetBrains Mono', monospace; font-size: 0.85rem; }
:deep(.cm-gutters) { background: #1e1e1e !important; border-right: 1px solid #27272a !important; color: #71717a !important; }
:deep(.cm-activeLine), :deep(.cm-activeLineGutter) { background-color: rgba(255, 255, 255, 0.05) !important; }

@media (max-width: 1024px) {
  .workspace { flex-direction: column; }
  .editor-pane, .preview-pane { flex: none; width: 100%; height: 50vh; }
}
</style>
