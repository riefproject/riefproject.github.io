export const jsonResponse = (data: unknown): Response => {
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
