<template>
	<transition name="move">
	<div class="food" v-show="showflag">
		<div class="food-content">
			<div class="image-title">
				<img :src="food.image">
				<div class="back" @click="hide">
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span>
					<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return{
				showflag:false
			}
		},
		methods:{
			show(){
				this.showflag=true;
			},
			hide(){
				this.showflag=false;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food
		position:fixed
		top:0
		left:0
		bottom:48px
		z-index:7
		background-color:#fff
		width:100%
		height:100%
		transform:translate3d(0,0,0)
		transition:all 0.4s linear
		&.move-enter,&.move-leave-active
			transform:translate3d(100%,0,0)
		.image-title
			position:relative
			width:100%
			height:0
			padding-top:100%
			img
				position:absolute
				top:0
				left:0
				width:100%
				height:100%
			.back
				position:absolute
				top:10px
				left:0
				.icon-arrow_lift
					font-size:15px
					padding:10px
					color:#fff
		.content
			padding:18px
			font-size:0
			h1
				font-size:14px
				font-weight:700
				color:rgb(7,17,27)
				line-height:14px
			.detail
				font-size:10px
				color:rgb(147,153,159)
				line-height:10px
				margin-top:8px
				margin-bottom:9px
				.sell-count
					margin-right:12px
			.price
				font-weight:700
				line-height:24px
				.now
					color:rgb(240,20,20)
					margin-right:8px
					font-size:14px
				.old
					font-size:10px
					text-decoration:line-through
					color:rgb(147,153,159)
					
</style>