<template>
  <div class="accordion__item">
    <div
      :class="generateClassHeader"
      class="accordionItem__header"
      :style="generateBackgroundHeader"
    >
      <div
        @click="activateItem(index)"
        class="accordionItem__button"
      >
        <span class="icon">i</span>
        <div class="header__title">
          <slot name="header">
            <h5>{{ item.header.title }}</h5>
          </slot>
        </div>
        <span
          class="header__delete"
          @click.stop="destroyItem"
        >
          d
        </span>
        <span class="header__arrow">a</span>
      </div>
    </div>
    <CollapseTransition :duration="animation ? 400 : 0">
      <div
        v-show="activeItemIndex === index"
        class="accordionItem__body"
      >
        <div class="accordionItem__container">
          <slot>
            <p>{{ item.body.content }}</p>
          </slot>
        </div>
      </div>
    </CollapseTransition>
  </div>
</template>

<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'ago-accordion-item',
  props: {
    index: {
      type: [Number, String],
      required: true
    },
    activeItemIndex: {
      type: [Number, String],
      required: true
    },
    item: {
      type: Object,
      validator: (value) => {
        return value.header.title.length > 0 && value.body.content.length > 0
      }
    },
    animation: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    generateClassHeader () {
      return this.activeItemIndex === this.index ? 'accordionItem__header--active' : ''
    },
    generateBackgroundHeader () {
      const bgStyle = this.item.header.background ? this.item.header.background : '#ffffff'

      return { backgroundColor: bgStyle }
    }
  },
  methods: {
    activateItem (index) {
      const activeItem = this.activeItemIndex === index ? -1 : index

      this.$emit('activateItem', activeItem)
    },
    destroyItem () {
      this.$emit('destroyItem', this.index)
    }
  },
  components: {
    CollapseTransition
  }
}
</script>

<style lang="scss" scoped>
  .accordionItem__button {
    display: flex;
    cursor: pointer;
    padding: 8px;
  }

  .header__title {
    flex-grow: 1;
  }

  .header__delete,
  .header__arrow {
    padding: 0 4px;
    align-self: flex-end;
  }

  .accordionItem__header {
    border: 1px solid #dee2e4;
    border-radius: 3px;
  }

  .accordionItem__header--active {
    border-radius: 3px 3px 0 0;
    .header__arrow {
      transform: rotate(90deg);
    }
  }

  .header__arrow {
    transition: transform .3s ease-in-out
  }

  .accordionItem__body {
    background-color: #ffffff;
    border: 1px solid #dee2e4;
    border-top: 0px;
    border-radius: 0 0 3px 3px;
  }

  .accordionItem__container {
    padding: 8px;
  }
</style>
