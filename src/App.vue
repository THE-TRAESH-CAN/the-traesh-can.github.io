<template>
    <v-app>
        <!----------------------- N I C E -->
        <v-app-bar app dark height="69px">
            <div class="d-flex align-center">
                <v-img alt="PowerWords yeeehaw" class="mt-1 pt-auto" contain min-width="100" src="./assets/pw1.png"
                    width="169" />
            </div>

            <v-spacer></v-spacer>

            <v-btn :to="'/'" text>
                <span class="mr-2">Home</span>
            </v-btn>
            <v-btn :to="'/events'" text>
                <span class="mr-2">Events</span>
            </v-btn>
            <v-btn :to="'/twitch'" text>
                <span class="mr-2">Twitch</span>
            </v-btn>
            <v-btn :to="'/settings'" text>
                <span class="mr-2">Settings</span>
            </v-btn>
            <!-- 
                <v-btn :to="'/twitch'" text>
                    <span class="mr-2">Twitch</span>
                </v-btn>
               
                <v-btn :to="'/faq'" text>
                    <span class="mr-2">FAQ</span>
                </v-btn>
            -->
        </v-app-bar>

        <v-main>
            <router-view @twitchConnect="twitchConnect" />
        </v-main>
    </v-app>
</template>

<script>
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
import {Chat} from 'twitch-js';
//import axios from "axios"
export default {
    name: 'App',
    beforeCreate() {
        this.$store.commit("VersionCheck")
    },
    created() {
        this.twitchChat = new Chat({})
        
        this.twitchChat.connect().then(() => {
            this.twitchChat.on("*", (data) => {
                
                console.log(Object.keys(data))
                const { message, username } = data

                if (message.toLowerCase().startsWith("!pword"))
                    this.$TRAESH.$emit("twitchVote", {message, username})
                console.log({ message, username })
                
            })
        })
        this.$TRAESH.$on("twitchConnect", async (channel) => {
            if (this.twitchChat._getChannels().length > 0) {
                await this.leaveChannels()
            }
            this.twitchConnect(channel)
        })

        this.reconnectSock()

        this.speechListener(true)
    },
    data: () => ({
        twitchChat: null,
        speech: null,
        ws: null,
        fastMode: true,
        lastReset: "",
        cooldowns: new Map()
    }),
    computed: {
        enabledEvents() {
            return this.$store.getters.enabledEvents
        },
        lang() {
            return this.$store.state.lang
        }
    },
    mounted() {
        /*
        axios.post("/powerwords/api/update", {
            words: this.enabledEvents
        })
        */
    },
    methods: {
        getConfidentest(results) {
            for (let index = results.length - 1; index >= 0; --index) {
                const element = results[index];
                if (element[0].confidence >= 0.7) { return {res:element[0], final: element.isFinal} }
            }
            return {res: {transcript: ""}, final:false}
        },
        speechListener(interimResults = false) {
            this.speech = new SpeechRecognition
            this.speech.continuous = true
            this.speech.interimResults = interimResults
            this.speech.lang = this.lang
            this.speech.alreadyMatched = []
            this.speech.wordMatches = []
            this.speech.onresult = (event) => {
                const {res, final} = this.getConfidentest(event.results)
                const compare = res.transcript.trim().toLowerCase()
                if (final && this.lastReset !== compare) {
                    this.matchEvent(res.transcript)
                    this.speech.alreadyMatched = []
                    this.lastReset = res.transcript.trim().toLowerCase()
                    this.$store.commit("pushTranscript", {transcript: res.transcript, matches: this.speech.wordMatches})
                    return
                }
                else if (final && this.lastReset === compare) {
                    return
                }
                //const res = event.results[event.results.length - 1][0]
                if (typeof res !== "undefined" && res.transcript) {
                    console.log(res.transcript)
                    this.matchEvent(res.transcript)
                }

            }
            this.speech.onend = () => {
                this.speech.alreadyMatched = []
                this.speech.wordMatches = []
                this.speech.start()
            }

            this.speech.start()
        },
        abortSpeech() {
            this.speech.abort()
            this.speech.onresult = null
            this.speech.onend = null
            this.speech = null
        },
        matchEvent(transcript) {
            const enabledEvents = this.$store.getters.enabledEvents
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({
                    event: "_speech",
                    transcript
                }))
            }

            for (const entry of enabledEvents) {
                for (const match of entry.matches) {
                    const matchRegex = new RegExp(match, "g")
                    const matches = transcript.toLowerCase().match(matchRegex)
                    if (!matches) {
                        continue
                    }
                    const matchIndex = `${entry.event}-${match}-${matches.length}`
                    if (this.speech.alreadyMatched.indexOf(matchIndex) > -1) {
                        continue
                    }
                    /*
                    if (this.fastMode && !this.cooldowns.has(match)) {
                        this.cooldowns.set(match, 0)
                    }
                    */
                    console.log(`SEND ${entry.event}`)
                    if (this.ws.readyState === WebSocket.OPEN) {
                        this.ws.send(JSON.stringify({
                            event: entry.event,
                            sliders: entry.sliders,
                            checkboxes: entry.activeCheckboxes,
                            transcript
                        }))
                    }
                    //this.cooldowns.set(match, Date.now() + 15000)
                    this.speech.alreadyMatched.push(matchIndex)
                    if (this.speech.wordMatches.indexOf(match) === -1) {
                        this.speech.wordMatches.push(match)
                    }
                }

            }

            if (transcript.length >= 160) {
                this.abortSpeech()
                this.speechListener(true)
            }
        },
        twitchConnect(channel) {
            this.twitchChat.join(channel).then(() => {
                this.$TRAESH.$emit("twitchConnected", "")
                console.log()
            })
        },
        leaveChannels() {
            const queue = this.twitchChat._getChannels().map((v) => {
                return this.twitchChat.part(v.substr(1))
            })
            return Promise.all(queue).then(() => {
                console.log("left all")
            })
        },
        openSock() {
            console.log("Connected... ?")
        },
        errorSock() {
            console.log("Waiting for game or something went very wrong.")
        },
        reconnectSock() {
            setTimeout(() => {
                this.ws = new WebSocket("ws://localhost:6969")
                this.ws.onopen = this.openSock
                this.ws.onclose = this.reconnectSock
                this.ws.onerror = this.errorSock
            }, 3000)
        }
    }
}
</script>
