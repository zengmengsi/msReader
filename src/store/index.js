import Vue from 'vue'
import Vuex from 'vuex'
import {getters} from './getters'
import {actions} from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    weekRankId: '',
    monthRankId: '',
    totalRankId: '',
    headTitle: '', // 头部文字
    previousPosition: '分类',
    source: '', // 小说源
    backPath: {},
    book:{},
    bookInfo: {},
    tuijianlist: [],//推荐列表 type=1
    dontmisslist: []//不容错过列表 type=2
}

export function createStore() {
    return new Vuex.Store({
        state,
        getters,
        actions,
        mutations
    })
}