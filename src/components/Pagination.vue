<template>
    <div class="pagination">
        <!-- Блок кнопки назад-->
        <div class="pagination__left">
            <a href="#"
               v-show="hasPrev()"
               @click="changePage(prevPage)">Назад</a>
        </div>
        <!-- Блок перехода на конкретные страницы-->
        <ul class="pagination__mid">
            <li v-if="hasFirst()" class="pagination__mid__el">
                <a href="#" @click="changePage(1)">{{page}}</a>
            </li>
            <li v-if="hasFirst()" class="pagination__mid__el">...</li>
            <li v-for="page in pages" :key="page" class="pagination__mid__el"
                :class="{ current: options.currentPage === page }">
                <a href="#" @click="changePage(page)">{{ page }}</a>
            </li>
            <li v-if="hasLast()" class="pagination__mid__el">...</li>
            <li v-if="hasLast()" class="pagination__mid__el">
                <a href="#" @click="changePage(totalPages)">{{ totalPages }}</a>
            </li>
        </ul>
        <!-- блок кнопки назад-->
        <div class="pagination__right">
            <a href="#"
               v-if="hasNext()"
               @click="changePage(nextPage)">Вперед</a></div>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: ['options', 'total'],

        computed: {
            /**
             * Получение массива ссылок необходимых для отображения страниц
             * @return {Array} массив страниц, которые необходимо вывести
             */
            pages() {
                const pages = [];
                for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
                    pages.push(i);
                }
                return pages
            },
            /**
             * Первая ссылка на страницу, которую надо отобразить
             * @return {number} первая ссылка на страницу, которую нужно отобразить
             */
            rangeStart() {
                let start = this.options.currentPage - this.options.pageRange;

                return (start > 0) ? start : 1
            },
            /**
             * Последняя ссылка на страницу, которую надо отобразить
             * @return {number} последняя ссылка на страницу, которую нужно отобразить
             */
            rangeEnd() {
                let end = this.options.currentPage + this.options.pageRange;

                return (end < this.totalPages) ? end : this.totalPages
            },
            /**
             * Общее количество страниц
             * @return {number} всего страниц
             */
            totalPages() {
                return Math.ceil(this.total / this.options.cardsPerPage)
            },
            /**
             * следующая страница
             * @return {number} следующая страница
             */
            nextPage() {
                return this.options.currentPage + 1
            },
            /**
             * предыдущая страница
             * @return {number} предыдущая страница
             */
            prevPage() {
                return this.options.currentPage - 1
            }
        },
        methods: {
            /**
             * проверяет, нужно ли показывать ссылку на первую страницу
             * @return {boolean}
             */
            hasFirst() {
                return this.rangeStart !== 1;
            },
            /**
             * проверяет, нужно ли показывать ссылку на вторую страницу
             * @return {boolean}
             */
            hasLast() {
                return this.rangeEnd < this.totalPages
            },
            /**
             * Проверяет нужно ли показывать ссылку на предыдщую страницу
             * @return {boolean}
             */
            hasPrev() {
                return this.options.currentPage > 1
            },
            /**
             * проверяет, нужно ли показывать ссылку на следующую страницу
             * @return {boolean}
             */
            hasNext() {
                return this.options.currentPage < this.total
            },
            /**
             * передает значение в родительский компонент
             * @param page {number} текущая страница
             */
            changePage(page) {
                this.$emit('pageChanged', page);
            }
        },
    }
</script>

<style lang="sass">
    .pagination
        display: flex
        justify-content: space-between
        margin-top: 20px
        font-size: 13px

        & a
            text-decoration: none
            color: #808d97
            line-height: 19px

        &__left, &__right
            width: 60px

            & a
                padding: 5px
                border-radius: 5px

                &:hover
                    background-color: lightgrey

        &__mid
            list-style: none
            display: flex
            justify-content: space-around

            &__el
                width: 20px
                height: 20px
                margin-right: 15px
                border-radius: 50%
                text-align: center
                background-color: transparent

                &:hover
                    background-color: lightgrey

                &:last-child
                    margin-right: 0

        .current
            background-color: lightgrey
</style>
