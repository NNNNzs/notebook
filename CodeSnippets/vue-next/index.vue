<template>
  <h1>
    {{ counter }}
  </h1>
</template>

<script>
import {
  reactive,
  toRefs,
  watch,
  computed,
  onMounted,
  onUnmounted,
  ref,
} from "vue";

export default {
  props: {
    msg: String,
  },
  setup(ctx) {
    // 这里没有this，
    const data = userCounter();
    const msg = ref("some message");

    return {
      msg,
      ...toRefs(data),
    };
  },
};

function useCounter() {
  const data = reactive({
    counter: 1,
    doubleCount: computed(() => data.counter * 2),
  });
  let timer = null;

  onMounted(() => {
    timer = setInterval(() => {
      data.counter++;
    }, 100);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });
  return data;
}
</script>
