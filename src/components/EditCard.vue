<template>
    <div class="edit-card">
        <form>
            <label>
                <textarea v-model="getEditingCard.body" class="edit-card__text-area"
                          @keydown.enter.prevent="saveEditsAndExit">
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
        margin-top: 10px

        &__text-area
            width: 100%
            border-radius: 5px
            height: 50px

        &__button
            margin-top: 10px
            padding: 10px 20px
            border-radius: 5px
            margin-right: 10px
            cursor: pointer
            background-color: #7ca65c
</style>
