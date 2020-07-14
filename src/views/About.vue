<script>
import api from '@/services/api';

export default {
  data() {
    return {
      loading: false,
      list: [],
    };
  },
  methods: {
    async getList() {
      try {
        this.loading = true;
        const { data } = await api.get('http://localhost:3333/list');
        this.list = data;
      } catch (error) {
        console.log(error.response.data.error);
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push({ name: 'Home' });
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getList">get Dados</button>
    <div v-if="loading">
      Carregando...
    </div>
    <ul v-else>
      <li v-for="item in list" :key="item.name">{{item.name}}</li>
    </ul>
    <br>
    <br>
    <br>
    <br>
    <br>
      <button @click="logout">Sair</button>
  </div>
</template>
