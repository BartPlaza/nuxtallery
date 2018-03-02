<template>
	<span>
	<input type="number" v-model="angle">
	<div class="page_container">
		<div class="carousel_wrapper" :style="{'transform': move}">	
			<div class="carousel_item first"></div>
			<div class="carousel_item second"></div>
			<div class="carousel_item third"></div>
			<div class="carousel_item fourth"></div>
			<div class="carousel_item fifth"></div>
			<div class="carousel_item sixsth"></div>
			<div class="carousel_item seventh"></div>
			<div class="carousel_item eight"></div>
		</div>
	</div>
	</span>
</template>

<script>

export default {
	data: function(){
		return {
			angle: 22 
		}
	},
	computed: {
		move: function(){
			return 'rotateX('+this.angle+'deg) rotateY(0deg)'
		}
	}
}

</script>

<style lang="scss" scoped>

	$z-width: 250px;
	$z-width-minus: -250px;
	
	.page_container{
		display: flex;
		justify-content: center;
		align-items: center;
		perspective: 700px;
		height: 100vh;
	}

	.carousel_wrapper{
		width: 100px;
		height: 100px;
		background-color: red;
		position: relative;
		transform-style: preserve-3d;
		
	}

	.carousel_item {
		width: 100px;
		height: 100px;
		background-color: blue;
		position: absolute;
	}

	.first{
		transform: translateZ($z-width)
	}

	.second{
		transform-origin: 0 25px $z-width-minus;
		transform: translateZ($z-width) rotateX(45deg)
	}

	.third{
		
		transform: translateZ($z-width-minus)
	}

	.fourth{
		transform-origin: 0 50px $z-width-minus;
		transform: translateZ($z-width) rotateX(-45deg);
	}

	.fifth{
		
		transform: rotateX(90deg) translateZ($z-width-minus)
	}

	.sixsth{
		transform-origin: 0 50px $z-width;
		transform: translateZ($z-width-minus) rotateX(45deg);
	}

	.seventh{
		transform: rotateX(90deg) translateZ($z-width)
	}

	.eight{
		transform-origin: 0 50px $z-width;
		transform: translateZ($z-width-minus) rotateX(-45deg);
	}


</style>