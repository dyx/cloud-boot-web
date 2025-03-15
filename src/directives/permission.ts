import type { Directive } from 'vue'
import { useUserInfoStore } from '@/stores/userInfo.ts'

function checkPermission(el: HTMLElement, binding: any) {
  const userInfoStore = useUserInfoStore()
  const { value } = binding
  const hasPerm = userInfoStore.hasPermission(value)
  const button = el.tagName === 'BUTTON' ? el : el.querySelector('button')

  if (!button)
    return

  button.toggleAttribute('disabled', !hasPerm)

  if (!hasPerm) {
    button.classList.add('is-disabled')
    button.addEventListener('click', stopEvent, true)
  }
  else {
    button.classList.remove('is-disabled')
    button.removeEventListener('click', stopEvent, true)
  }
}

function stopEvent(e: Event) {
  e.preventDefault()
  e.stopPropagation()
}

export const permissionDirective: Directive = {
  mounted: checkPermission,
  updated: checkPermission,
}
