import { computed, reactive } from "vue";

const start = [
    [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
]

const state = reactive({
    board: start, currentPlayer: 1, optionalNewPosition: [], optionalCapturePosition: [], aboutToMove: null, isPawnToCapture: false
});

class Pawn {
    constructor(row, column) {
        this.row = row
        this.column = column
    }

    compare(p) {
        return p.row === this.row && p.column === this.column
    }
}

const board = computed(() => {
    return state.board
});

const currentPlayer = computed(() => {
    return state.currentPlayer
});

const optionalNewPosition = computed(() => {
    return state.optionalNewPosition
});

const isPawnToCapture = computed(() => {
    return state.isPawnToCapture
});

export function useBoard() {
    function movePawn(value) {
        let row = parseInt(value.substring(0, 1))
        let column = parseInt(value.substring(1, 2))
        let p = new Pawn(row, column)

        if (state.optionalCapturePosition.length > 0) {
            doCapture(p);
        } else {
            if (state.optionalNewPosition.length > 0) {
                doMove(p)
            }
        }

        let player = opponent(state.currentPlayer)
        if (player === state.board[row][column]) {
            mandatoryCaptureCheck(p)
        }

        if (state.currentPlayer === state.board[row][column]) {
            if (!findPieceToCapture(p, player)) {
                findMoveOptions(p, player);
            }
        }
    }

    function doMove(p) {
        let found = false;
        let newPosition = null;
        state.optionalNewPosition.forEach((element) => {
            if (element.compare(p)) {
                found = true
                newPosition = element
                return
            }
        });

        if (found) {
            executeMove(newPosition)
        }
    }

    function doCapture(p) {
        let found = false;
        let newPosition = null;
        let oldPosition = null;
        state.optionalCapturePosition.forEach((element) => {
            if (element.newPosition.compare(p)) {
                found = true;
                newPosition = element.newPosition;
                oldPosition = element.capturePosition;
                return;
            }
        });

        if (found) {
            executeCapture(newPosition, oldPosition)
        }
    }

    function executeMove(newPosition) {
        state.board[newPosition.row][newPosition.column] = state.currentPlayer;
        state.board[state.aboutToMove.row][state.aboutToMove.column] = 0;
        state.currentPlayer = opponent(state.currentPlayer);
        state.optionalNewPosition = [];
        state.optionalCapturePosition = [];
        state.aboutToMove = null
    }

    function executeCapture(newPosition, oldPosition) {
        state.board[newPosition.row][newPosition.column] = state.currentPlayer;
        // delete the captured pawn
        state.board[oldPosition.row][oldPosition.column] = 0;
        state.board[state.aboutToMove.row][state.aboutToMove.column] = 0;
        state.currentPlayer = opponent(state.currentPlayer);
        state.optionalNewPosition = [];
        state.optionalCapturePosition = [];
        state.aboutToMove = null
        state.isPawnToCapture = false;
    }

    function mandatoryCaptureCheck(p) {
        // check if the last move of the opponent has created a situation where the current player must capture a pawn
        if (
            state.board[p.row - 1][p.column - 1] === state.currentPlayer &&
            state.board[p.row + 1][p.column + 1] === 0
        ) {
            state.isPawnToCapture = true
        }

        if (
            state.board[p.row - 1][p.column + 1] === state.currentPlayer &&
            state.board[p.row + 1][p.column - 1] === 0
        ) {
            state.isPawnToCapture = true
        }

        if (
            state.board[p.row + 1][p.column - 1] === state.currentPlayer &&
            state.board[p.row - 1][p.column + 1] === 0
        ) {
            state.isPawnToCapture = true
        }

        if (
            state.board[p.row + 1][p.column + 1] === state.currentPlayer &&
            state.board[p.row - 1][p.column - 1] === 0
        ) {
            state.isPawnToCapture = true
        }
    }

    function findPieceToCapture(p, player) {
        // check if the selected pawn can capture a pawn of the opponent
        let found = false;
        let newPosition = null;
        let capturePosition = null;
        state.optionalNewPosition = [];
        state.optionalCapturePosition = [];
        if (
            state.board[p.row - 1][p.column - 1] === player &&
            state.board[p.row - 2][p.column - 2] === 0
        ) {
            found = true;
            state.aboutToMove = p;
            newPosition = new Pawn(p.row - 2, p.column - 2)
            state.optionalNewPosition.push(newPosition)
            capturePosition = new Pawn(p.row - 1, p.column - 1)
            state.optionalCapturePosition.push({ newPosition: newPosition, capturePosition: capturePosition })
        }

        if (
            state.board[p.row - 1][p.column + 1] === player &&
            state.board[p.row - 2][p.column + 2] === 0
        ) {
            found = true;
            state.aboutToMove = p;
            newPosition = new Pawn(p.row - 2, p.column + 2)
            state.optionalNewPosition.push(newPosition)
            capturePosition = new Pawn(p.row - 1, p.column + 1)
            state.optionalCapturePosition.push({ newPosition: newPosition, capturePosition: capturePosition })
        }

        if (
            state.board[p.row + 1][p.column - 1] === player &&
            state.board[p.row + 2][p.column - 2] === 0
        ) {
            found = true;
            state.aboutToMove = p;
            newPosition = new Pawn(p.row + 2, p.column - 2)
            state.optionalNewPosition.push(newPosition)
            capturePosition = new Pawn(p.row + 1, p.column - 1)
            state.optionalCapturePosition.push({ newPosition: newPosition, capturePosition: capturePosition })
        }

        if (
            state.board[p.row + 1][p.column + 1] === player &&
            state.board[p.row + 2][p.column + 2] === 0
        ) {
            found = true;
            state.aboutToMove = p;
            newPosition = new Pawn(p.row + 2, p.column + 2)
            state.optionalNewPosition.push(newPosition)
            capturePosition = new Pawn(p.row + 1, p.column + 1)
            state.optionalCapturePosition.push({ newPosition: newPosition, capturePosition: capturePosition })
        }

        return found;
    }

    function findMoveOptions(p, player) {
        // if there is a pawn to capture, no regular move can be done
        if (state.isPawnToCapture) {
            return
        }
        state.optionalNewPosition = [];

        // check if there is a valid new position for the selected pawn to move to
        if (state.board[p.row + player][p.column + 1] === 0) {
            state.aboutToMove = p;
            state.optionalNewPosition.push(new Pawn(p.row + player, p.column + 1))
        }

        if (state.board[p.row + player][p.column - 1] === 0) {
            state.aboutToMove = p;
            state.optionalNewPosition.push(new Pawn(p.row + player, p.column - 1))
        }
    }

    function opponent(player) {
        return player === -1 ? 1 : -1;
    }

    return {
        board,
        currentPlayer,
        optionalNewPosition,
        isPawnToCapture,
        movePawn,
    };
}
