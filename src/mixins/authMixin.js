import Vue from 'vue'

import VueCookies from 'vue-cookie'
Vue.use(VueCookies)

module.exports = {
  data(){
    return{
      userAuthenticated: false,
      userPreferences:{}
    }
  },
  created(){
    var oauthToken = Vue.cookie.get('shareablee_oauth_token');
    console.log('oauthToken found ' + oauthToken);
    if(!oauthToken){
      this.redirectToLogin();
      return;
    }
    this.$http.headers.common['Authorization'] = 'Bearer ' + oauthToken;
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
        console.log(typeof res.data);
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
      // window.location.href = 'http://localhost:8000/login'
      console.log('redirect to login page');
    }

  }
}
