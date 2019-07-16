<template>
    <v-toolbar dark app color="orange" class="mb-2">
        <v-toolbar-side-icon @click.native="$EventBus.$emit('click-navigator')"></v-toolbar-side-icon>
        <v-toolbar-title class="header-title" @click="onClickHeaderTitle">HWP File Parser (Desktop App Version)</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat class="px-0 title">
            <v-icon left>fa fa-user</v-icon>
            Josh Lee
        </v-btn>
        <div class="pr-2">|</div>
        <div class="title">
            accforaus@gmail.com
        </div>
    </v-toolbar>
</template>

<script>
    import {SET_CURRENT_FEATURE, SET_SELECTED_FILES} from "../store/mutation_types";

    export default {
        name: "Header",
        methods: {
            onClickHeaderTitle: function () {
                this.$EventBus.$emit('onBodyClear')
                this.$EventBus.$emit('onFileTableClear')
                this.$store.commit(SET_CURRENT_FEATURE, { payload: '' })
                this.$store.commit(SET_SELECTED_FILES, { payload: [] })
            },
        },

        mounted() {
            this.$electron.ipcRenderer.on('open-dialog-file-selected', (event, file) => {
                console.dir(file)
            })
        }
    }
</script>

<style scoped>
    .header-title {
        cursor: pointer;
    }
</style>