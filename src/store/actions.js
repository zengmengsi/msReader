import api from '../api/api'
import {SET_READ_BOOK} from "./mutationsType";

export const actions = {
    /**
     * 获取推荐列表\不容错过
     * @param commit
     */
    getCategoryByType({commit, state}) {
        let tuijianlist = api.getListByType(1)
        let dontmisslist = api.getListByType(2)
        return Promise.all([tuijianlist, dontmisslist]).then(function (values) {
            commit('SET_BOOK_LIST', {tuijianlist: values[0].data, dontmisslist: values[1].data})
        })
    },
    getBookInfo({commit, state},ids) {
        return api.getBook(ids.bookId).then(res=>{
            res.data.cover = res.data.img
            commit('SET_BOOK',res.data)
        })
    }
}