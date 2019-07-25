<template>
  <div id="play">
    <el-form label-width="100px">
      <el-form-item label="皇后数量：">
        <el-input v-model="size"></el-input>
      </el-form-item>
      <el-form-item label="目标次数：">
        <el-input v-model="count"></el-input>
      </el-form-item>
      <el-form-item label="计算次数：">
        <el-input v-model="calcnow"></el-input>
      </el-form-item>
    </el-form>

    <el-button @click="pref">上一步</el-button>
    <el-button @click="next">下一步</el-button>
    <div style="float: left">
      <div class="row" v-for="x in parseInt(size)">
        <div class="model" v-for="y in parseInt(size)">
          <div :class="cssPiece()" v-if="process(x,y)">
          </div>
        </div>
      </div>
    </div>
    <div style="float: left">
      <el-table :data="log">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>

        <el-table-column
          label="计算次数"
          prop="calcCount">
        </el-table-column>
        <el-table-column
          width="400px"
          label="棋子位置"
          :formatter="parseArr"
          prop="arr">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "play",
    data() {
      return {
        size: 8,
        pieces: [],
        count: 0,
        calcnow: 0,
        log: [],
        tempNow: 0
      }
    },
    watch: {
      size(val) {
        this.init();
      },
      count(val) {
        this.calc();
      }
    },
    created() {
      this.count = -1;
      this.init();
      this.count = 0;
    },
    methods: {
      cssPiece() {
        debugger;
        if (this.judageNotError(this.tempNow, this.pieces)) {
          return "pieceRed"
        }
        return "piece";
      },
      init() {
        this.calcnow = 0;

        this.log = [];
        this.prefQueue(0, parseInt(this.size), []);
      },
      process(x, y) {
        return this.pieces[x - 1] && this.pieces[x - 1] == y;
      },
      calc() {
        this.calcnow = 0;
        this.queue(0, parseInt(this.size), []);
      },
      queue(now, length, arr) {
        if (now == length) {
          return;
        }
        for (let i = 1; i <= length; i++) {
          arr[now] = i;
          if (this.judage(now, arr)) {
            this.queue(now + 1, length, arr);
          }
        }
      },
      prefQueue(now, length, arr) {
        if (now == length) {
          let data = {
            calcCount: this.calcnow,
            arr: arr.slice(),
          };
          this.log.push(data);
          return;
        }
        for (let i = 1; i <= length; i++) {
          arr[now] = i;
          if (this.judage(now, arr)) {
            this.prefQueue(now + 1, length, arr);
          }
        }
      },
      pref() {
        this.count = parseInt(this.count) - 1;

      },
      next() {
        this.count = parseInt(this.count) + 1;
      },
      parseArr(val, b) {
        let data = "";
        let arr = val.arr;
        for (let i = 0; i < arr.length; i++) {
          data += arr[i] + ",";
        }
        return data;
      },
      judage(now, arr) {
        this.calcnow++;
        if (this.count == this.calcnow) {
          for (let i = now + 1; i < this.size; i++) {
            arr[i] = 0;
          }
          this.pieces = arr;
          this.tempNow = now;
          throw "结束！";
        }
        if (now == 0) {
          return true;
        }
        for (let i = 0; i < now ; i++) {
          for (let j = i + 1; j <= now; j++) {
            if (arr[i] == arr[j] || Math.abs(arr[i] - arr[j]) == j - i) {
              return false;
            }
          }
        }
        return true;
      },
      judageNotError(now, arr) {
        if (this.count == this.calcnow) {
          for (let i = now + 1; i < this.size; i++) {
            arr[i] = 0;
          }
        }
        if (now == 0) {
          return true;
        }
        for (let i = 0; i < now ; i++) {
          for (let j = i + 1; j <= now; j++) {
            if (arr[i] == arr[j] || Math.abs(arr[i] - arr[j]) == j - i) {
              return false;
            }
          }
        }
        return true;
      }
    }
  }
</script>

<style scoped>
  .row {
    height: 40px;
  }

  .model {
    width: 38px;
    height: 38px;
    border: 1px solid black;
    float: left;
  }
  .piece{
    position: relative;
    top: 10%;
    left: 10%;
    border-radius: 50px;
    height: 80%;
    width: 80%;
    background: black;
  }
  .pieceRed{
    position: relative;
    top: 10%;
    left: 10%;
    border-radius: 50px;
    height: 80%;
    width: 80%;
    background: red;
  }
</style>
