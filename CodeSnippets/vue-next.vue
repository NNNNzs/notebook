<template>
  <div class="data" id="app">
    {{ counter }}
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, watch, computed,watchEffect } from "vue";
export default {
  name: "demo",
  setup(props, ctx) {
    //   单个响应式数据
    const counter = ref(0);

    console.log(counter); //{value:0}

    console.log(counter.value); //0

    // 多个数据
    const state = reactive({
      list: [],
      //   computed数据
      listName: computed(() => state.list.map((e) => e.name)),
    });

    //方法
    const getData = async () => {
        // state.list = await 
    };

    const { user } = toRefs();

    //由外部修改，会影响响应式更新
    const effect =  watchEffect(()=>{
        document.querySelector('#app').innerHTML = `${state.listName}`
    });
    
    effect.stop();

    //watch
    watch(counter, (newValue, oldValue) => {});

    onMounted(() => {
      //do somethings
    });
    return {
      //   data
      counter,
      ...toRefs(state),
      // lifecycle hooks
      onMounted,
      //   methods
      getData
    };
  },
};
</script>

<style>
</style>