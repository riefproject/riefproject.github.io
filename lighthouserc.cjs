module.exports = {
  ci: {
    collect: {
      url: [
        'http://127.0.0.1:4321/',
        'http://127.0.0.1:4321/competitive-programming/',
        'http://127.0.0.1:4321/competitive-programming/problems/',
        'http://127.0.0.1:4321/development-activity/',
        'http://127.0.0.1:4321/activity/',
        'http://127.0.0.1:4321/projects/',
      ],
      startServerCommand: 'node scripts/preview-lighthouse.cjs',
      startServerReadyPattern: 'Lighthouse preview ready',
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
