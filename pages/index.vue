<template>
  <div>
    <h1>Настройки</h1>
    <section class="userData">
      <div class="titleData">
        Учетная запись
      </div>
      <div class="fields">
        <div
          v-for="field, index in GET_FIELDS.info"
          :key="index"
          class="field"
        >
          {{ field.title }}
          <input
            :name="index"
            :value="field.value"
            :readonly="field.rdn == 1"
          >
        </div>
      </div>
    </section>
    <section class="notification">
      <div class="titleData">
        Оповещения о новых подборках
      </div>
      <div class="emData">
        <div class="emData-title">
          Выберите, куда будут приходить уведомления при появлении автомобилей, которые подходят под критерии вашей подборки.
        </div>
        <div class="field">
          <input
            id="Off"
            type="radio"
            name="notification"
            :checked="GET_FIELDS.settings.sendMethod == -1"
            :value="-1"
            @click="UPD_SMD"
          >
          Выкл
        </div>
        <div class="field">
          <input
            id="Email"
            type="radio"
            name="notification"
            :checked="GET_FIELDS.settings.sendMethod == 2"
            :value="2"
            @click="UPD_SMD"
          >
          Email
          <input
            type="text"
            name="Email"
            class="em"
            :readonly="GET_FIELDS.settings.sendMethod == -1"
            :value="watchEm.email"
            @input="UPD_EMD"
          >
        </div>
        <div>
          <button class="btn" @click="UPD_DATA()">
            Сохранить
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'SettingsPage',
  async fetch () {
    await this.AUTH_TOKEN() // Вызов action для получения токена
    await this.LOAD_DATA(this.GET_AUTH) // Вызов action для получения данных пользователя
  },
  computed: {
    ...mapGetters(['GET_AUTH', 'GET_FIELDS']), // Получение данных из VUEX
    ...mapState({ watchEm: state => state.userFields.settings }) // Получение поля Email
  },
  methods: {
    ...mapActions(['AUTH_TOKEN', 'LOAD_DATA', 'UPD_DATA']), // Определение методов
    UPD_EMD (e) {
      this.$store.commit('SET_EMD', e.target.value) // Обновление данных VUEX для поля Email
    },
    UPD_SMD (e) {
      this.$store.commit('SET_SMD', e.target.value) // Обновление данных VUEX для поля sendMethod
    }
  }
}
</script>

<style>
* {
  font-family: "Montserrat";
}

.titleData {
  width: 75vh;
  font-weight: bold;
}

.userData {
  display: flex;
  width: 50%;
  font-weight: lighter;
}

.notification {
  display: flex;
  width: 50%;
}

.emData {
  display: flex;
  width: 130vh;
  flex-direction: column;
}

.emData-title {
  padding: 0px 0px 24px 14px;
}

.notification .field {
  padding: 0px 128px 24px 14px;
}

.userData .fields {
  width: 130vh;
  display: inline-flex;
  flex-direction: column;
}

.userData .field {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 128px 24px 14px;
}

.userData input {
  width: 172px;
  height: 24px;
  border: 1px solid #555;
  border-radius: 10px;
  padding: 0px 20px;
}

.notification .em {
  width: 172px;
  height: 24px;
  border: 1px solid #555;
  border-radius: 10px;
  padding: 0px 20px;
  margin-left: 50px;
}

.btn {
  font-weight: bold;
  width: 90%;
  height: 40px;
  background-color: #2dc574;
  color: #eee;
  border: 1px solid #2ecd78;
  border-radius: 8px;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
}
</style>
