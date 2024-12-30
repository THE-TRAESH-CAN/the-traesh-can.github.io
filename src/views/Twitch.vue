<template>
    <v-container fluid>
        <v-card>
            <v-toolbar color="deep-purple" flat>
                <v-container fluid>
                    <v-row>
                        <v-col cols="9">
                            <v-toolbar-title>
                                <v-icon :color="iconColor">fab fa-twitch</v-icon>Twitch Settings
                            </v-toolbar-title>
                        </v-col>
                        <v-col cols="1">
                            <v-btn @click="copyEvents" block bottom >
                                <span class="mr-2">COPY EVENTS</span>
                            </v-btn>
                        </v-col>
                        <v-col cols="1"></v-col>
                        <v-col cols="1">
                            <v-btn v-if="webhookURL" @click="sendWebhook" block bottom >
                                <span class="mr-2">TO DISCORD</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="7" sm="8" md="10">
                        <v-text-field label="Channel name" v-model="channelName" outlined></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn @click="connect" block bottom x-large :loading="loading">
                            <span class="mr-2">Connect</span>
                        </v-btn>
                    </v-col>
                    
                </v-row>

                <v-divider></v-divider>
                <v-container fluid>

                    <v-row>
                        <v-col cols="3">
                            <v-checkbox v-for="item in allEvents" :key="item.event"
                            v-model="selectedEvents"
                            :label="item.event"
                            :value="item.event"
                            @change="UpdateSelectedEvent"
                            ></v-checkbox>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="9">
                            <v-container fluid>
                                <v-row>
                                    <v-slider hide-details thumb-label="always" min="1" max="360" label="Voting time" v-model="votingTime"></v-slider>
                                    <v-range-slider hide-details thumb-label="always" min="3" max="300" v-model="range" step="1" label="Word Length"></v-range-slider>
                                    <v-col cols="3">
                                        <v-btn @click="startVoting" block bottom x-large :loading="voting">
                                            <span class="mr-2">START VOTING</span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-divider></v-divider>
                            <v-container fluid>
                                <v-row>
                                    <v-col cols="9">
                                        <h1>BLACKLIST</h1>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-checkbox 
                                            v-model="advancedBlacklist"
                                            label="Advanced Blacklist"
                                            @change="UpdateAdvancedBlacklist"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                                    <v-row>
                                        <v-col cols="3" >
                                            <v-text-field label="Blacklist" v-model="blacklistWord" outlined></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-btn @click="AddBlacklistWord" block bottom x-large :loading="loading">
                                                <span class="mr-2">Add</span>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <span >{{ blacklist.join(", ") }}</span>
                            </v-container>
                            <v-divider></v-divider>
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <h1>Voting - YWH => YOUR WORD HERE</h1>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4" v-for="voteword in selectedEvents" :key="voteword">
                                        <p>!pword {{ voteword }} YWH</p>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-divider></v-divider>
                            <v-container v-if="hasWinners">
                                <v-row>
                                    <v-col>
                                        <h1>WINNERS</h1>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4" v-for="evt in winners" :key="evt">
                                        <p>{{ evt }} - {{ lastVoteWinners[evt].votes }} votes - {{ lastVoteWinners[evt].match }}</p>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>                    
                </v-container>
                <v-spacer></v-spacer>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Twitch',
    data() {
        return {
            channelName: "",
            connected: false,
            loading: false,
            votingTime: 60,
            voting: false,
            blacklistWord: "",
            votes: new Map(),
            range:[3,128],
            lastVoteWinners: {},
            voteInterval: null
        }
    },
    beforeCreate() {
        this.$TRAESH.$on("twitchConnected", () => {
            this.loading = false
            this.connected = true
        })
        this.$TRAESH.$on("twitchVote", (e) => {
            if (!this.voting) {return}
            this.handleVote({username: e.username, message: e.message.toLowerCase().split(" ").filter(c => c).join(" ").trim()})
            console.log(e)
        })
        console.log("twitch beforecreate")
    },
    computed: {
        selectedEvents: {
            get() {
                return this.$store.getters.selectedEvents
            },
            set() {
            }
        },
        advancedBlacklist: {
            get() {
                return this.$store.state.advancedBlacklist
            },
            set() {

            }
        },
        uncasedEvents () {
            const events = {}
            this.selectedEvents.forEach(event => {
                events[event] = event
                events[event.toLowerCase()] = event
            })
            return events
        },
        iconColor() {
            if (this.connected) {
                return "green accent-3"
            }
            else {
                return "red lighten-1"
            }
        },
        allEvents() {
            return this.$store.getters.allEvents
        },
        enabledEvents() {
            return this.$store.getters.enabledEvents
        },
        minWordLength(){
            return this.range[0]
        },
        maxWordLength(){
            return this.range[1]
        },
        hasWinners() {
            return Object.keys(this.lastVoteWinners).length > 0
        },
        winners() {
            return Object.keys(this.lastVoteWinners)
        },
        webhookURL() {
            return this.$store.state.webhookURL
        },
        blacklist() {
            return this.$store.state.blacklist
        }
    },
    methods: {
        connect() {
            this.loading = true
            this.$TRAESH.$emit("twitchConnect", this.channelName.toLowerCase())
        },
        UpdateSelectedEvent(e) {
            this.$store.commit("UpdateSelectedEvent", e)
        },
        UpdateAdvancedBlacklist(e) {
            console.log({e})
            this.$store.commit("UpdateAdvancedBlacklist", e)
        },
        startVoting() {
            this.voting = true;
            this.voteInterval = setInterval(() => {
                this.votingTime -= 1

                if (this.votingTime <= 1) {
                    this.endVoting()
                    clearInterval(this.voteInterval)
                }
            }, 1000);
        },
        AddBlacklistWord() {
            this.$store.commit("UpdateBlacklist", this.blacklistWord)
        },
        handleVote(e){
            const {message, username} = e
            const [command, userevent, ...msg] = message.split(" ")
            const event = this.uncasedEvents[userevent] || ""
            const word = msg.join(" ")
            const length = word.length
            if (this.selectedEvents.indexOf(event) === -1 || typeof(command) == "undefined" || typeof(event) == "undefined" || msg.length === 0) {
                return
            }
            if(length < this.minWordLength || length > this.maxWordLength || this.blacklist.indexOf(word) > -1) {
                return
            }
            if (this.advancedBlacklist) {
                const flagged = word.split(" ").some(word => {
                    return this.blacklist.some(entry => entry == word)
                })
                if (flagged) {
                    return
                }
            }
            this.votes.set(`${event}-${username}`, word)
        },
        endVoting() { // i need sleep
            const events = {}
            const tally = new Map()
            this.votes.forEach((word, p) => {
                const [event, username] = p.split("-")
                const key = `${event}-${word}`
                if (!tally.has(key)) {
                    tally.set(key, [username])
                }
                else {
                    tally.get(key).push(username)
                }
            })
            this.selectedEvents.forEach((event) => {
                events[event] = {match: "", votes: 0}
            })

            tally.forEach((v, k) => {
                const count = v.length
                const [event, word] = k.split("-")
                if (count > events[event].votes) {
                    events[event] = {votes: count, match: word}
                }
            })
            for(const key of Object.keys(events)) {
                const event = key
                const matches = [events[key].match]
                this.$store.commit("EditEventMatch", {event, matches: matches[0] ? matches : []} )
            }
            this.lastVoteWinners = events
            this.votes = new Map()
            this.voting = false
        },
        copyEvents(){
            let text = "```ml\n"
            this.enabledEvents.forEach(event => {
                text += `${event.event} : "${event.matches.join(", ")}"\n`
            })
            text += "\n```"
            this.$copyText(text).then(() => {
                console.log("copied")
            }, () => {
                console.log("failed to copy")
            })

        },
        onCopy(){
            console.log("COPY SUCC")
        },
        onCopyError(){
            console.log("COPY FAIL")
        },
        sendWebhook()
        {
            let fields = [
                { name:"1", value: "", inline:true},
                { name:"2", value: "", inline:true},
                { name:"3", value: "", inline:true}
            ]
            let count = 0
            this.enabledEvents.forEach(event => {
                let text = `**${event.event}**\n${event.matches.map(w => ("* " + w)).join("\n")}\n`
                fields[count].value += text
                count ++
                if (count == 3) { count = 0}
            })
            console.log(fields)
            console.log(`${fields[0].value.length} ${fields[1].value.length} ${fields[2].value.length}`)
            const data = {
            "content": "",
            "tts": false,
            "embeds": [
                    {
                    "description": "",
                    "fields": fields
                    }
                ]
            }
            let config = {
                method: "POST",
                url: this.webhookURL,
                headers: { "Content-Type": "application/json" },
                data
            }
            axios(config).then(() => {
                console.log("Webhook SENT")
            },
            () => {
                console.log("Failed to send webhook")
            })

        }
    }
}
</script>
