import Vue from 'vue'

import VueCookies from 'vue-cookie'
Vue.use(VueCookies)

import resource from 'vue-resource'
Vue.use(resource)

module.exports = {
  data(){
    return{
      userAuthenticated: false,
      userPreferences:{}
    }
  },
  created(){
    var oauthToken = Vue.cookie.get('shareablee_oauth_token');
    if(!oauthToken){
      this.redirectToLogin();
      return;
    }

    Vue.http.headers.common['Authorization'] = 'Bearer ' + oauthToken;
    this.getPreferences();
  },
  methods:{
    authorized(){
      var message = 'You must specify an authorized() method in your component!';
      console.error(message);
      alert(message);
    },
    getPreferences(){
      this.$http.get('me/preferences/').then(res => {
        if(!res.data || typeof(res.data) !== typeof {}) {
          this.redirectToLogin();
          return;
        }

        this.userPreferences = res.data;
        this.authorized();
      }, error=>{
        console.log('error ' + error.status)
        this.redirectToLogin();
      })
    },
    redirectToLogin(){
      //TODO use config somehow
      window.location.href = 'http://localhost:8000/login'
    }

  }
}
