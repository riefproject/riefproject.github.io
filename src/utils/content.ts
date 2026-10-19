export const getContentSlug = (item: { id: string }): string => {
  return item.id.replace(/\.json$/, '');
};

export const sortByOrder = <T extends { id: string }>(
  collection: readonly T[],
  orderSlugs: readonly string[],
  getSlug: (item: T) => string,
): T[] => {
  const orderIndex = new Map<string, number>();
  orderSlugs.forEach((slug, index) => {
    if (!orderIndex.has(slug)) {
      orderIndex.set(slug, index);
    }
  });

  return [...collection].sort((a, b) => {
    const idxA = orderIndex.get(getSlug(a));
    const idxB = orderIndex.get(getSlug(b));
    if (idxA !== undefined && idxB !== undefined) return idxA - idxB;
    if (idxA !== undefined) return -1;
    if (idxB !== undefined) return 1;
    return 0;
  });
};
