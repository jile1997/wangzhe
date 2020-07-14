<template>
  <el-container style="height: 100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1','2','3']" :default-active="$route.path">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>内容管理</template>

        <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/item/fl">新建物品</el-menu-item>
          <el-menu-item index="/item/lb">物品列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">英雄</template>
          <el-menu-item index="/hero/fl">新建英雄</el-menu-item>
          <el-menu-item index="/hero/lb">英雄列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="2">
         <template slot="title"><i class="el-icon-s-home"></i>运营管理</template>
                  <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/article/fl">新建文章</el-menu-item>
          <el-menu-item index="/article/lb">文章列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">广告</template>
          <el-menu-item index="/ads/fl">新建广告位</el-menu-item>
          <el-menu-item index="/ads/lb">广告位列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
         <template slot="title"><i class="el-icon-s-tools"></i>系统管理</template>
                  <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/edit/fl">新建分类</el-menu-item>
          <el-menu-item index="/cat/lb">分类列表</el-menu-item>
        </el-menu-item-group>
          <el-menu-item-group>
          <template slot="title">管理员</template>
          <el-menu-item index="/admin/fl">新建管理员</el-menu-item>
          <el-menu-item index="/admin/lb">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>admin</span>
    </el-header>
    
    <el-main>

      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>