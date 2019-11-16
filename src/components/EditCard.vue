<template>
    <div class="edit-card">
        <h2>Edit Todo</h2>
        <form>
            <label>
                <textarea v-model="getEditingCard.body" @keydown.enter.prevent="saveEditsAndExit">
                </textarea>
            </label>
            <button @click.prevent="saveEditsAndExit"
                    class="edit-card__button_save edit-card__button">Сохранить
            </button>
        </form>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "EditCard",
    computed: {
      ...mapGetters(['getEditingCard']),
    },
    methods: {
      /**
       * Сохраняет внесенные изменения
       */
      saveEditsAndExit() {
        this.$emit('saveEditedChanges', this.getEditingCard)
      }

    }
  }
</script>

<style lang="sass">
    .edit-card
        h2
            margin-bottom: 10px
            color: #2f4252
        &__button
            margin-top: 5px
            padding: 15px
            font-size: 18px
            color: white
            font-weight: bold
            border-radius: 5px
            cursor: pointer
            background-color: #7ca65c
</style>
