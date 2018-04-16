<template>
  <div class="main-wrapper">
    <img src="../assets/logo.png">
    <h2>Тестовое Frontend VueJS - 1</h2>

    <ul>
      <li>
        <router-link v-bind:to="'Task1'">
          Задание №1 - Калькулятор дробей
        </router-link>
      </li>
      <li>
        <router-link v-bind:to="'Task2'">
          Задание №2 - Взаимодействие с сервером по протоколу websocket
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  ul {
    list-style-type: none;
  }

  li {
    margin: 15px 0;
    cursor: pointer;

    a {
      color: #212121;
      text-decoration: none;
    }

    &:hover {
      opacity: .7;
    }
  }

  .main-wrapper {
    text-align: center;
  }
</style>
