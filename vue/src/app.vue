<template>

<mt-button type="default" @click="show">default</mt-button>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data() {

    },
    methods: {
        show() {
            Toast('hint')
        }
    }
}
</script>

<style lan="less" scoped></style>