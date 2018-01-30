import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Home from '@/components/Home.vue'
// import Book from '@/components/common/Book'
// const Home = resolve => require(['@/components/Home'], resolve)
// const Ranklist = resolve => require(['@/components/ranklist/Ranklist'], resolve)
// const RanklistDetail = resolve => require(['@/components/ranklist/RanklistDetail'], resolve)
const Book = resolve => require(['@/components/common/Book'], resolve)
const ReadBook = resolve => require(['@/components/book/ReadBook'], resolve)
// const BookcatDetail = resolve => require(['@/components/category/BookcatDetail'], resolve)
// const ChangeSource = resolve => require(['@/components/book/ChangeSource'], resolve)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
        { path: '/home/:page(\\d+)?', component: Home },
        { path: '/', redirect: '/home' },
        {
              path: '/book/:bookId',
              name: 'book',
              component: Book
        },
        {
              path: '/readbook/:bookId',
              name: 'readbook',
              component: ReadBook
        }
      // {
      //   path: '/',
      //   name: 'home',
      //   component: Home
      // }
      // , {
      //   path: '/bookcat/detail',
      //   name: 'bookcatDetail',
      //   component: BookcatDetail
      // }, {
      //   path: '/readbook/:bookId',
      //   name: 'readbook',
      //   component: ReadBook
      // }, {
      //   path: '/book/:bookId',
      //   name: 'book',
      //   component: Book
      // }, {
      //   path: '/changeSource/:bookId',
      //   name: 'changeSource',
      //   component: ChangeSource
      // }, {
      //   path: '/ranklist',
      //   name: 'ranklist',
      //   redirect: '/ranklist/weekRank',
      //   component: Ranklist,
      //   children: [{
      //     path: '/ranklist/*',
      //     name: 'RanklistDetail',
      //     component: RanklistDetail
      //   }]
      // }
    ]
  })
}
