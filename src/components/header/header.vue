<template>
	<div class="header">
		<div class="content-warpper">
			<div class="avater" style="display:inline-block">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content" style="display:inline-block">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper">
			
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			seller:{
				type:Object
			}
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.header
		color:#fff
		background:#000
		.content-warpper
			padding:24px 12px 18px 24px
			font-size:0
			.avatar
				display:inline-block
			.content
				display:inline-block
				font-size:14px
				margin-left:16px
</style>