<template>
    <div class="pagination">
        <!-- Блок кнопки назад-->
        <div class="pagination__left">
            <router-link
            :to="'/page/' + this.options.currentPage">
            <a href="#" v-show="hasPrev()" @click="changePage(prevPage)">Назад</a>
            </router-link>
        </div>
        <!-- Блок перехода на конкретные страницы-->
        <ul class="pagination__mid">
            <router-link
                tag="li"
                v-if="hasFirst()" class="pagination__mid__el"
                :to="'/page/' + 1">
                <a href="#" @click="changePage(1)">1</a>
            </router-link>
            <li v-if="hasFirst()" class="pagination__mid__el dots">...</li>
            <router-link
                tag="li"
                v-for="page in pages" :key="page" class="pagination__mid__el"
                :to="'/page/' + page"
                :class="{ current: options.currentPage === page }">
                <a href="#" @click="changePage(page)">{{ page }}</a>
            </router-link>
            <li v-if="hasLast()" class="pagination__mid__el dots">...</li>
            <router-link
                v-if="hasLast()" class="pagination__mid__el"
                :to="'/page/' + totalPages">
                <a href="#" @click="changePage(totalPages)">{{ totalPages }}</a>
            </router-link>
        </ul>
        <!-- блок кнопки вперед-->
        <div class="pagination__right">
            <router-link
            :to="'/page/' + this.options.currentPage">
            <a href="#" v-if="hasNext()" @click="changePage(nextPage)">Вперед</a>
            </router-link>
        </div>
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
        return this.options.currentPage < this.totalPages
      },
      /**
       * передает значение в родительский компонент
       * @param page {number} текущая страница
       */
      changePage(page) {
        this.$emit('pageChanged', page);
      },
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
                margin: 0 7px
                border-radius: 50%
                text-align: center
                background-color: transparent

                &.dots
                    margin: 0
                    width: 15px

                &:hover
                    background-color: lightgrey

                &:last-child
                    margin-right: 0

        .current
            background-color: lightgrey


</style>
