<template>
    <div>
        <div v-if="!campaign" class="campaigns">
            <div v-if="index < show_on_page" class="campaign" v-for="(campaign, index) in campaigns">
                <div class="type_indicator"
                     :class="{influencer: campaign.type === 'Influencer campaign', giveaway: campaign.type === 'Giveaway'}"></div>
                <div class="campaign_top">
                    <h4>{{campaign.name}}</h4>
                    <span>{{campaign.type}}</span>
                </div>
                <div class="campaign_main">
                    <p>
                        <span>Comments</span><br>
                        <strong>{{campaign.approved_comments}}</strong>
                    </p>
                    <p>
                        <span>Artists</span><br>
                        <strong>{{campaign.num_of_artists}}</strong>
                    </p>
                    <p>
                        <span>Likes</span><br>
                        <strong>{{campaign.approved_likes}}</strong>
                    </p>
                    <p>
                        <span>Posts</span><br>
                        <strong>{{campaign.approved_posts}}</strong>
                    </p>
                </div>
                <div class="campaign_bottom">
                    <span @click="Hide(index)">HIDE</span>
                    <span @click="ShowDetails(campaign.id, campaign.name)">Show details</span>
                </div>
            </div>
            <div v-if="campaigns.length > show_on_page" class="show_more" @click="show_on_page = show_on_page + 8 ">
                <h4>+8</h4>
                MORE TO SHOW
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    const axios = require("axios");

    export default {
        name: "Dashboard",
        data() {
            return {
                campaigns: [],
                show_on_page: 7,
                campaign: false
            }
        },
        methods: {
            Hide(index) {
                this.campaigns.splice(index, 1)
            },
            ShowDetails(id, name) {
                this.campaign = true
                this.$router.push({name: 'Campaign', params: {id: id, name: name}})
            }
        },
        mounted() {
            axios
                .get('http://localhost:3004/campaigns')
                .then(
                    response => (
                        (this.campaigns = response.data)
                    )
                )
                .catch(error => console.log(error));
        }
    }
</script>

<style lang="scss" scoped>
    .campaigns {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 15px 20px;
        background-color: #f9f9f9;

        .campaign {
            width: 230px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

            .type_indicator {
                border-bottom: 3px solid darkblue;

                &.influencer {
                    border-color: blue;
                }

                &.giveaway {
                    border-color: mediumpurple;
                }
            }

            .campaign_top {
                padding: 0 10px;
                border-bottom: 1px solid lightgray;

                h4 {
                    margin: 10px 0;
                }
            }

            .campaign_main {
                padding: 0 10px;
                border-bottom: 3px solid turquoise;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;

                P {
                    width: 100px;
                }
            }

            .campaign_bottom {
                padding: 10px;
                display: flex;
                justify-content: space-between;

                span {
                    cursor: pointer;

                    &:last-child {
                        color: mediumaquamarine;
                    }
                }
            }
        }

        .show_more {
            width: 230px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }
</style>