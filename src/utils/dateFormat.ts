export const formatRelativeTime = (isoString?: string, isId: boolean = false): string => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const now = new Date()
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffSec < 60) return isId ? 'baru saja' : 'just now'
  if (diffSec < 3600) return isId ? `${Math.floor(diffSec / 60)} mnt lalu` : `${Math.floor(diffSec / 60)}m ago`
  if (diffSec < 86400) return isId ? `${Math.floor(diffSec / 3600)} jam lalu` : `${Math.floor(diffSec / 3600)}h ago`
  if (diffSec < 2592000) return isId ? `${Math.floor(diffSec / 86400)} hari lalu` : `${Math.floor(diffSec / 86400)}d ago`

  return date.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatTooltipHeaderDate = (dateStr: string, isId: boolean = false): string => {
  const dateObj = new Date(dateStr + 'T00:00:00')
  return dateObj.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const formatExactDate = (isoString?: string, isId: boolean = false): string => {
  if (!isoString) return '-'
  const date = new Date(isoString)
  return date.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
