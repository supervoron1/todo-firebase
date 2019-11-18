<template>
    <li class="cards__list__el" :class="{done: card.isDone}">
        <!-- отображение одной задачи-->
        <p>{{ card.index }}) {{ card.body }}</p>
        <div class="cards__list__buttons">
            <!-- кнопка отметки о выполнении задачи-->
            <div class="cards__list__buttons_button"
                 :class="{done: card.isDone}"
                 @click="saveIsDoneStatus"
                 v-if="!card.isDone"><i class="far fa-square "></i>
            </div>
            <!-- кнопка отмены отметки о выполнении задачи-->
            <div class="cards__list__buttons_button check"
                 @click="saveIsDoneStatus"
                 v-else><i class="fas fa-check"></i></div>
            <!-- кнопка перехода к редактированию задачи-->
            <div @click="goToEditCard" class="cards__list__buttons_button"><i
                class="fas fa-pencil-alt"></i></div>
            <!-- кнопка удаления задачи-->
            <div @click="removeCard" class="cards__list__buttons_button"><i
                class="fas fa-times"></i></div>
        </div>
    </li>
</template>

<script>
  export default {
    name: "RenderList",
    props: ['card'],
    methods: {
      /**
       * Передача id задачи родительскому компоненту, которое надо удалить
       */
      removeCard() {
        this.$emit('remove', this.card.id)
      },
      /**
       * Передача задачи родительского компонента для перехода к редактированию
       */
      goToEditCard() {
        this.$emit('goToEdit', this.card)
      },
      saveIsDoneStatus() {
        this.card.isDone = !this.card.isDone;
        this.$emit('saveIsDoneStatus', this.card)
      }
    }
  }
</script>

<style lang="sass">
    .cards
        margin-top: 10px

        &__list__el
            margin-top: 10px
            padding: 10px
            background-color: #ffffff
            display: flex
            justify-content: space-between
            color: #334655
            border-radius: 5px

        &__list__buttons
            display: flex
            justify-content: flex-end
            align-items: center

            &_button
                display: inline-block
                width: 16px
                margin-left: 15px
                line-height: 20px
                color: #808d97
                cursor: pointer

    .done
        background-color: lightgrey
        text-decoration: line-through

    .check
        color: #7ca65c
</style>
