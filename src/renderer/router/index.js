import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/Header'
import Body from '../components/body/Body'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        header: Header,
        navigation: Navigation,
        body: Body,
        footer: Footer
      }
    }
  ]
})
