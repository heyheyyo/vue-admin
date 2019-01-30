<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :lg="8" :sm="12" :xs="12" class="card-panel-col">
      <div @click="handleSetLineChartData('newEvents')" class="card-panel">
        <div class="card-panel-icon-wrapper icon-documentation">
          <svg-icon class-name="card-panel-icon" icon-class="documentation"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">活動數量</div>
          <count-to :duration="2600" :end-val="eventNum" :start-val="0" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :lg="8" :sm="12" :xs="12" class="card-panel-col">
      <div @click="handleSetLineChartData('newAccounts')" class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon class-name="card-panel-icon" icon-class="peoples"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">會員數量</div>
          <count-to :duration="3000" :end-val="accountNum" :start-val="0" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :lg="8" :sm="12" :xs="12" class="card-panel-col">
      <div @click="handleSetLineChartData('newOrgs')" class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon class-name="card-panel-icon" icon-class="money"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">主辦單位數量</div>
          <count-to :duration="3200" :end-val="organizerNum" :start-val="0" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import axios from "axios";

export default {
  components: {
    CountTo
  },
  data() {
    return {
      eventNum: 0,
      accountNum: 0,
      organizerNum: 0
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
    getEvent(params) {
      const field = [];
      const populate = ["location.city", "hashtag_list"];
      const config = {
        params: {
          _field: field.join(","),
          _populate: populate.join(","),
          display: true,
          ...params
        }
      };
      return axios
        .get("http://localhost:3000/api/v1/events")
        .then(res => res.data)
        .catch(function(error) {
          console.log(error);
        });
    },
    getAccount() {
      return axios
        .get("http://localhost:3000/api/v1/accounts")
        .then(res => res.data)
        .catch(function(error) {
          console.log(error);
        });
    },
    getOrganizer() {
      return axios
        .get("http://localhost:3000/api/v1/organizers")
        .then(res => res.data)
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  async created() {
    const tempEvent = await this.getEvent();
    const tempAccount = await this.getAccount();
    const tempOrganizer = await this.getOrganizer();

    this.eventNum = tempEvent.length;
    this.accountNum = tempAccount.length;
    this.organizerNum = tempOrganizer.length;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-documentation {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-documentation {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
