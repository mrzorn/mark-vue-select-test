import Vue from 'vue'

import VueCookies from 'vue-cookie'
Vue.use(VueCookies)

module.exports = {
  data(){
    return{
      userAuthenticated: false,
      userPreferences:{},
      oauthToken:'',
    }
  },
  created(){
    var oauthToken = Vue.cookie.get('shareablee_oauth_token');

    if(!oauthToken){
      this.redirectToLogin();
      return;
    }
    this.oauthToken = oauthToken;
    this.getPreferences();
  },
  methods:{
    authorized(){
      var message = 'You must specify an authorized() method in your component!';
      console.error(message);
      alert(message);
    },
    getPreferences(){
      this.$http.get('me/preferences', {
        headers:{
          Authorization:'Bearer ' + this.oauthToken
        }
      }).then(res => {
        console.log(typeof res.data);
        if(!res.data || typeof(res.data) !== typeof {}) {
          this.redirectToLogin();
          return;
        }

        this.userPreferences = res.data;
        this.authorized();
      }, error=>{
        this.redirectToLogin();
      })
    },
    redirectToLogin(){
      var loginUrl = this.getLoginUrl();
      if(loginUrl == null){
        console.log('login url not specified')
        return;
      }

      window.location.href = loginUrl;
    },
    getLoginUrl(){
      return 'http://localhost:8000/login'
    }

  }
}
