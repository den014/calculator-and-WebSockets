<template>
  <div>
    <h2><b>Задание №2</b> - Взаимодействие с сервером по протоколу websocket</h2>

    <div class="result-container">
      <div class="result-block" v-for="result in results" :key='result.id'>
        <div class="result-block-id">Запрос {{result.id + 1}}</div>
        <div class="result-block-message">{{result.message}}</div>
        <div class="result-block-control">
          <button v-on:click.prevent="removeComment(result.id)">удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeComment, removeFromArray, socket } from '../utils/comments';

export default {
	data() {
		return {
			results: [
				{
					id: 0,
					message: 'Тестовой коммент 1',
				},
				{
					id: 1,
					message: 'Это шедевр',
				},
				{
					id: 2,
					message: 'Это прекрасно',
				},
				{
					id: 3,
					message: 'Лучшее, что я видел',
				},
				{
					id: 4,
					message: 'Два чая этому автору',
				},
				{
					id: 5,
					message: 'Тестовой коммент 2',
				},
				{
					id: 6,
					message: 'Это шедевр 2',
				},
				{
					id: 7,
					message: 'Это прекрасно 2',
				},
				{
					id: 8,
					message: 'Лучшее, что я видел 2',
				},
				{
					id: 9,
					message: 'Два чая этому автору 2',
				},
			],
		};
	},
	created() {
		// Следим за ответом
		socket.addEventListener('message', (event) => {
			const { data } = event;

			// При получении ответа, удаляем из стейта текущий элемент
			this.results = this.results.filter(result => result.id !== Number(data));
			// Удаляем элемент из массива - comments (Описание - utils/comments.js)
			removeFromArray(Number(data));
		});
	},
	methods: {
		removeComment(id) {
			setTimeout(() => {
				removeComment(id);
			}, 3000);
		},
	},
};
</script>

<style scoped lang="scss">
  .result {
    &-container {
      display: block;
      padding: 0 150px;
    }

    &-block {
      position: relative;
      height: 40px;
      line-height: 40px;
      display: block;
      background: rgba(0, 0, 0, .1);
      margin-bottom: 5px;
      text-align: center;
      border: solid 1px;
      border-color: rgba(255, 255, 255, .2) rgba(0, 0, 0, .1)
      rgba(0, 0, 0, .1) rgba(255, 255, 255, .2);
      border-radius: 3px;
      font-size: 14px;

      &-id {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        border-right: solid 1px rgba(0, 0, 0, .15);
        box-shadow: 1px 0 0 0 rgba(255, 255, 255, .3);
      }

      &-message {
        display: block;
        padding: 0 130px 0 180px;
        text-align: left;
      }

      &-control {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        border-left: solid 1px rgba(0, 0, 0, .15);
        box-shadow: inset 1px 0 0 0 rgba(255, 255, 255, .3);
      }

    }
  }
</style>
