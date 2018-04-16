<template id="task1">
  <div>
    <h2><b>Задание №1</b> - Калькулятор дробей</h2>

    <div class="calc-container">
      <div class="calc-block">
        <Fraction :fractionId="fractions[0].id" @fractionValueListener='setFractionValue'/>
      </div>

      <div class="calc-block" v-for="operator in operators" :key='operator.id'>
        <Operator :operatorId="operator.id" @operatorValueListener='setOperatorValue'/>
        <Fraction :fractionId="[operator.id]" @fractionValueListener='setFractionValue'/>
      </div>

      <div class="calc-block">
        <div class="calc-equally"> = </div>
        <Result :top="result.top" :bottom="result.bottom"/>
      </div>
    </div>

    <button class="add-fraction" v-on:click.prevent="addFraction">
      <b>Add Fraction</b>
    </button>
  </div>
</template>

<script>
import calculator from '../utils/calculator';

export default {
	data() {
		/*
      В стейте создаем массив с тремя объектами.
      Объект fractions служит для хранения дробных выражений.
      Объект operators служит для хранения математических знаков.
      Объект result хранит результат выполнения
   */
		return {
			fractions: [
				{
					id: [0],
					top: '',
					bottom: '',
				},
				{
					id: [1],
					top: '',
					bottom: '',
				},
			],
			operators: [
				{
					id: 1,
					value: '',
				},
			],
			result: {
				top: '',
				bottom: '',
			},
		};
	},
	components: {
		Fraction: () => import('./Fraction.vue'),
		Operator: () => import('./Operator.vue'),
		Result: () => import('./Result.vue'),
	},
	methods: {
		addFraction() {
			// Добавить дробь
			this.fractions.push({
				id: [this.fractions.length],
				top: '',
				bottom: '',
			});
			// Добавить знак
			this.operators.push({
				id: this.operators.length + 1,
				value: '',
			});
		},
		// Изменить в стейте значение текущего числового поля
		setFractionValue(data) {
			this.fractions[data.id] = {
				...this.fractions[data.id],
				...data,
			};
			this.calculate(); // Запускаем пересчет
		},
		// Изменить в стейте значение текущего поля знака
		setOperatorValue(data) {
			this.operators[data.id - 1] = {
				...this.operators[data.id - 1],
				...data,
			};
			this.calculate(); // Запускаем пересчет
		},
		calculate() {
			// Делаем вычисление
			calculator(this.fractions, this.operators).then(({ top, bottom }) => {
				this.result = {
					top,
					bottom,
				};
			});
		},
	},
};
</script>

<style scoped lang="scss">
  .calc {
    &-container {
      display: flex;
      padding: 15px;
    }

    &-block {
      display: inline-flex;
    }

    &-equally {
      font-size: 34px;
      line-height: 132px;
      margin: 0 15px;
    }
  }

  .add-fraction {
    text-transform: uppercase;
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover {
      opacity: .7;
    }
  }
</style>
