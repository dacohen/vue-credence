<template>
    <b-jumbotron>
        <h1>Score:
            <span :class="{'negative': isNegative, 'positive': isPositive}">{{ score | round }}</span>
        </h1>
    </b-jumbotron>
</template>

<style scoped>
.negative {
    color: red;
}

.positive {
    color: green;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Score',
    computed: {
        isNegative: function() {
            return this.score < 0;
        },
        isPositive: function() {
            return this.score > 0;
        },
        ...mapState([
            'score'
        ])
    },
    filters: {
        round: function(value) {
            return Math.ceil(value)
        }
    }
}

</script>
