<template>
    <div class="tags-view">
        <el-scrollbar style="width:100%;">
            <el-tag v-for="tag in visitedViews"
             :key="tag.title"
             size="small"
             closable
             @close="closePath(tag)"
             :effect="tag.fullPath === $route.fullPath ? 'dark': 'light'"
             @click.native="gotoPath(tag)"
            >
                {{tag.title}}
            </el-tag>
        </el-scrollbar>
    </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
export default {
    name: "TagsView",
    computed:{
        ...mapGetters({
            visitedViews: "base/visitedViews"
        })
    },
    methods: {
        ...mapActions('base', ['ADD_VISITED_VIEW','DEL_VISITED_VIEW']),
        addTags(route) {
            const {name} = this.$route
            console.log('addTags---------------',name)

            if(name) {
                this.ADD_VISITED_VIEW(route)
            }
            return false
        },
        gotoPath(route) {
            if (this.$route.fullPath !== route.fullPath) {
                this.$router.push(route.fullPath)
            }
        },
        closePath(route) {
            console.log(route)
            this.DEL_VISITED_VIEW(route).then((res)=>{
                console.log(1111111)
                if(res && res.length>0) {
                    // 至少还有一个tags
                    const rout = res[res.length -1]
                    if(this.$route.fullPath !== rout.fullPath) {
                        this.$router.push(rout.fullPath)
                    }else {
                        this.$router.push('/')
                    }
                }  else {
                    // 没有tags
                    this.$router.push('/')
                }
            })
        }
    },
    watch: {
        $route(){
            const {fullPath, meta, name, path} = this.$route
            this.addTags({fullPath, meta, name, path})
        }
    }
}
</script>
<style lang="scss">
.tags-view{
    height: 50px;
    width:100%;
    background: yellow;
    padding: 10px;
    box-sizing: border-box;
    overflow-x:hidden;
    .el-tag--small{
        margin-right: 8px;
    }
}
</style>