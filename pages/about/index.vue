<template>
	<div class="page_container">
		<div class="carousel_wrapper" :style="{'transform': move}">	
			<transition name="fade">
				<div class="carousel_item first"
				v-show="item == 1 || item == 2 || item == 8">Use big public gallery and add to it your own images</div>
			</transition>
			<transition name="fade">
				<div class="carousel_item second"
				v-show="item == 8 || item == 7 || item == 1">Use your private gallery visible only for you</div>
			</transition>
			<transition name="fade">
				<div class="carousel_item third"
				v-show="item == 3 || item == 4 || item == 2">Access to more feature when you log in</div>
			</transition>
			<transition name="fade">
				<div class="carousel_item fourth"
				v-show="item == 2 || item == 1 || item == 3">Search and filter images according to your needs</div>
			</transition>
			<transition name="fade">
			<div class="carousel_item fifth"
			v-show="item == 5 || item == 4 || item == 6"><p>Give likes for public images</p></div>
			</transition>
			<transition name="fade">
				<div class="carousel_item sixsth"
				v-show="item == 4 || item == 3 || item == 5"><p>Give likes for public images</p></div>
			</transition>
			<transition name="fade">	
				<div class="carousel_item seventh"
				v-show="item == 7 || item == 6 || item == 8">Give likes for public images</div>
			</transition>
			<transition name="fade">
				<div class="carousel_item eight"
			v-show="item == 6 || item == 5 || item == 7"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, aut dolore quasi quae praesentium maxime pariatur!</p></div>
			</transition>
		</div>
		<div class="carousel_frame">
			<div class="carousel_nav">
				<i class="fas fa-sort-up" @click="roll(-1)"></i>
				<i class="fas fa-sort-down" @click="roll(1)"></i>
			</div>
		</div>
		<back-button link="/" color="black"></back-button>
	</div>
</template>

<script>

export default {
	data: function(){
		return {
			angle: 0,
			item: 1
		}
	},
	computed: {
		move: function(){
			return 'rotateX('+this.angle+'deg) rotateY(0deg)'
		},
		calcShow: function(){
			return Math.abs(this.angle&360);
		}
	},
	created: function(){
		window.addEventListener('wheel',(event)=>{
			this.roll(event.deltaY);
		});
	},
	methods: {
		roll: function(deltaY){
			if(deltaY < 0){
				this.angle += 45;
				if(this.item < 8){
					this.item++
				} else if (this.item = 8){
					this.item = 1
				}
			}else {
				this.angle -= 45;
				if(this.item == 1){
					this.item = 8;
				} else if (this.item > 0){
					this.item--;
				}
			}
			this.removeRoll();
		},
		removeRoll: function(){
			window.addEventListener('wheel', (e)=>{
				e.preventDefault();
			});
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
		width: 500px;
		height: 100px;
		position: relative;
		transform-style: preserve-3d;
		transition: all 1.5s;
		z-index: 2;	
	}

	.carousel_item {
		width: 500px;
		height: 100px;
		position: absolute;
		color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: opacity 1s;
		font-size: 22px;
		text-transform: uppercase;
		text-align: center;

	}

	.first{
		transform: translateZ($z-width)
	}

	.second{
		transform-origin: 0 50px $z-width-minus;
		transform: translateZ($z-width) rotateX(45deg)
	}

	.third{
		transform: rotateX(-90deg) translateZ($z-width)
	}

	.fourth{
		transform-origin: 0 50px $z-width-minus;
		transform: translateZ($z-width) rotateX(-45deg);
	}

	.fifth{
		transform: rotateX(0deg) rotateY(0deg) translateZ($z-width-minus)
	}

	.fifth > p {
		transform: rotateX(180deg);
	}

	.sixsth{
		transform-origin: 0 50px $z-width;
		transform: translateZ($z-width-minus) rotateX(45deg);
	}

	.sixsth > p{
		transform: rotateX(180deg);
	}

	.seventh{
		transform: rotateX(90deg) translateZ($z-width)
	}

	.eight{
		transform-origin: 0 50px $z-width;
		transform: translateZ($z-width-minus) rotateX(-45deg) ;
	}

	.eight > p {
		transform: RotateX(180deg);
	}

	.carousel_frame{
		position: absolute;
		background-color: #b5ac49;
		width: 100%;
		height: 200px;
		z-index: 1;
		background-image: linear-gradient(to top, #3ca55c, #b5ac49);
		box-shadow: 0 10px 6px -6px #777;
	}

	.carousel_nav {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		height: 100%;
		font-size: 44px;
		margin-right: 50px;
	}

	.carousel_nav > i:hover {
	  cursor: pointer;
	  color: white;
	}


</style>