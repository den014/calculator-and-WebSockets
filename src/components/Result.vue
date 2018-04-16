<template>
  <div class="result-container">
    <div class="result-value">{{top}}</div>

    <div class="result-line"></div>

    <div class="result-value">{{bottom}}</div>
  </div>
</template>

<script>
export default {
	props: ['top', 'bottom'],
};
</script>

<style scoped lang="scss">
  .result {
    &-container {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 70px;
    }

    &-value {
      width: 60px;
      height: 60px;
      line-height: 60px;
      background: rgba(0, 0, 0, .1);
      border-radius: 5px;
      border: solid 1px #bbb;
      font-size: 11px;
      font-weight: bold;
      text-align: center;
      user-select: none;
      cursor: default;
    }

    &-line {
      width: 100%;
      height: 1px;
      margin: 5px 0;
      background: #bbb;
    }
  }
</style>
