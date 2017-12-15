<template>
	<div class="carcontrol">
		<div class="carcontrol-decrease icon-remove_circle_outline" v-show="food.count>0"></div>
		<div class="carcontrol-count">{{food.count}}</div>
		<div class="carcontrol-add icon-add_circle"></div>
	</div>
</template>

<script>
	export default{
		props:{
			food:{
				type:Object
			}
		},
		created(){
			console.log(this.food);
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.carcontrol
		font-size:0
		.carcontrol-decrease
			display:inline-block
		.carcontrol-count
			display:inline-block
		.carcontrol-add
			display:inline-block
			font-size:24px
			color:rgb(0,160,220)
			line-height:24px
			padding:6px
			
</style>