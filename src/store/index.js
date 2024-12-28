import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
        events: state.events,
        lang: state.lang,
        blacklist: state.blacklist,
        selectedEvents: state.selectedEvents,
        webhookURL: state.webhookURL
    })

})
Vue.use(Vuex)

const defaultEvents = [
    {
        event: "Garbage", enabled: true, matches: ["garbage"], activeCheckboxes: [], checkboxes: ["Chairs", "Boxes", "Minecarts", "Stones", "Oil Barrels", "TNT Boxes", "Toxic Barrels", "Acid Barrels", "Propane Tanks"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 10, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 40, key: "max" }
        ]
    },
    {
        event: "Zoo", enabled: true, matches: ["zoo"], activeCheckboxes: [], checkboxes: ["Deers", "Ducks", "Rats", "Wolves", "Elks", "Frogs", "Sheep"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 5, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 20, key: "max" }
        ]
    },
    {
        event: "Bee", enabled: true, matches: ["bee"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 5, key: "max" }
        ]
    },
    {
        event: "GoldTouchy", enabled: true, matches: ["money", "gold"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "Acid", enabled: true, matches: ["ass", "acid"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 10, key: "max" }
        ]
    },
    {
        event: "Hentai", enabled: true, matches: ["weeb", "tentacle", "weave", "waves"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 5, key: "max" }
        ]
    },
    {
        event: "WormLauncher", enabled: true, matches: ["worm", "wiggle"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 5, key: "max" }
        ]
    },
    {
        event: "Ukko", enabled: true, matches: ["old"], activeCheckboxes: [], checkboxes: ["Ukko", "Bicc Ukko", "Thunder Spirit"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 2, key: "max" }
        ]
    },
    {
        event: "Steve", enabled: true, matches: ["steve", "bone"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 2, key: "max" }
        ]
    },
    {
        event: "Trip", enabled: true, matches: ["shroom"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 300, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
        ]
    },
    {
        event: "Tanks", enabled: true, matches: ["thanks"], activeCheckboxes: [], checkboxes: ["Turrets", "Tanks", "Rocket Tank", "Laser Tank", "Healer Bot", "Shield Bot", "Bot"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 4, key: "max" }
        ]
    },
    {
        event: "Cocktail", enabled: true, matches: ["flask"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 5, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 15, key: "max" }
        ]
    },
    {
        event: "LavaShift", enabled: true, matches: ["is this one broken ? idk"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "Goblins", enabled: true, matches: ["nerds"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 20, key: "max" }
        ]
    },
    {
        event: "Toasters", enabled: true, matches: ["bread"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 5, key: "max" }
        ]
    },
    {
        event: "Sweaty", enabled: true, matches: ["sweat"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "Byebye", enabled: true, matches: ["goodbye"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "BlazeIt", enabled: true, matches: ["hot"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "ThisIsFine", enabled: true, matches: ["fire"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "Coolio", enabled: true, matches: ["cold"], activeCheckboxes: [], checkboxes: ["Ice Spirit", "Ice Mage"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 4, key: "max" }
        ]
    },
    {
        event: "Twitch", enabled: true, matches: ["flum"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "DURATION" }
        ]
    },
    {
        event: "Shrooms", enabled: true, matches: ["mushroom"], activeCheckboxes: [], checkboxes: ["Normal Shrooms", "Big Shrooms", "Giga Shrooms", "Tiny Shrooms"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 4, key: "max" }
        ]
    },
    {
        event: "Eggy", enabled: true, matches: ["egg"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 5, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 20, key: "max" }
        ]
    },
    {
        event: "Raid", enabled: true, matches: ["raid"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 10, key: "max" }
        ]
    },
    {
        event: "Gamba", enabled: true, matches: ["gamba"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Balance", min: 1, max: 5, hint: "RIGGED?", value: 3, key: "BALANCE", step: 1, ticks: ["Mostly Bad", "Kinda Bad", "Perfectly Balanced", "Kinda Good", "Mostly Good"] }
        ]
    },
    {
        event: "HolyBomb", enabled: true, matches: ["holy"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 2, key: "max" },
            { label: "Balance", min: 1, max: 5, hint: "RIGGED?", value: 3, key: "BALANCE", step: 1, ticks: ["No Duds", "Rare Duds", "50/50", "Dud Sometimes", "Mostly Duds"] }
        ]
    },
    {
        event: "BeegSteve", enabled: true, matches: ["boned"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 2, key: "max" }
        ]
    },
    {
        event: "Cheapskate", enabled: true, matches: ["cheap"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Wallet Change", min: 1, max: 10, hint: "RIGGED?", value: 5, key: "BALANCE", step: 1, ticks: ["-100%", "-75%", "-50%", "-25%", "-10%", "+10%", "+25%", "+50%", "+75%", "+100%"] }
        ]
    },
    {
        event: "RogueBH", enabled: true, matches: ["black hole"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "Flend", enabled: true, matches: ["friend"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 2, key: "max" }
        ]
    },
    {
        event: "Cop", enabled: true, matches: ["robot"], activeCheckboxes: ["Robocop", "Hand Bot"], checkboxes: ["Robocop", "Assassin", "Hand Bot", "Lance Bot", "Flame Bot", "Ice Flame Bot"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 2, key: "max" }
        ]
    },
    {
        event: "Loose", enabled: true, matches: ["chunk"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Earthquake Size", min: 1, max: 3, hint: "RIGGED? - Might crash if big?", value: 3, key: "BALANCE", step: 1, ticks: ["BICC QUAKE", "DOUBLE QUAKE", "NORMAL"] }
        ]
    },
    {
        event: "Grounded", enabled: true, matches: ["ground"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "PlayerGhost", enabled: true, matches: ["ghost"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 2, key: "max" }
        ]
    },
    {
        event: "MoistMob", enabled: true, matches: ["frog"], activeCheckboxes: ["Frogs"], checkboxes: ["Big Frogs", "Frogs"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 5, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 15, key: "max" }
        ]
    },
    {
        event: "RatKing", enabled: true, matches: ["chase"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 10, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 30, key: "max" },
            { label: "Rat type", min: 1, max: 4, hint: "RIGGED?", value: 2, key: "BALANCE", step: 1, ticks: ["Angry", "Normal", "Random", "Helpful"] }
        ]
    },
    {
        event: "DoughDeer", enabled: true, matches: ["deer"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 5, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 20, key: "max" },
            { label: "Deer type", min: 1, max: 3, hint: "RIGGED?", value: 2, key: "BALANCE", step: 1, ticks: ["Explosive", "Random", "Normal"] }
        ]
    },
    {
        event: "Quack", enabled: true, matches: ["duck"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 5, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 20, key: "max" },
            { label: "Duck type", min: 1, max: 3, hint: "RIGGED?", value: 2, key: "BALANCE", step: 1, ticks: ["Explosive", "Random", "Normal"] }
        ]
    },
    {
        event: "Blessed", enabled: true, matches: ["bless"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "Cursed", enabled: true, matches: ["curse"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "BigLove", enabled: true, matches: ["love"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "HankHill", enabled: true, matches: ["propane"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 4, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 4, key: "max" }
        ]
    },
    {
        event: "Antiquing", enabled: true, matches: ["antiquing"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "Yeet", enabled: true, matches: ["yeet"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "SpikeDrinks", enabled: true, matches: ["spike"], activeCheckboxes: [], checkboxes: ["Lava", "Alcohol", "Acid", "Toxic", "Poly", "Random Poly", "Freezing Liquid"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "Follower", enabled: true, matches: ["follow"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 1, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 1, key: "max" },
            { label: "Speed", min: 1, max: 3, hint: "RIGGED?", value: 2, key: "BALANCE", step: 1, ticks: ["Fast", "Normal", "Slow"] }
        ]
    },
    {
        event: "AlchemicCircle", enabled: true, matches: ["alchemy"], activeCheckboxes: [], checkboxes: ["Void", "Oil", "Fire", "Blood", "Water", "Acid", "Alcohol", "Flummoxium", "Acceleratium", "Worm Attractor", "Ambrosia", "Concentrated Mana", "Teleportatium", "Healthium"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "WeHuffing", enabled: true, matches: ["huffing"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Minimum Props", min: 1, max: 100, hint: "Minimum amount to spawn", value: 5, key: "min" },
            { label: "Maximum Props", min: 1, max: 100, hint: "Maximum amount to spawn", value: 20, key: "max" }
        ]
    },
    {
        event: "Birthday", enabled: true, matches: ["birthday"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" },
            { label: "Surprise", min: 1, max: 6, hint: "RIGGED?", value: 4, key: "BALANCE", step: 1, ticks: ["REAL Bad", "Real Bad", "Bad", "Good", "Really Good", "REALLY GOOD"] }
        ]
    },
    {
        event: "Berserk", enabled: true, matches: ["angry"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "Nolla", enabled: true, matches: ["nolla"], activeCheckboxes: [], checkboxes: [], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    },
    {
        event: "BackToTheBeginning", enabled: true, matches: ["back"], activeCheckboxes: [], checkboxes: ["Checkpoints"], sliders: [
            { label: "Cooldown", min: 0, max: 999, hint: "How often can the event activate", value: 0, key: "COOLDOWN" },
            { label: "Activation Limit", min: 0, max: 999, hint: "0 means infinite", value: 0, key: "LIMIT" }
        ]
    }
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
        blacklist: [],
        selectedEvents: [],
        lang: "en-US",
        webhookURL: ""
    },
    getters: {
        allEvents: (state) => {
            return state.events.sort((a, b) => a.event.localeCompare(b.event))
        },
        enabledEvents: (state) => {
            return state.events.filter(v => v.enabled).sort((a, b) => a.event.localeCompare(b.event))
        },
        selectedEvents: (state) => {
            return state.selectedEvents
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
            const { event, enabled, matches, sliders, checkboxes, activeCheckboxes } = payload
            state.events = state.events.map((entry) => {
                if (entry.event == event) {
                    entry.enabled = enabled
                    entry.matches = matches
                    entry.sliders = sliders
                    entry.checkboxes = checkboxes
                    entry.activeCheckboxes = activeCheckboxes
                    console.log({ entry })
                }
                return entry
            })
            //updatePost(state)
        },
        EditEventMatch: (state, payload) => {
            const { event, matches } = payload
            state.events = state.events.map((entry) => {
                if (entry.event == event) {
                    entry.matches = matches
                    entry.enabled = matches.length > 0
                }
                return entry
            })
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
                text = text.replaceAll(match, `<span class="red--text">${match}</span>`)
            });
            state.transcript.unshift({
                id: state.transcript.length + 1,
                text,
            })
            if (state.transcript.length > 250) {
                state.transcript.shift()
            }
        },
        UpdateWebhookURL: (state, payload) => {
            state.webhookURL = payload
        },
        UpdateBlacklist: (state, payload) => {
            const idx = state.blacklist.indexOf(payload)
            if (idx === -1) {
                state.blacklist.push(payload)
            }
            else {
                state.blacklist.splice(idx, 1)
            }
        },
        UpdateSelectedEvent: (state, payload) => {
            state.selectedEvents = payload
        },
        Reset: (state) => {
            state.events = JSON.parse(JSON.stringify(defaultEvents))
            state.lang = "en-US"
            state.webhookURL = ""
            state.blacklist = []
            state.selectedEvents = []
        }
    },
    actions: {
    },
    modules: {
    },
    plugins: [vuexLocal.plugin]
})
