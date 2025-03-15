import type { App, Directive } from 'vue'
import { permissionDirective } from '@/directives/permission.ts'

interface DirectiveMap {
  [key: string]: Directive
}

const directives: DirectiveMap = {
  perm: permissionDirective,
}

const directivesPlugin = {
  install: (app: App<Element>) => {
    Object.entries(directives).forEach(([name, directive]) => {
      app.directive(name, directive)
    })
  },
}

export default directivesPlugin
