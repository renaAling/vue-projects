<template>
    <div class="slider">
        <!-- 顶部logo -->
        <div class="logo">
            <logo/>
        </div>
        <!-- 菜单部分 -->
        <el-scrollbar style="height:100%;">
            <el-menu class="el-menu-vertical-demo"
              menu-trigger="click"
              :unique-opened="uniqueOpened"
              :default-active="activeMenu"
              :router="true"
              mode="vertical"
              :background-color="variables.menuBg"
              :text-color="variables.menuText"
            >
                <SidebarItem v-for="(menu) in systemMeunList" :key="menu.id" :item="menu"></SidebarItem>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import Logo from "./logo.vue"
import SidebarItem from "./sidebarItem.vue"
import variables from "@style/variables.scss"
import {mapGetters} from "vuex"
export default {
    components: {
        Logo,SidebarItem
    },
    data() {
        return {
            uniqueOpened: true,
            activeMenu: ''
        }
    },
    computed: {
        ...mapGetters({
            systemMeunList: "base/systemMeunList"
        }),
        variables() {
            return variables
        }
    }
}
</script>
<style lang="scss">
@import "@/common/style/variables.scss";
.slider{
    background-color: $menuBg;
    height: 100vh;
    box-sizing: border-box;
}
</style>