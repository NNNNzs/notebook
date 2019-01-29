<template>
  <div>
    <div class="options">
      <h3>配置项</h3>
      <Select v-model="antiVirus" multiple style="width:300px" placeholder="杀软环境选择">
        <Option v-for="(item,index) in antiVirusOption" :value="item" :key="index">{{ item }}</Option>
      </Select>
      <Select v-model="winnts" multiple style="width:300px" placeholder="全系统环境选择">
        <Option v-for="(item,index) in winntsOption" :value="item" :key="index">{{ item }}</Option>
      </Select>
      <Select v-model="isBar" clearable style="width:300px" placeholder="是否网吧量">
        <Option value="1">网吧量-是</Option>
        <Option value="0">网吧量-否</Option>
      </Select>
      <Select v-model="isDev" clearable style="width:300px" placeholder="是否开发者">
        <Option value="1">开发者-是</Option>
        <Option value="0">开发者-否</Option>
      </Select>
    </div>
    <div class="old-version">
      <h3>需升级版本</h3>
      <Input v-model="source1Version" placeholder="起始版本" style="width: 300px"/>
      <Input v-model="source2Version" placeholder="结束版本" style="width: 300px"/>
    </div>
    <div class="new-version">
      <h3>目标版本</h3>
      <Input v-model="targetVersion" placeholder="目标版本号" style="width: 300px"/>
      <Input v-model="targetVersionUrl" placeholder="安装包地址" style="width: 300px"/>
      <Button @click="getMD5" type="primary">确定</Button>
    </div>
    <div class="gray">
      <Checkbox v-model="isGray">灰度策略</Checkbox>
      <InputNumber
        v-if="isGray"
        :max="100"
        :min="0"
        v-model="gray"
        placeholder="0到100%"
        size="large"
        :formatter="value => `${value}%`"
        :parser="value => value.replace('%', '')"
      ></InputNumber>
    </div>
    <div class="md5">
      <h3>MD5号</h3>
      <Input disabled v-model="md5" placeholder="MD5" style="width: 300px"/>
    </div>
    <div class="updateType">
      <h3>安装方式</h3>
      <RadioGroup v-model="updateType">
        <Radio label="0">静默升级</Radio>
        <Radio label="1">提示升级</Radio>
      </RadioGroup>
    </div>
    <div class="tip-content" v-if="updateType=='1'">
      <h3>更新功能</h3>
      <Input
        v-model="content"
        style="width:650px"
        type="textarea"
        :autosize="{minRows: 5,maxRows: 6}"
        placeholder="点击输入版本更新内容（最多四行，每行10个字符）"
      />
    </div>
    <Button type="primary" @click="showModal=true">发布</Button>
    <Modal v-model="showModal" title="版本升级确认" @on-ok="ok" @on-cancel="cancel">
      <p>需升级版本：{{source1Version}}{{source2Version?'~'+source2Version:''}}</p>
      <p>目标版本：{{targetVersion}}</p>
      <p>杀软环境：{{antiVirus.toString()||'默认'}}</p>
      <p>系统环境：{{winnts.toString()||'默认'}}</p>
      <p>静默升级：{{updateType==1?'是':'否'}}</p>
      <p>是否网吧量地址:{{isBar==1?'是':isBar==0?'否':'默认'}}</p>
      <p>是否开发者:{{isDev==1?'是':isDev==0?'否':'默认'}}</p>
      <p>灰度策略：{{isGray?gray+'%':'否'}}</p>
      <p>安装包地址:{{targetVersionUrl}}</p>
      <p>MD5:{{md5}}</p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "updateOption",
  data() {
    return {
      showModal: false, //是否显示询问框
      antiVirusOption: [
        "360",
        "Q管",
        "Defender",
        "金山",
        "百度",
        "2345安全卫士",
        "小众杀软"
      ], //杀软环境选择下拉框
      winntsOption: ["Win7", "Win10", "XP", "Win8"], //系统选择下拉框
      isBarOption: ["网吧量-是", "网吧量-否"], //是否网吧下拉框
      isDevOption: ["开发者-是", "开发者-否"], //是否开发者
      antiVirus: "", //杀软环境选择
      winnts: "", //系统选择
      isBar: "", //是否网吧
      isDev: "", //是否开发者
      source1Version: "", //需上线的起始版本
      source2Version: "", //需上线的结束版本
      targetVersion: "", //目标版本
      targetVersionUrl: "", //目标版本地址
      md5: "",
      updateType: "1", //安装方式1为提示0为静默安装
      content: "", //提示升级的内容
      gray:0, //灰度百分比
      isGray: false //是否灰度策略
    };
  },
  methods: {
    getMD5() {
      let targetVersion = this.targetVersion;
      let targetVersionUrl = this.targetVersionUrl;
      if(targetVersion==''||targetVersionUrl==''){
        this.$Message.error("目标版本和地址不能为空");
        return
      }
      this.$axios({
        url: "https://api.nnnnzs.cn/api/getNews",
        methods: "get"
      }).then(data => {
        // this.md5 = data.data.md5
        console.log(data.data);
      });
    },
    release() {
      let updatePoint = this.content.split("\n");
      let sendDate = {
        antiVirus: this.antiVirus, //杀软换件
        winnts: this.winnts, //系统
        isBar: this.isBar, //是否网吧
        isDev: this.isDev, //是否开发者
        source1Version: this.source1Version, //需上线的起始版本
        source2Version: this.source2Version, //需上线的结束版本
        targetVersion: this.targetVersion, //目标版本地址
        targetVersionUrl: this.targetVersionUrl, //安装包地址
        updateType: this.updateType, //安装方式
        gray: this.gray, //灰度策略的量级
        md5: this.md5, //MD5
        updatePoint: updatePoint //数组
      };
      this.$axios({
        url: "https://api.nnnnzs.cn/api/getweibo",
        data: $qs.stringify(sendDate),
        methods: "get"
      }).then(response => {
        console.log(response);
      });
    },
    ok() {
      this.release();
    },
    cancel() {
      this.$Message.info("取消发布");
    },
  }
};
</script>

<style>
.ivu-select,
.ivu-input-wrapper,
.ivu-radio-group,
.ivu-checkbox-wrapper {
  margin: 10px;
}
</style>


