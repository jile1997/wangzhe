<template>
    <div id="editfl">
        <h1>{{id?"编辑":"新建"}}分类</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
            <el-select v-model="model.parent">
                <el-option
                v-for="item in parentoption"
                :key="item._id"
                :label="item.name"
                :value="item._id">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props:['id'],
    data(){
        return{
            model:{},
            parentoption:[]
        }
    },
    methods:{
        async save(){
            let res
            if(this.id){
                res = await this.$http.put(`restful/editlb/${this.id}`,this.model)
            }else{
                res = await this.$http.post('restful/editlb',this.model)
            }
            console.log(res)
            this.$message({
                type:'success',
                message:'保存成功'
            })
            this.$router.push('/cat/lb')
        },
        async getoptions(){
            let res = await this.$http.get("restful/editlb")
            this.parentoption = res.data
        },
        async fetch(){
            let res = await this.$http.get(`restful/editlb/${this.id}`)
            this.model = res.data
        }
    },
    mounted(){
        this.getoptions()
        this.id && this.fetch()
    }
}
</script>