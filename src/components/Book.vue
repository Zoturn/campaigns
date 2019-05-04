<template>
    <form @submit.prevent="SubmitChanges">
        <label>
            Author
            <input type="text" v-model="author" required>
            <span class="warning" v-if="error === 'author'">{{message}}</span>
        </label>
        <label>
            Title
            <input type="text" v-model="title" required>
            <span class="warning" v-if="error === 'title'">{{message}}</span>
        </label>
        <label>
            ISBN
            <input type="text" v-model="isbn" required>
            <span class="warning" v-if="error === 'isbn'">{{message}}</span>
        </label>
        <label>
            Number of Pages
            <v-select v-model="pages" :options="Pages" required></v-select>
            <span class="warning" v-if="error === 'pages'">{{message}}</span>
        </label>
        <label>
            Format
            <v-select v-model="format" :options="Format" label="name" required></v-select>
            <span class="warning" v-if="error === 'format'">{{message}}</span>
        </label>
        <label>
            Description
            <textarea v-model="description" rows="5" required></textarea>
            <span class="warning" v-if="error === 'description'">{{message}}</span>
        </label>
        <label>
            Price
            <input type="number" v-model="price" step="0.01" required>
            <span class="warning" v-if="error === 'price'">{{message}}</span>
        </label>
        <label>
            Country
            <v-select v-model="country" :options="Country" label="name" required></v-select>
            <span class="warning" v-if="error === 'country'">{{message}}</span>
        </label>
        <label>
            City
            <v-select v-model="city" :options="City" label="name" required></v-select>
            <span class="warning" v-if="error === 'city'">{{message}}</span>
        </label>
        <label>
            Company
            <v-select v-model="company" :options="Company" label="name" required></v-select>
            <span class="warning" v-if="error === 'company'">{{message}}</span>
        </label>
        <div class="buttons">
            <input type="submit" :disabled="!changes || error.length!==0">
            <router-link to="/">Return</router-link>
        </div>
    </form>
</template>

<script>
    const axios = require("axios");

    export default {
        name: "Book",
        props: ['book', 'id'],
        data() {
            return {
                author: null,
                title: null,
                isbn: null,
                pages: null,
                format: null,
                description: null,
                price: null,
                country: null,
                city: null,
                company: null,
                Pages: [],
                Format: [],
                Country: [],
                City: [],
                Company: [],
                this_book: {},
                changes: false,
                message: '',
                error: ''
            }
        },
        created() {
            this.init()
        },
        methods: {
            async init() {
                await this.GetFormatsList()
                await this.GetCountriesList()
                await this.GetCitiesList()
                await this.GetCompaniesList()
                this.GetCurValue()
                this.GetPagesList()
                this.City = this.City.filter(this.FilterCities)
                this.Company = this.Company.filter(this.FilterCompanies)
            },
            GetCurValue() {
                this.author = this.book.author
                this.company = this.Company[this.Company.findIndex(x => x.id === this.book.companyId)]
                this.city = this.City[this.City.findIndex(x => x.id === this.book.cityId)]
                this.country = this.Country[this.Country.findIndex(x => x.id === this.book.countryId)]
                this.description = this.book.description
                this.format = this.Format[this.Format.findIndex(x => x.id === this.book.formatId)]
                this.isbn = this.book.isbn
                this.pages = this.book.pages
                this.price = this.book.price
                this.title = this.book.title
            },
            GetPagesList() {
                for (let i = 1; i < 10000; i++) {
                    this.Pages.push(i)
                }
            },
            FilterCities(value) {
                return (value.countryId === this.country.id)
            },
            FilterCompanies(value) {
                return (value.cityId === this.city.id)
            },
            async GetFormatsList() {
                await axios
                    .get('http://localhost:3004/formats', {headers: {'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'}})
                    .then(
                        response => (
                            (this.Format = response.data)
                        )
                    )
                    .catch(error => console.log(error));
            },
            async GetCountriesList() {
                await axios
                    .get('http://localhost:3004/countries', {headers: {'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'}})
                    .then(
                        response => (
                            (this.Country = response.data)
                        )
                    )
                    .catch(error => console.log(error));
            },
            async GetCitiesList() {
                await axios
                    .get('http://localhost:3004/cities', {headers: {'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'}})
                    .then(
                        response => (
                            (this.City = response.data)
                        )
                    )
                    .catch(error => console.log(error));
            },
            async GetCompaniesList() {
                await axios
                    .get('http://localhost:3004/companies', {headers: {'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'}})
                    .then(
                        response => (
                            (this.Company = response.data)
                        )
                    )
                    .catch(error => console.log(error));
            },
            GetThisBook() {
                this.this_book = {
                    author: this.author,
                    cityId: this.city.id,
                    companyId: this.company.id,
                    countryId: this.country.id,
                    description: this.description,
                    formatId: this.format.id,
                    isbn: this.isbn,
                    pages: this.pages,
                    price: this.price,
                    title: this.title,
                }
            },
            async SubmitChanges() {
                this.GetThisBook()
                const data = this.this_book
                const headers = {
                    "x-auth-token": "bad18eba1ff45jk7858b8ae88a77fa30"
                }
                axios
                    .post('http://localhost:3004/books', data, {
                        headers: headers
                    })
                    .catch(error => console.log(error));
            }
        },
        watch: {
            async country(value) {
                this.error = ''
                this.message = ''
                if (this.country !== this.Country[this.Country.findIndex(x => x.id === this.book.countryId)] && value !== null) {
                    this.city = null
                    this.company = null
                    await this.GetCitiesList()
                    this.City = this.City.filter(this.FilterCities)
                    this.changes = true
                }else if (value === null) {
                    this.city = null
                    this.company = null
                    this.error = 'country'
                    this.message = 'country is required'
                }
            },
            async city(value) {
                this.error = ''
                this.message = ''
                if (this.city !== this.City[this.City.findIndex(x => x.id === this.book.cityId)] && value !== null) {
                    this.company = null
                    await this.GetCompaniesList()
                    this.Company = this.Company.filter(this.FilterCompanies)
                    this.changes = true
                }else if (value === null) {
                    this.company = null
                    this.error = 'city'
                    this.message = 'city is required'
                }
            },
            author(value) {
                this.error = ''
                this.message = ''
                if (value === '') {
                    this.error = 'author'
                    this.message = 'author is required'
                }else if (this.author !== this.book.author) {
                    this.changes = true
                }
            },
            company(value) {
                this.error = ''
                this.message = ''
                if (value === null) {
                    this.error = 'company'
                    this.message = 'company is required'
                }else if (this.company !== this.Company[this.Company.findIndex(x => x.id === this.book.companyId)]) {
                    this.changes = true
                }
            },
            description(value) {
                this.error = ''
                this.message = ''
                if (value === '') {
                    this.error = 'description'
                    this.message = 'description is required'
                }else if (this.description !== this.book.description) {
                    this.changes = true
                }
            },
            format(value) {
                this.error = ''
                this.message = ''
                if (value === null) {
                    this.error = 'format'
                    this.message = 'format is required'
                }else if (this.format !== this.Format[this.Format.findIndex(x => x.id === this.book.formatId)]) {
                    this.changes = true
                }
            },
            isbn(value) {
                this.error = ''
                this.message = ''
                if (value === '') {
                    this.error = 'isbn'
                    this.message = 'isbn is required'
                }else if (this.isbn !== this.book.isbn) {
                    this.changes = true
                }
            },
            pages(value) {
                this.error = ''
                this.message = ''
                if (value === null) {
                    this.error = 'pages'
                    this.message = 'pages is required'
                }else if (this.pages !== this.book.pages) {
                    this.changes = true
                }
            },
            price(value) {
                this.error = ''
                this.message = ''
                if (value === '') {
                    this.error = 'price'
                    this.message = 'price is required'
                }else if (this.price !== this.book.price) {
                    this.changes = true
                }
            },
            title(value) {
                this.error = ''
                this.message = ''
                if (value === '') {
                    this.error = 'title'
                    this.message = 'title is required'
                }else if (this.title !== this.book.title) {
                    this.changes = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    form {
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 0 auto;

        label {
            margin-bottom: 15px;
        }

        input, .v-select, textarea {
            width: 100%;
        }

        .buttons {
            display: flex;
        }
        .warning {
            color: red;
        }
    }
</style>