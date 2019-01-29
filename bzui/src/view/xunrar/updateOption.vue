<template>
  <div>
    <div class="options">
      <h3>配置项</h3>
      <Select v-model="softEnvi" multiple style="width:300px" placeholder="杀软环境选择">
        <Option v-for="(item,index) in softEnviOption" :value="item" :key="index">{{ item }}</Option>
      </Select>
      <Select v-model="system" multiple style="width:300px" placeholder="全系统环境选择">
        <Option v-for="(item,index) in systemOption" :value="item" :key="index">{{ item }}</Option>
      </Select>
      <Select v-model="internetBar" clearable style="width:300px" placeholder="是否网吧量">
        <!-- <Option v-for="(item,index) in internetBarOption" :value="item" :key="index">{{ item }}</Option> -->
        <Option value="1">网吧量-是</Option>
        <Option value="0">网吧量-否</Option>
      </Select>
      <Select v-model="isDev" clearable style="width:300px" placeholder="是否开发者">
        <Option value="1">开发者-是</Option>
        <Option value="0">开发者-否</Option>
        <!-- <Option v-for="(item,index) in isDevOption" :value="item" :key="index">{{ item }}</Option> -->
      </Select>
    </div>
    <div class="old-version">
      <h3>需升级版本</h3>
      <Input v-model="source1Version" placeholder="起始版本" style="width: 300px"/>
      <Input v-model="source2Version" placeholder="结束版本" style="width: 300px"/>
    </div>
    <div class="new-version">
      <h3>目标版本</h3>
      <Input v-model="newVersion" placeholder="目标版本号" style="width: 300px"/>
      <Input v-model="newVersionUrl" placeholder="安装包地址" style="width: 300px"/>
      <Button @click="getMD5" type="primary">确定</Button>
    </div>
    <div class="gray">
      <Checkbox v-model="isGray">灰度策略</Checkbox>
      <Input
        @on-change="checkGray"
        v-if="isGray"
        v-model="gray"
        placeholder="0到100"
        style="width: 100px"
      />
    </div>
    <div class="md5">
      <h3>MD5号</h3>
      <Input disabled v-model="md5" placeholder="MD5" style="width: 300px"/>
    </div>
    <div class="installType">
      <h3>安装方式</h3>
      <RadioGroup v-model="installType">
        <Radio label="0">静默升级</Radio>
        <Radio label="1">提示升级</Radio>
      </RadioGroup>
    </div>
    <div class="tip-content" v-if="installType=='1'">
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
      <p>需升级版本：{{source1Version}}~{{source2Version}}</p>
      <p>目标版本：{{newVersion}}</p>
      <p>杀软环境：{{softEnvi.toString()}}</p>
      <p>系统环境：{{system.toString()}}</p>
      <p>静默升级：{{installType==1?'是':'否'}}</p>
      <p>灰度策略：{{isGray?gray+'%':'否'}}</p>
      <p>安装包地址:{{newVersionUrl}}</p>
      <p>MD5:{{md5}}</p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "updateOption",
  data() {
    return {
      softEnviOption: [
        "360",
        "Q管",
        "Defender",
        "金山",
        "百度",
        "2345安全卫士",
        "小众杀软"
      ], //杀软环境选择
      softEnvi: "",
      systemOption: ["Win7", "Win10", "XP", "Win8"], //系统选择
      system: "",
      internetBarOption: ["网吧量-是", "网吧量-否"], //是否网吧
      internetBar: "",
      isDev: "",
      isDevOption: ["开发者-是", "开发者-否"], //是否开发者
      source1Version: "",
      source2Version: "",
      newVersion: "",
      newVersionUrl: "", //新版本地址
      md5: "",
      installType: "1",
      content: "",
      showModal: false, //是否显示询问框
      gray: "",
      isGray: false
    };
  },
  methods: {
    getMD5() {
      this.$axios({
        url: "https://api.nnnnzs.cn/api/getNews",
        methods: "get"
      }).then(data => {
        // this.md5 = data.data.md5
        console.log(data.data);
      });
    },
    release() {
      let content = this.content.split("\n");
      let sendDate = {
        antiVirus: this.softEnvi, //杀软换件
        winnts: this.system, //系统
        isBar: this.internetBar, //是否网吧
        isDev: this.isDev, //是否开发者
        source1Version: this.source1Version, //需上线的版本,数组
        source2Version: this.source2Version,
        targetVersion: this.newVersion, //目标版本地址
        targetVersionUrl: this.newVersionUrl, //安装包地址
        updateType: this.installType, //安装方式
        gray: this.gray, //灰度策略的量级
        md5: this.md5, //MD5
        updatePoint: content
      };
      this.$axios({
        url: "http://sc.94rp.com/bzDCP/data/screening",
        data: $qs.stringify(sendDate),
        methods: "post"
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
    checkGray(val) {
      console.log(val.data);
    }
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


