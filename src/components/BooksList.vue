<template>
    <div>
        <div class="book" v-for="(book, index) in books" :key="index">
            {{book.title}}
            <span @click="edit(book, index)">Edit</span>
        </div>
    </div>
</template>

<script>
    const axios = require("axios");

    export default {
        name: "BooksList",
        data() {
            return {
                books: [],
            };
        },
        mounted() {

            axios
                .get('http://localhost:3004/media')
                .then(
                    response => (
                        (this.books = response.data[0].caption),
                            console.log(this.books)
                    )
                )
                .catch(error => console.log(error));
        },
        methods: {
            edit (book, index) {
                this.$router.push({name: 'Book', params: {id: book.id, book: book}})
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .book {
        text-align: left;
        padding: 10px 25px;
        span {
            margin-left: 15px;
            color: lightblue;
            cursor: pointer;
        }
    }
</style>