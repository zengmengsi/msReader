<template>
    <div>
        <div class="no-content" v-if="!books.length">
            <i class="iconfont">&#xe6a6;</i>
            <mt-button type="primary" class="add-book" v-if="!books.length" @click="$emit('addBook','分类')">添加小说
            </mt-button>
        </div>
        <ul class="category" v-if="books.length">
            <li v-for="item in books">
                <img :src="item.cover" @click="getBook(item.bookid)">
                <p>{{item.name}}</p>
                <div>{{item.author}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import util from '@/utils/util'
    import { SET_CURRENT_SOURCE, SET_READ_BOOK } from '@/store/mutationsType'

    //moment.locale('zh-cn')
    export default {
        name: 'Bookshelf',
        data () {
            return {
                books: []
            }
        },
        filters: {
            /**
             * 使用moment格式化时间
             */
//    ago (time) {
//      return moment(time).fromNow()
//    }
        },
        mounted () {
            let localShelf, that = this
            localShelf = util.getLocalStroageData('followBookList')
            this.getBookList().forEach((book) => {
                that.books.push(localShelf[book])
            })
        },
        methods: {
            /**
             * 返回追更新的书本id
             */
            getBookList () {
                let localShelf = util.getLocalStroageData('followBookList')
                let bookListArray = []
                for (let bookId in localShelf) {
                    bookListArray.push(bookId)
                }
                return bookListArray
            },
            getBook (id) {
                this.$router.push('/book/' + id)
            },
            readbook (book) {
                this.$store.commit(SET_READ_BOOK, book)
                this.$store.commit(SET_CURRENT_SOURCE, book.source)
                this.$router.push('/readbook/' + book._id)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .add-book {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .add-book:focus {
        outline: none;
    }

    .book-shelf {
        width: 100vw;
        overflow: hidden;
        box-sizing: border-box;
        padding: .5rem 0 0 .5rem;
    }

    .book-list-wrap {
        position: relative;
        height: 5rem;
        margin-bottom: .2rem;
    }

    .book-list {
        position: absolute;
        left: 0;
        width: 140vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: .2rem;
    }

    .book-list img {
        height: 5rem;
        float: left;
        margin-right: .4rem;
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 5rem;
        margin-left: .6rem;
        border-bottom: 1px solid #f2f2f2;
    }

    .info p {
        margin-top: .2rem;
        margin-bottom: .2rem;
    }

    .updated {
        color: #6d6666;
        font-size: .8rem;
    }

    .del-book-btn {
        color: #fff;
        background: red;
        width: 40vw;
        line-height: 5rem;
        text-align: center;
    }

    .read-book-history {
        display: flex;
        width: 100vw;
    }

    .no-content {
        margin-top: 30%;
        text-align: center;
    }

    .no-content i {
        font-size: 120px;
        color: #333333b8;
    }

    .no-content .mint-button--primary {
        background-color: #f17e43 !important;
    }

    .category {
        margin-top: 20px;
    }

    .category p {
        font-size: 0.8rem;
    }

    .category div {
        font-size: 0.6rem;
    }

    .category li {
        width: 28%;
        margin-left: 4%;
    }

    .category li img {
        /*height: 140px;*/
        box-shadow: 3px 3px 4px #eee;
    }
</style>
