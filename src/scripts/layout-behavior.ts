export function initLayoutBehavior(): void {
  const root = document.documentElement
  const animatedItems = Array.from(new Set(document.querySelectorAll<HTMLElement>('.section, [data-animate]'))).filter(
    (item) => item.id !== 'beranda'
  )

  const toggle = document.querySelector<HTMLElement>('[data-sidebar-toggle]')
  const overlay = document.querySelector<HTMLElement>('[data-sidebar-overlay]')
  const navLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-link]'))
  const closeButtons = Array.from(document.querySelectorAll<HTMLElement>('[data-sidebar-close]'))

  const closeSidebar = () => root.classList.remove('sidebar-open')

  toggle?.addEventListener('click', () => root.classList.toggle('sidebar-open'))
  overlay?.addEventListener('click', closeSidebar)
  closeButtons.forEach((btn) => btn.addEventListener('click', closeSidebar))
  navLinks.forEach((link) => link.addEventListener('click', () => closeSidebar()))

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSidebar()
  })

  const setActiveNav = (id: string) => {
    navLinks.forEach((link) => {
      const targetId = link.getAttribute('data-target')
      if (targetId === id) {
        link.classList.add('active')
        link.setAttribute('aria-current', 'true')
      } else {
        link.classList.remove('active')
        link.removeAttribute('aria-current')
      }
    })
  }

  const sectionEntries = navLinks
    .map((link) => {
      const id = link.getAttribute('data-target')
      if (!id) return null
      const element = document.getElementById(id)
      return element ? { id, element } : null
    })
    .filter((entry): entry is { id: string; element: HTMLElement } => entry !== null)

  const path = window.location.pathname.replace(/^\/id(?=\/|$)/, '') || '/'
  const hashTarget = window.location.hash?.replace('#', '')
  if (hashTarget) {
    setActiveNav(hashTarget)
  } else if (path.startsWith('/projects')) {
    setActiveNav('proyek')
  } else if (path.startsWith('/competitive-programming')) {
    setActiveNav('/competitive-programming')
  } else if (path.startsWith('/development-activity')) {
    setActiveNav('/development-activity')
  }

  if (sectionEntries.length) {
    setActiveNav(sectionEntries[0].id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visible.length) return

        const id = visible[0].target.getAttribute('id')
        if (id) setActiveNav(id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sectionEntries.forEach(({ element }) => observer.observe(element))
  }

  let animateObserver: IntersectionObserver | null = null

  if ('IntersectionObserver' in window) {
    animateObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            animateObserver?.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )
  }

  animatedItems.forEach((item) => {
    if (animateObserver) animateObserver.observe(item)
    else item.classList.add('is-visible')
  })
}
