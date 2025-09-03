<template>
  <div class="min-h-screen w-full bg-gray-50 text-gray-900">
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div class="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
        <h1 class="text-xl md:text-2xl font-semibold">Award Certificate Generator · Vue 3</h1>
        <div class="flex items-center gap-2">
          <button
            @click="exportPNG"
            :disabled="isExportingPNG || isExportingPDF"
            class="px-3 py-2 rounded-lg border hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span
              v-if="isExportingPNG"
              class="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"
            ></span>
            Download PNG
          </button>
          <button
            @click="exportPDF"
            :disabled="isExportingPNG || isExportingPDF"
            class="px-3 py-2 rounded-lg border hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span
              v-if="isExportingPDF"
              class="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"
            ></span>
            Download PDF
          </button>
          <button
            @click="printCert"
            :disabled="isExportingPNG || isExportingPDF"
            class="px-3 py-2 rounded-lg border hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            Print
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
      <!-- Controls -->
      <section aria-label="Controls" class="bg-white rounded-2xl shadow p-4 space-y-4">
        <div class="space-y-3">
          <h2 class="text-lg font-medium">Details</h2>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm text-gray-600 font-medium">Template:</label>
            <select
              v-model="selectedTemplateKey"
              @change="applyTemplate"
              class="flex-1 px-3 py-2 rounded-lg border text-sm min-w-0"
            >
              <option v-for="(t, key) in templates" :key="key" :value="key">{{ t.name }}</option>
            </select>
          </div>
        </div>

        <div
          v-if="selectedTemplateKey === 'custom'"
          class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm"
        >
          <div class="flex items-center gap-2 text-blue-700">
            <span>💡</span>
            <strong>Custom Template Selected</strong>
          </div>
          <p class="text-blue-600 mt-1">
            You can now edit all fields below to create your own custom certificate. All text fields
            are fully editable!
          </p>

          <!-- Custom Template Name Field -->
          <div class="mt-3">
            <label class="block">
              <span class="text-sm text-blue-700 font-medium">Custom Template Name:</span>
              <input
                v-model="form.customTemplateName"
                class="w-full mt-1 px-3 py-2 rounded-lg border border-blue-300 ring-2 ring-blue-200 text-sm"
                placeholder="e.g., Excellence Award, Achievement Certificate, etc."
              />
              <p class="text-xs text-blue-500 mt-1">
                This name will appear in the badge on your certificate
              </p>
            </label>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <label class="col-span-2">
            <span class="text-sm text-gray-600">Title</span>
            <input
              v-model="form.title"
              :class="[
                'w-full mt-1 px-3 py-2 rounded-lg border',
                selectedTemplateKey === 'custom' ? 'ring-2 ring-blue-200 border-blue-300' : '',
              ]"
              :placeholder="
                selectedTemplateKey === 'custom' ? 'Enter your custom certificate title...' : ''
              "
            />
          </label>
          <label class="col-span-2">
            <span class="text-sm text-gray-600">Recipient</span>
            <input v-model="form.recipient" class="w-full mt-1 px-3 py-2 rounded-lg border" />
          </label>
          <label class="col-span-2">
            <span class="text-sm text-gray-600">Subtitle</span>
            <input
              v-model="form.subtitle"
              :class="[
                'w-full mt-1 px-3 py-2 rounded-lg border',
                selectedTemplateKey === 'custom' ? 'ring-2 ring-blue-200 border-blue-300' : '',
              ]"
              :placeholder="
                selectedTemplateKey === 'custom' ? 'e.g., is hereby recognized for' : ''
              "
            />
          </label>
          <label class="col-span-2">
            <span class="text-sm text-gray-600">Reason / Citation</span>
            <textarea
              v-model="form.reason"
              rows="3"
              :class="[
                'w-full mt-1 px-3 py-2 rounded-lg border',
                selectedTemplateKey === 'custom' ? 'ring-2 ring-blue-200 border-blue-300' : '',
              ]"
              :placeholder="
                selectedTemplateKey === 'custom'
                  ? 'Describe the achievement or reason for this certificate...'
                  : ''
              "
            />
          </label>
          <label>
            <span class="text-sm text-gray-600">Issuer</span>
            <input v-model="form.issuer" class="w-full mt-1 px-3 py-2 rounded-lg border" />
          </label>
          <label>
            <span class="text-sm text-gray-600">Date</span>
            <input v-model="form.date" class="w-full mt-1 px-3 py-2 rounded-lg border" />
          </label>
          <label>
            <span class="text-sm text-gray-600">Certificate ID</span>
            <input v-model="form.certificateId" class="w-full mt-1 px-3 py-2 rounded-lg border" />
          </label>
          <label>
            <span class="text-sm text-gray-600">Logo URL (optional)</span>
            <input
              v-model="form.logoUrl"
              placeholder="https://..."
              class="w-full mt-1 px-3 py-2 rounded-lg border"
            />
          </label>
        </div>

        <h2 class="text-lg font-medium pt-2">Signatures & Options</h2>
        <div class="grid grid-cols-2 gap-3 items-end">
          <label>
            <span class="text-sm text-gray-600">Left Signature Name</span>
            <input
              v-model="form.signatureNameLeft"
              class="w-full mt-1 px-3 py-2 rounded-lg border"
            />
          </label>
          <label>
            <span class="text-sm text-gray-600">Left Signature Label</span>
            <input
              v-model="form.signatureLabelLeft"
              class="w-full mt-1 px-3 py-2 rounded-lg border"
            />
          </label>
        </div>

        <div class="grid grid-cols-2 gap-3 items-end">
          <label>
            <span class="text-sm text-gray-600">Accent Color</span>
            <input
              type="color"
              v-model="form.accent"
              class="w-full mt-1 h-10 rounded-lg border p-1"
            />
          </label>

          <label>
            <span class="text-sm text-gray-600">Theme</span>
            <select v-model="form.theme" class="w-full mt-1 px-3 py-2 rounded-lg border">
              <option value="classic">Classic (serif)</option>
              <option value="minimal">Minimal (sans)</option>
              <option value="regal">Regal (serif/italic)</option>
            </select>
          </label>
        </div>

        <h2 class="text-lg font-medium pt-2">Appearance</h2>
        <div class="grid grid-cols-2 gap-3 items-end">
          <label>
            <span class="text-sm text-gray-600">Layout</span>
            <select v-model="form.layout" class="w-full mt-1 px-3 py-2 rounded-lg border">
              <option value="A4">A4</option>
              <option value="LETTER">US Letter</option>
            </select>
          </label>
          <label>
            <span class="text-sm text-gray-600">Orientation</span>
            <select v-model="form.orientation" class="w-full mt-1 px-3 py-2 rounded-lg border">
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </select>
          </label>
          <label class="col-span-2">
            <span class="text-sm text-gray-600">Preview Scale ({{ scalePct }}%)</span>
            <input type="range" min="30" max="150" v-model.number="form.scale" class="w-full" />
          </label>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <label class="inline-flex items-center gap-2"
            ><input type="checkbox" v-model="form.showBorder" /> Show border</label
          >
          <label class="inline-flex items-center gap-2"
            ><input type="checkbox" v-model="form.showSeal" /> Show seal</label
          >
          <label class="inline-flex items-center gap-2"
            ><input type="checkbox" v-model="form.withQr" /> Include QR</label
          >
        </div>

        <label class="block pt-2">
          <span class="text-sm text-gray-600">Footer Note</span>
          <textarea
            v-model="form.footerNote"
            rows="2"
            :class="[
              'w-full mt-1 px-3 py-2 rounded-lg border',
              selectedTemplateKey === 'custom' ? 'ring-2 ring-blue-200 border-blue-300' : '',
            ]"
            :placeholder="
              selectedTemplateKey === 'custom' ? 'Add a custom footer message (optional)...' : ''
            "
          />
        </label>
      </section>

      <!-- Preview -->
      <section aria-label="Preview" class="bg-white rounded-2xl shadow p-4 overflow-auto">
        <div class="w-full">
          <div
            ref="certRef"
            class="relative mx-auto bg-white"
            :style="{ ...scaledStyle, padding: 0 }"
          >
            <!-- Decorative border -->
            <div
              :class="['w-full h-full p-8 md:p-14 flex flex-col', themeClasses.borderStyle]"
              :style="{ borderColor: form.accent }"
            >
              <!-- Header with logo & certificate id -->
              <div class="flex items-center justify-between mb-6">
                <div class="text-sm text-gray-500">{{ form.certificateId }}</div>
                <img
                  v-if="form.logoUrl"
                  :src="form.logoUrl"
                  alt="Logo"
                  class="h-12 object-contain"
                />
                <div v-else class="h-12" />
              </div>

              <!-- Title + subtitle -->
              <div class="text-center mt-2">
                <h1 :class="[themeClasses.heading, 'tracking-wide']" :style="accentStyle">
                  {{ form.title }}
                </h1>
                <p :class="[themeClasses.subheading, 'mt-2']">{{ form.subtitle }}</p>

                <!-- Developer-ribbon badge -->
                <div class="mt-3 flex justify-center">
                  <span
                    class="px-3 py-1 text-xs uppercase tracking-widest rounded-full border"
                    :style="{ borderColor: form.accent, color: form.accent }"
                  >
                    {{ currentTemplate.name }}
                  </span>
                </div>
              </div>

              <!-- Recipient & reason -->
              <div class="flex-1 flex items-center justify-center">
                <div class="text-center max-w-3xl mx-auto">
                  <div class="mt-6 text-2xl md:text-4xl font-semibold" :style="accentStyle">
                    {{ form.recipient }}
                  </div>
                  <p :class="[themeClasses.body, themeClasses.reason, 'mt-4']">{{ form.reason }}</p>
                </div>
              </div>

              <!-- Signatures & date row -->
              <div class="pt-8">
                <div class="grid grid-cols-2 gap-8 items-end">
                  <!-- Left signature -->
                  <div class="text-center">
                    <div class="h-10 flex items-end justify-center">
                      <span v-if="form.signatureNameLeft" class="font-medium">{{
                        form.signatureNameLeft
                      }}</span>
                    </div>
                    <div class="mt-1 border-t border-gray-400 mx-6" />
                    <div class="text-xs text-gray-500 mt-1">{{ form.signatureLabelLeft }}</div>
                  </div>

                  <!-- Right is Date (fixed label) -->
                  <div class="text-center">
                    <div class="h-10 flex items-end justify-center">
                      <span class="font-medium">{{ form.date }}</span>
                    </div>
                    <div class="mt-1 border-t border-gray-400 mx-6" />
                    <div class="text-xs text-gray-500 mt-1">Date</div>
                  </div>
                </div>

                <div class="flex items-center justify-between mt-6 text-sm text-gray-600">
                  <div>{{ form.issuer }}</div>
                  <div>{{ form.date }}</div>
                </div>
              </div>

              <!-- Seal / QR -->
              <div class="absolute right-10 bottom-24 flex flex-col items-center gap-3">
                <div
                  v-if="form.showSeal"
                  class="seal-circle flex items-center justify-center"
                  :style="{ borderColor: form.accent }"
                >
                  <div class="text-center text-xs" :style="accentStyle">
                    <div class="font-bold tracking-widest">AWARD</div>
                    <div class="text-[10px]">Official Seal</div>
                  </div>
                </div>
                <div v-if="form.withQr" class="bg-white p-1 rounded shadow border">
                  <qrcode-vue :value="form.qrData || ''" :size="100" :level="'M'" />
                </div>
              </div>

              <!-- Footer note -->
              <div v-if="form.footerNote" class="mt-6 text-center text-xs text-gray-500 px-8">
                {{ form.footerNote }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import QrcodeVue from 'qrcode.vue'

const DEFAULT_ACCENT = '#1f2937'

// Templates (developer-themed presets)
interface TemplateDef {
  key: string
  name: string
  payload: Partial<typeof form>
}

const templates: Record<string, TemplateDef> = {
  bug_slayer: {
    key: 'bug_slayer',
    name: '🐞 Bug Slayer',
    payload: {
      title: 'Certificate of Debugging Excellence',
      subtitle: 'is hereby recognized as a',
      reason:
        'For exceptional skill in identifying, isolating, and resolving critical defects with speed and precision.',
      footerNote:
        'Awarded for champion-level impact on product stability and developer experience.',
    },
  },
  best_reviewer: {
    key: 'best_reviewer',
    name: '🔍 Code Reviewer',
    payload: {
      title: 'Certificate of Review Excellence',
      subtitle: 'is hereby recognized for',
      reason:
        'For thoughtful, constructive, and high-signal code reviews that elevate team quality standards.',
      footerNote: 'Thank you for raising the bar on code health and mentorship.',
    },
  },
  team_player: {
    key: 'team_player',
    name: '🤝 Team Player',
    payload: {
      title: 'Certificate of Team Excellence',
      subtitle: 'is hereby recognized for',
      reason:
        'For outstanding collaboration, communication, and support across squads and disciplines.',
      footerNote: 'Awarded for making the team stronger every single day.',
    },
  },
  innovation: {
    key: 'innovation',
    name: '✨ Innovation Award',
    payload: {
      title: 'Certificate of Innovation',
      subtitle: 'is hereby recognized for',
      reason: 'For pioneering ideas and shipping creative solutions that move the product forward.',
      footerNote: 'Invent, iterate, and inspire.',
    },
  },
  oncall_hero: {
    key: 'oncall_hero',
    name: '🚨 On-Call Hero',
    payload: {
      title: 'Certificate of Reliability',
      subtitle: 'is hereby recognized for',
      reason: 'For calm, decisive responses to incidents and relentless focus on customer uptime.',
      footerNote: 'We sleep better because you do not.',
    },
  },
  docs_champion: {
    key: 'docs_champion',
    name: '📚 Docs Champion',
    payload: {
      title: 'Certificate of Clarity',
      subtitle: 'is hereby recognized for',
      reason:
        'For crafting documentation that accelerates onboarding and removes friction for everyone.',
      footerNote: 'Knowledge shared is leverage multiplied.',
    },
  },
  custom: {
    key: 'custom',
    name: '🎨 Custom',
    payload: {},
  },
}

const form = reactive({
  layout: 'A4' as 'A4' | 'LETTER',
  orientation: 'landscape' as 'landscape' | 'portrait',
  accent: DEFAULT_ACCENT,
  theme: 'classic' as 'classic' | 'minimal' | 'regal',
  title: 'Certificate of Excellence',
  recipient: 'Recipient Name',
  subtitle: 'is hereby recognized for',
  reason: 'Outstanding Performance and Dedication',
  issuer: 'Link11',
  date: new Date().toLocaleDateString(),
  signatureLabelLeft: 'Authorized Signature',
  signatureNameLeft: '',
  footerNote: 'This certificate is issued in recognition of exceptional achievement.',
  certificateId: 'CERT-2025-0001',
  logoUrl: 'https://www.link11.com/wp-content/uploads/2025/05/Logo_New_2025.png',
  showSeal: true,
  showBorder: true,
  withQr: false,
  qrData: 'https://example.com/verify/CERT-2025-0001',
  scale: 100,
  templateKey: 'bug_slayer' as keyof typeof templates,
  customTemplateName: 'Custom Certificate',
})

const selectedTemplateKey = ref<keyof typeof templates>('bug_slayer')
const isExportingPNG = ref(false)
const isExportingPDF = ref(false)

const currentTemplate = computed(() => {
  const template = templates[selectedTemplateKey.value]
  if (selectedTemplateKey.value === 'custom') {
    return {
      ...template,
      name: form.customTemplateName || 'Custom Certificate',
    }
  }
  return template
})

function applyTemplate() {
  const payload = templates[selectedTemplateKey.value].payload
  if (selectedTemplateKey.value !== 'custom' || Object.keys(payload).length > 0) {
    Object.assign(form, payload)
  }
  // For custom template, keep current form values as-is for user editing
}

const certRef = ref<HTMLElement | null>(null)

const A4 = { width: 1123, height: 794 } // px @ ~96dpi (landscape)
const LETTER = { width: 1100, height: 850 }

const pageDims = computed(() => {
  const base = form.layout === 'LETTER' ? LETTER : A4
  const isPortrait = form.orientation === 'portrait'
  return isPortrait ? { width: base.height, height: base.width } : base
})

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

const scalePct = computed(() => clamp(Number(form.scale) || 100, 30, 150))

const scaledStyle = computed(() => ({
  width: pageDims.value.width + 'px',
  height: pageDims.value.height + 'px',
  transform: `scale(${scalePct.value / 100})`,
  transformOrigin: 'top left',
}))

const accentStyle = computed(() => ({ color: form.accent }))

const themeClasses = computed(() => {
  const base = {
    border: form.showBorder ? 'shadow-lg ring-1' : '',
    body: 'text-gray-700',
  }
  switch (form.theme) {
    case 'minimal':
      return {
        ...base,
        heading: 'font-sans text-3xl md:text-5xl font-semibold',
        subheading: 'font-sans text-sm md:text-base text-gray-500',
        reason: 'font-sans text-lg md:text-2xl font-medium',
        borderStyle: 'border-8 rounded-none',
      }
    case 'regal':
      return {
        ...base,
        heading: 'font-serif text-3xl md:text-5xl',
        subheading: 'font-serif text-sm md:text-base italic text-gray-600',
        reason: 'font-serif text-xl md:text-3xl',
        borderStyle: 'border-[16px] rounded-2xl',
      }
    default:
      return {
        ...base,
        heading: 'font-serif text-3xl md:text-5xl',
        subheading: 'font-serif text-sm md:text-base text-gray-600',
        reason: 'font-serif text-xl md:text-2xl',
        borderStyle: 'border-[12px] rounded-xl',
      }
  }
})

// Helper function to copy all computed styles
function copyComputedStyles(source: Element, target: Element) {
  const computedStyle = window.getComputedStyle(source)
  for (const key of computedStyle) {
    try {
      ;(target as HTMLElement).style.setProperty(
        key,
        computedStyle.getPropertyValue(key),
        computedStyle.getPropertyPriority(key),
      )
    } catch (e) {
      // Skip invalid properties
    }
  }

  // Recursively copy styles for all children
  for (let i = 0; i < source.children.length; i++) {
    if (target.children[i]) {
      copyComputedStyles(source.children[i], target.children[i])
    }
  }
}

async function exportPNG() {
  if (!certRef.value) return

  try {
    isExportingPNG.value = true

    // Ensure fonts are loaded
    await document.fonts.ready

    // Create a new div with exact certificate content but clean styling
    const exportElement = document.createElement('div')
    exportElement.innerHTML = certRef.value.innerHTML

    // Set the exact export dimensions and clean styles
    exportElement.style.cssText = `
      position: absolute;
      left: -9999px;
      top: 0;
      width: ${pageDims.value.width}px;
      height: ${pageDims.value.height}px;
      background: white;
      transform: none;
      scale: 1;
      margin: 0;
      padding: 32px;
      box-sizing: border-box;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    `

    copyComputedStyles(certRef.value, exportElement)

    exportElement.style.transform = 'none'
    exportElement.style.scale = '1'
    exportElement.style.width = `${pageDims.value.width}px`
    exportElement.style.height = `${pageDims.value.height}px`
    exportElement.style.position = 'absolute'
    exportElement.style.left = '-9999px'

    document.body.appendChild(exportElement)

    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log('Starting PNG capture with styled element...', {
      dimensions: pageDims.value,
      exportRect: exportElement.getBoundingClientRect(),
    })

    const canvas = await html2canvas(exportElement, {
      backgroundColor: 'white',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: true,
      width: pageDims.value.width,
      height: pageDims.value.height,
      windowWidth: pageDims.value.width,
      windowHeight: pageDims.value.height,
      scrollX: 0,
      scrollY: 0,
      removeContainer: false,
    })

    document.body.removeChild(exportElement)

    console.log('Canvas created:', { width: canvas.width, height: canvas.height })

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas has no dimensions')
    }

    const dataUrl = canvas.toDataURL('image/png', 1.0)
    downloadDataUrl(
      dataUrl,
      `${sanitizeFileName(form.title)}_${sanitizeFileName(form.recipient)}.png`,
    )
  } catch (error) {
    console.error('PNG export failed:', error)
    alert('Failed to export PNG. Please try again.')
  } finally {
    isExportingPNG.value = false
  }
}

async function exportPDF() {
  if (!certRef.value) return

  try {
    isExportingPDF.value = true

    await document.fonts.ready

    const exportElement = document.createElement('div')
    exportElement.innerHTML = certRef.value.innerHTML

    exportElement.style.cssText = `
      position: absolute;
      left: -9999px;
      top: 0;
      width: ${pageDims.value.width}px;
      height: ${pageDims.value.height}px;
      background: white;
      transform: none;
      scale: 1;
      margin: 0;
      padding: 32px;
      box-sizing: border-box;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    `

    copyComputedStyles(certRef.value, exportElement)

    exportElement.style.transform = 'none'
    exportElement.style.scale = '1'
    exportElement.style.width = `${pageDims.value.width}px`
    exportElement.style.height = `${pageDims.value.height}px`
    exportElement.style.position = 'absolute'
    exportElement.style.left = '-9999px'

    document.body.appendChild(exportElement)

    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log('Starting PDF capture with styled element...', {
      dimensions: pageDims.value,
      exportRect: exportElement.getBoundingClientRect(),
    })

    const canvas = await html2canvas(exportElement, {
      backgroundColor: 'white',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: true,
      width: pageDims.value.width,
      height: pageDims.value.height,
      windowWidth: pageDims.value.width,
      windowHeight: pageDims.value.height,
      scrollX: 0,
      scrollY: 0,
      removeContainer: false,
    })

    document.body.removeChild(exportElement)

    console.log('Canvas created:', { width: canvas.width, height: canvas.height })

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas has no dimensions')
    }

    const imgData = canvas.toDataURL('image/png', 1.0)

    const isPortrait = form.orientation === 'portrait'
    const { width, height } = pageDims.value
    const doc = new jsPDF({
      orientation: isPortrait ? 'p' : 'l',
      unit: 'pt',
      format: [width, height],
      compress: true,
    })

    doc.addImage(imgData, 'PNG', 0, 0, width, height)
    doc.save(`${sanitizeFileName(form.title)}_${sanitizeFileName(form.recipient)}.pdf`)
  } catch (error) {
    console.error('PDF export failed:', error)
    alert('Failed to export PDF. Please try again.')
  } finally {
    isExportingPDF.value = false
  }
}

function printCert() {
  window.print()
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.click()
}

function sanitizeFileName(name: string) {
  return (name || 'certificate').replace(/[^a-z0-9\-_]+/gi, '_')
}
</script>

<script lang="ts">
export default {
  components: { QrcodeVue },
}
</script>

<style>
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  header,
  main > section:first-child {
    display: none !important;
  }
  main {
    padding: 0 !important;
  }
  section[aria-label='Preview'] {
    box-shadow: none;
  }
}

.seal-circle {
  width: 110px;
  height: 110px;
  border-width: 6px;
  border-style: double;
  border-radius: 9999px;
}
</style>
