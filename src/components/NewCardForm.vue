<template>
    <div class="add-card">
        <form>
            <label>
                <textarea v-model="body" @keydown.enter.prevent="submit"
                          placeholder="Enter a title for this card..."
                          class="add-card__text-area"></textarea>
            </label>
            <div class="add-card__actions">
                <button class="add-card__actions_add" @click.prevent="submit">Add Card</button>
                <div class="add-card__actions_cancel" @click="clearData"><i
                    class="fas fa-times"></i></div>
            </div>
        </form>
    </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'ListForm',
    data() {
      return {
        body: '',
      }
    },
    methods: {
      ...mapActions(["addCard"]),
      /**
       * Отправляет не пустую запись на сервер
       */
      submit() {
        if (this.body) {
          const submit = {body: this.body, createdAt: Date.now(), isDone: false};
          this.addCard(submit);
          this.body = '';
        }
      },
      /**
       * стирает введенные данные
       */
      clearData() {
        this.body = ''
      }
    }
  }
</script>
<style lang="scss">
    textarea {
        width: 100%;
        height: 100px;
        font-size: 18px;
        padding: 10px;
        margin-bottom: 5px;
        resize: none;
        border: none;
        border-radius: 5px;
        border-bottom: outset;
        outline: none;
        background: #ffffff !important;
    }

    .add-card {
        &__actions {
            display: flex;

            &_add {
                padding: 15px;
                font-size: 18px;
                margin-right: 25px;
                font-weight: bold;
                box-shadow: none;
                border: none;
                border-radius: 5px;
                outline: none;
                background-color: #7ca65c;
                color: white
            }

            &_cancel {
                line-height: 45px;
                color: #808d97;
                cursor: pointer;
                font-size: 20px;
            }
        }
    }
</style>

