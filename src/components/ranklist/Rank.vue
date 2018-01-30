<template>
	<div>
		<div>
			<!--<p>男生</p>-->
			<ul class="rank-type">
				<!--<li v-for="item in ranklist.male" v-if="!item.collapse" :key="item._id">-->
					<!--<RankItem :rankInfo="item"></RankItem>-->
				<!--</li>-->
				<v-touch tag="li" class="other-rank" @tap="getRanklist(0)">
					<div class="rank-item">
						<img src="../../assets/rank_other.svg"> 人气榜
					</div>
					<span class="angle">
						<img src="../../assets/up.svg" v-if="ranklinstIsShow['0']">
						<img src="../../assets/down.svg" v-else>
					</span>
				</v-touch>
				<ul v-show="ranklinstIsShow['0']">
                    <Booklist v-for="book in ranklist['0']" :book="book" :key="book.link"></Booklist>
				</ul>
                <v-touch tag="li" class="other-rank" @tap="getRanklist(1)">
                    <div class="rank-item">
                        <img src="../../assets/rank_other.svg"> 人气榜（完结）
                    </div>
                    <span class="angle">
						<img src="../../assets/up.svg" v-if="ranklinstIsShow['1']">
						<img src="../../assets/down.svg" v-else>
					</span>
                </v-touch>
                <ul v-show="ranklinstIsShow['1']">
                    <Booklist v-for="book in ranklist['1']" :book="book" :key="book.link"></Booklist>
                </ul>
                <v-touch tag="li" class="other-rank" @tap="getRanklist(2)">
                    <div class="rank-item">
                        <img src="../../assets/rank_other.svg"> 收藏榜
                    </div>
                    <span class="angle">
						<img src="../../assets/up.svg" v-if="ranklinstIsShow['2']">
						<img src="../../assets/down.svg" v-else>
					</span>
                </v-touch>
                <ul v-show="ranklinstIsShow['2']">
                    <Booklist v-for="book in ranklist['2']" :book="book" :key="book.link"></Booklist>
                </ul>
                <v-touch tag="li" class="other-rank" @tap="getRanklist(3)">
                    <div class="rank-item">
                        <img src="../../assets/rank_other.svg"> 收藏榜（完结）
                    </div>
                    <span class="angle">
						<img src="../../assets/up.svg" v-if="ranklinstIsShow['2']">
						<img src="../../assets/down.svg" v-else>
					</span>
                </v-touch>
                <ul v-show="ranklinstIsShow['3']">
                    <Booklist v-for="book in ranklist['3']" :book="book" :key="book.link"></Booklist>
                </ul>
                <v-touch tag="li" class="other-rank" @tap="getRanklist(4)">
                    <div class="rank-item">
                        <img src="../../assets/rank_other.svg"> 推荐榜
                    </div>
                    <span class="angle">
						<img src="../../assets/up.svg" v-if="ranklinstIsShow['4']">
						<img src="../../assets/down.svg" v-else>
					</span>
                </v-touch>
                <ul v-show="ranklinstIsShow['4']">
                    <Booklist v-for="book in ranklist['4']" :book="book" :key="book.link"></Booklist>
                </ul>
                <v-touch tag="li" class="other-rank" @tap="getRanklist(5)">
                    <div class="rank-item">
                        <img src="../../assets/rank_other.svg"> 推荐榜（完结）
                    </div>
                    <span class="angle">
						<img src="../../assets/up.svg" v-if="ranklinstIsShow['5']">
						<img src="../../assets/down.svg" v-else>
					</span>
                </v-touch>
                <ul v-show="ranklinstIsShow['5']">
                    <Booklist v-for="book in ranklist['4']" :book="book" :key="book.link"></Booklist>
                </ul>
			</ul>
			<!--<p>女生</p>-->
			<!--<ul class="rank-type">-->
				<!--<li v-for="item in ranklist.female" v-if="!item.collapse" :key="item._id">-->
					<!--<RankItem :rankInfo="item"></RankItem>-->
				<!--</li>-->
				<!--<v-touch tag="li" class="other-rank" @tap="showMoreFemaleRank">-->
					<!--<div class="rank-item">-->
						<!--<img src="../../assets/rank_other.svg"> 别人家的排行榜-->
					<!--</div>-->
					<!--<span class="angle">-->
						<!--<img src="../../assets/up.svg" v-if="femaleOtherRankIsShow">-->
						<!--<img src="../../assets/down.svg" v-else>-->
					<!--</span>-->
				<!--</v-touch>-->
				<!--<ul v-show="femaleOtherRankIsShow" class="rank-type">-->
					<!--<li v-for="item in ranklist.female" v-if="item.collapse" :key="item._id">-->
						<!--<RankItem :rankInfo="item"></RankItem>-->
					<!--</li>-->
				<!--</ul>-->
			<!--</ul>-->
		</div>
	</div>
</template>
<script>
//import RankItem from './RankItem'
import Booklist from '@/components/common/Booklist'
import api from '@/api/api'
import { Indicator } from 'mint-ui'
export default {
  name: 'Rank',
  components: {
//    RankItem
      Booklist
  },
  data () {
    return {
      ranklist: {0:[],2:[],4:[],1:[],3:[],5:[]},
      ranklinstIsShow:{0:false,2:false,4:false,1:false,3:false,5:false},
      maleOtherRankIsShow: false,
      femaleOtherRankIsShow: false
    }
  },
  created () {
//    api.getRankType().then(response => {
//      this.ranklist = response.data
//    }).catch(err => {
//      console.log(err)
//    })
  },
  methods: {
    showMoreMaleRank () {
      this.maleOtherRankIsShow = !this.maleOtherRankIsShow
    },
    getRanklist(id){
        this.ranklinstIsShow[id]=!this.ranklinstIsShow[id]
        if(this.ranklist[id].length>0){
            return;
        }
        Indicator.open()
        api.getRankList(id).then(response => {
            this.ranklist[id] = response.data
            // 首次加载前20条数据
//        this.books = response.data.books.slice(0, 20)
            Indicator.close()
        }).catch(error => {
            Indicator.close()
            console.log(error)
        })
    },
    showMoreFemaleRank () {
      this.femaleOtherRankIsShow = !this.femaleOtherRankIsShow
    },
    changeHeadText () {
      this.$store.commit('setHeadText', '排行榜')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.changeHeadText()
    })
  }
}
</script>

<style scoped>
li {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	font-size: .8rem;
	line-height: 2.4rem;
	margin-left: 1rem;
	margin-right: 1rem;
	border-bottom: .01rem solid #f3f3f3;
}

.fa-icon {
	height: 1rem;
	width: 1rem;
	margin-right: .5rem;
}

p {
	background-color: #f9f0f0;
	margin: 0;
	padding: .5rem 0 .5rem 1rem;
}

.other-rank {
	justify-content: space-between;
}

.rank-type img {
	width: 1.2rem;
	margin-right: 0.5rem;
	vertical-align: middle;
}

.angle img {
	width: 0.8rem;
}
</style>
