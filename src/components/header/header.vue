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
					<span class="icon" :class='classMap[seller.supports[0].type]'></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
		<div class="detail" v-show="detailShow" >
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<div class="name">
						<h1>{{seller.name}}</h1>
					</div>
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li class="support-item" v-for="(item,index) in seller.supports">
							<span class="icon" :class="classMap[seller.supports[index].type]"></span>
							<span class="text">{{seller.supports[index].description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div>
				</div>
			</div>
			<div class="detail-close" @click="hideDetail">
				<i class="icon-close"></i>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
import star from '../../components/star/star.vue'
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				detailShow:false
			}
		},
		methods:{
			showDetail(){
				this.detailShow=true;
			},
			hideDetail(){
				this.detailShow=false;
			}
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee'];
		},
		components:{
			star
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin";
	.header
		color:#fff
		background:rgba(7,17,27,0.5)
		position:relative
		overflow :hidden
		.content-warpper
			padding:24px 12px 18px 24px
			font-size:0
			position:relative
			.avatar
				display:inline-block
				vertical-align:top
			.content
				display:inline-block
				font-size:14px
				margin-left:16px
				.title
					margin:2px 0 8px 0
					.brand
						display:inline-block
						width:30px
						height:18px
						bg-image('brand')
						background-size:30px 18px
						background-repeat:no-repeat
					.name
						font-size:16px
						font-weight:bold
						line-height:18px
						margin-left:6px
						vertical-align:top
						
				.description
					font-size:12px
					font-weight:200
					line-height:12px
					margin-bottom:10px
				.support
					.icon
						display:inline-block
						vertical-align:top
						width:12px
						height:12px
						margin-right: 4px
						background-size: 12px 12px
						background-repeat: no-repeat
						&.decrease
							bg-image("decrease_1")
						&.discount
							bg-image('discount_1')
						&.special
							bg-image('special_1')
						&.invoice
							bg-image('invoice_1')
						&.guarantee
							bg-image('guarantee_1')
					.text
						font-size:10px
						font-weight:200
						line-height:12px
						vertical-align:top
			.support-count
				position:absolute
				right:12px
				bottom:18px
				padding:0 8px
				background:rgba(0,0,0,0.2)
				height:24px
				line-height:24px
				border-radius:14px
				.count
					font-size:10px
					line-height:24px
				.icon-keyboard_arrow_right
					font-size:10px
					line-height:24px
					margin-left:2px
		.bulletin-wrapper
			height:28px
			line-height:28px
			padding 0 22px 0 12px
			white-space:nowrap
			overflow:hidden
			text-overflow :ellipsis
			position:relative
			background:rgba(7,17,27,0.2)
			.bulletin-title
				display:inline-block
				width:22px
				height:12px
				bg-image('bulletin')
				background-size:22px 12px		
				background-repeat:no-repeat
				margin-top:7px
			.bulletin-text
				font-size:10px
				margin:0 4px;
				vertical-align:top
			.icon-keyboard_arrow_right
				position:absolute
				font-size:10px
				right:12px
				top:10px
		.background
			position:absolute
			top:0
			left:0
			z-index:-1
			width:100%
			height:100%
			filter:blur(10px)
		.detail
			position:fixed
			width:100%
			height:100%
			top:0
			left:0
			z-index:100
			overflow:auto
			transition:all 0.5s
			background:rgba(7,17,27,0.8)
			opacity:1
			&.fade-enter-active,&.fade-leave-active
				background:rgba(7,17,27,0.8)
				opacity:1
			&.fade-leave-active,&.fade-enter
				background:rgba(7,17,27,0)
				opacity:0
			.detail-wrapper
				min-height:100%
				width:100%
				.detail-main
					margin-top:64px
					padding-bottom:64px
					.name
						font-size:16px
						font-weight:700
						line-height:16px
						text-align:center
					.star-wrapper
						margin-top:18px
						padding:2px 0
						text-align:center
					.title
						display:flex
						width:80%
						margin 30px auto 24px auto
						.text
							padding:0 12px
							font-size:14px
						.line
							flex:1
							position:relative
							top:-7px
							border-bottom 1px solid rgba(255,255,255,0.5)
					.supports
						width:80%
						margin:0 auto
						.support-item
							margin-bottom:12px
							padding:0 12px
							font-size:0
							&.last-child
								margin-bottom:0
							.icon
								width:16px
								height:16px
								display:inline-block
								background-size:16px 16px
								background-repeat: no-repeat
								margin-right:6px
								vertical-align:top
								&.decrease
									bg-image("decrease_2")
								&.discount
									bg-image('discount_2')
								&.special
									bg-image('special_2')
								&.invoice
									bg-image('invoice_2')
								&.guarantee
									bg-image('guarantee_2')
							.text
								line-height:16px
								font-size:12px
					.bulletin
						width:80%
						margin 0 auto
						.content
							font-size:12px
							font-weight:200
							line-height:24px
								
			.detail-close
				position: relative
				width: 32px
				height: 32px
				margin: -64px auto 0 auto
				clear: both
				font-size: 32px						
</style>	