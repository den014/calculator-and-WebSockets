<template>
  <div class="operator">
    <input type="text" class="operator-value" @keyup="operatorValueListener" v-model="value">
  </div>
</template>

<script>
import { validateOperator } from '../utils/validation';

export default {
	props: ['operatorId'],
	data() {
		return {
			id: this.operatorId,
			value: '',
		};
	},
	methods: {
		operatorValueListener() {
			this.value = this.value ? this.checkValidation(this.value) : '';

			this.$emit('operatorValueListener', {
				id: this.operatorId,
				value: this.value,
			});
		},
		checkValidation(value) {
			return validateOperator(value);
		},
	},
};
</script>

<style scoped lang="scss">
  .operator {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 132px;
    margin: 0 15px;

    &-value {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      border: solid 1px #bbb;
      text-align: center;
    }
  }
</style>
