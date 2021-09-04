<template>
    <div>
        <b-card title="Question">
            <h2>{{ question }}</h2>
        </b-card>
        <b-form @submit.stop.prevent="checkAnswer">
            <b-row>
                <b-col lg="6">
                    <b-form-group label="Answer">
                        <b-form-input type="text"
                            v-model="answer"
                            :formatter="commas"
                            class="mb-2 mr-sm-2 mb-sm-0">
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col lg="6">
                    <b-form-group label="Estimate Half Interval">
                        <b-input-group prepend="±" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input type="text" v-model="halfInterval" :formatter="commas"></b-form-input>
                        </b-input-group>
                    </b-form-group>
                    </b-col>
            </b-row>

            <b-row>
                <b-col lg="12">
                    <b-button type="submit" variant="success" block>
                        Check <b-icon icon="check"></b-icon>
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import Queries from '../queries';
import axios from 'axios';

Array.prototype.sample = function() {
    return this[Math.floor(Math.random() * this.length)]
}

String.prototype.toInt = function() {
    return parseInt(this.replace(/[^\d]/g, ''))
}

export default {
    name: 'Question',
    data: function() {
        return {
            question: null,
            answer: null,
            halfInterval: null,
            correctAnswer: null
        }
    },
    methods: {
        checkAnswer: function() {
            const inInterval = (this.answer.toInt() + this.halfInterval.toInt() >= this.correctAnswer) 
                && (this.answer.toInt() - this.halfInterval.toInt() <= this.correctAnswer)
            const intervalPct = Math.min(1.0, (2.0 * this.halfInterval.toInt()) / this.answer.toInt())
            const scoreDelta = 100 * (1 - intervalPct) * (inInterval ? 1 : -1)
            console.log(inInterval, intervalPct, scoreDelta)
            this.$store.commit('adjustScore', scoreDelta)
            this.populateQuestion()
        },
        populateQuestion: function() {
            const questionType = Object.values(Queries).sample()
            axios.get('https://query.wikidata.org/sparql', {
                params: {
                    query: questionType.query + '\n#Cache Buster: ' + Math.random()
                }
            }).then(response => {
                const responseData = response.data.results.bindings[0]
                let questionText = questionType.template
                for (const [column, valueMap] of Object.entries(responseData)) {
                    questionText = questionText.replace('[' + column + ']', valueMap.value)
                }
                this.question = questionText
                this.correctAnswer = responseData[questionType.answer].value
                this.answer = null
                this.halfInterval = null
            })
        },
        commas: function(value) {
            return value.replaceAll(',', '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    },
    created: function() {
        this.populateQuestion()
    }
};
</script>
