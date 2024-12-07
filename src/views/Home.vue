<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="deep-purple" flat>
        <v-toolbar-title>
          Transcript
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-virtual-scroll height="175" item-height="25" :items="transcript">
          <template v-slot:default="{ item }">
            <p v-html="item.text"></p>
          </template>
        </v-virtual-scroll>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    transcript() {
      return this.$store.state.transcript
    }
  },
}
</script>
