<template>
    <v-navigation-drawer v-model="drawer" app class="white" light>
        <v-container pa-0>
            <v-layout column>
                <v-flex>
                    <v-card flat color="orange" dark>
                        <v-card-text primary-title class="pb-1">
                            <div class="text-xs-center font-weight-light">
                                <div class="headline">HWP Library | Engine</div>
                                <p class="font-italic">Version 1.0b (beta)</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex>
                    <v-card flat>
                        <v-card-text class="text-xs-center pb-1">
                            <!--<v-img :src="require('../assets/logo/cie.png')"></v-img>-->
                            <v-img class="ml-2" width="250" :src="require('../../../static/logo/electron_vue.png')"></v-img>
                            <p class="font-weight-light font-italic">made by electron-vue</p>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex><v-divider></v-divider></v-flex>
                <v-flex>
                    <v-list subheader two-line>
                        <v-subheader>Features</v-subheader>
                        <v-list-tile
                                avatar
                                v-for="item in menuList"
                                :key="item.name" @click="onClickCard(item)">
                            <v-list-tile-avatar>
                                <v-avatar color="grey" size="35">
                                    <v-icon small color="white">{{ item.icon }}</v-icon>
                                </v-avatar>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.subName }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-icon color="grey">info</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Navigation",
        data: () => ({
            drawer: true,
            selectedIndex: -1,
            menuList: [
                {
                    name: '텍스트 추출',
                    subName: 'Text Extract',
                    icon: 'fa fa-paragraph',
                    variable: 'text'
                },
                {
                    name: '테이블 추출',
                    subName: 'Table Extract',
                    icon: 'fa fa-table',
                    variable: 'table'
                },
                {
                    name: '파일 이름 처리',
                    subName: 'Name Management',
                    icon: 'fa fa-sort-numeric-up',
                    variable: 'name'
                },
                {
                    name: '파일 이어 붙히기',
                    subName: 'Append Files',
                    icon: 'fa fa-copy',
                    variable: 'attach'
                },
                {
                    name: '그림 추출',
                    subName: 'Image Extract',
                    icon: 'fa fa-file-image',
                    variable: 'image'
                },
                {
                    name: '텍스트 검색',
                    subName: 'Text Search',
                    icon: 'fa fa-search',
                    variable: 'search'
                }
            ]
        }),

        created() {
            this.$EventBus.$on('click-navigator', _ => {
                this.drawer = !this.drawer
            })
            this.$EventBus.$on('onNavFileSelectListener', index => {
                this.selectedIndex = index
            })
        },

        methods: {
            onClickCard: function(item) {
                const data = {
                    'variable': item.variable,
                    'index': this.selectedIndex
                }
                this.$EventBus.$emit('onFeatureChangeListener', data)
            }
        }
    }
</script>

<style scoped>

</style>