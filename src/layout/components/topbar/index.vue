<template>
    <div class="top-bar">
       <div class="user-account">
           您好 Admin
       </div>
       <el-dropdown @command="handleCommand">
            <el-avatar class="el-dropdown-link" icon="el-icon-user-solid"></el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="change">修改信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import {LOGOUT} from "@api/api.js"
export default {
    methods:{
        handleCommand(res) {
            console.log(res)
            if (res === 'logout') {
                LOGOUT().then(()=>{
                    this.$message.success("退出成功")
                })
            }
        }
    }
}
</script>
<style lang="scss">
.top-bar {
    width: 100%;
    height: 60px;
    background: white;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 0 20px;
    box-sizing: border-box;
    .user-account{
        padding-right: 30px;
    }
}
</style>