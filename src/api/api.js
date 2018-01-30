import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://www.aisbi.com/api'
  baseURL: 'http://localhost:3000/api'
})
export default {

  /**
     * 根据type获取推荐小说列表，
     * @returns {null}
     */
  getListByType (type) {
    return instance.get(`?type=${type}`)
  },

  /**
     * 根据id获取小说
     * @param {String} bookId 小说id
     */
  getBook (bookId) {
    return instance.get(`/pageInfo?link=${bookId}`)
  },

  /**
    * 获取小说章节
    * @param {String} sourceId 小说源id
    */
  getChapters (sourceId,page) {
          page=page*100-99;
    return instance.get(`/chapter?link=${sourceId}&page=${page}`)
  },
  /**
     * 获取小说章节内容
     * @param {String} chapterUrl 章节url
     */
  getBookChapterContent (link) {
    return instance.get(`/content?link=${link}`)
  },
  /**
   * 模糊搜索
   *  @param {String} searchWord 搜索内容
   */
  fuzzySearch (searchWord) {
    return instance.get(`/search?search=${searchWord}`)
  },
  /**
   * 获取分类的小说列表
   * @returns {null}
   *
   */
  getCategoryByType (type) {
    return instance.get(`/article?type=${type}&num=1`)
  },
    /**
     * 根据id获取排行榜
     * @returns {String} id为周榜id，月榜id，总榜id
     */
    getRankList (id) {
        return instance.get(`/top?topType=${id}`)
    }
}
