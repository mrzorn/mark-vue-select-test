<template>
	<ajax-auto-complete placeholder="Select Categories" :selected="categories" url="me/categories/autocomplete/" ></ajax-auto-complete>
</template>
<script type="text/babel">

	import AjaxAutoComplete from './AjaxAutoComplete'

	export default{
		components:{
			'ajax-auto-complete': AjaxAutoComplete
		},
		data(){
			return {}
		},
		props:{
			categories:{
				type:Array,
				default: function(){
					return []
				}
			}
		}
	}
</script>