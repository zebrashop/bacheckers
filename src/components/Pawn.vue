<script setup>
import { useBoard } from "@/composable/useBoard";

defineProps({
    name: 'Pawn',
    row: 0,
    column: 0,
    occupied: 'white',
})
defineEmits(['click'])

const { optionalNewPosition } = useBoard()
const nil = ''
</script>

<template>
    <div>
        <div v-if="occupied == 'white'">
            <div class="whitePawn" :id=nil+row+column @click="$emit('click', $event.target.id)"></div>
        </div>
        <div v-else-if="occupied == 'black'">
            <div class="blackPawn" :id=nil+row+column @click="$emit('click', $event.target.id)"></div>
        </div>
        <div v-else>
            <div v-for="(item, i) in optionalNewPosition">
                <div class="posNewPawn" :id=nil+row+column @click="$emit('click', $event.target.id)"
                    v-if="item.row === row && item.column === column">
                </div>
                <div v-else>
                </div>
            </div>
        </div>
    </div>
</template>
