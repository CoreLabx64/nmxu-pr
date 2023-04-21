export const state = () => ({
  userAuth: {
    token: '',
    id: ''
  },

  userFields: {
    info: {
      company: {
        title: 'Компания',
        value: '',
        rdn: 1
      },
      login: {
        title: 'Логин',
        value: '',
        rdn: 1
      },
      phone: {
        title: 'Телефон',
        value: '',
        rdn: 0
      },
      name: {
        title: 'Имя',
        value: '',
        rdn: 0
      },
      lname: {
        title: 'Фамилия',
        value: '',
        rdn: 0
      }
    },
    settings: {
      email: '',
      sendMethod: ''
    }
  }
})

export const mutations = {
  SET_USER_AUTH (state, data) {
    state.userAuth.token = data.token
    state.userAuth.id = data.user.id
  },

  SET_USER_DATA (state, data) {
    state.userFields.info.company.value = data.companyname
    state.userFields.info.login.value = data.login
    state.userFields.info.phone.value = data.phone
    state.userFields.info.name.value = data.fname
    state.userFields.info.lname.value = data.lname

    state.userFields.settings.email = data.email
    state.userFields.settings.sendMethod = data.sendMethod
  },

  SET_EMD (state, data) {
    state.userFields.settings.email = data
  },

  SET_SMD (state, data) {
    state.userFields.settings.sendMethod = data
  }
}

export const getters = {
  GET_AUTH: (state) => {
    return state.userAuth
  },

  GET_FIELDS: (state) => {
    return state.userFields
  }
}

export const actions = {
  async AUTH_TOKEN ({ commit }) {
    const data = await this.$axios
      .post('/login', {
        login: '9103181435',
        password: '6153087466',
        fromuser: 0
      },
      {
        headers: {
          'X-Api-Key': '8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9',
          'X-Device-OS': '11'
        }
      })
    const response = data.data
    commit('SET_USER_AUTH', response)
  },

  async LOAD_DATA ({ commit }, auth) {
    const data = await this.$axios
      .get('/user/' + auth.id,
        {
          headers: {
            'X-Api-Key': '8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9',
            'X-User-Token': auth.token,
            'X-Device-OS': '11'
          }
        })
    const userData = data.data
    commit('SET_USER_DATA', userData)
  },

  async UPD_DATA ({ getters }) {
    await this.$axios
      .put('/user/' + getters.GET_AUTH.id, {
        email: '' + getters.GET_FIELDS.settings.email,
        sendMethod: getters.GET_FIELDS.settings.sendMethod
      },
      {
        headers: {
          'X-Api-Key': '8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9',
          'X-User-Token': '' + getters.GET_AUTH.token,
          'X-Device-OS': '11'
        }
      })
  }
}
