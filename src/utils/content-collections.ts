import { getCollection, getEntry } from 'astro:content'
import { getContentSlug, sortByOrder } from './content'

type SingletonKey = 'profile' | 'contact' | 'layout' | 'social'

export const getSingleton = async <K extends SingletonKey>(id: K) => {
  const entry = await getEntry('singletons', id)
  return entry?.data
}

export const getSortedProjects = async () => {
  const layout = await getSingleton('layout')
  const projects = (await getCollection('projects')).map((entry) => ({
    ...entry.data,
    id: entry.id,
  }))
  return sortByOrder(
    projects.sort((a, b) => b.year - a.year),
    layout?.projectsOrder || [],
    getContentSlug
  )
}

export const getSortedExperiences = async () => {
  const layout = await getSingleton('layout')
  const experiences = (await getCollection('experiences')).map((entry) => ({
    ...entry.data,
    id: entry.id,
  }))
  return sortByOrder(experiences, layout?.experiencesOrder || [], getContentSlug)
}

export const getSortedAchievements = async () => {
  const layout = await getSingleton('layout')
  const achievements = (await getCollection('achievements')).map((entry) => ({
    ...entry.data,
    id: entry.id,
  }))
  return sortByOrder(achievements, layout?.achievementsOrder || [], getContentSlug)
}

export const getEducation = async () => (await getCollection('education')).map((entry) => ({ ...entry.data, id: entry.id }))
export const getCpProfiles = async () => (await getCollection('cp-profiles')).map((entry) => entry.data)
export const getStackShowcase = async () => (await getCollection('stack-showcase')).map((entry) => entry.data)
