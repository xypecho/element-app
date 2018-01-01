<template>
	<div class="seller" ref="seller">
		<div class="seller_content" >
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="count">({{seller.ratingCount}})</span>
					<span class="num">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="num">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="num">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="num">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="togglefavorite">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin border-1px">
				<h1>公告与活动</h1>
				<p class="text">{{seller.bulletin}}</p>
			</div>
			<ul v-if="seller.supports" class="supports">
				<li class="support-item border-1px" v-for="(item,index) in seller.supports">
					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
					<span class="text">{{seller.supports[index].description}}</span>
				</li>
			</ul>
			<split></split>
			<div class="pic">
				<h1>商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="item" ref="piclist">
						<li v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1>商家信息</h1>
				<ul>
					<li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
		<shopcart :selectgoods="selectgoods" :sellerdelivery="seller.deliveryPrice" :minprice="seller.minPrice"></shopcart>
	</div>
</template>
<script>
	import star from "../../components/star/star"
	import split from '../../components/split/split'
	import BScroll from 'better-scroll'
	import shopcart from "../../components/shopcart/shopcart"
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			star,
			split,
			shopcart
		},
		data(){
			return{
				favorite:false
			}
		},
		watch:{
			seller:function(){
				this.$nextTick(()=>{
					this.swiper();
				});
			}
		},
		methods:{
			swiper(){
				if (this.seller.pics) {
					let imgwidth=120;
					let marginright=6;
					let width=(imgwidth+marginright)*this.seller.pics.length;
					this.$refs.piclist.style.width=width+"px";
					if (!this.picsroll) {
						this.$nextTick(()=>{
							this.picsroll=new BScroll(this.$refs.picWrapper,{
								scrollX: true
							})
						})
					}else{
						this.picsroll.refresh();
					}
				}
			},
			togglefavorite(){
				this.favorite=!this.favorite;
			}
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee'];
			this.$nextTick(()=>{
				this.swiper();
				this.scroll=new BScroll(this.$refs.seller,{
					click:true
				})
			})
		},
		computed:{
			selectgoods(){
				let food=[];
			},
			favoriteText(){
				return this.favorite?"已收藏":"收藏";
			}
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.seller
		position:absolute
		top:176px
		bottom:46px
		width:100%
		overflow:hidden
		.overview
			padding:18px
			positive:relative
			.title
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
				margin-bottom:8px
			.desc
				font-size:0
				padding-bottom:18px
				border-1px(rgba(7,17,27,0.1))
				.star
					margin-right:8px
					display:inline-block
				.count,.num
					font-size:10px
					color:rgb(77,85,93)
					line-height:18px
					display:inline-block
					vertical-align:top
				.count
					margin-right:12px
			.remark
				display:flex
				padding-top:18px
				.block
					flex:1
					border-right 1px solid rgba(7,17,27,0.1)
					text-align:center
					&:last-child
						border-right:none
					h2
						font-size:10px
						color:rgb(147,153,159)
						line-height:10px
						margin-bottom:4px
					.content
						font-size:10px
						font-weight:200
						color:rgb(7,17,27)
						line-height:24px
						.num
							font-size:24px
			.favorite
				position:absolute
				top:18px
				right:18px
				display:block
				text-align:center
				.icon-favorite
					display:block
					font-size:24px
					line-height:24px
					color:#93999f
					&.active
						color:rgb(240,20,20)
				.text
					font-size:10px
					color:#93999f
					line-height:10px
		.bulletin
			padding 18px 18px 16px 18px
			h1
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
				margin-bottom:8px
			.text
				border-1px(rgba(7,17,27,0.1))
				padding:0 12px
				font-size:12px
				font-weight:200
				color:rgb(240,20,20)
				line-height:24px
		.supports
			padding:0 18px
			.support-item
				padding :12px 16px
				font-size:0
				border-1px(rgba(7,17,27,0.1))
				&:first-child
					padding-top:0
				&:last-child
					border-none()
				.text
					font-size:12px
					font-weight:200
					color:rgb(7,17,27)
					line-height:16px
					display:inline-block
				.icon
					width:16px
					height:16px
					margin-right:6px
					display:inline-block
					background-size:16px 16px
					background-repeat:no-repeat
					vertical-align:top
					&.decrease
						bg-image("decrease_4")
					&.discount
						bg-image('discount_4')
					&.special
						bg-image('special_4')
					&.invoice
						bg-image('invoice_4')
					&.guarantee
						bg-image('guarantee_4')
		.pic
			padding:18px
			h1
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
				margin-bottom:8px
			.pic-wrapper
				overflow:hidden
				white-space:nowrap
				width:100%
				.item
					font-size:0
					li
						margin-right:6px
						display:inline-block
						width:120px
						height:90px
						&:last-child
							margin-right:0
		.info
			padding :18px
			h1
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
				margin-bottom:8px
				border-1px(rgba(7,17,27,0.1))
				padding-bottom:12px
			ul
				.info-item
					padding:16px 12px
					border-1px(rgba(7,17,27,0.1))
					font-size:12px
					line-height:16px
					font-weight:200
					color:rgb(7,17,27)
</style>