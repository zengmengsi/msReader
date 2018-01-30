import {
    SET_RANK,
    SET_BACK_POSITION,
    SET_CURRENT_SOURCE,
    SET_SEC_PATH,
    SET_THIRD_PATH,
    SET_HEAD_TITLE,
    SET_READ_BOOK,
    SET_BOOK_LIST,
    SET_BOOK
} from './mutationsType'

export default {
    [SET_RANK](state, rankDetail) {
        state.weekRankId = rankDetail._id
        state.monthRankId = rankDetail.monthRank
        state.totalRankId = rankDetail.totalRank
        state.headTitle = rankDetail.shortTitle
    },
    [SET_BACK_POSITION](state, position) {
        state.previousPosition = position
    },
    [SET_CURRENT_SOURCE](state, source) {
        state.source = source
    },
    [SET_SEC_PATH](state, prePath) {
        state.backPath.secPath = prePath
    },
    [SET_THIRD_PATH](state, prePath) {
        state.backPath.thirdPath = prePath
    },
    [SET_HEAD_TITLE](state, text) {
        state.headTitle = text
    },
    [SET_READ_BOOK](state, book) {
        state.bookInfo = book
    },
    [SET_BOOK](state, book) {
        state.book = book
    },
    [SET_BOOK_LIST](state, booklist) {
        state.dontmisslist = booklist.dontmisslist
        state.tuijianlist = booklist.tuijianlist
    }
}
