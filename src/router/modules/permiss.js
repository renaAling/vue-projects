export default [
    {
      path: "userList",
      name: "userList",
      meta: {
          title: "用户管理列表"
      },
      component: () => import(/* webpackChunkName: "permiss" */ "@view/permiss/UserOption.vue")
    },
    {
      path: "userAdd",
      name: "userAdd",
      meta: {
        title: "用户管理新增"
      },
      component: () => import(/* webpackChunkName: "permiss" */ "@view/permiss/UserOptionAdd.vue")
    },
    {
        path: "userEdit",
        name: "userEdit",
        component: () => import(/* webpackChunkName: "permiss" */ "@view/permiss/UserOptionEdit.vue")
    },
    {
        path: "operatingRoleList",
        name: "operatingRoleList",
        meta: {
          title: "PC操作角色列表"
        },
        component: () => import(/* webpackChunkName: "permiss" */ "@view/roles/PcRolesList.vue")
    }
]