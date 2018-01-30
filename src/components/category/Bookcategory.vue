<template>
    <div>
        <div class="select">
            <ul class="select-bar" v-if="mins">
                <!--<li class="active">全部</li>-->
                <v-touch tag="li" :class="{'active': index === minorSelected}" v-for="(minor, index) in mins"
                         :key="index" @tap="setMinor(minor,index)">{{minor}}
                </v-touch>
            </ul>
        </div>
        <section>
            <ul class="category2">
                <li v-for="item in typeList" @click="getBook(JSON.parse(item).link)">
                    <img :src="JSON.parse(item).img">
                    <div class="cont">
                        <p>{{JSON.parse(item).name}}</p>
                        <!--<div class="author">{{JSON.parse(item).author}}</div>-->
                        <div class="detail">{{JSON.parse(item).msg}}</div>
                    </div>
                </li>
            </ul>
        </section>
        <section>
            <p class="category-type"><span>推荐小说</span></p>
            <ul class="category">
                <li v-for="item in tuijianlist">
                    <router-link :to="'/book/' + JSON.parse(item).link">
                    <img :src="JSON.parse(item).img1" onerror="javascript:this.src='http://www.quanshuwang.com/modules/article/images/nocover.jpg'">
                    <p>{{JSON.parse(item).name}}</p>
                    <div>{{JSON.parse(item).type}}</div>
                    <div>{{JSON.parse(item).author}}</div>
                    </router-link>
                </li>
            </ul>
            <p class="category-type"><span>不容错过</span></p>
            <ul class="category">
                <li v-for="item in dontmisslist">
                    <img :src="JSON.parse(item).img" @click="getBook(JSON.parse(item).link)" onerror="javascript:this.src='http://www.quanshuwang.com/modules/article/images/nocover.jpg'">
                    <p>{{JSON.parse(item).name}}</p>
                    <div>{{JSON.parse(item).type}}</div>
                    <div>{{JSON.parse(item).author}}</div>
                </li>
            </ul>
        </section>
        <!--<section v-for="(item ,key, index) in category" :key="index">-->
        <!--<p class="category-type">{{categoryType[key]}}</p>-->
        <!--<ul>-->
        <!--<li v-for="(cat, index) in item" :key="index" @click="$router.push({path:'/bookcat/detail',query:{gender:key,major:cat.name}})">-->
        <!--<p class="category">{{cat.name}}</p>-->
        <!--<span class="book-count">{{cat.bookCount}}</span>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</section>-->
    </div>
</template>
<script>
    import api from '@/api/api'

    export default {
        name: 'Booklcat',
        data() {
            return {
                loading: false,
                // tuijianlist: null,
                // dontmisslist: null,
                mins: ['玄幻魔法', '武侠修真', '纯爱耽美', '都市言情', '职场校园', '穿越重生', '历史军事', '网游动漫', '恐怖灵异', '科幻小说', '美文名著'],
                minorSelected: null,
                typeList: []
            }
        },
        computed: {
            tuijianlist() {
                return this.$store.getters.tuijianlist
            },
            dontmisslist(){
                return this.$store.getters.dontmisslist
            }
        },
        methods: {
            setMinor: function (minor, index) {
                this.minorSelected = index
                this.minor = minor
                this.loading = true
                var that = this
                api.getCategoryByType(index).then(res => {
                    that.typeList = res.data
                    that.loading = false
                })
            },
            getBook(id) {
                this.$router.push('/book/' + id)
            }
        },
        created() {
            // this.loading = true
            // var that = this
            // api.getListByType(1).then(response => {
            //     that.tuijianlist = response.data
            //     that.loading = false
            // }).catch(err => {
            //     console.log(err)
            // })
            // api.getListByType(2).then(response => {
            //     that.dontmisslist = response.data
            //     that.loading = false
            // }).catch(err => {
            //     console.log(err)
            // })
        }
    }
</script>
<style scoped>
    /*ul {*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*flex-wrap: wrap;*/
    /*margin-left: 1rem;*/
    /*margin-right: 1rem;*/
    /*}*/

    /*li {*/
    /*width: 33.3%;*/
    /*text-align: center*/
    /*}*/

    /*.category {*/
    /*font-weight: bold;*/
    /*font-size: 0.8rem;*/
    /*margin-bottom: 0.1rem;*/
    /*margin-top: 0.8rem;*/
    /*line-height: 1.3rem;*/
    /*}*/
    /*.book-count {*/
    /*color: #959595;*/
    /*}*/

    .category-type {
        line-height: 2rem;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 1rem;
        margin-right: 1rem;
        /*border-bottom: 1px solid #f3eded;*/
    }

    .category-type span {
        color: #f17e43;
        padding-left: 8px;
        border-left: 3px solid #f17e43;
    }

    .select {
        position: fixed;
        top: 2rem;
        left: 0;
        background: #fff;
        z-index: 10;
    }

    .select-bar {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: nowrap;
        height: 2rem;
        width: 100vw;
        overflow-x: auto;
        overflow-y: hidden;
        border-bottom: 1px solid #f2f2f2;
    }

    .select-bar li {
        flex-shrink: 0;
        line-height: 2rem;
        padding-left: 0.6rem;
        padding-right: 0.6rem;
        font-size: 0.9rem;
    }

    .active {
        color: red;
    }

    section {
        margin-top: 2rem;
    }

</style>
<style>
    .category li {
        display: inline-block;
        width: 21.25%;
        margin-left: 3%;
        margin-top: 2%;
    }

    .category li img {
        box-shadow: 2px 2px 3px #eee;
        width: 4rem;
        height: 5rem;
        /*color:#241818;*/
    }

    .category li p {
        font-size: 0.8rem;
        margin: 0.1rem 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .category li div {
        margin: 0.1rem 0;
        font-size: 0.6rem;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .category2 li {
        width: 47%;
        margin-left: 3%;
        margin-top: 4%;
        display: inline-block;
    }

    .category2 img {
        float: left;
        width: 4rem;
        /*width:46%;*/
    }

    .category2 p {
        margin: 2px 0;
        font-size: 0.8rem;
    }

    .category2 .author {
        font-size: 0.6rem;
        color: #999;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
    }

    .category2 .detail {
        font-size: 0.6rem;
        color: #aca199;
    }

    .category2 .cont {
        width: 50%;
        float: right;
        height: 108px;
        overflow: hidden;
    }
</style>
