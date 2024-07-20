<template>
    <div class="game flex">
        <div class="game-head flex --direction-column">
            <div class="game-head__reсord">Рекорд: <span v-html="record"></span></div>
            <div class="game-head__score">Текущий счет: <span v-html="score"></span></div>
        </div>
        <div class="game__section  grid --temp-col-2">
            <button v-for="(item) in 4" :disabled="play === false" :ref="`item` + item" class="game__button" :class="{ active: activeBlock(item) }" @click="playGame(item)"></button>
        </div>
    </div>
</template>
<style>
    @import '~/components/game/__game.css';
</style>
<script setup>
    const order = ref([])
    const playerOrder = ref([])
    const play = ref(true)
    const round = ref(0)
    const activeItem = ref(0)
    const record = ref(0)
    const score = ref(0)

    function activeBlock(item){
        if(item == activeItem.value){
            return true
        } else{
            return false
        }
    }

    function playGame(item){
        if(order.value.length > 0){
            playerOrder.value.push(item);
            playSound(item);
            round.value = round.value + 1;
            if(order.value[round.value - 1] !== item){
                newRecord(order.value.length)
                order.value = [];
                playerOrder.value = [];
                round.value = 0;
                play.value = false;
                score.value = 0
                
            }
        }
        if(order.value.length === playerOrder.value.length && play.value === true){
            if(isArraysEqual(order.value, playerOrder.value)){
                play.value = false
                setTimeout(() => {randomItem(order.value.length)}, 500)
                round.value = 0;
                score.value = order.value.length
            }
        }
        play.value = true;
    }

    function newRecord(num){
        if(record.value < num){
            record.value = num - 1
        }
            console.log(num)
    }

    function isArraysEqual(firstArray, secondArray) {
        return firstArray.toString() === secondArray.toString();
    }

    async function randomItem(sec){
        order.value.push(Math.floor(Math.random() * 4) + 1);
        for(var i = 0; i < order.value.length ; i++){
            await new Promise(resolve => setTimeout(resolve, 600 - sec*30))
            activeItem.value = order.value[i];
            playSound(activeItem.value);
            setTimeout(()=>{
                activeItem.value = 0;
            },600 - sec*30)
        }
        play.value = true;
        playerOrder.value = [];
        
    }

    function playSound(count) {
      const audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound` + count + `.mp3`);
      audio.play();
    }  
</script>