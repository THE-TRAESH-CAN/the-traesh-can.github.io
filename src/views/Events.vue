<template>
    <v-container fluid>
        <v-card>
            <v-toolbar color="deep-purple" flat>
                <v-toolbar-title>Events</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <!-- add new -->
                <v-row>
                    <v-col cols="7" sm="8" md="10">
                        <v-text-field label="Event name" v-model="eventName" outlined></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn @click="AddEvent" block bottom x-large :disabled="!validEvent">
                            <span class="mr-2">Add</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-divider></v-divider>
                    </v-col>
                </v-row>

                <v-row class="flex-nowrap flex-shrink-0">
                    <v-navigation-drawer clipped permanent>
                        <v-toolbar color="deep-purple" extended>
                            <v-toolbar-title>Events</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <template v-slot:extension>
                                <v-text-field label="Search..." v-model="filterKey"></v-text-field>
                            </template>
                        </v-toolbar>

                        <v-list dense nav>
                            <v-list-item v-for="item in gameEvents" :key="item.event" link>
                                <v-list-item-content @click="SelectEvent(item)">
                                    <v-list-item-title>{{ item.event }} {{ item.enabled ? "" : "[disabled]" }}</v-list-item-title>
                                    <v-list-item-subtitle v-text="GetMatches(item.matches)"></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-navigation-drawer>
                    <v-row justify="center" v-if="selectedEvent">
                        <v-col cols="7" sm="8" md="10">
                            <v-card id="selected-event">
                                <v-toolbar color="deep-purple" flat>
                                    <v-checkbox
                                        @click="EditEvent()"
                                        class="mt-6"
                                        color="green accent-3"
                                        v-model="tempEvent.enabled"
                                    ></v-checkbox>
                                    <v-toolbar-title>{{ selectedEvent }}</v-toolbar-title>
                                    <v-spacer></v-spacer>

                                    <v-btn icon text @click="ResetEvent()">
                                        <span>Reset</span>
                                    </v-btn>

                                    <v-btn icon text @click="RemoveEvent()">
                                        <v-icon>fas fa-trash-alt</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <v-card-text>
                                    <v-row class="flex-column">
                                        <v-col
                                            class="justify-center"
                                            cols="12"
                                            v-for="(item, index) in tempEvent.matches"
                                            :key="index"
                                        >
                                            <v-text-field
                                                label="Match"
                                                disabled
                                                v-model="tempEvent.matches[index]"
                                                hide-details="auto"
                                            >
                                                <v-btn
                                                    slot="prepend"
                                                    icon
                                                    text
                                                    @click="DeleteIndex(index)"
                                                >
                                                    <v-icon>fas fa-trash-alt</v-icon>
                                                </v-btn>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col class="justify-center" cols="12">
                                            <v-text-field
                                                label="Match"
                                                v-model="tempMatch"
                                                hide-details="auto"
                                            >
                                                <v-btn slot="prepend" icon text @click="AddMatch()">
                                                    <v-icon>fas fa-plus</v-icon>
                                                </v-btn>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-container fluid>
                                        <v-row >
                                            <v-col cols="4" v-for="box in tempEvent.checkboxes" :key="tempEvent.event+'-'+box">
                                                <v-checkbox v-model="tempEvent.activeCheckboxes" :value="box" :label="box" @change="EditEvent"></v-checkbox>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <v-row>
                                        <v-col cols="12" v-for="(slider, idx) in tempEvent.sliders" :key="tempEvent.event+'-'+slider.label">
                                            <v-slider
                                                :key="tempEvent.event+'-'+slider.label"
                                                v-model="tempEvent.sliders[idx].value"
                                                @change="SaveSliderChange"
                                                :label="slider.label"
                                                :min="slider.min"
                                                :max="slider.max"
                                                thumb-label="always"
                                                :step="slider.step || 1"
                                                :tick-labels="slider.ticks || []"
                                                :ticks="typeof(slider.ticks) !== 'undefined'"
                                            >
                                            </v-slider>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

export default {
    name: 'Events',
    data() {
        return {
            eventName: "",
            filterKey: "",
            selectedEvent: "",
            tempMatch: "",
            tempEvent: {},
            fastMode: false
        }
    },
    created() {
        this.SelectEvent(this.gameEvents[0])
    },
    computed: {
        validEvent() {
            return !!this.eventName
        },
        gameEvents() {
            const filter = this.filterKey.toLowerCase()
            return this.$store.state.events.filter(entry => {
                return entry.event.toLowerCase().includes(filter)
            }).sort((a, b) => a.event.localeCompare(b.event))
        }
    },
    methods: {
        SaveSliderChange(){
            //this.tempEvent.duration = val
            this.EditEvent()
        },
        FastModeCb(event) {
            this.$TRAESH.$emit("fastmode", event)
        },
        AddEvent() {
            if (!this.eventName) { return }
            this.$store.commit("AddEvent", this.eventName)
            this.eventName = ""
        },
        GetMatches(matches) {
            return matches.join(",")
        },
        SelectEvent(evt) {
            this.selectedEvent = evt.event
            this.CopyEvent(this.selectedEvent)
            document.getElementById("selected-event")?.scrollIntoView(false)
        },
        CopyEvent(name) {
            for (const entry of this.$store.state.events) {
                if (entry.event == name) {
                    this.tempEvent = JSON.parse(JSON.stringify(entry))
                }
            }
        },
        DeleteIndex(index) {
            let matches = this.tempEvent.matches
            matches.splice(index, 1)
            this.$set(this.tempEvent, "matches", matches)
            this.EditEvent()
        },
        AddMatch() {
            let matches = this.tempEvent.matches
            matches.push(this.tempMatch.toLowerCase())
            this.tempMatch = ""
            this.$set(this.tempEvent, "matches", matches)
            this.EditEvent()
        },
        RemoveEvent() {
            this.$store.commit("RemoveEvent", this.selectedEvent)
            this.selectedEvent = ""
            this.tempEvent = {}
        },
        ResetEvent() {
            this.$store.commit("ResetEvent", this.selectedEvent)
            this.selectedEvent = ""
        },
        EditEvent() {
            this.$store.commit("EditEvent", JSON.parse(JSON.stringify(this.tempEvent)))
            //hee hee hoo hoo haa haa
        }
    }
}
</script>
