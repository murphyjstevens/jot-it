import { router } from '@/router'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TheHeader from '../TheHeader.vue'

describe('TheHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(TheHeader, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.text()).toContain('Jot-It')
  })
})
