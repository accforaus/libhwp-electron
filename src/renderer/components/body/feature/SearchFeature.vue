<template>
    <v-container gird-list-xs pa-0>
        <v-layout column wrap>
            <v-flex>
                <v-card color="transparent">
                    <v-toolbar light dense flat color="transparent">
                        <v-toolbar-title>
                            <div class="headline">파일 리스트</div>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon v-if="!field" @click="onClickFolder">
                            <v-icon>fa fa-folder-open</v-icon>
                        </v-btn>
                        <v-btn icon @click="field = !field" v-if="!field">
                            <v-icon>search</v-icon>
                        </v-btn>
                        <v-text-field
                                clearable
                                autofocus
                                v-if="field"
                                style="width: 1%;"
                                @blur="leaveFocus"
                                v-model="search"
                                prepend-icon="search"
                                label="Search...">
                        </v-text-field>
                    </v-toolbar>
                    <v-card-text>
                        <v-data-table
                                :loading="isSearch"
                                :headers="headers"
                                :items="filteredList" item-key="filename"
                                :expand="expand">
                            <v-progress-linear v-slot:progress color="orange" indeterminate></v-progress-linear>
                            <template v-slot:items="props">
                              <tr @click="props.expanded = !props.expanded">
                                  <td>{{ props.item.filename }}</td>
                                  <td class="text-xs-right">{{ props.item.directory }}</td>
                                  <td class="text-xs-right">{{ props.item.extension }}</td>
                                  <td class="text-xs-right">{{ props.item.size }}</td>
                              </tr>
                            </template>
                            <template v-slot:expand="props">
                                <v-card flat>
                                    <v-card-text v-html="props.item.content"></v-card-text>
                                </v-card>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { dialog } from 'electron'
    import {SEARCH_TEXT} from "../../../store/mutation_types";
    export default {
        name: "SearchFeature",
        data: () => ({
            search: '',
            field: false,
            expand: false,
            loading: true,
            headers: [
                {
                    text: 'File Name',
                    value: 'filename',
                    align: 'left'
                },
                { text: 'Directory', align: 'right', value: 'directory'},
                { text: 'Extension', align: 'right', value: 'extension'},
                { text: 'Size(MB)', align: 'right', value: 'size' }
            ],
            items: []
        }),

        methods: {
            leaveFocus: function() {
                if (this.search === '' || this.search === null)
                    this.field = false
            },

            onClickFolder: function() {
                this.$electron.ipcRenderer.send('open-directory-dialog')
            },

            reducer: function(accumulate, value) {
                if (value.content.includes(this.search)) {
                    const result = {
                        'filename': value.filename,
                        'size': value.size,
                        'directory': value.directory,
                        'extension': value.extension,
                        'content': value.content.replace(this.search, `<span class="red--text title font-weight-bold">${this.search}</span>`)
                    }
                    accumulate.push(result)
                }
                return accumulate
            }
        },

        mounted() {
            this.$electron.ipcRenderer.on('open-dialog-directory-selected', (event, directory) => {
                const formData = new FormData()
                formData.append('path', directory[0])
                this.$store.dispatch(SEARCH_TEXT, { payload: formData }).then().catch()
                this.items = this.$store.getters.GET_SEARCHED_TEXT
            })
        },

        computed: {
            isSearch: function() {
                return this.$store.getters.GET_IS_SEARCH
            },

            searchedFile: function() {
                return this.$store.getters.GET_SEARCHED_TEXT
            },

            filteredList: function() {
                if (this.search !== '') {
                    return this.searchedFile.reduce(this.reducer, [])
                } else
                    return this.searchedFile
            }
        }
    }
</script>

<style scoped>

</style>