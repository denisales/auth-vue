<script>
export default {
  name: 'Home',
  methods: {
    async submit(event) {
      try {
        const { email, password } = event.target;

        await this.$store.dispatch('login', {
          email: email.value,
          password: password.value,
        });
        this.$router.push({ name: 'About' });
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
  },
};
</script>

<template>
  <div class="home">
    <form @submit.prevent="submit">
      <input type="email" name="email" placeholder="email">
    <input type="password" name="password" placeholder="senha">
    <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<style lang="scss">
  .home form {
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    button {
      background: #f23dd3;
      border: 0;
      border-radius: 4px;
      padding: 10px;
      color: #fff;
    }
  }
</style>
