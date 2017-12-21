<template>
	<div class="ratingselect">
		
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
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	
</style>