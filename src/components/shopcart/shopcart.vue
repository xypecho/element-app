<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper" @click="toggleList">
					<div class="logo" :class="{'highlight':totalprice>0}">
						<span class="icon-shopping_cart" :class="{'highlight':totalprice>0}"></span>
					</div>
					<div class="num" v-show="totalcount>0">{{totalcount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalprice>0}">￥{{totalprice}}</div>
				<div class="desc">另需配送费{{sellerdelivery}}元</div>
			</div>
			<div class="content-right" :class="{'highlight':totalprice>=minprice}">
				{{paydesc}}
			</div>
		</div>
		<transition name="fold">
		<div class="shopcart-list" v-show="listShow">
		  <div class="list-header">
		    <h1 class="title">购物车</h1>
		    <span class="empty" @click="empty">清空</span>
		  </div>
		  <div class="list-content" ref="listContent">
		    <ul>
		      <li v-for="food in selectgoods" class="food">
		        <span class="name">{{food.name}}</span>
		        <div class="price">
		          <span>￥{{food.price*food.count}}</span>
		        </div>
		        <div class="cartcontrol-wrapper">
		          <cartcontrol :food="food"></cartcontrol>
		        </div>
		      </li>
		    </ul>
		  </div>
		</div>
		</transition>
		<div class="mask" v-show="listShow"></div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import cartcontrol from "../../components/carcontrol/carcontrol"
	export default{
		props:{
			selectgoods:{
				type:Array,
				default(){
					return [
						{
							count:0,
							price:10
						}
					];
				}
			},
			sellerdelivery:{
				type:Number,
				default:0 
			},
			minprice:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				fold:true
			}
		},
		computed:{
			totalprice() {
				let total=0;
				this.selectgoods.forEach((good)=>{
					total+=good.price*good.count;
				});
				return total;
			},
			totalcount(){
				let count=0;
				this.selectgoods.forEach((good)=>{
					count+=good.count;
				});
				return count;
			},
			paydesc(){
				if (this.totalprice===0) {
					return `￥${this.minprice}元起送`;
				}else if(this.totalprice<this.minprice){
					return `还差￥${this.minprice-this.totalprice}元起送`;
				}else{
					return `去结算`;
				}
			},
			listShow(){
				if (!this.totalcount) {
					this.fold=true;
					return false;
				}else{
					let show=!this.fold;
					if (show) {
						this.listContentscroll=new BScroll(this.$refs.listContent,{
							click:true
						})
					}
					return show;
				}
			}
		},
		methods:{
			toggleList(){
				if (!this.totalcount) {
					return false;
				}
				this.fold=!this.fold;
			},
			empty(){
				this.selectgoods.forEach((good) =>{
					good.count=0;
				})
			}
		},
		components:{
			cartcontrol
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.shopcart
		position:fixed
		left: 0
		bottom: 0
		width:100%
		height:48px
		z-index:8
		background-color:#141d27
		.content
			display:flex
			font-size:0
			.content-left
				flex:1
				.logo-wrapper
					display:inline-block
					position:relative
					top:-10px
					margin:0 12px
					padding:6px
					width:56px
					height:56px
					box-sizing:border-box
					vertical-align:top
					background-color:#141d27
					border-radius:50%
					.logo
						width:100%
						height:100%
						border-radius:50%
						background:#2b343c
						text-align:center
						&.highlight
							background-color:rgb(0,160,220)
						.icon-shopping_cart
							font-size:24px
							color:#80858a
							line-height:44px
							&.highlight
								color:rgb(255,255,255)
					.num
						position:absolute
						top:0
						right:0
						background-color:rgb(240,20,20)
						box-shadow 0px 4px 8px 0px rgba(0,0,0,0.4)
						width:24px
						height:16px
						border-radius:16px
						color:rgb(255,255,255)
						line-height:16px
						font-size:9px
						font-weight:700
						text-align:center
				.price
					display:inline-block
					font-size:16px
					font-weight:700
					line-height:24px
					color:#80858a
					margin-top:12px
					padding-right:12px
					border-right:1px solid rgba(255,255,255,0.1)
					vertical-align:top
					box-sizing:border-box
					&.highlight
						color:#fff
				.desc
					display:inline-block
					margin:12px 0 0 12px
					color:#80858a
					font-size:10px
					line-height:24px
					font-weight:700
					vertical-align:top
			.content-right
				flex:0 0 105px
				width:105px
				background:rgba(255,255,255,0.4)
				font-size:12px
				line-height:48px
				text-align:center
				font-weight:700
				&.highlight
					background-color:#00b43c
					color:#fff
		.shopcart-list
			position:absolute
			top:0
			left:0
			z-index:-1
			width:100%
			transform:translate3d(0,-100%,0)
			&.fold-enter,&.fold-leave
				transition:all 0.6s
				transform:translate3d(0,0,0)
			.list-header
				height:40px
				background-color:#f3f5f7
				line-height:40px
				padding:0 18px
				border-bottom 1px solid rgba(7,17,27,0.1)
				.title
					font-size:14px
					font-weight:200
					color:rgb(7,17,27)
					float:left
				.empty
					color:rgb(0,160,220)
					font-size:12px
					float:right
			.list-content
				padding:0 18px
				background-color:#ffffff
				max-height:217px
				overflow:hidden
				.food
					padding 12px 0
					border-bottom:1px solid rgba(7,17,27,0.1)
					position:relative
					.name
						font-size:14px
						color:rgb(7,17,27)
						line-height:24px
					.price
						font-size:14px
						font-weight:700
						line-height:24px
						color:rgb(240,20,20)
						position:absolute
						bottom:12px
						right:90px
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:6px
		.mask
			position:fixed
			top:0
			left:0
			width:100%
			height:100%
			z-index:-2
			background-color:rgba(7,17,27,0.6)
</style>