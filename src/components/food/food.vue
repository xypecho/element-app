<template>
	<transition name="move">
	<div class="food" v-show="showflag" ref="food">
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
				<div class="carcontrol-wrapper">
					<carcontrol :food="food"></carcontrol>	
				</div>
				<div @click="selectfirst(food)" class="buy" v-show="!food.count || food.count==0">加入购物车</div>
			</div>
			<split v-show="food.info"></split>
			<div class="foosinfo" v-show="food.info">
				<h1 class="title">商品介绍</h1>
				<p class="info">{{food.info}}</p>
			</div>
			<split></split>
			<div class="ratings" @toggle="toggleContent" @select="selectRating">
				<h1>商品评价</h1>
				<ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-for="rating in food.ratings" class="rating-item border-1px">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img class="avatar" :src="rating.avatar" width="12" height="12">
							</div>
							<div class="time">{{rating.rateTime}}</div>
							<p class="text">
							  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
				</div>	
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
	import carcontrol from '../../components/carcontrol/carcontrol'
	import split from '../../components/split/split'
	import ratingselect from '../../components/ratingselect/ratingselect'
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	const POSITIVE=0;
	const NEGATIVE=1;
	const ALL=2;
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return{
				showflag:false,
				selectType:ALL,
				onlyContent:true,
				desc:{
						all:"全部",
						positive:"推荐",
						negative:"吐槽"
				}
			}
		},
		methods:{
			show(){
				this.showflag=true;
				this.selectType=ALL;
				this.onlyContent=false;
				this.$nextTick(() => {
					if (!this.scroll) {
					  this.scroll = new BScroll(this.$refs.food,{
					    click: true
					  });
					} else {
					  this.scroll.refresh();
					}
				})
			},
			hide(){
				this.showflag=false;
			},
			selectfirst(food){
				Vue.set(this.food,'count',1);
			},
			selectRating(type){
				this.selectType=type;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			},
			toggleContent(){
				this.onlyContent=!this.onlyContent;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			}
		},
		components:{
			carcontrol,
			split,
			ratingselect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
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
			position:relative
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
			.carcontrol-wrapper
				position:absolute
				right:18px
				bottom:18px
			.buy
				position:absolute
				right:18px
				bottom:25px
				width:74px
				height:24px
				font-size:10px
				color:rgb(255,255,255)
				line-height:24px
				border-radius:24px
				background-color:rgb(0,160,220)
				text-align:center
		.foosinfo
			padding:18px
			.title
				line-height:14px
				margin-bottom:6px
				font-size:14px
				color:rgb(7,17,27)
			.info
				font-size:12px
				font-weight:200
				color:rgb(77,85,93)
				line-height:24px
		.ratings
			padding-top:18px
			h1
				line-height:14px
				margin-left:18px
				font-size:14px
				color:rgb(7,17,27)
			.rating-wrapper
				padding:0 18px
				font-size:0
				.rating-item
					padding:16px 0
					position:relative
					border-1px(rgba(7,17,27,0.1))
					.user
						position:absolute
						top:16px
						right:0
						.name
							font-size:10px
							color:rgb(147,153,159)
							line-height:12px
							padding-right:6px
						.avatar
							border-radius:50%
					.time
						font-size:10px
						color:rgb(147,153,159)
						line-height:12px
						margin-bottom:6px
					.text
						font-size:12px
						color:rgb(7,17,27)
						line-height:16px
						.icon-thumb_up
							font-size:12px
							color:rgb(0,160,220)
							line-height:24px
							margin-right:4px
						.icon-thumb_down
							font-size:12px
							color:rgb(147,153,159)
							line-height:24px
							margin-right:4px
							
</style>