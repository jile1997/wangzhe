<template>
    <div id="editfl">
        <h1>{{id?"编辑":"新建"}}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
 
            <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
            <el-upload
                class="avatar-uploader"
                :action= "uploadUrl"
                :show-file-list="false"
                :headers="getAuthHeaders()"
                :on-success="onupload">
                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
            model:{}
        }
    },
    methods:{
        async save(){
            let res
            if(this.id){
                res = await this.$http.put(`restful/itemlb/${this.id}`,this.model)
            }else{
                res = await this.$http.post('restful/itemlb',this.model)
            }
            console.log(res)
            this.$message({
                type:'success',
                message:'保存成功'
            })
            this.$router.push('/item/lb')
        },

        async fetch(){
            let res = await this.$http.get(`restful/itemlb/${this.id}`)
            this.model = res.data
        },
        onupload(res){
            this.$set(this.model,'icon',res.imgUrl)
        }
    },
    mounted(){

        this.id && this.fetch()
    }
}
</script>

<style>
</style>