<template>
    <div id="editfl">
        <h1>{{id?"编辑":"新建"}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
            <el-select v-model="model.categories" multiple>
                <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="标题">
            <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
            <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="model.body" ></vue-editor>
            </el-form-item>

            <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
    props:['id'],
    data(){
        return{
            model:{},
            categories:[]
        }
    },
    components: {
    VueEditor
    },
    methods:{
         async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            const formData = new FormData();
            formData.append("file", file);
            const res = await this.$http.post("upload", formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.imgUrl);
            resetUploader();
        },
        async save(){
            let res
            if(this.id){
                res = await this.$http.put(`restful/article/${this.id}`,this.model)
            }else{
                res = await this.$http.post('restful/article',this.model)
            }
            console.log(res)
            this.$message({
                type:'success',
                message:'保存成功'
            })
            this.$router.push('/article/lb')
        },
        async getoptions(){
            let res = await this.$http.get("restful/editlb")
            this.categories = res.data
        },
        async fetch(){
            let res = await this.$http.get(`restful/article/${this.id}`)
            this.model = res.data
        }
    },
    mounted(){
        this.getoptions()
        this.id && this.fetch()
    }
}
</script>