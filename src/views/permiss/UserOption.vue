<template>
    <div>
        <el-button type="primary" v-if="hasPower('ADD')">新增</el-button>
        <el-button type="success" v-if="hasPower('QUERY')">查询</el-button>
        <el-button type="info" v-if="hasPower('EDIT')">编辑</el-button>
        <el-button type="warning" v-if="hasPower('DELETE')">删除</el-button>
    </div>
</template>
<script>
/**
 *  {
 *      userList：{ ADD: true, EDIT: true, DELETE: true},
 *      operatingRole: {ADD: true, QUERY: true}
 * }
 * mixin
 */
import minx from '@utils/mixin.js'
export default {
    name: "UserOption",
    mixins: [minx],
    mounted(){
        console.log(this.$route.name)
    },
    methods: {
        
    }
}
</script>