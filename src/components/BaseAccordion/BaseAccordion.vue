<template>
  <div class="accordion">
    <draggable
      v-model="listAccordion"
      :options="normalizeDragOptions"
      :move="onMove"
      @start="dragging = true"
      @end="update"
    >
      <transition-group>
        <AccordionItem
          v-for="(item, i) in listAccordion"
          :key="`accordion__item--${i}`"
          :index="i"
          :item="item"
          :activeItemIndex="activeItemIndex"
          :animation="!dragging"
          @activateItem="activateItem"
          @destroyItem="destroyItem"
        >
          <div
            v-if="hasHtmlTag(item.header.title)"
            v-html="item.header.title"
            slot="header"
          />
          <div
            v-if="hasHtmlTag(item.body.content)"
            v-html="item.body.content"
          />
        </AccordionItem>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import AccordionItem from './AccordionItem.vue'
import draggable from 'vuedraggable'

export default {
  name: 'ago-accordion',
  props: {
    baseActiveItem: {
      type: [Number, String],
      default: -1
    },
    dragOptions: {
      type: Object,
      default: {}
    },
    listItem: {
      type: Array,
      default: () => {
        return [{
          order: 0,
          header: {
            title: '',
            background: ''
          },
          body: {
            content: ''
          }
        }]
      }
    }
  },
  data () {
    return {
      listAccordion: this.listItem.sort((a, b) => a.order - b.order),
      activeItemIndex: this.baseActiveItem,
      regexHtml: /<\/?[A-Za-z][^>]*>/,
      dragging: false
    }
  },
  computed: {
    normalizeDragOptions () {
      return {
        animation: 300,
        disabled: true,
        ghostClass: "ghost",
        ...this.dragOptions
      }
    }
  },
  methods: {
    update (event) {
      this.listAccordion = this.listAccordion.map((item, index) => {
        item.order = index

        return item
      })

      if (this.activeItemIndex == event.oldIndex) {
        this.activeItemIndex = event.newIndex
      } else if (this.activeItemIndex == event.newIndex) {
        this.activeItemIndex = event.oldIndex
      }

      this.$nextTick(() => {
        this.dragging = false
      })

      this.$emit('update', this.listAccordion)
    },
    onMove (data) {
      const { relatedContext, draggedContext } = data
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element

      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    activateItem (index) {
      this.activeItemIndex = index
    },
    destroyItem (index) {
      this.activeItemIndex = -1

      this.listAccordion = this.listAccordion.filter((el, id) => {
        return id != index
      })
    },
    hasHtmlTag (string) {
      return this.regexHtml.test(string)
    }
  },
  components: {
    AccordionItem,
    draggable
  }
}
</script>

<style lang="scss">
// reset debut

  /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    -webkit-margin-before:0em;
    -webkit-margin-after:0em;
  }

  /* HTML5 display-role reset for older browsers */

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block; }

  body {
    line-height: 1; }

  ol, ul {
    list-style: none; }

  blockquote, q {
    quotes: none; }

  blockquote {
    &:before, &:after {
      content: '';
      content: none; } }

  q {
    &:before, &:after {
      content: '';
      content: none; } }

  table {
    border-collapse: collapse;
    border-spacing: 0; }

// reset fin
///////////////////
</style>

<docs>
```js
var items = [{
  order: 1,
  fixed: true,
  header: {
    title: '<h2 style="color: blue;">second title</h2>',
    background: 'red'
  },
  body: {
    content: 'first body'
  }
},
{
  order: 2,
  fixed: false,
  header: {
    title: '<h2 style="color: blue;">third title</h2>',
    background: 'red'
  },
  body: {
    content: 'first body'
  }
},
{
  order: 3,
  fixed: false,
  header: {
    title: '<h2 style="color: blue;">four title</h2>',
    background: 'red'
  },
  body: {
    content: 'first body'
  }
},
{
  order: 4,
  fixed: false,
  header: {
    title: 'five title'
  },
  body: {
    content: 'second body'
  }
},
{
  order: 0,
  fixed: true,
  header: {
    title: '<h1>first title</h1>',
    background: ''
  },
  body: {
    content: '<span style="color: red;">third body</span>'
  }
}]

<ago-accordion
  :listItem="items"
  :dragOptions="{ disabled: false }"
/>
```
</docs>
