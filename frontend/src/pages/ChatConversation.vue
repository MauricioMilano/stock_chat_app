<template>
    <div class="q-ma-md">
        <div class="q-gutter-md">
            <q-card class="my-card login-box">
                <q-card-section>
                    <h3 class=".text-h3 login-title"> {{chat_name}}
                    </h3>

                </q-card-section>
                <q-card-section>
                    <div class="overflow">
                        <div style="width: 100%; max-width: 700px; height:auto" v-for="(message) in messages" :key="message.id">


                            <q-chat-message v-if="message.chatUserId == user.ID" name="me" :text="[message.chatMessage]"
                                sent bg-color="amber-7" />
                            <q-chat-message v-if="message.chatUserId != user.ID && message.chatUserId != -1"
                                :name="message.chatUser" :text="[
                                    message.chatMessage
                                ]" size="6" text-color="white" bg-color="secondary" />
                            <p v-if="message.chatUserId == -1">{{ message.chatMessage }}</p>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-input v-model="text" label="Chat Name" :bla="true" class="input" v-on:keyup.enter="send" />
                    <q-btn color="primary" label="Send Message" @click="send" :loading="isLoading"
                        class="btn-create-chat" />
                </q-card-section>

            </q-card>


        </div>

    </div>
</template>
  
<script>
import { TouchSwipe } from 'quasar'


export default {
    name: 'Conversation',
    data() {
        return {
            isLoading: false,
            messages: [
                //         {
                //     "chatMessage": "OI",
                //     "chatUserId": 1,
                //     "chatUser": "user",
                //     "chatRoomId": 1,
                //     "chatRoomName": "Chat 1",
                //     "ChatMessageTs": "2023-10-29T12:12:54.054865-03:00"
                // }
            ],
            text: "",
            token: localStorage.getItem('token'),
            user: JSON.parse(localStorage.getItem('user')),
            connection: "",
            chat_id: "",
            chat_name:"",
        }

    },
    beforeCreate() {
        console.log('beforeCreate')
    },
    created() {
        console.log('created')
        console.log(this.$moment().format('MMMM Do YYYY, h:mm:ss a'))


    },
    beforeMount() {
        console.log('beforeMount')
    },
    mounted() {
        console.log('mounted')
        this.chat_id = this.$route.params["id"]
        this.chat_name = this.$route.query["name"]
        this.getAllMessages()
        let connection = new WebSocket("ws://localhost:3000/v1/ws?room_id=" + this.chat_id + "&jwt=" + this.token);
        connection.onmessage = (event) => {
            console.log(event.data)
            let jsonData = JSON.parse(event.data)
            this.messages.push(jsonData.Body)
        };

        connection.onopen = (event) => {
            console.log("Successfully connected to the echo websocket server...");
            this.connection = connection
        };
    },
    beforeUpdate() {
        console.log('beforeUpdate')
    },
    updated() {
        console.log('updated')
    },
    beforeDestroy() {
        console.log('beforeDestroy')
    },
    destroyed() {
        console.log('destroyed')
    },
    methods: {
        getAllMessages() {

            this.$axios.post('/v1/api/chat/room-messages', {
                "roomId": +this.chat_id
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                },

            })
                .then(resp => {
                    this.messages = resp.data.chats

                })
                .catch(err => {
                    console.log(err)
                })

        },
        send() {
            
            if (this.connection.readyState == WebSocket.OPEN && this.text != "") {
                const message =
                {
                    "chatRoomId": +this.chat_id,

                    "chatMessage": this.text,
                }

                this.connection.send(JSON.stringify(message));
                console.log(`Sent: ${JSON.stringify(message)}`);
                this.text = ""
            } else {
                console.error("WebSocket connection is not open.");
            }
        }
    }

}
</script>
  
<style>
.login-box {
    display: block;
    width: 800px;
    margin: 0 auto;
}

.overflow {
    overflow-y: scroll;
    height: 500px;

}

.login-text-below {
    display: block;
    width: 205px;
    margin: 0 auto;
}

.input {
    border: 1px solid #e6e6e6;
    margin-bottom: 10px;
    background-color: white;
    padding-left: 10px;
}

.login-title {
    position: relative;
    color: black;
    font-size: 2em;
    top: 11px;
    margin-left: 15px;
    margin-bottom: 10px;
}

.btn-create-chat {
    position: relative;
    top: -5px;
    margin: 20px auto 10px auto;
    display: block;

}

.chat-item {
    border: 1px solid #e6e6e6;
    margin-bottom: 10px;
}
</style>