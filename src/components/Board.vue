<script setup>
import { useBoard } from "@/composable/useBoard";
import Field from "./Field.vue";

defineProps({
    name: 'Board',
    msg: {
        type: String,
        required: true
    }
})

const { board, currentPlayer, isPawnToCapture, movePawn } = useBoard()
</script>

<template>
    <div class="container">
        <div id="header">
            <div>
                <h2 v-if="currentPlayer === 1" style="color: white;">WIT is aan zet
                    <i v-if="isPawnToCapture" style="color: yellow;">(Slaan is verplicht)</i>
                </h2>
                <h2 v-else style="color: black;">ZWART is aan zet
                    <i v-if="isPawnToCapture" style="color: yellow;">(Slaan is verplicht)</i>
                </h2>
            </div>
        </div>
        <div id="game">
            <div class="row" v-for="(row, i) in board">
                <div class="column" v-for="(col, j) in row">
                    <Field @click="movePawn($event)" :row="j" :column="i" :pawn="board[j][i]" />
                </div>
            </div>
        </div>
    </div>
</template>

