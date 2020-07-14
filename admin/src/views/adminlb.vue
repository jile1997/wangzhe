<template>
    <div id="catlb">
        <h1>管理员列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="220">
            </el-table-column>

            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="$router.push(`/admin/fl/${scope.row._id}`)">编辑</el-button>
                <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
            </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            items:[]
        }
    },
    methods:{
        async getitems(){
            let res = await this.$http.get('restful/adminuser')
            this.items = res.data
        },
        async remove(row){
        // console.log(row)
        this.$confirm(`是否要删除 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let res = await this.$http.delete(`restful/adminuser/${row._id}`)
          this.$message({
            type: 'success',
            message: res.data.msg
          });
          this.getitems()
        })
      }
    },
    created(){
        this.getitems()
    }
}
</script>
