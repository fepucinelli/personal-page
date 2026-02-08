type MaybeGetter<T> = T | (() => T)

interface SeoPageOptions {
  title: MaybeGetter<string>
  description: MaybeGetter<string>
  path: MaybeGetter<string>
  robots?: string
}

export function useSeoPage(options: SeoPageOptions) {
  const resolve = <T>(v: MaybeGetter<T>): T | (() => T) => v

  useHead({ title: resolve(options.title) })

  useSeoMeta({
    description: resolve(options.description),
    ogTitle: typeof options.title === 'function'
      ? () => `${(options.title as () => string)()} | Felipe Pucinelli`
      : `${options.title} | Felipe Pucinelli`,
    ogDescription: resolve(options.description),
    ogUrl: typeof options.path === 'function'
      ? () => `https://pucinelli.me${(options.path as () => string)()}`
      : `https://pucinelli.me${options.path}`,
    ...(options.robots ? { robots: options.robots } : {}),
  })
}
