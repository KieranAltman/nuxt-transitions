import { defineNuxtModule, addPlugin, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@freeloop/nuxt-transitions',
    configKey: 'transitions'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // components
    addComponentsDir({ path: resolver.resolve('./runtime/components') })

    // composables
    addImportsDir(resolver.resolve('./runtime/composables'))
  }
})
