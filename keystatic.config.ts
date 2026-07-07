import { config, fields, collection, singleton } from '@keystatic/core';

const localeText = (label: string) => fields.object({
  en: fields.text({ label: label + ' (English)' }),
  id: fields.text({ label: label + ' (Indonesian)' }),
});

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: {
      name: 'Portfolio CMS',
    },
    navigation: {
      'Content Management': ['projects', 'experiences', 'achievements', 'education'],
      'Skills & Profiles': ['stackShowcase', 'cpProfiles'],
      'Site Settings': ['layout', 'profile', 'contact', 'social'],
    },
  },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'slug',
      path: 'src/content/projects/*',
      format: { data: 'json' },
      previewUrl: '/projects',
      schema: {
        slug: fields.text({ label: 'Slug' }),
        title: localeText('Title'),
        img: fields.image({
          label: 'Image',
          directory: 'public/img/projects',
          publicPath: '/img/projects/'
        }),
        description: localeText('Description'),
        impact: localeText('Impact'),
        year: fields.integer({ label: 'Year' }),
        category: localeText('Category'),
        categoryKey: fields.text({ label: 'Category Key' }),
        featured: fields.checkbox({ label: 'Featured' }),
        stack: fields.array(fields.text({ label: 'Tech Stack' }), { label: 'Tech Stack', itemLabel: (p) => p.value }),
        highlights: fields.array(localeText('Highlight'), { label: 'Highlights', itemLabel: (p) => p.fields.en.value }),
        links: fields.array(
          fields.object({ label: localeText('Link Label'), url: fields.url({ label: 'Link URL' }) }),
          { label: 'Links', itemLabel: (p) => p.fields.label.fields.en.value }
        )
      },
    }),
    experiences: collection({
      label: 'Experiences',
      slugField: 'slug',
      path: 'src/content/experiences/*',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        slug: fields.text({ label: 'Slug' }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Work', value: 'work' },
            { label: 'Organizational', value: 'organizational' },
            { label: 'Personal', value: 'personal' }
          ],
          defaultValue: 'work'
        }),
        company: fields.text({ label: 'Company / Organization' }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/img',
          publicPath: '/img/'
        }),
        role: localeText('Role'),
        period: localeText('Period'),
        summary: localeText('Summary'),
        stack: fields.array(fields.text({ label: 'Stack' }), { label: 'Stack', itemLabel: (p) => p.value }),
        achievements: fields.array(localeText('Achievement'), { label: 'Achievements', itemLabel: (p) => p.fields.en.value })
      }
    }),
    achievements: collection({
      label: 'Achievements',
      slugField: 'slug',
      path: 'src/content/achievements/*',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        slug: fields.text({ label: 'Slug' }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Competitions', value: 'competitions' },
            { label: 'Certifications', value: 'certifications' },
            { label: 'Bootcamps', value: 'bootcamps' }
          ],
          defaultValue: 'competitions'
        }),
        title: localeText('Title'),
        issuer: localeText('Issuer'),
        date: fields.text({ label: 'Date' }),
        highlight: localeText('Highlight'),
        link: fields.text({ label: 'Link' }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/img',
          publicPath: '/img/'
        }),
        credentialId: fields.text({ label: 'Credential ID' }),
        credentialUrl: fields.text({ label: 'Credential URL' }),
        certificateImage: fields.array(fields.image({
          label: 'Certificate Image',
          directory: 'public/img/certs',
          publicPath: '/img/certs/'
        }), { label: 'Certificate Images', itemLabel: p => (typeof p.value === 'string' ? p.value : 'Image') })
      }
    }),
    education: collection({
      label: 'Education',
      slugField: 'slug',
      path: 'src/content/education/*',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        slug: fields.text({ label: 'Slug' }),
        institution: fields.text({ label: 'Institution' }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/img',
          publicPath: '/img/'
        }),
        program: localeText('Program'),
        period: fields.text({ label: 'Period' }),
        details: fields.array(localeText('Detail'), { label: 'Details', itemLabel: p => p.fields.en.value })
      }
    }),
    cpProfiles: collection({
      label: 'CP Profiles',
      slugField: 'slug',
      path: 'src/content/cp-profiles/*',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        slug: fields.text({ label: 'Slug' }),
        platform: fields.text({ label: 'Platform' }),
        handle: fields.text({ label: 'Handle' }),
        url: fields.text({ label: 'URL' }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/img',
          publicPath: '/img/'
        }),
        note: localeText('Note')
      }
    }),
    stackShowcase: collection({
      label: 'Stack Showcase',
      slugField: 'slug',
      path: 'src/content/stack-showcase/*',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        slug: fields.text({ label: 'Slug' }),
        name: fields.text({ label: 'Name' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Language', value: 'language' },
            { label: 'Framework', value: 'framework' },
            { label: 'Tool', value: 'tool' }
          ],
          defaultValue: 'language'
        }),
        logoDark: fields.text({ label: 'Logo SVG (Dark)', multiline: true }),
        logoLight: fields.text({ label: 'Logo SVG (Light)', multiline: true })
      }
    })
  },
  singletons: {
    profile: singleton({
      label: 'Profile & Settings',
      path: 'src/content/singletons/profile',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        name: fields.text({ label: 'Name' }),
        role: localeText('Role'),
        tagline: localeText('Tagline'),
        location: localeText('Location'),
        availability: localeText('Availability'),
        intro: localeText('Intro'),
        bio: localeText('Bio'),
        focusStack: localeText('Focus Stack'),
        resumeUrl: fields.file({
          label: 'Resume (PDF)',
          directory: 'public',
          publicPath: '/'
        }),
        heroHighlights: fields.array(
          fields.object({ label: localeText('Label'), detail: localeText('Detail') }),
          { label: 'Hero Highlights', itemLabel: p => p.fields.label.fields.en.value }
        ),
        stats: fields.array(
          fields.object({ label: localeText('Label'), value: fields.text({ label: 'Value' }), helper: localeText('Helper') }),
          { label: 'Stats', itemLabel: p => p.fields.label.fields.en.value }
        ),
        focusAreas: fields.array(
          fields.object({
            title: localeText('Title'),
            description: localeText('Description'),
            items: fields.array(localeText('Item'), { label: 'Items', itemLabel: p => p.fields.en.value })
          }),
          { label: 'Focus Areas', itemLabel: p => p.fields.title.fields.en.value }
        ),
        skillCategories: fields.array(
          fields.object({
            title: localeText('Title'),
            items: fields.array(localeText('Item'), { label: 'Items', itemLabel: p => p.fields.en.value })
          }),
          { label: 'Skill Categories', itemLabel: p => p.fields.title.fields.en.value }
        ),
        toolbox: fields.array(fields.text({ label: 'Tool' }), { label: 'Toolbox', itemLabel: p => p.value })
      }
    }),
    contact: singleton({
      label: 'Contact Information',
      path: 'src/content/singletons/contact',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        email: fields.text({ label: 'Email' }),
        message: localeText('Message'),
        availabilityNote: localeText('Availability Note')
      }
    }),
    social: singleton({
      label: 'Social Links',
      path: 'src/content/singletons/social',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.text({ label: 'URL' }),
            hint: fields.text({ label: 'Hint' })
          }),
          { label: 'Socials', itemLabel: p => p.fields.label.value }
        )
      }
    }),
    layout: singleton({
      label: 'Homepage Layout (Sorting)',
      path: 'src/content/singletons/layout',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        projectsOrder: fields.array(
          fields.relationship({ label: 'Project', collection: 'projects' }),
          { label: 'Featured Projects Order', itemLabel: p => p.value || 'Project' }
        ),
        experiencesOrder: fields.array(
          fields.relationship({ label: 'Experience', collection: 'experiences' }),
          { label: 'Experiences Order', itemLabel: p => p.value || 'Experience' }
        ),
        achievementsOrder: fields.array(
          fields.relationship({ label: 'Achievement', collection: 'achievements' }),
          { label: 'Achievements Order', itemLabel: p => p.value || 'Achievement' }
        )
      }
    })
  }
});
