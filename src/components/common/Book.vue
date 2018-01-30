<template>
    <div v-title :data-title="book.name">
        <mt-header fixed>
            <div slot="left" @click="$router.go(backStep)">
                <mt-button icon="back">返回</mt-button>
            </div>
            <!--<router-link v-if="book" :to="/changeSource/+book._id" slot="right">-->
            <!--<mt-button>换源</mt-button>-->
            <!--</router-link>-->
        </mt-header>
        <section>
            <div class="book-info">
                <img v-if="book" :src="imgUrl"
                     onerror="javascript:this.src='public/static/errBook.png'">
                <div class="book-info-detail">
                    <p class="book-title" v-if="book">{{book.name}}</p>
                    <p class="book-author" v-if="book">{{book.author}}</p>
                    <p class="reader-info" v-if="book">
                        <span></span>{{book.num}}  |  {{book.type}} </p>
                </div>
            </div>
            <div class="book-operation">
                <mt-button class="btn" @click="followAction">{{isFollowed ? '取消收藏' : '收藏'}}</mt-button>
                <mt-button class="btn" @click="readBook">开始阅读</mt-button>
            </div>
            <!--<div class="book-status">-->
            <!--<div class="list-item">-->
            <!--<span class="item">追书人气</span>-->
            <!--<span v-if="book">{{book.latelyFollower}}</span>-->
            <!--</div>-->
            <!--<div class="list-item">-->
            <!--<span class="item">读者留存率</span>-->
            <!--<span v-if="book">{{book.retentionRatio}}%</span>-->
            <!--</div>-->
            <!--<div class="list-item">-->
            <!--<span class="item">日更新字数</span>-->
            <!--<span v-if="book">{{book.serializeWordCount}}</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="book-tag" v-if="book">-->
            <!--<span v-for="(tag, index) in book.tags" :key="index" class="tag">{{tag}}</span>-->
            <!--</div>-->
            <p class="book-intro" v-if="book">{{book.msg}}</p>
        </section>
    </div>
</template>

<script>
    import api from '@/api/api'
//    import moment from 'moment'
    import util from '@/utils/util'
    import {
        Indicator
    } from 'mint-ui'
    import {
        SET_CURRENT_SOURCE,
        SET_READ_BOOK
    } from '@/store/mutationsType'

//    moment.locale('zh-cn')
    export default {
        name: 'Book',
        data () {
            return {
                // book: null,
                isFollowed: false,
                backStep: -1
            }
        },
        asyncData ({ store, route: { params: { bookId }}}) {
            return store.dispatch('getBookInfo', { bookId })
        },
        filters: {
//            ago (time) {
//                return moment(time).fromNow()
//            }
        },
        computed: {
            // wordCount () {
            //     return parseInt(this.book.wordCount / 10000, 10)
            // },
            imgUrl () {
                return this.book.cover
            },
            book(){
                return this.$store.getters.book
            }
        },
        mounted() {
            // 判断是否收藏，收藏的话，直接从缓存中取
            let localShelf = util.getLocalStroageData('followBookList')
            this.isFollowed = !!(localShelf && localShelf[this.$route.params.bookId])
//             Indicator.open()
//             if (!!this.isFollowed) {
//                 this.book = localShelf[this.$route.params.bookId];
//                 api.getBook(this.$route.params.bookId).then(response => {
//                     this.book = response.data
//                     this.book.cover = response.data.img
// //                    let str = response.data.img.split(' ')[0]
// //                    this.book.cover = str.substring(0,str.length - 1)
//                     Indicator.close()
//                 })
//             } else {
//
//                 api.getBook(this.$route.params.bookId).then(response => {
//                     this.book = response.data
//                     this.book.cover = response.data.img
// //                    let str=response.data.img.split(' ')[0]
// //                    this.book.cover = str.substring(0,str.length - 1)
//                     /**
//                      * 设置默认小说源为优质书源
//                      */
//                     if (!this.$store.state.source) {
// //      api.getMixSource(this.$route.params.bookId).then(response => {
//                         this.$store.commit(SET_CURRENT_SOURCE, this.book.link)
// //      }).catch(err => {
// //        console.log(err)
// //      })
//                     }
//                     Indicator.close()
//                 }, err => {
//                     console.log(err)
//                 })
//             }
        },
        beforeRouteEnter (to, form, next) {
            next(vm => {
                vm.backStep = form.path.indexOf('readbook') !== -1 ? -3 : -1
            })
        },
        beforeRouteLeave (to, from, next) {
            /**
             *  页面离开需要清除source 除了去阅读页面和换源页面
             */
            if (to.path.indexOf('changeSource') !== -1 || to.path.indexOf('readbook') !== -1) {
                next()
            } else {
                this.$store.commit(SET_CURRENT_SOURCE, '')
                next()
            }
        },
        methods: {
            readBook () {
                this.$store.commit(SET_READ_BOOK, this.book)
                this.$router.push('/readbook/' + this.$route.params.bookId)
            },
            isFollowBook () {
                // 返回本地是否缓存（加入书架）
                let localShelf = util.getLocalStroageData('followBookList')
                this.isFollowed = !!(localShelf && localShelf[this.book.link])
            },
            followAction () {
                let localShelf = util.getLocalStroageData('followBookList') ? util.getLocalStroageData('followBookList') : {}
                if (this.isFollowed) {
                    // 删除该书籍在本地的缓存记录
                    delete localShelf[this.book.link]
                    // 重新保存
                    util.setLocalStroageData('followBookList', localShelf)
                    this.isFollowed = !this.isFollowed
                } else {
                    // 以bookId为键值，方便后续删除等操作
                    localShelf[this.book.link] = {
                        cover: this.book.cover,
                        name: this.book.name,
                        author: this.book.author,
                        bookid: this.$route.params.bookId
                    }
                    util.setLocalStroageData('followBookList', localShelf)
                    this.isFollowed = !this.isFollowed
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    section {
        box-sizing: border-box;
        padding-right: 1rem;
        padding-left: 1rem;
        padding-bottom: 0.2rem;
        padding-top: 3rem;
        width: 100vw;
    }

    section:first-child {
        margin-bottom: 1rem;
    }

    .book-info {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        width: 100%;
        height: 5rem;
    }

    .book-info img {
        width: 4rem;
        height: 5rem;
        border-radius: 6px;
    }

    .book-info .book-info-detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .book-info p {
        margin: 0;
        line-height: 1.5rem;
        margin-left: 0.5rem;
    }

    .book-operation {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .book-operation .btn {
        width: 8rem;
        background: #f17e43;
        border: none;
        color: #fff;
        font-size: 0.8rem;
        text-align: center;
        line-height: 2.2rem;
        border-radius: .1rem;
    }

    .book-operation .btn:focus {
        background: #f17e43;
        outline: none;
    }

    .book-status {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        padding-bottom: 1rem;
        border-bottom: 1px solid #f2f2f2;
    }

    .list-item {
        display: flex;
        flex-direction: column;
        width: 33%;
        text-align: center;
    }

    .item {
        font-size: .6rem;
        color: #807070;
    }

    .book-tag {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: .6rem 0 0;
        border-bottom: 1px solid #f2f2f2;
    }

    .tag {
        padding: .2rem .7rem;
        color: #fff;
        border-radius: .1rem;
        margin-bottom: .6rem;
        font-size: 0.6rem;
        margin-left: .4rem;
    }

    .tag:nth-child(1n) {
        background: burlywood;
    }

    .tag:nth-child(2n) {
        background: cadetblue;
    }

    .tag:nth-child(3n) {
        background: coral;
    }

    .tag:nth-child(4n) {
        background: cornflowerblue;
    }

    .reader-info,
    .book-author {
        font-size: 0.7rem;
    }

    .book-intro {
        margin-top: 1rem;
        text-indent: 2em;
        line-height: 1.4rem;
    }
</style>
