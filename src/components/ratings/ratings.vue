<template>
	<div class="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1>{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>					
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
		</div>
		<split></split>
		<ratingselect @toggle="toggleContent" @select="selectRating" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
		<div class="rating-wrapper">
			<ul>
				<li v-for="rating in ratings" class="rating-item border-1px">
					<div class="avatar">
						<img :src="rating.avatar" width="28" height="28">
					</div>
					<div class="content">
						<div class="name"></div>
						<div class="star-wrapper">
							<star :size="24" :score="rating.score"></star>
							<span class="score">{{rating.score}}</span>
						</div>
						<p class="text">{{rating.text}}</p>
						<div class="recommend">
							<span class="icon-thumb_up"></span>
							<span v-for="item in rating.recommend">{{item}}</span>
						</div>
						<div class="time">{{rating.rateTime | formatDate}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import star from '../../components/star/star'
	import split from '../../components/split/split'
	import ratingselect from '../../components/ratingselect/ratingselect'
	import {formatDate} from '../../common/js/date'
	const POSITIVE=0;
	const NEGATIVE=1;
	const ALL=2;
	const ERR_OK=0;
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				ratings:[],
				selectType:ALL,
				onlyContent:true,
				desc:{
						all:"全部",
						positive:"满意",
						negative:"不满意"
				}
			}
		},
		created(){
			this.$http.get('/api/ratings').then((response)=>{
				response=response.body;
				if (response.errno==ERR_OK) {
					this.ratings=response.data;
				}
			})
		},
		filters:{
			formatDate(time){
				let date=new Date(time);
				return formatDate(date,"yyyy-MM-dd hh:mm");
			}
		},
		components:{
			star,
			split,
			ratingselect
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
	.ratings
		position:absolute
		top:174px
		left:0
		bottom:0
		width:100%
		overview:hidden
		.overview
			padding:18px 0
			width:100%
			display:flex
			.overview-left
				flex:0 0 137px
				border-right:1px solid rgba(7, 17, 27, 0.1)
				text-align:center
				padding:6px 0
				// @media only screen and (max-width:320px)
				// 	flex:0 0 120px
				// 	width:120px
				h1
					font-size:24px
					color:rgb(255,153,0)
					line-height:28px
				.title
					font-size:12px
					color:rgb(7,17,27)
					line-height:12px
					margin-bottom:8px
				.rank
					font-size:10px
					color: rgb(147, 153, 159)
					line-height:10px
			.overview-right
				flex:1
				padding:0 17px
				.score-wrapper
					margin-bottom:8px
					font-size:0
					.title
						font-size:12px
						color:rgb(7,17,27)
						line-height:18px
						margin-right:12px
						display:inline-block
						vertical-align:top
					.star
						display:inline-block
						vertical-align:top
						margin-right:12px
					.score
						display:inline-block
						vertical-align:top
						font-size:12px
						color:rgb(255,153,0)
						line-height:18px
				.delivery-wrapper
					.title
						font-size:12px
						color:rgb(7,17,27)
						line-height:18px
						margin-right:12px
						display:inline-block
					.delivery
						font-size:12px
						color:rgb(147,153,159)
						line-height:18px
		.rating-wrapper
			padding:18px
			width:100%
			.rating-item
				border-1px(rgba(7,17,27,0.1))
				font-size:0
				.avatar
					img
						padding:18px 12px 6px 18px
						border-radius:50%

					
</style>