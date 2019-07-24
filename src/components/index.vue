

<template>
  <div id="index">
    <div class="tTable">
      <el-header>
        <div style="width: 100%;height: 100px;">
          <div class="header-mar">
            <marquee direction="left" scrollamount="3px"><span class="header-mar-font">yoyoyo666.com 打造最专业的传奇找服网站。q12484226</span>
            </marquee>
          </div>
          <div class="head-font">
            <div style="float:left;width: 371px;margin-top: 9px;">
              <strong>666传奇找服网</strong>
            </div>
            <el-input
              style="width: 400px;"
              v-model="search"

              placeholder="输入关键字搜索">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>

      </el-header>

      <el-table
        class="tTable"
        width="100%"
        stripe
        :data="dataList.filter(data => !search || data.filer.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column
          prop="name"
          width="128px"
          align="center"
          label="服务器名">
          <template slot-scope="scope">
            <div v-html="scope.row.name">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          width="128px"
          align="center"
          label="服务器IP">
          <template slot-scope="scope">
            <div v-html="scope.row.ip">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          width="178px"
          align="center"
          label="开机时间[月/日/时]">
          <template slot-scope="scope">
            <div v-html="scope.row.time">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          width="99px"
          align="center"
          label="线路类别">
        </el-table-column>
        <el-table-column
          prop="content"
          width="291px"
          align="center"
          label="详细版本介绍">
          <template slot-scope="scope">
            <div v-html="scope.row.content">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="qq"
          width="99px"
          align="center"
          label="客服QQ">
        </el-table-column>
        <el-table-column
          width="90px"
          prop="qq"
          align="center"
          label="游戏主页">
          <template slot-scope="scope">
            <div
              class="target"
              v-html="scope.row.src">
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  import http from "../api/httpCommon"

  export default {
    name: "index",
    data() {
      return {
        dataList: [],
        search: "",
        pageIndex: 1,
        total: 0,
        pageSize: 20
      }
    },
    created() {
      this.getAll()
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 1) {
          return 'warning-row';
        } else {
          return '';
        }
      },

      debug(val) {
        debugger;
      },
      getAll() {
        // data.name.toLowerCase().includes(search.toLowerCase())||data.ip.includes(search.toLowerCase())||
        // data.type.includes(search.toLowerCase())||data.content.includes(search.toLowerCase())||data.qq.includes(search.toLowerCase())
        http.post("/api/url/getByPage", {pageIndex: this.pageIndex}, success => {
          this.total = success.total;
          let data = success.rows;
          data.forEach(e => {
              e.filer = e.name + e.ip + e.type + e.content + e.qq;
            }
          );
          this.dataList = this.dataList.concat(data);
          this.pageIndex = success.pageIndex + 1;
          // console.log(this.pageIndex);
          // console.log(this.pageSize);
          // console.log(this.total);

          if (this.pageIndex * this.pageSize < this.total) {
            this.getAll();
          }
        })
      }
    }
  }
</script>

<style scoped>

  .tTable {
    margin: 0 auto;
    font-family: 宋体;
    width: 1013px;
    font-size: 9pt;
    color: rgb(0, 0, 0);
    text-align: center;
  }

  .warning-row {
    background: #f0f9eb;
  }

  .tTable >>> a {
    color: #000;
    text-decoration: none;
  }

  .tTable >>> a:hover {
    color: red;
    text-decoration: underline;
  }

  .target >>> a {
    color: blue;
    text-decoration: underline;
  }

  /*.head-font {*/
  /*font-size: 40pt;*/
  /*filter: shadow(color=black);*/
  /*width: 100%;*/
  /*color: #e4dc9b;*/
  /*line-height: 150%;*/
  /*font-family: 华文彩云;*/
  /*height: 60px;*/
  /*float: left;*/
  /*}*/
  .head-font {
    height: 61px;
    line-height: 61px;
    FILTER: dropshadow(color=#228B22, offX=5, offY=3, Positive=1);
    LINE-HEIGHT: 150%;
    WIDTH: 100%;
    FONT-FAMILY: 华文行楷;
    COLOR: #ff7f50;
    FONT-SIZE: 26pt
  }

  .header-mar {
    width: 100%;
    height: 38px;
    line-height: 38px;
  }

  .header-mar-font {
    font-family: 微软雅黑;
    color: blue;
  }
</style>
