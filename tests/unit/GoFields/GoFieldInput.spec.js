import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFieldInput } from '../../../src'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoFieldInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GoFieldInput, {
      localVue,
      propsData: {
        value: 'first name'
      }
    })
  })

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFieldInput']).toBeTruthy()
  })

  it('should have errors bag present', () => {
    expect(wrapper.vm.errors.items).toBeDefined()
  })

  it('should have not vee-validate errors register', () => {
    expect(wrapper.vm.errors.items).toEqual([])
  })

  it('should have input value equal to v-model pass in props', () => {
    expect(wrapper.vm.valueInput).toEqual(wrapper.vm.value)
  })

  it('should emit input event with input value', () => {
    const valueExpected = 'my name'
    const input = wrapper.find({ref: 'input'})

    input.setValue(valueExpected)

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().input[0]).toEqual([valueExpected])
  })

  describe('when we set validations vee-validate', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoFieldInput, {
        localVue,
        propsData: {
          value: 'first name',
          'vee-validate': "required"
        }
      })
    })

    it('should have error bag vee validate', () => {
      expect(wrapper.vm.errors.items).toBeDefined()
    })

    it('should have errors bag vee validate with wrong value in input', async () => {
      const input = wrapper.find({ref: 'input'})

      input.setValue('')
      await flushPromises()
      console.log(wrapper.vm.errors.items, '----------------------------')
      expect(wrapper.vm.errors.items).toBeDefined()
    })

    describe('when we set data-vv-as', () => {
      it('should have errors bag named with data-vv-as props', () => {

      })
    })
  })
})
