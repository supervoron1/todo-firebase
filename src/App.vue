<template>
    <div id="app" class="container">
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
                <!-- Получение массива задач, в соответствии с текущей страницей
                и количеством отображения на странице.
                События: удаления и перехода на страницу редактирования.-->
                <ul class="cards__list">
                    <render-list v-for="card in getLimitList"
                                 :key="card.id"
                                 :card="card"
                                 @saveIsDoneStatus="saveIsDoneStatus"
                                 @remove="removeCard"
                                 @goToEdit="goToEditCard"
                    >
                    </render-list>
                </ul>
            </div>
            <!-- Отображение страницы редактирования.-->
            <edit-card v-else
                       @saveEditedChanges="saveEdited"
            ></edit-card>
        </div>
    </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import ListForm from './components/NewCardForm'
  import RenderList from './components/RenderList'
  import EditCard from './components/EditCard'
  import Pagination from './components/Pagination'


  export default {
    name: 'app',

    computed: mapGetters(['getAllCards',
      'getShowEdit',
      'getCurrentPage',
      'getLimitList',
      'getPaginationOptions']),
    methods: {
      ...mapActions(['firestore', 'removeCard', 'saveEdits']),
      ...mapMutations(['changeEditingCardData',
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
        this.setCurrentPageFirst();
        this.changeShowEdit();
      },
      /**
       * Сохранить статус выполнения задачи
       */
      saveIsDoneStatus(card) {
        this.saveEdits(card)
      }
    },
    components: {ListForm, RenderList, EditCard, Pagination},
    /**
     * загружает данные созданных задач
     * @return {Promise<void>}
     */
    async mounted() {
      await this.firestore();

    }
  }
</script>

<style lang="sass">
    .container
        background-color: #e0e3e6
        margin: 20px auto
        border-radius: 5px
        max-width: 575px

        &__data
            padding: 20px

        .cards__h
            color: #2f4252
            margin-top: 15px


</style>
