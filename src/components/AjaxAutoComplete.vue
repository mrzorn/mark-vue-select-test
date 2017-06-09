<template>
	<v-select :placeholder="placeholder" multiple @search="performSearch" :loadNextPage="loadNextPage" :options="ajaxRes" v-model="selected"></v-select>
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
				previousRequest: null
			}
		},
		props:{
			selected:{
				default:null
			},
			url:{
				type:String,
				required:true
			},
			placeholder:{
				type:String,
				default:''
			},
			limit:{
				type:Number,
				default:100
			}
		},
		methods:{
			loadNextPage(search, page, onComplete){
      			this.ajaxSearch(search, page, null, onComplete, this)
			},
			performSearch(search, loading){
				loading(true),
      			this.ajaxSearch(search, 1, loading, null, this)
			},
			ajaxSearch: (search, page, loading, onCompleteCallback, vm) => {
		      vm.$http.get(vm.url, {
		        before(request){

					if(vm.previousRequest)
						vm.previousRequest.abort();

					vm.previousRequest = request;
		          
		        },
		        params:{
		          query:search,
		          page:page, 
		          limit:vm.limit
		        }
		      }).then(res => {

		        var results = [];
		        for(var x = 0; x<res.data.length; x++){
		          results.push(vm.convertResult(res.data[x]))
		        }
		        if(page == 1)
		        	vm.ajaxRes = results; 
		        else{
		        	for(var x = 0; x<results.length; x++){
		        		vm.ajaxRes.push(results[x]);
		        	}
		        }

		        if(loading)
		        	loading(false)

		        if(onCompleteCallback)
		        	//if it was less than the limit, then no more to load
		        	onCompleteCallback(results.length >= vm.limit);

		      }, error =>{})
		    },
		    convertResult(r){
		      return {label: r.text ? r.text : r.name, value: r.id}
		    }
		}
	}
</script>