<script>
export default {
  props: {
    panels: {
      type: Array,
      required: true
    }
  },
  render () {
    const contents = this.panels.map(pane => {
      return pane.active ? pane.$slots.default : null
    })
    return (
      <div class="tab-content">
        {contents}
      </div>
    )
  }
}
</script>
