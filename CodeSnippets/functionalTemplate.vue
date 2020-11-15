<template>
  <ul>
    <li v-for="(item,index) in list" :key="item.text">
      <renderTemplate :index="index" :render="item.render" :scope="{text:item.text,index}" />
    </li>
  </ul>
</template>

<script>
// 函数化组件
// 来源于iview-table
const renderTemplate = {
  name: "renderTemplate",
  functional: true,
  props: {
    render: Function,
    index: Number,
    scope: Object
  },
  render: (h, ctx) => {
    const params = ctx.props.scope;
    return ctx.props.render(h, params);
  }
};
export default {
  name: "demo",
  components: {
    renderTemplate
  },
  data() {
    return {
      list: [
        {
          text: "123",
          render: (h, { text }) => {
            return h("div", text);
          }
        },
        {
          text: "456",
          render: (h, { text }) => {
            return h("div", text);
          }
        }
      ]
    };
  }
};
</script>

<style>
</style>