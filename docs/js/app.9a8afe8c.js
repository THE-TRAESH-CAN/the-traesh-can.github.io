(function(e){function t(t){for(var a,s,r=t[0],c=t[1],l=t[2],h=0,v=[];h<r.length;h++)s=r[h],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&v.push(o[s][0]),o[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(t);while(v.length)v.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var c=n[r];0!==o[c]&&(a=!1)}a&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},o={app:0},i=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"470e":function(e,t,n){e.exports=n.p+"img/pw1.95bdef82.png"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-app-bar",{attrs:{app:"",dark:"",height:"69px"}},[a("div",{staticClass:"d-flex align-center"},[a("v-img",{staticClass:"mt-1 pt-auto",attrs:{alt:"PowerWords yeeehaw",contain:"","min-width":"100",src:n("470e"),width:"169"}})],1),a("v-spacer"),a("v-btn",{attrs:{to:"/",text:""}},[a("span",{staticClass:"mr-2"},[e._v("Home")])]),a("v-btn",{attrs:{to:"/events",text:""}},[a("span",{staticClass:"mr-2"},[e._v("Events")])]),a("v-btn",{attrs:{to:"/twitch",text:""}},[a("span",{staticClass:"mr-2"},[e._v("Twitch")])]),a("v-btn",{attrs:{to:"/settings",text:""}},[a("span",{staticClass:"mr-2"},[e._v("Settings")])])],1),a("v-main",[a("router-view",{on:{twitchConnect:e.twitchConnect}})],1)],1)},i=[],s=n("b85c"),r=n("1da1"),c=(n("96cf"),n("b64b"),n("2ca0"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("498a"),n("4d63"),n("ac1f"),n("25f0"),n("466d"),n("99af"),n("a15b"),n("d81d"),n("4095")),l=window.SpeechRecognition||window.webkitSpeechRecognition,d={name:"App",created:function(){var e=this;this.twitchChat=new c["a"]({}),this.twitchChat.connect().then((function(){e.twitchChat.on("*",(function(t){console.log(Object.keys(t));var n=t.message,a=t.username;n.toLowerCase().startsWith("!pword")&&e.$TRAESH.$emit("twitchVote",{message:n,username:a}),console.log({message:n,username:a})}))})),this.$TRAESH.$on("twitchConnect",function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.twitchChat._getChannels().length>0)){t.next=3;break}return t.next=3,e.leaveChannels();case 3:e.twitchConnect(n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),this.reconnectSock(),this.speechListener(!0)},data:function(){return{twitchChat:null,speech:null,ws:null,fastMode:!0,lastReset:"",cooldowns:new Map}},computed:{enabledEvents:function(){return this.$store.getters.enabledEvents},lang:function(){return this.$store.state.lang}},mounted:function(){},methods:{getConfidentest:function(e){for(var t=e.length-1;t>=0;--t){var n=e[t];if(n[0].confidence>=.7)return{res:n[0],final:n.isFinal}}return{res:{transcript:""},final:!1}},speechListener:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.speech=new l,this.speech.continuous=!0,this.speech.interimResults=t,this.speech.lang=this.lang,this.speech.alreadyMatched=[],this.speech.wordMatches=[],this.speech.onresult=function(t){var n=e.getConfidentest(t.results),a=n.res,o=n.final,i=a.transcript.trim().toLowerCase();if(o&&e.lastReset!==i)return e.matchEvent(a.transcript),e.speech.alreadyMatched=[],e.lastReset=a.transcript.trim().toLowerCase(),void e.$store.commit("pushTranscript",{transcript:a.transcript,matches:e.speech.wordMatches});o&&e.lastReset===i||"undefined"!==typeof a&&a.transcript&&(console.log(a.transcript),e.matchEvent(a.transcript))},this.speech.onend=function(){e.speech.alreadyMatched=[],e.speech.wordMatches=[],e.speech.start()},this.speech.start()},abortSpeech:function(){this.speech.abort(),this.speech.onresult=null,this.speech.onend=null,this.speech=null},matchEvent:function(e){var t=this.$store.getters.enabledEvents;this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:"_speech",transcript:e}));var n,a=Object(s["a"])(t);try{for(a.s();!(n=a.n()).done;){var o,i=n.value,r=Object(s["a"])(i.matches);try{for(r.s();!(o=r.n()).done;){var c=o.value,l=new RegExp(c,"g"),d=e.toLowerCase().match(l);if(d){var h="".concat(i.event,"-").concat(c,"-").concat(d.length);this.speech.alreadyMatched.indexOf(h)>-1||(console.log("SEND ".concat(i.event)),this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({event:i.event,duration:1e3*i.duration,transcript:e})),this.speech.alreadyMatched.push(h),-1===this.speech.wordMatches.indexOf(c)&&this.speech.wordMatches.push(c))}}}catch(v){r.e(v)}finally{r.f()}}}catch(v){a.e(v)}finally{a.f()}e.length>=160&&(this.abortSpeech(),this.speechListener(!0))},twitchConnect:function(e){var t=this;this.twitchChat.join(e).then((function(){t.$TRAESH.$emit("twitchConnected",""),console.log()}))},leaveChannels:function(){var e=this,t=this.twitchChat._getChannels().map((function(t){return e.twitchChat.part(t.substr(1))}));return Promise.all(t).then((function(){console.log("left all")}))},openSock:function(){console.log("Connected... ?")},errorSock:function(){console.log("Waiting for game or something went very wrong.")},reconnectSock:function(){var e=this;setTimeout((function(){e.ws=new WebSocket("ws://localhost:6969"),e.ws.onopen=e.openSock,e.ws.onclose=e.reconnectSock,e.ws.onerror=e.errorSock}),3e3)}}},h=d,v=n("2877"),u=Object(v["a"])(h,o,i,!1,null,null,null),f=u.exports,m=n("8c4f"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-card",[n("v-toolbar",{attrs:{color:"deep-purple",flat:""}},[n("v-toolbar-title",[e._v(" Transcript ")])],1),n("v-card-text",[n("v-virtual-scroll",{attrs:{height:"175","item-height":"25",items:e.transcript},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.item;return[n("p",{domProps:{innerHTML:e._s(a.text)}})]}}])})],1)],1)],1)},b=[],g={name:"Home",computed:{transcript:function(){return this.$store.state.transcript}}},w=g,E=Object(v["a"])(w,p,b,!1,null,null,null),k=E.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-card",[n("v-toolbar",{attrs:{color:"deep-purple",flat:""}},[n("v-toolbar-title",[e._v("Events")])],1),n("v-card-text",[n("v-row",[n("v-col",{attrs:{cols:"7",sm:"8",md:"10"}},[n("v-text-field",{attrs:{label:"Event name",outlined:""},model:{value:e.eventName,callback:function(t){e.eventName=t},expression:"eventName"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-btn",{attrs:{block:"",bottom:"","x-large":"",disabled:!e.validEvent},on:{click:e.AddEvent}},[n("span",{staticClass:"mr-2"},[e._v("Add")])])],1),n("v-col",[n("v-divider")],1)],1),n("v-row",{staticClass:"flex-nowrap flex-shrink-0"},[n("v-navigation-drawer",{attrs:{clipped:"",permanent:""}},[n("v-toolbar",{attrs:{color:"deep-purple",extended:""},scopedSlots:e._u([{key:"extension",fn:function(){return[n("v-text-field",{attrs:{label:"Search..."},model:{value:e.filterKey,callback:function(t){e.filterKey=t},expression:"filterKey"}})]},proxy:!0}])},[n("v-toolbar-title",[e._v("Events")]),n("v-spacer")],1),n("v-list",{attrs:{dense:"",nav:""}},e._l(e.gameEvents,(function(t){return n("v-list-item",{key:t.event,attrs:{link:""}},[n("v-list-item-content",{on:{click:function(n){return e.SelectEvent(t)}}},[n("v-list-item-title",[e._v(e._s(t.event)+" "+e._s(t.enabled?"":"[disabled]"))]),n("v-list-item-subtitle",{domProps:{textContent:e._s(e.GetMatches(t.matches))}})],1)],1)})),1)],1),e.selectedEvent?n("v-row",{attrs:{justify:"center"}},[n("v-col",{attrs:{cols:"7",sm:"8",md:"10"}},[n("v-card",{attrs:{id:"selected-event"}},[n("v-toolbar",{attrs:{color:"deep-purple",flat:""}},[n("v-checkbox",{staticClass:"mt-6",attrs:{color:"green accent-3"},on:{click:function(t){return e.EditEvent()}},model:{value:e.tempEvent.enabled,callback:function(t){e.$set(e.tempEvent,"enabled",t)},expression:"tempEvent.enabled"}}),n("v-toolbar-title",[e._v(e._s(e.selectedEvent))]),n("v-spacer"),n("v-btn",{attrs:{icon:"",text:""},on:{click:function(t){return e.RemoveEvent()}}},[n("v-icon",[e._v("fas fa-trash-alt")])],1)],1),n("v-card-text",[n("v-row",{staticClass:"flex-column"},e._l(e.tempEvent.matches,(function(t,a){return n("v-col",{key:a,staticClass:"justify-center",attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:"Match",disabled:"","hide-details":"auto"},model:{value:e.tempEvent.matches[a],callback:function(t){e.$set(e.tempEvent.matches,a,t)},expression:"tempEvent.matches[index]"}},[n("v-btn",{attrs:{slot:"prepend",icon:"",text:""},on:{click:function(t){return e.DeleteIndex(a)}},slot:"prepend"},[n("v-icon",[e._v("fas fa-trash-alt")])],1)],1)],1)})),1),n("v-row",[n("v-col",{staticClass:"justify-center",attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:"Match","hide-details":"auto"},model:{value:e.tempMatch,callback:function(t){e.tempMatch=t},expression:"tempMatch"}},[n("v-btn",{attrs:{slot:"prepend",icon:"",text:""},on:{click:function(t){return e.AddMatch()}},slot:"prepend"},[n("v-icon",[e._v("fas fa-plus")])],1)],1)],1)],1),n("v-row",[n("v-col",[n("v-slider",{attrs:{label:"Duration","thumb-label":"always"},on:{change:e.SaveDuration},model:{value:e.tempEvent.duration,callback:function(t){e.$set(e.tempEvent,"duration",t)},expression:"tempEvent.duration"}})],1)],1)],1)],1)],1)],1):e._e()],1)],1)],1)],1)},S=[],y=(n("4e82"),n("4de4"),n("caad"),n("2532"),n("a434"),{name:"Events",data:function(){return{eventName:"",filterKey:"",selectedEvent:"",tempMatch:"",tempEvent:{},fastMode:!1}},created:function(){this.SelectEvent(this.gameEvents[0])},computed:{validEvent:function(){return!!this.eventName},gameEvents:function(){var e=this.filterKey.toLowerCase();return this.$store.state.events.filter((function(t){return t.event.toLowerCase().includes(e)})).sort((function(e,t){return e.event.localeCompare(t.event)}))}},methods:{SaveDuration:function(e){this.tempEvent.duration=e,this.EditEvent()},FastModeCb:function(e){this.$TRAESH.$emit("fastmode",e)},AddEvent:function(){this.eventName&&(this.$store.commit("AddEvent",this.eventName),this.eventName="")},GetMatches:function(e){return e.join(",")},SelectEvent:function(e){var t;this.selectedEvent=e.event,this.CopyEvent(this.selectedEvent),null===(t=document.getElementById("selected-event"))||void 0===t||t.scrollIntoView(!1)},CopyEvent:function(e){var t,n=Object(s["a"])(this.$store.state.events);try{for(n.s();!(t=n.n()).done;){var a=t.value;a.event==e&&(this.tempEvent=JSON.parse(JSON.stringify(a)))}}catch(o){n.e(o)}finally{n.f()}},DeleteIndex:function(e){var t=this.tempEvent.matches;t.splice(e,1),this.$set(this.tempEvent,"matches",t),this.EditEvent()},AddMatch:function(){var e=this.tempEvent.matches;e.push(this.tempMatch.toLowerCase()),this.tempMatch="",this.$set(this.tempEvent,"matches",e),this.EditEvent()},RemoveEvent:function(){this.$store.commit("RemoveEvent",this.selectedEvent),this.selectedEvent="",this.tempEvent={}},EditEvent:function(){this.$store.commit("EditEvent",JSON.parse(JSON.stringify(this.tempEvent)))}}}),x=y,R=Object(v["a"])(x,C,S,!1,null,null,null),_=R.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-card",[n("v-toolbar",{attrs:{color:"deep-purple",flat:""}},[n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{attrs:{cols:"9"}},[n("v-toolbar-title",[n("v-icon",{attrs:{color:e.iconColor}},[e._v("fab fa-twitch")]),e._v("Twitch Settings ")],1)],1),n("v-col",{attrs:{cols:"1"}},[n("v-btn",{attrs:{block:"",bottom:""},on:{click:e.copyEvents}},[n("span",{staticClass:"mr-2"},[e._v("COPY EVENTS")])])],1),n("v-col",{attrs:{cols:"1"}}),n("v-col",{attrs:{cols:"1"}},[e.webhookURL?n("v-btn",{attrs:{block:"",bottom:""},on:{click:e.sendWebhook}},[n("span",{staticClass:"mr-2"},[e._v("TO DISCORD")])]):e._e()],1)],1)],1)],1),n("v-card-text",[n("v-row",[n("v-col",{attrs:{cols:"7",sm:"8",md:"10"}},[n("v-text-field",{attrs:{label:"Channel name",outlined:""},model:{value:e.channelName,callback:function(t){e.channelName=t},expression:"channelName"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-btn",{attrs:{block:"",bottom:"","x-large":"",loading:e.loading},on:{click:e.connect}},[n("span",{staticClass:"mr-2"},[e._v("Connect")])])],1)],1),n("v-divider"),n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{attrs:{cols:"3"}},e._l(e.allEvents,(function(t){return n("v-checkbox",{key:t.event,attrs:{label:t.event,value:t.event},on:{change:e.UpdateSelectedEvent},model:{value:e.selectedEvents,callback:function(t){e.selectedEvents=t},expression:"selectedEvents"}})})),1),n("v-divider",{attrs:{vertical:""}}),n("v-col",{attrs:{cols:"9"}},[n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-slider",{attrs:{"hide-details":"","thumb-label":"always",min:"1",max:"120",label:"Voting time"},model:{value:e.votingTime,callback:function(t){e.votingTime=t},expression:"votingTime"}}),n("v-range-slider",{attrs:{"hide-details":"","thumb-label":"always",min:"3",max:"300",label:"Word Length"},model:{value:e.range,callback:function(t){e.range=t},expression:"range"}}),n("v-col",{attrs:{cols:"3"}},[n("v-btn",{attrs:{block:"",bottom:"","x-large":"",loading:e.voting},on:{click:e.startVoting}},[n("span",{staticClass:"mr-2"},[e._v("START VOTING")])])],1)],1)],1),n("v-divider"),n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",[n("h1",[e._v("BLACKLIST")])])],1),n("v-row",[n("v-col",{attrs:{cols:"3"}},[n("v-text-field",{attrs:{label:"Blacklist",outlined:""},model:{value:e.blacklistWord,callback:function(t){e.blacklistWord=t},expression:"blacklistWord"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-btn",{attrs:{block:"",bottom:"","x-large":"",loading:e.loading},on:{click:e.AddBlacklistWord}},[n("span",{staticClass:"mr-2"},[e._v("Add")])])],1)],1),n("span",[e._v(e._s(e.blacklist.join(", ")))])],1),n("v-divider"),n("v-container",[n("v-row",[n("v-col",[n("h1",[e._v("Voting - YWH => YOUR WORD HERE")])])],1),n("v-row",e._l(e.selectedEvents,(function(t){return n("v-col",{key:t,attrs:{cols:"4"}},[n("p",[e._v("!pword "+e._s(t)+" YWH")])])})),1)],1),n("v-divider"),e.hasWinners?n("v-container",[n("v-row",[n("v-col",[n("h1",[e._v("WINNERS")])])],1),n("v-row",e._l(e.winners,(function(t){return n("v-col",{key:t,attrs:{cols:"4"}},[n("p",[e._v(e._s(t)+" - "+e._s(e.lastVoteWinners[t].votes)+" votes - "+e._s(e.lastVoteWinners[t].match))])])})),1)],1):e._e()],1)],1)],1),n("v-spacer")],1)],1)],1)},L=[],O=n("3835"),$=n("4f96"),U=(n("1276"),n("159b"),n("fb6a"),n("bc3a")),M=n.n(U),N={name:"Twitch",data:function(){return{channelName:"",connected:!1,loading:!1,votingTime:60,voting:!1,blacklistWord:"",votes:new Map,range:[3,128],lastVoteWinners:{},voteInterval:null}},beforeCreate:function(){var e=this;this.$TRAESH.$on("twitchConnected",(function(){e.loading=!1,e.connected=!0})),this.$TRAESH.$on("twitchVote",(function(t){e.voting&&(e.handleVote({username:t.username,message:t.message.split(" ").filter((function(e){return e})).join(" ").trim()}),console.log(t))})),console.log("twitch beforecreate")},computed:{selectedEvents:{get:function(){return this.$store.getters.selectedEvents},set:function(){}},uncasedEvents:function(){var e={};return this.selectedEvents.forEach((function(t){e[t]=t,e[t.toLowerCase()]=t})),e},iconColor:function(){return this.connected?"green accent-3":"red lighten-1"},allEvents:function(){return this.$store.getters.allEvents},enabledEvents:function(){return this.$store.getters.enabledEvents},minWordLength:function(){return this.range[0]},maxWordLength:function(){return this.range[1]},hasWinners:function(){return Object.keys(this.lastVoteWinners).length>0},winners:function(){return Object.keys(this.lastVoteWinners)},webhookURL:function(){return this.$store.state.webhookURL},blacklist:function(){return this.$store.state.blacklist}},methods:{connect:function(){this.loading=!0,this.$TRAESH.$emit("twitchConnect",this.channelName.toLowerCase())},UpdateSelectedEvent:function(e){console.log({e:e}),this.$store.commit("UpdateSelectedEvent",e)},startVoting:function(){var e=this;this.voting=!0,this.voteInterval=setInterval((function(){e.votingTime-=1,e.votingTime<=1&&(e.endVoting(),clearInterval(e.voteInterval))}),1e3)},AddBlacklistWord:function(){this.$store.commit("UpdateBlacklist",this.blacklistWord)},handleVote:function(e){var t=e.message,n=e.username,a=t.split(" "),o=Object($["a"])(a),i=o[0],s=o[1],r=o.slice(2),c=this.uncasedEvents[s]||"",l=r.join(" ").toLowerCase(),d=l.length;-1!==this.selectedEvents.indexOf(c)&&"undefined"!=typeof i&&"undefined"!=typeof c&&0!==r.length&&(d<this.minWordLength||d>this.maxWordLength||this.blacklist.indexOf(l)>-1||this.votes.set("".concat(c,"-").concat(n),l))},endVoting:function(){var e={},t=new Map;this.votes.forEach((function(e,n){var a=n.split("-"),o=Object(O["a"])(a,2),i=o[0],s=o[1],r="".concat(i,"-").concat(e);t.has(r)?t.get(r).push(s):t.set(r,[s])})),this.selectedEvents.forEach((function(t){e[t]={match:"",votes:0}})),t.forEach((function(t,n){var a=t.length,o=n.split("-"),i=Object(O["a"])(o,2),s=i[0],r=i[1];a>e[s].votes&&(e[s]={votes:a,match:r})}));for(var n=0,a=Object.keys(e);n<a.length;n++){var o=a[n],i=o,s=[e[o].match];this.$store.commit("EditEventMatch",{event:i,matches:s[0]?s:[]})}this.lastVoteWinners=e,this.votes=new Map,this.voting=!1},copyEvents:function(){var e="```ml\n";this.enabledEvents.forEach((function(t){e+="".concat(t.event,' : "').concat(t.matches.join(", "),'"\n')})),e+="\n```",this.$copyText(e).then((function(){console.log("copied")}),(function(){console.log("failed to copy")}))},onCopy:function(){console.log("COPY SUCC")},onCopyError:function(){console.log("COPY FAIL")},sendWebhook:function(){var e=[{name:"1",value:"",inline:!0},{name:"2",value:"",inline:!0},{name:"3",value:"",inline:!0}],t=0;this.enabledEvents.forEach((function(n){var a="**".concat(n.event,"**\n").concat(n.matches.map((function(e){return"* "+e})).join("\n"),"\n");e[t].value+=a,t++,3==t&&(t=0)})),console.log(e),console.log("".concat(e[0].value.length," ").concat(e[1].value.length," ").concat(e[2].value.length));var n={content:"",tts:!1,embeds:[{description:"",fields:e}]},a={method:"POST",url:this.webhookURL,headers:{"Content-Type":"application/json"},data:n};M()(a).then((function(){console.log("Webhook SENT")}),(function(){console.log("Failed to send webhook")}))}}},W=N,A=Object(v["a"])(W,T,L,!1,null,null,null),j=A.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-card",[n("v-toolbar",{attrs:{color:"deep-purple",flat:""}},[n("v-toolbar-title",[e._v(" Settings ")])],1),n("v-card-text",[n("v-select",{attrs:{items:e.tags,"item-text":"region","item-value":"id",label:"Select"},on:{change:e.ChangeLocale},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),n("v-row",[n("v-col",{attrs:{cols:"3"}},[n("v-text-field",{attrs:{label:"WEBHOOK URL",outlined:""},model:{value:e.webhookURL,callback:function(t){e.webhookURL=t},expression:"webhookURL"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-btn",{attrs:{block:"",bottom:"","x-large":""},on:{click:e.UpdateWebhookURL}},[n("span",{staticClass:"mr-2"},[e._v("Update")])])],1)],1),n("v-btn",{attrs:{loading:e.resetting,disabled:e.resetting,color:"error"},on:{click:e.ResetToDefault}},[e._v("Reset to Default")])],1)],1)],1)},H=[],B={name:"Settings",data:function(){return{selected:"en-US",resetting:!1,webhookURL:"",tags:[{id:"ar-SA",region:"Arabic Saudi Arabia"},{id:"bn-BD",region:"Bangla Bangladesh"},{id:"bn-IN",region:"Bangla India"},{id:"cs-CZ",region:"Czech Czech Republic"},{id:"da-DK",region:"Danish Denmark"},{id:"de-AT",region:"German Austria"},{id:"de-CH",region:"German Switzerland"},{id:"de-DE",region:"German Germany"},{id:"el-GR",region:"Greek Greece"},{id:"en-AU",region:"English Australia"},{id:"en-CA",region:"English Canada"},{id:"en-GB",region:"English United Kingdom"},{id:"en-IE",region:"English Ireland"},{id:"en-IN",region:"English India"},{id:"en-NZ",region:"English New Zealand"},{id:"en-US",region:"English United States"},{id:"en-ZA",region:"English South Africa"},{id:"es-AR",region:"Spanish Argentina"},{id:"es-CL",region:"Spanish Chile"},{id:"es-CO",region:"Spanish Columbia"},{id:"es-ES",region:"Spanish Spain"},{id:"es-MX",region:"Spanish Mexico"},{id:"es-US",region:"Spanish United States"},{id:"fi-FI",region:"Finnish Finland"},{id:"fr-BE",region:"French Belgium"},{id:"fr-CA",region:"French Canada"},{id:"fr-CH",region:"French Switzerland"},{id:"fr-FR",region:"French France"},{id:"he-IL",region:"Hebrew Israel"},{id:"hi-IN",region:"Hindi India"},{id:"hu-HU",region:"Hungarian\tHungary"},{id:"id-ID",region:"Indonesian Indonesia"},{id:"it-CH",region:"Italian Switzerland"},{id:"it-IT",region:"Italian Italy"},{id:"ja-JP",region:"Japanese Japan"},{id:"ko-KR",region:"Korean Republic of Korea"},{id:"nl-BE",region:"Dutch Belgium"},{id:"nl-NL",region:"Dutch The Netherlands"},{id:"no-NO",region:"Norwegian Norway"},{id:"pl-PL",region:"Polish Poland"},{id:"pt-BR",region:"Portugese Brazil"},{id:"pt-PT",region:"Portugese Portugal"},{id:"ro-RO",region:"Romanian Romania"},{id:"ru-RU",region:"Russian Russian Federation"},{id:"sk-SK",region:"Slovak Slovakia"},{id:"sv-SE",region:"Swedish Sweden"},{id:"ta-IN",region:"Tamil India"},{id:"ta-LK",region:"Tamil Sri Lanka"},{id:"th-TH",region:"Thai Thailand"},{id:"tr-TR",region:"Turkish Turkey"},{id:"zh-CN",region:"Chinese China"},{id:"zh-HK",region:"Chinese Hong Kong"},{id:"zh-TW",region:"Chinese Taiwan"}]}},created:function(){this.selected=this.$store.state.lang,this.webhookURL=this.$store.state.webhookURL},methods:{ChangeLocale:function(){this.$store.commit("UpdateLocale",this.selected)},ResetToDefault:function(){var e=this;this.resetting=!0,this.$store.commit("Reset"),setTimeout((function(){e.resetting=!1}),500)},UpdateWebhookURL:function(){this.$store.commit("UpdateWebhookURL",this.webhookURL)}}},P=B,D=Object(v["a"])(P,I,H,!1,null,null,null),V=D.exports;a["default"].use(m["a"]);var F=[{path:"/",name:"Home",component:k},{path:"/events",name:"Events",component:_},{path:"/twitch",name:"Twitch",component:j},{path:"/settings",name:"Settings",component:V}],G=new m["a"]({routes:F}),K=G,J=n("ce5b"),z=n.n(J);n("bf40");a["default"].use(z.a);var Y=new z.a({icons:{iconfont:"fa"},theme:{dark:!0}}),Z=(n("d5e8"),n("15f5"),n("2f62")),q=n("bfa9"),Q=new q["a"]({storage:window.localStorage,reducer:function(e){return{events:e.events,lang:e.lang,blacklist:e.blacklist,selectedEvents:e.selectedEvents,webhookURL:e.webhookURL}}});a["default"].use(Z["a"]);var X=[{event:"Garbage",enabled:!0,matches:["garbage"],duration:0},{event:"Zoo",enabled:!0,matches:["zoo"],duration:0},{event:"Bee",enabled:!0,matches:["bee"],duration:0},{event:"GoldTouchy",enabled:!0,matches:["money","gold"],duration:0},{event:"Acid",enabled:!0,matches:["ass","acid"],duration:0},{event:"Hentai",enabled:!0,matches:["weeb","tentacle","weave","waves"],duration:0},{event:"WormLauncher",enabled:!0,matches:["worm","wiggle"],duration:0},{event:"Ukko",enabled:!0,matches:["old"],duration:0},{event:"Steve",enabled:!0,matches:["steve","bone"],duration:0},{event:"Trip",enabled:!0,matches:["shroom"],duration:0},{event:"Tanks",enabled:!0,matches:["thanks"],duration:0},{event:"Cocktail",enabled:!0,matches:["flask"],duration:0},{event:"LavaShift",enabled:!0,matches:["is this one broken ? idk"],duration:0},{event:"Goblins",enabled:!0,matches:["nerds"],duration:0},{event:"Toasters",enabled:!0,matches:["bread"],duration:0},{event:"Sweaty",enabled:!0,matches:["sweat"],duration:0},{event:"Byebye",enabled:!0,matches:["goodbye"],duration:0},{event:"BlazeIt",enabled:!0,matches:["hot"],duration:0},{event:"ThisIsFine",enabled:!0,matches:["fire"],duration:0},{event:"Coolio",enabled:!0,matches:["cold"],duration:0},{event:"Twitch",enabled:!0,matches:["flum"],duration:0},{event:"Shrooms",enabled:!0,matches:["mushroom"],duration:0},{event:"Eggy",enabled:!0,matches:["egg"],duration:0},{event:"Raid",enabled:!0,matches:["raid"],duration:0},{event:"Gamba",enabled:!0,matches:["gamba"],duration:0},{event:"HolyBomb",enabled:!0,matches:["holy"],duration:0},{event:"BeegSteve",enabled:!0,matches:["boned"],duration:0},{event:"Cheapskate",enabled:!0,matches:["cheap"],duration:0},{event:"RogueBH",enabled:!0,matches:["black hole"],duration:0},{event:"Flend",enabled:!0,matches:["friend"],duration:0},{event:"Cop",enabled:!0,matches:["robot"],duration:0},{event:"Loose",enabled:!0,matches:["chunk"],duration:0},{event:"Grounded",enabled:!0,matches:["ground"],duration:0},{event:"PlayerGhost",enabled:!0,matches:["ghost"],duration:0},{event:"MoistMob",enabled:!0,matches:["frog"],duration:0},{event:"RatKing",enabled:!0,matches:["chase"],duration:0},{event:"DoughDeer",enabled:!0,matches:["deer"],duration:0},{event:"Quack",enabled:!0,matches:["duck"],duration:0},{event:"Blessed",enabled:!0,matches:["bless"],duration:0},{event:"Cursed",enabled:!0,matches:["curse"],duration:0},{event:"BigLove",enabled:!0,matches:["love"],duration:0},{event:"HankHill",enabled:!0,matches:["propane"],duration:0},{event:"Antiquing",enabled:!0,matches:["antiquing"],duration:0},{event:"Yeet",enabled:!0,matches:["yeet"],duration:0},{event:"SpikeDrinks",enabled:!0,matches:["spike"],duration:0},{event:"Follower",enabled:!0,matches:["follow"],duration:0},{event:"AlchemicCircle",enabled:!0,matches:["alchemy"],duration:0},{event:"WeHuffing",enabled:!0,matches:["huffing"],duration:0},{event:"Birthday",enabled:!0,matches:["birthday"],duration:0},{event:"Berserk",enabled:!0,matches:["angry"],duration:0},{event:"Nolla",enabled:!0,matches:["nolla"],duration:0},{event:"BackToTheBeginning",enabled:!0,matches:["back"],duration:0}],ee=new Z["a"].Store({state:{events:X,twitchPrefixEnabled:!1,twitchPrefix:"&",twitchOverride:!0,twitchMatches:[],twitchMatchMinLength:4,twitchMaxMatchesPerUser:3,twitchPoll:new Map,transcript:[],blacklist:[],selectedEvents:[],lang:"en-US",webhookURL:""},getters:{allEvents:function(e){return e.events.sort((function(e,t){return e.event.localeCompare(t.event)}))},enabledEvents:function(e){return e.events.filter((function(e){return e.enabled})).sort((function(e,t){return e.event.localeCompare(t.event)}))},selectedEvents:function(e){return e.selectedEvents}},mutations:{UpdateLocale:function(e,t){e.lang=t},AddEvent:function(e,t){var n,a=!1,o=Object(s["a"])(e.events);try{for(o.s();!(n=o.n()).done;){var i=n.value;i.event==t&&(a=!0)}}catch(r){o.e(r)}finally{o.f()}a||e.events.push({event:t,enabled:!0,matches:[]})},EditEvent:function(e,t){var n=t.event,a=t.enabled,o=t.matches,i=t.duration;e.events=e.events.map((function(e){return e.event==n&&(e.enabled=a,e.matches=o,e.duration=i,console.log({entry:e})),e}))},EditEventMatch:function(e,t){var n=t.event,a=t.matches;e.events=e.events.map((function(e){return e.event==n&&(e.matches=a,e.enabled=a.length>0),e}))},RemoveEvent:function(e,t){e.events=e.events.filter((function(e){return e.event!=t}))},pushTranscript:function(e,t){var n=t.transcript;t.matches.forEach((function(e){n=n.replaceAll(e,'<span class="red--text">'.concat(e,"</span>"))})),e.transcript.unshift({id:e.transcript.length+1,text:n}),e.transcript.length>250&&e.transcript.shift()},UpdateWebhookURL:function(e,t){e.webhookURL=t},UpdateBlacklist:function(e,t){var n=e.blacklist.indexOf(t);-1===n?e.blacklist.push(t):e.blacklist.splice(n,1)},UpdateSelectedEvent:function(e,t){e.selectedEvents=t},Reset:function(e){e.events=JSON.parse(JSON.stringify(X)),e.lang="en-US",e.webhookURL="",e.blacklist=[],e.selectedEvents=[]}},actions:{},modules:{},plugins:[Q.plugin]}),te=n("4eb5"),ne=n.n(te);ne.a.config.autoSetContainer=!0,a["default"].use(ne.a),a["default"].config.productionTip=!1;var ae=new a["default"];a["default"].prototype.$TRAESH=ae,new a["default"]({router:K,vuetify:Y,store:ee,render:function(e){return e(f)}}).$mount("#app")}});
//# sourceMappingURL=app.9a8afe8c.js.map