<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for='item in goods' class="menu-item">
					<span class="text border-1px">
						<span :class='classMap[item.type]' class="icon" v-if="item.type>0"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list" ref="foodList">
					<h2 class="title">{{item.name}}</h2>
					<ul>
						<li v-for="food in item.foods" class="food-item  food-list-hook">
							<div class="icon">
								<img :src="food.image" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	const ERR_OK=0;
	export default{
		props: {
			seller:{
				type:Object
			}
		},
		data() {
			return{
				goods:[],
				ListHeight:[]
			};
		},
		created() {
			this.$http.get('/api/goods').then((response)=>{
				response=response.body;
				if (response.errno==ERR_OK) {
					this.goods=response.data;
					console.log(this.goods);
					this.$nextTick(() => {
						this._initscroll();
						this.calculateheight();
					})
				}
			});	
			this.classMap=['decrease','discount','special','invoice','guarantee'];
		},
		methods:{
			_initscroll(){
				this.menuscroll = new BScroll(this.$refs.menuWrapper,{});
				this.foodscroll = new BScroll(this.$refs.foodsWrapper,{});
				this.foodscroll.on("scroll",(pos) => {
					alert(1241);
					alert(this.ListHeight);
				});
			},
			calculateheight(){
				let foodlist=this.refs.foodList.getElementsByClassName("food-list-hook");
				let height=0;
				for (let i = 0; i < foodlist.length; i++) {
					alert(i);
					// item=foodlist[i];
					// height += item.clientHeight;
					// this.ListHeight.push(height);
					// console.log(this.ListHeight);
				}
			},
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
	.goods
		display:flex
		width:100%
		position:absolute
		top:176px
		bottom:46px
		overflow:hidden
		.menu-wrapper
			flex:0 0 80px
			width:80px
			background-color:#f3f5f7
			.menu-item
				display:table
				width:56px
				height:54px
				padding:0 12px
				line-height:14px
				.icon
					display:inline-block
					vertical-align:top
					width:12px
					height:12px
					margin-right:2px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						bg-image("decrease_3")
					&.discount
						bg-image('discount_3')
					&.special
						bg-image('special_3')
					&.invoice
						bg-image('invoice_3')
					&.guarantee
						bg-image('guarantee_3')
				.text
					display:table-cell
					width:56px
					height:54px
					vertical-align:middle
					font-size:12px
					border-1px(rgba(7,17,27,0.1))
		.goods-wrapper
			flex:1
			.title
				padding-left:14px
				font-size:12px
				line-height:26px
				color:rgb(147,153,159)
				background-color:#f3f5f7
				border-left:2px solid #d9ddde
			.food-item
				display:flex
				border-1px(rgba(7,17,27,0.1))
				margin:18px
				padding-bottom:18px
				&:last-child
					border-none()
					margin-bottom:0
				.icon
					flex:0 0 57px
					margin-right:10px
				.content
					flex:1
					.name
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
						height:14px
						margin:2px 0 8px 0
						font-weight:700
					.desc
						margin-bottom:8px
						font-size:10px
						line-height:10px
						color:rgb(147,153,159)
					.extra
						margin-bottom:8px
						font-size:10px
						line-height:10px
						color:rgb(147,153,159)
						.count
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