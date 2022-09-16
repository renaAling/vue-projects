<template>
    <div>
        <template v-if="item.children.length === 0 && !item.notMenu">
            <el-menu-item :index="'/'+item.routeName">
                <i class="iconfont" :class="item.menuIcon"></i>
                <span style="padding-left: 10px;" slot="title">{{item.name}}</span>
            </el-menu-item>
        </template>
        <el-submenu v-else :index="item.routeName ? '/' + item.routeName : item.id + ''">
            <template slot="title">
                <i class="iconfont" :class="item.menuIcon"></i>
                <span style="padding-left: 10px;">{{item.name}}</span>
            </template>
            <template v-for="child in item.children">
                <sidebar-item v-if="child.children && child.children.length > 0" :item="child" :key="child.routeName">
                </sidebar-item>
                <template v-else>
                    <el-menu-item :key="child.routeName" :index="'/'+child.routeName" v-if="!child.notMenu">
                        <i class="iconfont" :class="child.menuIcon"></i>
                        <span style="padding-left: 10px;" slot="title">{{child.name}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-submenu>
    </div>
</template>
<script>
export default {
    name: "SidebarItem",
    props: {
        item:{
            require: true,
            type: Object
        }
    }
}
</script>