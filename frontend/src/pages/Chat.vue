<template>
    <div class="q-ma-md">
        <div class="q-gutter-md">
            <q-card class="my-card login-box">
                <q-card-section>
                    <h3 class=".text-h3 login-title"> Choose Your chat
                    </h3>

                </q-card-section>
                <q-card-section>
                    <q-item v-for="(chat) in chats" :key="chat.ID" clickable class="chat-item"  @click="toChat(chat.ID, chat.name)">
                        <q-item-section>{{ chat.name }}</q-item-section>
                    </q-item>
                </q-card-section>
                <q-card-section>
                    <h5>Create another Chat</h5>
                    <q-input v-model="newChat" label="Chat Name" :bla="true" class="input"  v-on:keyup.enter="createNewChat" />

                    <q-btn color="primary" label="Create other chat" @click="createNewChat"  :loading="isLoading"
                        class="btn-create-chat" />
                </q-card-section>

            </q-card>


        </div>

    </div>
</template>
  
<script>

export default {
    name: 'Chat',
    data() {
        return {
            isLoading: false,
            chats: [
                //     {
                //     "ID": 1,
                //     "CreatedAt": "2023-10-28T21:07:21.652571-03:00",
                //     "UpdatedAt": "2023-10-28T21:07:21.652571-03:00",
                //     "DeletedAt": null, 
                //     "name": "Chat 1"
                // }
            ],
            newChat: ""
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
        this.getAllChats()

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
        getAllChats() {
            let token = localStorage.getItem('token')
            this.$axios.get('/v1/api/chat/rooms', {
                headers: {
                    Authorization: `Bearer ${token}`
                },


            })
                .then(resp => {
                    this.chats = resp.data.chatRooms

                })
                .catch(err => {
                    console.log(err)
                })

        },
        createNewChat() {
            if (this.newChat == "") {
                return
            }
            let token = localStorage.getItem('token')

            this.$axios.post('/v1/api/chat/create', {
                "name": this.newChat

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })                .then(resp => {
                    this.newChat = ""
                    this.getAllChats()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        toChat(id, name){
             this.$router.push({ path: '/conversation/'+id,  query : { name: name}});
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