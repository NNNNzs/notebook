<template>
  <div>
    <div class="new-version">
      <h3>目标版本</h3>
      <Input v-model="targetVersion" placeholder="目标版本号" style="width: 300px"/>
    </div>
    <div class="options">
      <h3>配置项</h3>
      <Select v-model="antiVirus" multiple style="width:300px" placeholder="杀软环境选择">
        <Option
          v-for="(item,index) in antiVirusOption"
          :value="item.id"
          :key="index"
        >{{ item.value }}</Option>
      </Select>
      <Select v-model="winnts" multiple style="width:300px;margin-left:1rem" placeholder="全系统环境选择">
        <Option v-for="(item,index) in winntsOption" :value="item" :key="index">{{ item }}</Option>
      </Select>
      <Select v-model="isBar" clearable style="width:300px" placeholder="是否网吧量">
        <!-- <Option value="2">网吧量-默认</Option> -->
        <Option value="1">网吧量-是</Option>
        <Option value="0">网吧量-否</Option>
      </Select>
      <Select v-model="isDev" clearable style="width:300px" placeholder="是否开发者">
        <!-- <Option value="2">开发者-默认</Option> -->
        <Option value="1">开发者-是</Option>
        <Option value="0">开发者-否</Option>
      </Select>
    </div>
    <div class="old-version">
      <h3>升级版本区间</h3>
      <Input v-model="source1Version" placeholder="起始版本,如：0.0.0.1" style="width: 300px"/>-
      <Input v-model="source2Version" placeholder="结束版本，如：0.0.0.1" style="width: 300px"/>
    </div>
    <div class="gray">
      <span>灰度策略:</span>
      <InputNumber
        :max="100"
        :min="0"
        v-model="gray"
        placeholder="0到100%"
        size="small"
        :step="1"
        :formatter="value => `${parseInt(value)}`"
      ></InputNumber>%
      <span>(0-100)</span>
    </div>
    <div class="md5" style="margin:10px 0">
      <Card style="width:400px;">
        <h3>安装包地址</h3>
        <Input v-model="targetVersionUrl" placeholder="安装包地址" style="width: 300px"/>
        <h3>MD5</h3>
        <Input disabled v-model="md5" placeholder="MD5" style="width: 300px"/>
        <Button @click="getMD5" type="primary">获取MD5</Button>
      </Card>
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
    <Button type="primary" @click="confirm">发布</Button>
    <Modal v-model="showModal" title="版本升级确认" @on-ok="ok" @on-cancel="cancel">
      <p>目标版本：{{targetVersion}}</p>
      <p>需升级版本：{{source1Version?source1Version:'所有'}}{{source2Version?'~'+source2Version:''}}</p>
      <p>杀软环境：{{selectedAntiVirus||'默认'}}</p>
      <p>系统环境：{{winnts.toString()||'默认'}}</p>
      <p>是否网吧量地址:{{isBar==1?'是':isBar==0?'否':'默认'}}</p>
      <p>是否开发者:{{isDev==1?'是':isDev==0?'否':'默认'}}</p>
      <p>灰度策略：{{gray}}%</p>
      <p>提示升级：{{updateType==1?'是':'否'}}</p>
      <p v-if="updateType==1">更新功能:{{updatePoint}}</p>
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
        { value: "Q管", id: "1" },
        { value: "360", id: "2" },
        { value: "金山毒霸", id: "4" },
        { value: "百度", id: "8" },
        { value: "微软MSE", id: "16" },
        { value: "2345安全卫士", id: "32" },
        { value: "火绒", id: "64" }
      ], //杀软环境选择下拉框
      winntsOption: ["Win7", "Win10", "XP", "Win8"], //系统选择下拉框
      isBarOption: ["网吧量-是", "网吧量-否"], //是否网吧下拉框
      isDevOption: ["开发者-是", "开发者-否"], //是否开发者
      antiVirus: [], //杀软环境选择
      winnts: [], //系统选择
      isBar: "2", //是否网吧
      isDev: "2", //是否开发者
      source1Version: "", //需上线的起始版本
      source2Version: "", //需上线的结束版本
      targetVersion: "", //目标版本
      targetVersionUrl: "", //目标版本地址
      md5: "",
      updateType: "1", //安装方式1为提示0为静默安装
      content: "", //提示升级的内容
      gray: 100, //灰度百分比
      updatePoint:''
    };
  },
  watch: {
    isGray() {
      //取消勾选后把灰度值清空
      if (this.isGray == false) {
        this.gray = 0;
      }
    }
  },
  computed: {
    selectedAntiVirus() {
      let selectIndex = this.antiVirus; //[1,2,4...]
      let values = [];
      selectIndex.forEach((item, index) => {
        this.antiVirusOption.forEach((OptionItem, index1) => {
          if (OptionItem.id == item) {
            values.push(OptionItem.value);
          }
        });
      });
      return values.toString();
    }
  },
  methods: {
    getMD5() {
      let targetVersion = this.targetVersion;
      let targetVersionUrl = this.targetVersionUrl;
      if (targetVersion == "" || targetVersionUrl == "") {
        this.$Message.error("目标版本和安装包地址不能为空");
        return;
      }
      let sendDate = {
        targetVersion: targetVersion,
        targetVersionUrl: targetVersionUrl
      };
      this.$axios({
        url: "http://adm.xunrar.com:8080/Xunrar/config/md5",
        data: $qs.stringify(sendDate, { indices: false }),
        method: "post"
      })
        .then(resp => {
          if (resp.data.code == 200) {
            this.$Message.success(resp.data.msg);
            this.md5 = resp.data.result;
          }else{
            this.$Message.error(resp.data.msg);
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    release() {
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
        updatePoint: this.updatePoint //数组
      };
      this.$axios({
        url: "http://adm.xunrar.com:8080/Xunrar/upgrade/config",
        data: $qs.stringify(sendDate, { indices: false }),
        method: "post",
        indices: false
      }).then(response => {
        if (response.data.code == 200) {
          this.$Message.success(response.data.msg);
        } else {
          this.$Message.error(response.data.msg);
        }
      });
    },
    confirm() {
      if (!this.targetVersion) {
        this.$Message.error("目标版本必填");
        return false;
      }           
      //安装包地址必填
      if (!this.targetVersionUrl) {
        this.$Message.error("安装包地址必填");
        return false;
      }
      if(!this.md5){
        this.$Message.error("请先获取md5");
        return false;
      } 
      let updatePoint = this.content.split("\n");
      //去换行，连续两个换行会导致问题
      updatePoint.forEach((ele, index, arr) => {
        if (ele == "") {
          arr.splice(index, 1);
        }
      });
      //提示必选
      if (this.updateType=='1'&&updatePoint.length==0) {
        this.$Message.error("提示升级须先填写更新内容");
        return false;
      }
      //提示最多四页
      if (updatePoint.length > 4) {
        this.$Message.error("更新功能最最多四行");
        return false;
      }      
      this.updatePoint = updatePoint.toString();
      this.showModal = true;
    },
    ok() {
      this.release();
    },
    cancel() {
      this.$Message.info("取消发布");
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


