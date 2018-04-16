<template>
  <div class="fraction-container">
    <input type="text" class="fraction-value" @keyup="fractionValueListener" v-model="top">

    <div class="fraction-line"></div>

    <input type="text" class="fraction-value" @keyup="fractionValueListener" v-model="bottom">
  </div>
</template>

<script>
import { validateNumber } from '../utils/validation';

export default {
	props: ['fractionId'],
	data() {
		return {
			id: this.fractionId,
			top: '',
			bottom: '',
		};
	},
	methods: {
		fractionValueListener() {
			this.top = this.top ? this.checkValidation(this.top) : '';
			this.bottom = this.bottom ? this.checkValidation(this.bottom) : '';

			this.$emit('fractionValueListener', {
				id: this.fractionId,
				top: this.top,
				bottom: this.bottom,
			});
		},
		checkValidation(value) {
			return validateNumber(value);
		},
	},
};
</script>

<style scoped lang="scss">
  .fraction {
    &-container {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 70px;
    }

    &-value {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      border: solid 1px #bbb;
      text-align: center;
    }

    &-line {
      width: 100%;
      height: 1px;
      margin: 5px 0;
      background: #bbb;
    }
  }
</style>
