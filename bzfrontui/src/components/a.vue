<style scoped>

</style>
<template>
    <div class="layout">
        a.vue
    </div>
</template>
<script>
    export default {
        data(){
            return{
                time:0
            }
        },
        mounted(){
            this.time = new Date().valueOf()
        }
    }
</script>