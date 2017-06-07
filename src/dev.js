import Vue from 'vue'
import CategorySelector from './components/CategorySelector'
import MappingSelector from './components/MappingSelector'
import vSelect from './components/Select.vue'
import countries from 'docs/data/advanced.js'
import debounce from 'lodash/debounce'
import resource from 'vue-resource'

Vue.use(resource)

Vue.component('category-selector', CategorySelector)
Vue.component('mapping-selector', MappingSelector)
Vue.component('v-select', vSelect)

Vue.config.devtools = true

Vue.http.options.root = 'http://localhost:8000/api/v1/'

Vue.http.headers.common['Authorization'] = 'Bearer VgSxAYjvWdRyMF0QHW9svjNtSnS1sy';
Vue.http.headers.common['Content-Type'] = 'application/json';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    categories:[],
    mappings:[],
    loaded:false
  },
  methods: {
    submitCategories(){
      alert('You done selected ' + this.categories.length + ' categories and ' + this.mappings.length + ' mappings');
    },
    convertCategory(cat){
      return {label: cat.text ? cat.text : cat.name, value: cat.id}
    },
    getPreferences(){
      this.$http.get('me/preferences/').then(res =>{
        if(res.data.default_category)
          this.categories.push(this.convertCategory(res.data.default_category))

        if(res.data.default_mapping)
          this.mappings.push(this.convertCategory(res.data.default_mapping))

        this.loaded = true
      })
    }
  },
  created(){
    this.getPreferences(); 
  },
})
