<template>
    <v-container fluid>
        <v-card>
            <v-toolbar color="deep-purple" flat>
                <v-toolbar-title>
                    <v-icon :color="iconColor">fab fa-twitch</v-icon>Twitch Settings
                </v-toolbar-title>
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

                    <p v-for="item in enabledEvents" :key="item.event">{{ item.event }}</p>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

export default {
    name: 'Twitch',
    data() {
        return {
            channelName: "",
            connected: false,
            loading: false
        }
    },
    beforeCreate() {
        this.$TRAESH.$on("twitchConnected", () => {
            this.loading = false
            this.connected = true
        })
    },
    computed: {
        iconColor() {
            if (this.connected) {
                return "green accent-3"
            }
            else {
                return "red lighten-1"
            }
        },
        enabledEvents() {
            return this.$store.getters.enabledEvents
        }
    },
    methods: {
        connect() {
            this.loading = true
            this.$TRAESH.$emit("twitchConnect", this.channelName.toLowerCase())
        }
    }
}
</script>
