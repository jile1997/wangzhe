<template>
    <div id="editfl">
        <h1>{{id?"编辑":"新建"}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs value="jichu" type="border-card">

        <el-tab-pane label="基础信息" name="jichu">

                    <el-form-item label="名称">
                    <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                    <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :on-success="onupload">
                        <img v-if="model.avatar" :src="model.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                    <el-select v-model="model.categories" multiple>
                        <el-option v-for="(item,index) in cate" :key="index" :label="item.name"
                        :value="item._id">

                        </el-option>
                    </el-select>
                    </el-form-item>

                    <el-form-item label="难度">
                    <el-rate style="margin-top:0.6rem" :allow-half="true"  show-score :max="9" v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                    <el-rate style="margin-top:0.6rem" :allow-half="true"  show-score :max="9" v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                    <el-rate style="margin-top:0.6rem" :allow-half="true"  show-score :max="9" v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                    <el-rate style="margin-top:0.6rem" :allow-half="true"  show-score :max="9" v-model="model.scores.survive"></el-rate>
                    </el-form-item>

                    <el-form-item label="顺风出装">
                    <el-select v-model="model.items1" multiple>
                        <el-option v-for="(item,index) in items" :key="index" :label="item.name"
                        :value="item._id">

                        </el-option>
                    </el-select>
                    </el-form-item>

                    <el-form-item label="逆风出装">
                    <el-select v-model="model.items2" multiple>
                        <el-option v-for="(item,index) in items" :key="index" :label="item.name"
                        :value="item._id">

                        </el-option>
                    </el-select>
                    </el-form-item>

                    <el-form-item label="使用技巧">
                    <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                <el-form-item label="对抗技巧">
                    <el-input type="textarea" v-model="model.battleTips"></el-input>
                </el-form-item>
                <el-form-item label="团战思路">
                    <el-input type="textarea" v-model="model.teamTips"></el-input>
                </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="jineng">
            <el-button size="small" @click="model.skills.push({})"> <i class="el-icon-plus"></i>添加技能</el-button>
            <el-row type="flex" style="flex-wrap:wrap">
                <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
                   <el-form-item label="名称">
                       <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="图标">
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :on-success="res => $set(item,'icon',res.imgUrl)">
                        <img v-if="item.icon" :src="item.icon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="描述">
                       <el-input v-model="item.description" type="textarea"></el-input>
                    </el-form-item>
                     <el-form-item label="小提示">
                       <el-input v-model="item.tips" type="textarea"></el-input>
                    </el-form-item>   
                    <el-form-item>
                       <el-button size="small" type="danger" @click="model.skills.splice(index,1)">删除</el-button>
                    </el-form-item>                
                </el-col>
            </el-row>
        </el-tab-pane>
        </el-tabs>


            <el-form-item style="margin-top:1rem">
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
            model:{
                name: "",
                avatar: "",
                scores:{
                    difficult:0
                },
                skills: []
            },
            cate:[],
            items:[]
        }
    },
    methods:{
        async save(){
            let res
            if(this.id){
                res = await this.$http.put(`restful/heros/${this.id}`,this.model)
            }else{
                res = await this.$http.post('restful/heros',this.model)
            }
            console.log(res)
            this.$message({
                type:'success',
                message:'保存成功'
            })
            this.$router.push('/hero/lb')
        },
         async getoptions(){
            let res = await this.$http.get("restful/editlb")
            this.cate = res.data
        },
        async fetch(){
            let res = await this.$http.get(`restful/heros/${this.id}`)
            this.model = Object.assign({},this.model,res.data)
        },
        async getitems(){
            let res = await this.$http.get('restful/itemlb')
            this.items = res.data
        },
        onupload(res){
            // this.$set(this.model,'icon',res.imgUrl)
            this.model.avatar = res.imgUrl
        }
    },
    mounted(){
        this.getoptions()
        this.id && this.fetch()
        this.getitems()
    }
}
</script>

<style>
 
</style>