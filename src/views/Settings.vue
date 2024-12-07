<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="deep-purple" flat>
        <v-toolbar-title>
          Settings
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-select v-model="selected" :items="tags" item-text="region" item-value="id" label="Select"
          @change="ChangeLocale">

        </v-select>
        <v-btn :loading="resetting" :disabled="resetting" color="error" @click="ResetToDefault">Reset to Default</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>

export default {
  name: 'Settings',
  data() {
    return {
      selected: "en-US",
      resetting: false,
      tags: [
        { id: "ar-SA", region: "Arabic Saudi Arabia" },
        { id: "bn-BD", region: "Bangla Bangladesh" },
        { id: "bn-IN", region: "Bangla India" },
        { id: "cs-CZ", region: "Czech Czech Republic" },
        { id: "da-DK", region: "Danish Denmark" },
        { id: "de-AT", region: "German Austria" },
        { id: "de-CH", region: "German Switzerland" },
        { id: "de-DE", region: "German Germany" },
        { id: "el-GR", region: "Greek Greece" },
        { id: "en-AU", region: "English Australia" },
        { id: "en-CA", region: "English Canada" },
        { id: "en-GB", region: "English United Kingdom" },
        { id: "en-IE", region: "English Ireland" },
        { id: "en-IN", region: "English India" },
        { id: "en-NZ", region: "English New Zealand" },
        { id: "en-US", region: "English United States" },
        { id: "en-ZA", region: "English South Africa" },
        { id: "es-AR", region: "Spanish Argentina" },
        { id: "es-CL", region: "Spanish Chile" },
        { id: "es-CO", region: "Spanish Columbia" },
        { id: "es-ES", region: "Spanish Spain" },
        { id: "es-MX", region: "Spanish Mexico" },
        { id: "es-US", region: "Spanish United States" },
        { id: "fi-FI", region: "Finnish Finland" },
        { id: "fr-BE", region: "French Belgium" },
        { id: "fr-CA", region: "French Canada" },
        { id: "fr-CH", region: "French Switzerland" },
        { id: "fr-FR", region: "French France" },
        { id: "he-IL", region: "Hebrew Israel" },
        { id: "hi-IN", region: "Hindi India" },
        { id: "hu-HU", region: "Hungarian	Hungary" },
        { id: "id-ID", region: "Indonesian Indonesia" },
        { id: "it-CH", region: "Italian Switzerland" },
        { id: "it-IT", region: "Italian Italy" },
        { id: "ja-JP", region: "Japanese Japan" },
        { id: "ko-KR", region: "Korean Republic of Korea" },
        { id: "nl-BE", region: "Dutch Belgium" },
        { id: "nl-NL", region: "Dutch The Netherlands" },
        { id: "no-NO", region: "Norwegian Norway" },
        { id: "pl-PL", region: "Polish Poland" },
        { id: "pt-BR", region: "Portugese Brazil" },
        { id: "pt-PT", region: "Portugese Portugal" },
        { id: "ro-RO", region: "Romanian Romania" },
        { id: "ru-RU", region: "Russian Russian Federation" },
        { id: "sk-SK", region: "Slovak Slovakia" },
        { id: "sv-SE", region: "Swedish Sweden" },
        { id: "ta-IN", region: "Tamil India" },
        { id: "ta-LK", region: "Tamil Sri Lanka" },
        { id: "th-TH", region: "Thai Thailand" },
        { id: "tr-TR", region: "Turkish Turkey" },
        { id: "zh-CN", region: "Chinese China" },
        { id: "zh-HK", region: "Chinese Hong Kong" },
        { id: "zh-TW", region: "Chinese Taiwan" },
      ]
    }
  },
  created() {
    this.selected = this.$store.state.lang
  },
  methods: {
    ChangeLocale() {
      this.$store.commit("UpdateLocale", this.selected)
    },
    ResetToDefault() {
      this.resetting = true
      this.$store.commit("Reset")
      setTimeout(() => {
        this.resetting = false
      }, 500);
    }
  }
}
</script>
