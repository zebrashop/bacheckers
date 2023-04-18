<script setup>
import Pawn from "./Pawn.vue";

defineProps({
    name: 'Field',
    row: 0,
    pawn: 0,
    column: 0,
    occupied: 'empty',
})
defineEmits(['click'])
</script>

<template>
  <div v-if="row % 2 === 0">
        <div v-if="column % 2 === 0">
            <div class="light">
                <div v-if="pawn === 1">
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'white'" />
                </div>
                <div v-else-if="pawn === -1">
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'black'" />
                </div>
                <div v-else>
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'empty'" />
                </div>
            </div>
        </div>
        <div v-else>
            <div class="dark">
                <div v-if="pawn === 1">
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'white'" />
                </div>
                <div v-else-if="pawn === -1">
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'black'" />
                </div>
                <div v-else>
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'empty'" />
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div v-if="column % 2 !== 0">
            <div class="light">
                <div v-if="pawn === 1">
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'white'" />
                </div>
                <div v-else-if="pawn === -1">
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'black'" />
                </div>
                <div v-else>
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'empty'" />
                </div>
            </div>
        </div>
        <div v-else>
            <div class="dark">
                <div v-if="pawn === 1">
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'white'" />
                </div>
                <div v-else-if="pawn === -1">
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'black'" />
                </div>
                <div v-else>
                    <Pawn @click="$emit('click', $event)" :row="row" :column="column" :occupied="'empty'" />
                </div>
            </div>
        </div>
    </div>
</template>
