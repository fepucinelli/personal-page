type MaybeGetter<T> = T | (() => T)

interface BreadcrumbItem {
  name: string
  url: string
}

interface SeoPageOptions {
  title: MaybeGetter<string>
  description: MaybeGetter<string>
  path: MaybeGetter<string>
  robots?: string
  breadcrumbs?: BreadcrumbItem[]
}

export function useSeoPage(options: SeoPageOptions) {
  const resolve = <T>(v: MaybeGetter<T>): T | (() => T) => v

  const canonicalHref = typeof options.path === 'function'
    ? () => `https://pucinelli.me${(options.path as () => string)()}`
    : `https://pucinelli.me${options.path}`

  const ogTitleValue = typeof options.title === 'function'
    ? () => `${(options.title as () => string)()} | Felipe Pucinelli`
    : `${options.title} | Felipe Pucinelli`

  useHead({
    title: resolve(options.title),
    link: [{ rel: 'canonical', href: canonicalHref as string }],
    ...(options.breadcrumbs?.length ? {
      script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: options.breadcrumbs.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: crumb.name,
            item: `https://pucinelli.me${crumb.url}`,
          })),
        }),
      }],
    } : {}),
  })

  useSeoMeta({
    description: resolve(options.description),
    ogTitle: ogTitleValue,
    ogDescription: resolve(options.description),
    ogUrl: canonicalHref as string,
    twitterCard: 'summary_large_image',
    twitterTitle: ogTitleValue,
    twitterDescription: resolve(options.description),
    ...(options.robots ? { robots: options.robots } : {}),
  })
}
