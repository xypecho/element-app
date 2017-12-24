<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
		  <span class="block positive" :class="{'active':selectType==2}" @click="select(2)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
		  <span class="block positive" :class="{'active':selectType==0}" @click="select(0)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
		  <span class="block negative" :class="{'active':selectType==1}" @click="select(1)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div class="switch" @click="toggleContent">
		  <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
		  <span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE=0;
	const NEGATIVE=1;
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
		},
		computed:{
			positives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType==POSITIVE;
				});
			},
			negatives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType==NEGATIVE;
				});
			}
		},
		methods:{
			select(type){
				this.selectType=type;
				this.$emit('select',type);
			},
			toggleContent(){
				this.onlyContent=!this.onlyContent;
				this.$emit('toggle');
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
		.switch
			padding:12px 18px
			border-1px(rgba(7,17,27,0.1))
			.text
				font-size:12px
				color:rgb(147,153,159)
				line-height:24px
				margin-left:4px	
				vertical-align:top
			.icon-check_circle
				font-size:24px
				color:rgb(147,153,159)
				line-height:24px
				&.on
					color: #00c850	
</style>