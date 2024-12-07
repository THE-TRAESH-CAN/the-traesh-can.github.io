import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
        events: state.events,
        lang: state.lang
    })

})
Vue.use(Vuex)

const defaultEvents = [
    { event: "Garbage", enabled: true, matches: ["garbage"], duration: 0 },
    { event: "Zoo", enabled: true, matches: ["zoo"], duration: 0 },
    { event: "Bee", enabled: true, matches: ["bee"], duration: 0 },
    { event: "GoldTouchy", enabled: true, matches: ["money", "gold"], duration: 0 },
    { event: "Acid", enabled: true, matches: ["ass", "acid"], duration: 0 },
    { event: "Hentai", enabled: true, matches: ["weeb", "tentacle","weave", "waves"], duration: 0 },
    { event: "WormLauncher", enabled: true, matches: ["worm", "wiggle"], duration: 0 },
    { event: "Ukko", enabled: true, matches: ["old"], duration: 0 },
    { event: "Steve", enabled: true, matches: ["steve", "bone"], duration: 0 },
    { event: "Trip", enabled: true, matches: ["shroom"], duration: 0 },
    { event: "Tanks", enabled: true, matches: ["thanks"], duration: 0 },
    { event: "Cocktail", enabled: true, matches: ["flask"], duration: 0 },
    { event: "LavaShift", enabled: true, matches: ["is this one broken ? idk"], duration: 0 },
    { event: "Goblins", enabled: true, matches: ["nerds"], duration: 0 },
    { event: "Toasters", enabled: true, matches: ["bread"], duration: 0 },
    { event: "Sweaty", enabled: true, matches: ["sweat"], duration: 0 },
    { event: "Byebye", enabled: true, matches: ["goodbye"], duration: 0 },
    { event: "BlazeIt", enabled: true, matches: ["hot"], duration: 0 },
    { event: "ThisIsFine", enabled: true, matches: ["fire"], duration: 0 },
    { event: "Coolio", enabled: true, matches: ["cold"], duration: 0 },
    { event: "Twitch", enabled: true, matches: ["flum"], duration: 0 },
    { event: "Shrooms", enabled: true, matches: ["mushroom"], duration: 0 },
    { event: "Eggy", enabled: true, matches: ["egg"], duration: 0 },
    { event: "Raid", enabled: true, matches: ["raid"], duration: 0 },
    { event: "Gamba", enabled: true, matches: ["gamba"], duration: 0 },
    { event: "HolyBomb", enabled: true, matches: ["holy"], duration: 0 },
    { event: "BeegSteve", enabled: true, matches: ["boned"], duration: 0 },
    { event: "Cheapskate", enabled: true, matches: ["cheap"], duration: 0 },
    { event: "RogueBH", enabled: true, matches: ["black hole"], duration: 0 },
    { event: "Flend", enabled: true, matches: ["friend"], duration: 0 },
    { event: "Cop", enabled: true, matches: ["robot"], duration: 0 },
    { event: "Loose", enabled: true, matches: ["chunk"], duration: 0 },
    { event: "Grounded", enabled: true, matches: ["ground"], duration: 0 },
    { event: "PlayerGhost", enabled: true, matches: ["ghost"], duration: 0 },
    { event: "MoistMob", enabled: true, matches: ["frog"], duration: 0 },
    { event: "RatKing", enabled: true, matches: ["chase"], duration: 0 },
    { event: "DoughDeer", enabled: true, matches: ["deer"], duration: 0 },
    { event: "Quack", enabled: true, matches: ["duck"], duration: 0 },
    { event: "Blessed", enabled: true, matches: ["bless"], duration: 0 },
    { event: "Cursed", enabled: true, matches: ["curse"], duration: 0 },
    { event: "BigLove", enabled: true, matches: ["love"], duration: 0 },
    { event: "HankHill", enabled: true, matches: ["propane"], duration: 0 },
    { event: "Antiquing", enabled: true, matches: ["antiquing"], duration: 0 },
    { event: "Yeet", enabled: true, matches: ["yeet"], duration: 0 },
    { event: "SpikeDrinks", enabled: true, matches: ["spike"], duration: 0 },
    { event: "Follower", enabled: true, matches: ["follow"], duration: 0 },
    { event: "AlchemicCircle", enabled: true, matches: ["alchemy"], duration: 0 },
    { event: "WeHuffing", enabled: true, matches: ["huffing"], duration: 0 },
    { event: "Birthday", enabled: true, matches: ["birthday"], duration: 0 },
    { event: "Berserk", enabled: true, matches: ["angry"], duration: 0 },
    { event: "Nolla", enabled: true, matches: ["nolla"], duration: 0 },
    { event: "BackToTheBeginning", enabled: true, matches: ["back"], duration: 0 }
]
//import axios from "axios"
/*
function updatePost(state) {
    axios.post("/powerwords/api/update", {
        words: state.events.filter(v => v.enabled)
    })
}
*/
export default new Vuex.Store({
    state: {
        events: defaultEvents,
        twitchPrefixEnabled: false,
        twitchPrefix: "&",
        twitchOverride: true,
        twitchMatches: [],
        twitchMatchMinLength: 4,
        twitchMaxMatchesPerUser: 3,
        twitchPoll: new Map(),
        transcript: [],
        lang: "en-US"
    },
    getters: {
        enabledEvents: (state) => {
            return state.events.filter(v => v.enabled).sort((a, b) => a.event.localeCompare(b.event))
        }
    },
    mutations: {
        UpdateLocale: (state, tag) => {
            state.lang = tag
        },
        AddEvent: (state, eventName) => {
            let exists = false
            for (const entry of state.events) {
                if (entry.event == eventName) {
                    exists = true
                }
            }
            if (exists) { return }
            state.events.push({ event: eventName, enabled: true, matches: [] })
            //updatePost(state)
        },
        EditEvent: (state, payload) => {
            const { event, enabled, matches, duration } = payload
            state.events = state.events.map((entry) => {
                if (entry.event == event) {
                    entry.enabled = enabled
                    entry.matches = matches
                    entry.duration = duration
                    console.log({ entry })
                }
                return entry
            })
            //updatePost(state)
        },
        RemoveEvent: (state, eventName) => {
            state.events = state.events.filter((entry) => {
                return entry.event != eventName
            })
            //updatePost(state)
        },
        pushTranscript: (state, payload) => {
            let text = payload.transcript
            payload.matches.forEach(match => {
                text = text.replaceAll(match,`<span class="red--text">${match}</span>`)
            });
            state.transcript.unshift({
                id: state.transcript.length + 1,
                text,
            })
            if (state.transcript.length > 250) {
                state.transcript.shift()
            }
        },
        Reset: (state) => {
            state.events = JSON.parse(JSON.stringify(defaultEvents))
            state.lang = "en-US"
        }
    },
    actions: {
    },
    modules: {
    },
    plugins: [vuexLocal.plugin]
})
