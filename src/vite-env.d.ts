/// <reference types="vite/client" />
declare module 'js-cookie';
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
