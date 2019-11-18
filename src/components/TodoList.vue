<template>
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
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import RenderList from '../components/RenderList'

  export default {
    name: "TodoList",
    components: {
      RenderList
    },
    computed: mapGetters([
      'getAllCards',
      'getShowEdit',
      'getCurrentPage',
      'getLimitList',
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
       * Сохранить статус выполнения задачи
       */
      saveIsDoneStatus(card) {
        this.saveEdits(card)
      }
    },
  }
</script>

<style scoped>
</style>
