import  {db}  from '@/main'
export default {
    actions: {
        /**
         * загрузка задач с сервера
         *
         */
        firestore ({ commit }) {
            return {
               list: db.collection('list')
                   .orderBy('createdAt', 'desc')
                   .onSnapshot( querySnapshot => {
                   commit('updateList', querySnapshot)
               })

            }
        },
        /**
         * добавление новой задачи
         * @param ctx контекст
         * @param submit - объект, которые необходимо добавить
         */
        addCard(ctx, submit){
            db.collection('list').add(submit)
        },
        /**
         * удаление задачи
         * @param ctx контект
         * @param id задачи, которую необходимо удалить
         */
        removeCard(ctx, id){
            db.collection('list').doc(id).delete()
        },
        /**
         * сохранение изменений задачи
         * @param ctx контекст
         * @param editingCard объект для сохранения
         */
        saveEdits(ctx, editingCard) {
            db.collection("list").doc(editingCard.id).update(editingCard)
        }
    },

    mutations: {
        /**
         * создание объекта задач
         */
        updateList (state, querySnapshot) {
            const cards = [];
            let index = 0;
            querySnapshot.forEach(doc => {
                index++;
                cards.push({id: doc.id, ...doc.data(), index: index })
            });
            state.toDoList = cards
        },
        /**
         * Изменение измененных данных
         * @param state хранилище
         * @param card объект с измененными данными
         */
        changeEditingCardData(state, card){
            state.editingCard = card;
        },
        /**
         * изменение отображения окна редактирования
         * @param state хранилище
         */
        changeShowEdit(state){
            state.showEdit = !state.showEdit;
        },
        /**
         * Изменить текущую отображаемую страницу
         * @param state хранилище
         * @param page страница, которую необходимо отобразить
         */
        changeCurrentPage(state, page){
            state.paginationOptions.currentPage = page
        },
        /**
         * Изменить отображаемую страницу на первую
         * @param state хранилище
         */
        setCurrentPageFirst(state){
            state.paginationOptions.currentPage = 1;
        },
    },
    state: {
        toDoList: [],
        showEdit: false,
        editingCard: {},
        paginationOptions: {
            cardsPerPage: 10,
            currentPage: 1,
            pageRange: 2,
        }
    },
    getters: {
        /**
         * получить все имеющиеся
         * @param state
         * @return {Array}
         */
        getAllCards(state){
            return state.toDoList
        },
        /**
         * получить ответ о необходимости отобюразить страницу редактирования
         * @param state хранилище
         * @return {*|boolean} отображать \ не отображать
         */
        getShowEdit(state){
            return state.showEdit
        },
        /**
         * Получить объект редактируемой задачи
         * @param state хранилище
         * @return {obj} объект редактируемой задачи
         */
        getEditingCard(state){
            return state.editingCard
        },
        /**
         * Получение опций, необходимых для пагинации
         * @param state хранилище
         * @return {obj} настройки пагинации
         */
        getPaginationOptions(state){
            return state.paginationOptions
        },
        /**
         * Получение массива в зависимости от количества отображаемых задач на странице
         * @param state хранилище
         * @return {*[]} массив, отображаемый на старнице
         */
        getLimitList(state){
            const options = state.paginationOptions;
            let firstCard = null;
            let lastCard = null;
            if (options.currentPage === 1){
                firstCard = 0;
                lastCard = options.cardsPerPage
            } else {
                firstCard = (options.currentPage - 1) * options.cardsPerPage;
                lastCard = firstCard + options.cardsPerPage;
            }
            return state.toDoList.slice(firstCard, lastCard)
        },
        /**
         * получение текузей страницы
         * @param state хранилище
         * @return {number} текущая страница
         */
        getCurrentPage(state){
            return state.paginationOptions.currentPage
        },

    }
}
