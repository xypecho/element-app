<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
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
	</div>
</template>

<script>
	export default{
		props:{
			selectgoods:{
				type:Array,
				default(){
					return [
						{
							count:1,
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
			}
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
		z-index:99
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
</style>