<template>
    <div class="home">
        <!-- 左边菜单 -->
        <div class="home-left">
            <side-bar></side-bar>
        </div>
        <div class="home-right">
            <!-- 顶部 -->
            <top-bar></top-bar>
            <!-- 标签缓存部分 -->
            <tags-view></tags-view>
            <div>
                <keep-alive>
                    <router-view :key="$route.fullPath" />
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
import {LOGOUT} from "@api/api"
import SideBar from "./components/sidebar/index.vue"
import TopBar from "./components/topbar/index.vue"
import TagsView from "./components/tagsview/index.vue"
export default {
    name:"Layout",
    components: {
        SideBar,TopBar,TagsView
    },
    data() {
        return{
        }
    },
    methods: {
        logout() {
            LOGOUT().then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
<style lang="scss">
.home{
    height: 100%;
    display: flex;
    .home-left{
        height: 100%;
        min-width: 250px;
    }
    .home-right{
        flex: 1;
        overflow: hidden;
    }
}
</style>