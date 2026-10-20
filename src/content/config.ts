import { defineCollection, z } from 'astro:content'

const localeTextSchema = z.object({
  en: z.string(),
  id: z.string(),
})

const profileSchema = z.object({
  name: z.string(),
  role: localeTextSchema,
  tagline: localeTextSchema,
  location: localeTextSchema,
  availability: localeTextSchema,
  intro: localeTextSchema,
  bio: localeTextSchema,
  focusStack: localeTextSchema,
  resumeUrl: z.string().optional(),
  heroHighlights: z.array(
    z.object({
      label: localeTextSchema,
      detail: localeTextSchema,
    })
  ),
  stats: z.array(
    z.object({
      label: localeTextSchema,
      value: z.string(),
      helper: localeTextSchema.optional(),
    })
  ),
  focusAreas: z.array(
    z.object({
      title: localeTextSchema,
      description: localeTextSchema,
      items: z.array(localeTextSchema),
    })
  ),
  skillCategories: z.array(
    z.object({
      title: localeTextSchema,
      items: z.array(localeTextSchema),
      helper: localeTextSchema.optional(),
    })
  ),
  toolbox: z.array(z.string()),
})

const contactSchema = z.object({
  email: z.string(),
  message: localeTextSchema,
  availabilityNote: localeTextSchema,
})

const layoutSchema = z.object({
  projectsOrder: z.array(z.string()),
  experiencesOrder: z.array(z.string()),
  achievementsOrder: z.array(z.string()),
})

const socialSchema = z.object({
  socials: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
      hint: z.string().optional(),
    })
  ),
})

export const collections = {
  projects: defineCollection({
    type: 'data',
    schema: z.object({
      title: localeTextSchema,
      img: z.string().optional(),
      description: localeTextSchema,
      impact: localeTextSchema.optional(),
      year: z.number(),
      category: localeTextSchema,
      categoryKey: z.string(),
      featured: z.boolean().optional(),
      stack: z.array(z.string()),
      highlights: z.array(localeTextSchema),
      links: z.array(z.object({ label: localeTextSchema, url: z.string() })).optional(),
    }),
  }),
  experiences: defineCollection({
    type: 'data',
    schema: z.object({
      type: z.enum(['work', 'organizational', 'personal']),
      company: z.string(),
      logo: z.string().optional(),
      role: localeTextSchema,
      period: localeTextSchema,
      summary: localeTextSchema,
      stack: z.array(z.string()),
      achievements: z.array(localeTextSchema),
    }),
  }),
  achievements: defineCollection({
    type: 'data',
    schema: z.object({
      type: z.enum(['competitions', 'certifications', 'bootcamps']),
      title: localeTextSchema,
      issuer: localeTextSchema,
      date: z.string(),
      highlight: localeTextSchema.optional(),
      link: z.string().optional(),
      logo: z.string().optional(),
      credentialId: z.string().optional(),
      credentialUrl: z.string().optional(),
      certificateImage: z.array(z.string()).optional(),
    }),
  }),
  education: defineCollection({
    type: 'data',
    schema: z.object({
      institution: z.string(),
      logo: z.string().optional(),
      program: localeTextSchema,
      period: z.string(),
      details: z.array(localeTextSchema),
    }),
  }),
  'cp-profiles': defineCollection({
    type: 'data',
    schema: z.object({
      platform: z.string(),
      handle: z.string(),
      url: z.string(),
      logo: z.string().optional(),
      logoLight: z.string().optional(),
      note: localeTextSchema.optional(),
    }),
  }),
  'stack-showcase': defineCollection({
    type: 'data',
    schema: z.object({
      name: z.string(),
      category: z.enum(['language', 'framework', 'tool']),
      logoDark: z.string().optional(),
      logoLight: z.string().optional(),
    }),
  }),
  singletons: defineCollection({
    type: 'data',
    schema: z.union([profileSchema, contactSchema, layoutSchema, socialSchema]),
  }),
}
