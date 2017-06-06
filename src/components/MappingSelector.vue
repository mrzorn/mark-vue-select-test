<template>
	<ajax-auto-complete placeholder="Select Mappings" v-model="value" url="me/mappings/autocomplete/" ></ajax-auto-complete>
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
			value:{
				default:null
			}
		}
	}
</script>