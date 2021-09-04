export default {
    populations: {
        query: `SELECT ?cityLabel ?countryLabel ?population WHERE {
                SERVICE bd:sample {
                    ?city wdt:P31 wd:Q1637706.
                    bd:serviceParam bd:sample.sampleType "RANDOM".
                }
                ?city wdt:P1082 ?population.
                ?city wdt:P17 ?country.
                SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
                } LIMIT 1`,
        template: "What is the population of [cityLabel], [countryLabel]?",
        answer: "population"
    },
    american_actor_ages: {
        query: `SELECT ?personLabel ?age WHERE {
                SERVICE bd:sample {
                    ?person wdt:P106 wd:Q33999.
                    bd:serviceParam bd:sample.sampleType "RANDOM".
                }
                ?person wdt:P19 ?pob.
                ?pob wdt:P17 wd:Q30.
                FILTER NOT EXISTS { ?person wdt:P570 ?x. }
                ?person wdt:P569 ?dob.
                BIND(YEAR(NOW()) - YEAR(?dob) AS ?age)
                SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
            } LIMIT 1`,
        template: "How many years old is [personLabel]?",
        answer: "age"
    }
}