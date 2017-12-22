<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
		  <span class="block positive" :class="{'active':selectType==2}">{{desc.all}}<span class="count">12</span></span>
		  <span class="block positive" :class="{'active':selectType==1}">{{desc.positive}}<span class="count">123</span></span>
		  <span class="block negative" :class="{'active':selectType==0}">{{desc.negative}}<span class="count">311</span></span>
		</div>
		<div class="switch">
		  <span class="icon-check_circle"></span>
		  <span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	// const POSITIVE=0;
	// const NEGATIVE=1;
	const ALL=2;
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType:{      //选择的种类，例如全部，推荐，吐槽
				type:Number,
				default:ALL
			},
			onlyContent:{  //是否只看有内容的评价
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return{
						all:"全部",
						positive:"推荐",
						negative:"吐槽"
					}
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px
			border-1px(rgba(7,17,27,0.1))
			font-size:0
			.block
				display:inline-block
				padding:8px 12px 8px 12px
				text-align:center
				line-height:16px
				height:16px
				margin-right:8px
				font-size:12px
				border-radius:2px
				color: rgb(77, 85, 93)
				&.active
					color:#fff
				.count
					font-size:8px
					margin-left:2px
				&.positive
					background-color:rgba(0,160,220,0.2)
					&.active
						background-color:rgb(0,160,220)
				&.negative
					background-color:rgba(77,85,93,0.2)
					&.active
						background-color:rgb(77,85,93)
						
</style>