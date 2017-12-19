<template>
	<div class="carcontrol">
		<transition name="move">
		<div class="carcontrol-decrease" v-show="this.food.count>0" @click='decreasecart'>
			<span class="icon-remove_circle_outline inner"></span>
		</div>
		</transition>
		<div class="carcontrol-count" v-show="this.food.count>0">{{food.count}}</div>
		<div class="carcontrol-add icon-add_circle" @click="addcart"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object
			}
		},
		created(){
			console.log(this.food);
		},
		methods:{
			addcart(){
				console.log('click');
				console.log(this.food.count);
				if (!this.food.count) {
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
			},
			decreasecart(){
				this.food.count--;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.carcontrol
		font-size:0
		.carcontrol-decrease
			display:inline-block
			padding:6px
			transform: translate3d(0, 0, 0)
			opacity:1
			.inner
				display: inline-block
				line-height: 24px
				font-size: 24px
				color: rgb(0, 160, 220)
				transition: all 0.4s linear
				transform: rotate(0)
				&.move-enter-active,&.move-leave-active
					transition:all 0.6s linear
				&.move-enter,&.move-leave-active
					opacity:0
					transform:translate3d(24px,0,0)
		.carcontrol-count
			display:inline-block
			font-size:10px
			color:rgb(147,153,159)
			line-height:24px
			width:12px
			text-align:center
			padding-top:6px
			vertical-align:top
		.carcontrol-add
			display:inline-block
			font-size:24px
			color:rgb(0,160,220)
			line-height:24px
			padding:6px
			
</style>