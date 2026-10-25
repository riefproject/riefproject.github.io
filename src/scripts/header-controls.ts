import { setTheme, theme, THEME_STORAGE_KEY, type Theme } from '../stores/uiStore'

export const getNextTheme = (current: Theme): Theme => (current === 'dark' ? 'light' : 'dark')

export const getThemeLabel = (current: Theme): string => (current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')

const getCurrentTheme = (root: HTMLElement): Theme => (root.classList.contains('dark') ? 'dark' : 'light')

const syncThemeClasses = (root: HTMLElement, next: Theme): void => {
  root.classList.toggle('dark', next === 'dark')
  root.classList.toggle('light', next === 'light')
}

const renderThemeControls = (buttons: HTMLButtonElement[], current: Theme): void => {
  buttons.forEach((button) => {
    button.setAttribute('aria-label', getThemeLabel(current))
    button.querySelectorAll<HTMLElement>('[data-theme-value]').forEach((segment) => {
      segment.classList.toggle('active', segment.dataset.themeValue === current)
    })
  })
}

const initThemeToggle = (): void => {
  const root = document.documentElement
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]'))
  if (!buttons.length) return

  renderThemeControls(buttons, getCurrentTheme(root))

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const next = getNextTheme(getCurrentTheme(root))
      syncThemeClasses(root, next)
      setTheme(next)
      renderThemeControls(buttons, next)
    })
  })

  // Keep multiple tabs in sync without writing storage again, which would
  // bounce the same event back to the other tab.
  window.addEventListener('storage', (event) => {
    if (event.key !== THEME_STORAGE_KEY || !event.newValue) return
    const next: Theme = event.newValue === 'dark' ? 'dark' : 'light'
    syncThemeClasses(root, next)
    theme.set(next)
    renderThemeControls(buttons, next)
  })
}

const closeCvDropdowns = (shouldClose: (details: HTMLDetailsElement) => boolean): void => {
  document.querySelectorAll<HTMLDetailsElement>('details[data-cv-download][open]').forEach((details) => {
    if (shouldClose(details)) details.removeAttribute('open')
  })
}

const initCvDropdown = (): void => {
  document.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return
    closeCvDropdowns((details) => !details.contains(target))
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCvDropdowns(() => true)
  })
}

let initialized = false

export const initHeaderControls = (): void => {
  if (initialized || typeof document === 'undefined') return
  initialized = true
  initThemeToggle()
  initCvDropdown()
}
