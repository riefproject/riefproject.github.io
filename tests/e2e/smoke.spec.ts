import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('public pages', () => {
  test('home exposes core SEO metadata and a single H1', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Arief F-sa Wijaya/)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://riefproject.my.id/')

    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description?.length).toBeGreaterThan(100)

    const structuredData = await page.locator('script[type="application/ld+json"]').first().textContent()
    const schema = JSON.parse(structuredData || '[]') as Array<{ '@type'?: string }>
    expect(schema.some((item) => item['@type'] === 'Person')).toBe(true)
    expect(schema.some((item) => item['@type'] === 'ProfilePage')).toBe(true)
  })

  test('language toggle navigates to the Indonesian route', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Switch language to Indonesian' }).click()

    await expect(page).toHaveURL(/\/id\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'id')
    await expect(page.getByRole('button', { name: 'Change language to English' })).toBeVisible()
  })

  test('Indonesian route is server-rendered with hreflang alternates', async ({ page }) => {
    await page.goto('/id/')

    await expect(page.locator('html')).toHaveAttribute('lang', 'id')
    await expect(page.locator('h1')).toContainText('Mahasiswa')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://riefproject.my.id/id/')
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', 'https://riefproject.my.id/')
    await expect(page.locator('link[rel="alternate"][hreflang="id"]')).toHaveAttribute('href', 'https://riefproject.my.id/id/')
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute('href', 'https://riefproject.my.id/')
  })

  test('language toggle returns from Indonesian to English', async ({ page }) => {
    await page.goto('/id/')

    await page.getByRole('button', { name: 'Change language to English' }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('theme toggle switches between light and dark', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')

    const toggle = page.getByRole('button', { name: 'Switch to dark mode' })
    await expect(toggle).toBeVisible()
    await toggle.click()

    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible()
  })

  test('competitive programming tabs switch content', async ({ page }) => {
    await page.goto('/competitive-programming')

    const codeforcesTab = page.getByRole('tab', { name: /Codeforces/i })
    await codeforcesTab.click()

    await expect(codeforcesTab).toHaveAttribute('aria-selected', 'true')
  })

  test('problem explorer searches and shows an empty state', async ({ page }) => {
    await page.goto('/competitive-programming/problems')

    const search = page.getByPlaceholder('Search problem title, topic, language, contest...')
    await search.fill('zzzz-no-such-problem')

    await expect(page.getByText('No problems match the search criteria.')).toBeVisible()
  })

  test('project gallery filters by search', async ({ page }) => {
    await page.goto('/projects')

    const search = page.getByPlaceholder('Search titles, descriptions, or technologies')
    await search.fill('zzzz-no-such-project')

    await expect(page.getByText('No projects match the current filters.')).toBeVisible()
  })

  test('home has no serious or critical accessibility violations', async ({ page }) => {
    await page.goto('/')

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
    const blocking = results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')

    expect(blocking).toEqual([])
  })
})
