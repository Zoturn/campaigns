<template>
    <div>
        <div class="top">
            <p class="name">{{name}}</p>
            <div class="soc_filters">
                <label :class="{checked: soc_filter === 'Instagram'}">
                    Instagram
                    <input type="radio" value="Instagram" v-model="soc_filter" @click="GetFiltered()">
                </label>
                <label :class="{checked: soc_filter === 'Youtube'}">
                    Youtube
                    <input type="radio" value="Youtube" v-model="soc_filter" @click="GetFiltered()">
                </label>
                <label :class="{checked: soc_filter === 'Facebook'}">
                    Facebook
                    <input type="radio" value="Facebook" v-model="soc_filter" @click="GetFiltered()">
                </label>
                <label :class="{checked: soc_filter === 'Twitter'}">
                    Twitter
                    <input type="radio" value="Twitter" v-model="soc_filter" @click="GetFiltered()">
                </label>
            </div>
            <div class="tabs">
                <label :class="{active: tab === 'pending'}">
                    Pending
                    <input type="radio" value="pending" v-model="tab">
                </label>
                <label :class="{active: tab === 'approved'}">
                    Approved
                    <input type="radio" value="approved" v-model="tab">
                </label>
                <label :class="{active: tab === 'reject'}">
                    Rejected
                    <input type="radio" value="reject" v-model="tab">
                </label>
            </div>
        </div>
        <div v-if="tab === 'pending'" class="posts">
            <div class="post" v-for="post in filtered_posts">
                <div class="post_top">
                    <img src="https://instagram.fiev23-1.fna.fbcdn.net/vp/917e720e9713a3e560c9126d9e21f541/5D660C89/t51.2885-19/s150x150/54510890_2774184235941728_6540980255434211328_n.jpg?_nc_ht=instagram.fiev23-1.fna.fbcdn.net" alt="author">
                    <div class="auth">
                        <span>@{{post.author_username}}</span><br>
                        <span>{{post.social_network}}</span>
                    </div>
                </div>
                <div class="post_main">
                    <a :href="post.link">
                        <img src="https://instagram.fiev23-1.fna.fbcdn.net/vp/913a4cd42a491c34d1f8854bc813aaed/5D5DA5D0/t51.2885-15/e35/28156306_162771571193484_4860574107600683008_n.jpg?_nc_ht=instagram.fiev23-1.fna.fbcdn.net"
                             alt="post image">
                        <p>{{post.caption}}</p>
                        <div class="post_main_hover">
                            <p>{{post.caption}}</p>
                        </div>
                    </a>
                </div>
                <div class="post_bottom">
                    <div class="likes_comments">
                        <div>
                            LIKES<br>
                            <p><strong>{{post.likes_number}}</strong></p>
                        </div>
                        <div>
                            COMMENTS<br>
                            <p><strong>{{post.comments_number}}</strong></p>
                        </div>
                    </div>
                    <div class="reject_approve">
                        <span @click="Reject(post.id)">REJECT</span>
                        <span @click="Approve(post.id)">APPROVE</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="tab === 'approved'" class="posts">
            <div class="post" v-for="post in approved_posts">
                <div class="post_top">
                    <img src="https://instagram.fiev23-1.fna.fbcdn.net/vp/917e720e9713a3e560c9126d9e21f541/5D660C89/t51.2885-19/s150x150/54510890_2774184235941728_6540980255434211328_n.jpg?_nc_ht=instagram.fiev23-1.fna.fbcdn.net" alt="author">
                    <div class="auth">
                        <span>@{{post.author_username}}</span><br>
                        <span>{{post.social_network}}</span>
                    </div>
                </div>
                <div class="post_main">
                    <a :href="post.link">
                        <img src="https://instagram.fiev23-1.fna.fbcdn.net/vp/913a4cd42a491c34d1f8854bc813aaed/5D5DA5D0/t51.2885-15/e35/28156306_162771571193484_4860574107600683008_n.jpg?_nc_ht=instagram.fiev23-1.fna.fbcdn.net"
                             alt="post image">
                        <p>{{post.caption}}</p>
                        <div class="post_main_hover">
                            <p>{{post.caption}}</p>
                        </div>
                    </a>
                </div>
                <div class="post_bottom">
                    <div class="likes_comments">
                        <div>
                            LIKES<br>
                            <p><strong>{{post.likes_number}}</strong></p>
                        </div>
                        <div>
                            COMMENTS<br>
                            <p><strong>{{post.comments_number}}</strong></p>
                        </div>
                    </div>
                    <div class="reject_approve">
                        <span @click="Reject(post.id)">REJECT</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="tab === 'reject'" class="posts">
            <div class="post" v-for="post in reject_posts">
                <div class="post_top">
                    <img src="https://instagram.fiev23-1.fna.fbcdn.net/vp/917e720e9713a3e560c9126d9e21f541/5D660C89/t51.2885-19/s150x150/54510890_2774184235941728_6540980255434211328_n.jpg?_nc_ht=instagram.fiev23-1.fna.fbcdn.net" alt="author">
                    <div class="auth">
                        <span>@{{post.author_username}}</span><br>
                        <span>{{post.social_network}}</span>
                    </div>
                </div>
                <div class="post_main">
                    <a :href="post.link">
                        <img src="https://instagram.fiev23-1.fna.fbcdn.net/vp/913a4cd42a491c34d1f8854bc813aaed/5D5DA5D0/t51.2885-15/e35/28156306_162771571193484_4860574107600683008_n.jpg?_nc_ht=instagram.fiev23-1.fna.fbcdn.net"
                             alt="post image">
                        <p>{{post.caption}}</p>
                        <div class="post_main_hover">
                            <p>{{post.caption}}</p>
                        </div>
                    </a>
                </div>
                <div class="post_bottom">
                    <div class="likes_comments">
                        <div>
                            LIKES<br>
                            <p><strong>{{post.likes_number}}</strong></p>
                        </div>
                        <div>
                            COMMENTS<br>
                            <p><strong>{{post.comments_number}}</strong></p>
                        </div>
                    </div>
                    <div class="reject_approve">
                        <span @click="Approve(post.id)">APPROVE</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require("axios");

    export default {
        name: "Campaign",
        props: ['id', 'name'],
        data() {
            return {
                soc_filter: null,
                posts: [],
                filtered_posts: [],
                approved_posts: [],
                reject_posts: [],
                inst: false,
                tube: false,
                fb: false,
                twit: false,
                tab: 'pending'
            }
        },
        methods: {
            GetFiltered() {
                setTimeout(() => {
                    this.filtered_posts = this.posts.filter(post => {
                        return post.social_network === this.soc_filter
                    })
                }, 500)
            },
            Approve(id) {
                this.posts = this.posts.filter(post => {
                    if (post.id !== id) {
                        return true
                    } else {
                        this.approved_posts.push(post)
                        return false
                    }
                });
                this.reject_posts = this.reject_posts.filter(post => {
                    if (post.id !== id) {
                        return true
                    } else {
                        this.approved_posts.push(post)
                        return false
                    }
                });
                if (this.soc_filter !== null) {
                    this.GetFiltered()
                }else {
                    this.filtered_posts = this.posts
                }
            },
            Reject(id) {
                this.posts = this.posts.filter(post => {
                    if (post.id !== id) {
                        return true
                    } else {
                        this.reject_posts.push(post)
                        return false
                    }
                });
                this.approved_posts = this.approved_posts.filter(post => {
                    if (post.id !== id) {
                        return true
                    } else {
                        this.reject_posts.push(post)
                        return false
                    }
                });
                if (this.soc_filter !== null) {
                    this.GetFiltered()
                }else {
                    this.filtered_posts = this.posts
                }
            }
        },
        mounted() {
            axios
                .get('http://localhost:3004/media')
                .then(
                    response => (
                        (this.posts = response.data),
                            this.filtered_posts = this.posts
                        // console.log(this.campaigns)
                    )
                )
                .catch(error => console.log(error));
        }
    }
</script>

<style lang="scss" scoped>
    .top {
        p {
            height: 25px;
            border-bottom: 1px solid lightgray;
            padding: 0 15px;
            margin: 0 0 10px;
        }

        .soc_filters {
            padding: 0 15px;

            label {
                box-shadow: 0 1px 3px rgba(0, 0, 0, 1);
                padding: 3px;
                cursor: pointer;

                &.checked {
                    background-color: blue;
                }
            }

            input {
                display: none;
            }
        }

        .tabs {
            display: flex;
            padding: 15px 15px 0;
            border-bottom: 1px solid lightgray;

            label {
                padding: 5px 20px 15px;
                cursor: pointer;

                &.active {
                    color: blue;
                    border-bottom: 1px solid blue;
                }

                input {
                    display: none;
                }
            }
        }
    }

    .posts {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        flex-wrap: wrap;

        .post {
            width: 230px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
            margin: 10px;

            .post_top {
                display: flex;
                padding: 10px;
                align-items: center;
                img {
                    border-radius: 50%;
                    height: 20px;
                }

                .auth {
                    margin-left: 8px;

                    span {
                        &:last-child {
                            color: turquoise;
                        }
                    }
                }
            }

            .post_main {

                a {
                    display: flex;
                    align-items: center;
                    height: 200px;
                    overflow: hidden;
                    position: relative;
                    text-decoration: none;

                    img {
                        position: absolute;
                        width: 100%;
                        z-index: -1;
                    }

                    p {
                        height: 25px;
                        overflow: hidden;
                        color: white;
                        margin: 0;
                        padding: 10px;
                    }

                    .post_main_hover {
                        display: none;
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                    }

                    &:hover {
                        .post_main_hover {
                            display: block;
                        }
                    }
                }
            }

            .post_bottom {
                .likes_comments {
                    padding: 10px;
                    display: flex;
                    border-bottom: 1px solid lightgray;

                    div {
                        flex: 0 50%;

                        p {
                            margin: 5px 0 0;
                        }
                    }
                }

                .reject_approve {
                    padding: 10px;

                    span {
                        cursor: pointer;

                        &:last-child {
                            margin-left: 15px;
                            color: turquoise;
                        }
                    }
                }
            }
        }
    }
</style>