<template>
    <div class="container__data">
        <!-- отображение страницы с задачами и добавлением новой задачи-->
        <div v-if="!getShowEdit">
            <!-- Форма для добавления новой задачи-->
            <list-form/>
            <h2 class="cards__h">Задачи</h2>
            <!-- Пагинация. Выбор страницы. Передаваемые данные: текущая страница,
            все задачи, количество задач на странице-->
            <pagination
                @pageChanged="changeCurrentPage"
                :options="getPaginationOptions"
                :total="getAllCards.length"
            ></pagination>
            <todo-list/>
        </div>
        <!-- Отображение страницы редактирования.-->
        <edit-card v-else
                   @saveEditedChanges="saveEdited"
        ></edit-card>
    </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import ListForm from '../components/NewCardForm'
  import EditCard from '../components/EditCard'
  import Pagination from '../components/Pagination'
  import TodoList from "../components/TodoList";


  export default {
    name: 'home',
    data() {
      return {
        id: this.$route.params['id']
      }
    },
    watch: {
      $route(toR) {
        this.id = toR.params['id']
      }
    },
    computed: mapGetters([
      'getAllCards',
      'getShowEdit',
      'getCurrentPage',
      'getPaginationOptions']),
    methods: {
      ...mapActions(['firestore', 'removeCard', 'saveEdits']),
      ...mapMutations([
        'changeEditingCardData',
        'changeShowEdit',
        'changeCurrentPage',
        'setCurrentPageFirst',
        'changeIsDoneStatus']),
      /**
       * переход к странице редактирования задачи.
       * @param card - obj Объект редактируемого элемента
       */
      goToEditCard(card) {
        this.changeEditingCardData(card);
        this.changeShowEdit();
      },
      /**
       * Сохраняет изменения после редактирования статьи
       * @param card obj
       */
      saveEdited(card) {
        this.saveEdits(card);
        //this.setCurrentPageFirst();
        this.changeShowEdit();
      },
      /**
       * Сохранить статус выполнения задачи
       */
      saveIsDoneStatus(card) {
        this.saveEdits(card)
      }
    },

    components: {ListForm, EditCard, Pagination, TodoList},
    /**
     * загружает данные созданных задач
     * @return {Promise<void>}
     */
    async mounted() {
      await this.firestore();
    },

  }
</script>

<style lang="sass">
    body
        background-image: url(../assets/bgi.jpg)

        .container
            &__data
                padding: 20px

            .cards__h
                color: #2f4252
                margin-top: 15px
</style>
