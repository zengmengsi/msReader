<template>
	<div id="container" class="container">
		<mt-header fixed :title="$store.state.bookInfo.title" v-if="operation" class="head">
			<router-link :to="/book/+$store.state.bookInfo.link" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<v-touch class="content" @tap="operationAction($event)" :class="[bgcolorClass,{'night-mode':nightMode}]">
			<h3>{{bookChaptersContent.links}}</h3>
			<article v-html="bookChaptersBody"></article>
		</v-touch>
		<div class="menu" v-if="operation">
			<v-touch class="menu-btn" v-if="nightMode" @tap="changeMode">
				<img src="../../assets/sun.svg">
				<span>日间模式</span>
			</v-touch>
			<v-touch class="menu-btn" @tap="changeMode" v-else>
				<img src="../../assets/moon.svg">
				<span>夜间模式</span>
			</v-touch>
			<v-touch class="menu-btn" @tap="isShowSet=true">
				<img src="../../assets/setting.svg">
				<span>设置</span>
			</v-touch>
			<v-touch class="menu-btn" @tap="showChapter">
				<img src="../../assets/list.svg">
				<span>目录</span>
			</v-touch>
		</div>
		<!--阅读设置-->
		<div class="read-setting" v-show="isShowSet">
            <div class="setting-item">
                <v-touch tag="span" @tap="decreaseFont">
                    <i class="iconfont">&#xe605;</i>
                </v-touch>
                <v-touch tag="span" @tap="nomalFont">
                    <i class="iconfont">&#xe8eb;</i>
                </v-touch>
                <v-touch tag="span" @tap="increaseFont">
                    <i class="iconfont">&#xe603;</i>
                </v-touch>
            </div>
            <div class="line1pix"></div>
            <div class="setting-item" style="height: 3rem">
                <v-touch tag="span" @tap="bgcolorClass='huyan'">
                    <div class="bg-color" style="background-color: #faf6ed"></div>
                    <div class="bg-text">护眼</div>
                </v-touch>
                <v-touch tag="span" @tap="bgcolorClass='qinxin'">
                    <div class="bg-color" style="background-color: #ceebcf"></div>
                    <div class="bg-text">清新</div>
                </v-touch>
                <v-touch tag="span" @tap="bgcolorClass='haijun'">
                    <div class="bg-color" style="background-color: #09598c"></div>
                    <div class="bg-text">海军蓝</div>
                </v-touch>
                <v-touch tag="span" @tap="bgcolorClass='zhihuang'">
                    <div class="bg-color" style="background-color: #dec79d"></div>
                    <div class="bg-text">纸黄色</div>
                </v-touch>
            </div>
            <div class="line1pix"></div>
            <div class="setting-item">
                <v-touch tag="span" @tap="curlineheight+=0.2;setLineHeight()">
                    <i class="iconfont">&#xe608;</i>
                </v-touch>
                <v-touch tag="span" @tap="curlineheight=1.5;setLineHeight()">
                    <i class="iconfont">&#xe607;</i>
                </v-touch>
                <v-touch tag="span" @tap="curlineheight-=0.2;setLineHeight()">
                    <i class="iconfont">&#xe602;</i>
                </v-touch>
            </div>
	        </div>
		<!--目录-->
		<div class="chapter-list" v-show="isShowChapter" v-scroll="onScroll">
			<div class="chapter-contents">
				<p>{{$store.state.bookInfo.name}}：目录</p>
				<v-touch tag="span" class="chapter-sort" @tap="descSort">
					<img src="../../assets/down.svg" v-if="!chapterDescSort">
					<img src="../../assets/up.svg" v-else>
				</v-touch>
			</div>
			<ul id="chapter-list" v-if="loadedChapters">
				<v-touch tag="li" v-for="(item, index) in loadedChapters" :key="index" @tap="jumpChapter(index)">{{JSON.parse(item).name}}</v-touch>
			</ul>
		</div>
	</div>
</template>

<script>
import api from '@/api/api'
import util from '@/utils/util'
import { Indicator, MessageBox, Toast } from 'mint-ui'

export default {
  name: 'ReadBook',
  data () {
    return {
      bookChapter: {chapters:[]},
      bookChaptersContent: '',
      loadedChapters: [], // 缓存滚动加载的章节列表
      loadPages: 1, // 滚动加载的记次
      firstLoad: true, // 首次加载标识符
      operation: false, // 显示操作界面标识符
      currentChapter: 0,
      nightMode: false, // 夜间/日间模式却换
      isShowChapter: false, // 是否显示目录
      chapterDescSort: false, // 是否降序排列
      isShowSet: false,
      curfontsize: 1, //当前字体大小
      curlineheight: 1.5, // 行间距
      bgcolorClass: 'test', //设置背景色样式
    }
  },
  computed: {
    bookChaptersBody () {
      return this.bookChaptersContent && this.bookChaptersContent.msg.replace(/\n/g, '<br/>&nbsp&nbsp')
    }
  },
  beforeCreate () {
    Indicator.open('加载中')
  },
  created () {
      this.getChapterList();
  },
  // mounted () {
  //     debugger
  //     let readRecord = util.getLocalStroageData('followBookList');
  //     let scrollTop = readRecord ? readRecord[this.$route.params.bookId].readPos : 0;
  //     if(this.firstLoad && scrollTop){
  //         document.getElementById('container').scrollTop = scrollTop;
  //     }else{
  //         this.firstLoad = false;
  //         document.getElementById('container').scrollTop = 0;
  //     }
  // },
  /**
     * watch 不知道是发生在updated之前还是之后
     */
  watch: {
    'currentChapter': 'getBookChapterContent'
  },
  methods: {
    getChapterList(){
        let readRecord = util.getLocalStroageData('followBookList')
        api.getChapters(this.$route.params.bookId,this.loadPages).then(response => {
            Indicator.close()
            if(response.data.length===0){
                return;
            }
            this.bookChapter.chapters=this.bookChapter.chapters.concat(response.data)
            this.currentChapter = readRecord && readRecord[this.$route.params.bookId] && readRecord[this.$route.params.bookId].chapter ? readRecord[this.$route.params.bookId].chapter : 0
            // 默认取前50章节
            this.loadedChapters = this.loadedChapters.concat(this.bookChapter.chapters.slice(50 * (this.loadPages-1), 50))

            if(this.loadPages===1){
                this.getBookChapterContent()
            }
        }).catch(err => {
            console.log(err)
            MessageBox.alert('加载失败，请重试').then(() => {
                this.$router.push('/book/' + this.$route.params.bookId)
            })
        })
    },
    getBookChapterContent () {
      let lastChapter = this.currentChapter >= this.bookChapter.chapters.length - 1 ? this.bookChapter.chapters.length - 1 : this.currentChapter
      Indicator.open('加载中')
      // 无论正序还是倒叙 当前章节字段都是 按正序的序号
      api.getBookChapterContent(JSON.parse(this.bookChapter.chapters[lastChapter]).link).then(response => {
        this.bookChaptersContent = response.data
        document.getElementById('container').scrollTop = 0
        Indicator.close()
        this.recordReadHis();//记录阅读位置
      }).catch(err => {
        Indicator.close()
        MessageBox.alert('加载失败，请重试').then(() => {
          this.$router.push('/book/' + this.$route.params.bookId)
        })
        console.log(err)
      })
    },
    operationAction ($event) {
      // 判断点击位置 执行不同操作
      let el = $event.pointers[0] || $event.srcEvent
      if (this.isShowChapter) {
        this.isShowChapter = false
        this.isShowSet = false
        return
      }
      if (this.isShowSet) {
        this.isShowSet = false
        return
      }
      let screenHeight = document.body.clientHeight
      let gap = document.body.clientHeight / 3
      let targetPos = el.clientY
      let contanierEle = document.getElementById('container')
      if (targetPos > 0 && targetPos < gap) {
        this.operation = false
        contanierEle.scrollTop -= screenHeight
      }
      if (targetPos > gap && targetPos < screenHeight - gap) {
        this.operation = !this.operation
      }
      if (screenHeight - gap < targetPos && targetPos < screenHeight) {
        this.operation = false
        // 判断是否到底部
        if (contanierEle.scrollHeight === contanierEle.scrollTop + screenHeight) {
          if (this.currentChapter >= this.bookChapter.chapters.length - 1) {
            Toast('这已经是最新的章节了~')
            return
          }
          // 当前章节加1
          this.currentChapter += 1
        }
        contanierEle.scrollTop += screenHeight
      }
    },
    // 切换日间/夜间模式
    changeMode () {
      this.nightMode = !this.nightMode
    },
    // 显示目录
    showChapter () {
      this.isShowChapter = true
    },
    // 点击目录，跳转章节
    jumpChapter (index) {
      this.currentChapter = this.chapterDescSort ? this.bookChapter.chapters.length - index - 1 : index
      this.isShowChapter = false
      this.operation = false
    },
    // 记录阅读历史
    recordReadHis () {
      //收获的小说才会记录阅读位置，不收藏的不记录
      let readRecord = util.getLocalStroageData('followBookList') || {}
      if (readRecord[this.$route.params.bookId]) {
        readRecord[this.$route.params.bookId] = {
          cover: this.$store.state.bookInfo.cover,
          title: this.$store.state.bookInfo.name,
          author: this.$store.state.bookInfo.author,
          bookid:this.$route.params.bookId,
          chapter: this.currentChapter,
          readPos: document.getElementById('container').scrollTop
        }
        util.setLocalStroageData('followBookList', readRecord)
      }
//      let readRecord = util.getLocalStroageData('followBookList') || {}
//      readRecord[this.$route.params.bookId] = {
//        cover: this.$store.state.bookInfo.cover,
//        title: this.$store.state.bookInfo.title,
//        chapter: this.currentChapter,
//        source: this.$store.state.source,
//        readPos: document.getElementById('container').scrollTop
//      }
//      util.setLocalStroageData('followBookList', readRecord)
    },
    // 切换章节查看模式
    descSort () {
      let bookChapterCount = this.bookChapter.chapters.length
      document.querySelector('.chapter-list').scrollTop = 0
      this.chapterDescSort = !this.chapterDescSort
      this.loadedChapters = this.chapterDescSort
        ? this.bookChapter.chapters.slice(bookChapterCount - 50, bookChapterCount).reverse()
        : this.bookChapter.chapters.slice(0, 50)
      this.loadPages = 1
    },
    // 滚动加载到底部，显示更多
    onScroll: function (e, position) {
      let bookChapterCount = this.bookChapter.chapters.length
      if (position.scrollTop > 1300 * this.loadPages) {
        if (this.chapterDescSort) {
          this.loadedChapters = this.loadedChapters.concat(this.bookChapter.chapters.slice(bookChapterCount - 50 * (this.loadPages + 1), bookChapterCount - 50 * this.loadPages).reverse())
        } else {
          this.loadedChapters = this.loadedChapters.concat(this.bookChapter.chapters.slice(50 * this.loadPages, 50 * (this.loadPages + 1)))
        }
        this.loadPages++
          this.getChapterList();
      }
    },
    /***
         * 增加字体
         */
    increaseFont () {
      this.curfontsize += 0.1
      document.getElementsByTagName('article')[0].style.fontSize = this.curfontsize + 'rem'
    },
    /**
         * 减小字体
         */
    decreaseFont () {
      this.curfontsize -= 0.1
      document.getElementsByTagName('article')[0].style.fontSize = this.curfontsize + 'rem'
    },
      /**
       * 正常字体
       */
     nomalFont (){
          this.curfontsize=1
          document.getElementsByTagName('article')[0].style.fontSize = this.curfontsize + 'rem'
     },
      /**
       * 设置行间距
       */
     setLineHeight(){
          document.getElementsByTagName('article')[0].style.lineHeight = this.curlineheight + 'rem'
     }
  },



//  /**
//     * 对未加入书架的小说，提示是否加入书架
//     */
//  beforeRouteLeave (to, from, next) {
//    let readRecord = util.getLocalStroageData('followBookList') || {}
//    if (!readRecord[this.$route.params.bookId]) {
//      MessageBox.confirm('是否将小说加入书架？').then(() => {
//        this.recordReadHis()
//        Toast('添加成功！')
//        next()
//      }, () => {
//        next()
//      })
//    } else {
//      this.recordReadHis()
//      next()
//    }
//  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
	background: #dad9d4;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	color: #000;
}

.content {
	min-height: 100vh;
}

article {
	font-size: 1.0rem;
	line-height: 1.5rem;
	padding: 0 0.5rem;
}

h3 {
	text-align: center;
	margin-top: 0;
}

.head {
	background: #000 !important;
	color: #f3e7e7;
}

.menu {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #000;
	height: 2.5rem;
	width: 100vw;
}

.menu img {
	color: #fff;
	width: 1rem;
	height: 1rem;
	align-self: center;
}

.menu-btn {
	display: flex;
	flex-direction: column;
	justify-content: center;
	color: #f3e7e7;
	text-align: center
}

.menu-btn i {
	font-size: 1.6rem;
}

.menu-btn span {
	font-size: 0.6rem;
}

.arrow-left {
	position: absolute;
	left: 1rem;
	line-height: 3rem;
	font-size: 1.5rem;
}

.chapter-list {
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	overflow: auto;
	background: #fff;
	width: 80vw;
	z-index: 10;
}

.chapter-list ul {
	margin-top: 2.5rem;
}

.chapter-list li {
	padding-left: 1rem;
	line-height: 2rem;
	border-bottom: 1px solid #f2f2f2;
}

.chapter-contents {
	position: fixed;
	top: 0;
	left: 0;
	width: 80vw;
	background: #fff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 1rem;
	box-sizing: border-box;
}

.chapter-sort {
	margin-right: 1.5rem;
	align-self: center;
}

.chapter-sort img {
	width: 1rem;
	height: 1rem;
}
    .read-setting{
        position: fixed;
        bottom: -1px;
        height: 7rem;
        width: 100%;
        text-align: center;
        background-color: #fafafa;
    }
    .setting-item{
        height: 2rem;
        display: flex;
        line-height: 2rem;
    }
    .setting-item span{
        flex-grow: 1;
    }
    .line1pix{
        height: 1px;
        background-color: #ccc;
        transform: scaleY(0.5);
    }
    .bg-color{
        height: 30px;
        width: 30px;
        background-color: #ccc;
        border-radius: 15px;
        margin: 4px auto;
    }
    .bg-text{
        font-size: 0.6rem;
        color: #333;
        line-height: 1rem;
    }
    .huyan{
        background-color: #faf6ed;
        color: #333;
    }
    .qinxin{
        background-color: #ceebcf;
        color: #333;
    }
    .haijun{
        background-color: #09598c;
        color: #f0f0f0;
    }
    .zhihuang{
        background-color: #dec79d;
        color: #220700;
    }
.night-mode {
    background: #383434;
    color: #807d7d;
}
</style>
