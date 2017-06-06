<template>
	<v-select :placeholder="placeholder" multiple @search="performSearch" :options="ajaxRes" v-model="value"></v-select>
</template>
<script type="text/babel">

	import vSelect from './Select.vue'

	export default{
		components:{
			'v-select': vSelect
		},
		data(){
			return {
				ajaxRes: [],
				previousRequest: null,
				value:null
			}
		},
		props:{
			value:{
				default:null
			},
			url:{
				type:String,
				required:true
			},
			placeholder:{
				type:String,
				default:''
			}
		},
		methods:{
			performSearch(search, loading){
				loading(true),
      			this.ajaxSearch(search, loading, this)
			},
			ajaxSearch: (search, loading, vm) => {
		      vm.$http.get(vm.url, {
		        before(request){

					if(vm.previousRequest)
						vm.previousRequest.abort();

					vm.previousRequest = request;
		          
		        },
		        params:{
		          query:search,
		          page:1, 
		          limit:100
		        }
		      }).then(res => {

		        var results = [];
		        for(var x = 0; x<res.data.length; x++){
		          results.push(vm.convertResult(res.data[x]))
		        }

		        vm.ajaxRes = results;
		        loading(false)
		      }, error =>{})
		    },
		    convertResult(r){
		      return {label: r.text ? r.text : r.name, value: r.id}
		    },
		}
	}
</script>