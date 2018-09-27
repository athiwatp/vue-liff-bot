<template>
  <div class="container">
    <h1 class="text-center pb-5">{{ttl}}</h1>
    <form @submit.prevent="sendMessage()">
      <div class="form-group">
        <label for="name">名前</label>
        <input type="text" class="form-control" id="name" v-model="data.name" @change="createMessage()">
      </div>
      <div class="form-group">
        <label for="reason">遅刻理由</label>
        <select class="form-control" v-model="data.reason" id="reason" @change="createMessage()">
            <option v-for="(reason, index) in reasons" :key="index">{{reason}}</option>
          </select>
      </div>
      <div class="form-group" v-show="data.reason=='その他'">
        <input type="text" class="form-control" id="reson_other" @change="createMessage()" placeholder="その他の場合は理由を書いてください。" v-model="data.reason_other">
      </div>
      <div class="form-group">
        <label>種別</label>
        <div class="form-check" v-for="(type, index) in types" :key="index">
          <input class="form-check-input" type="radio" v-model="data.schedule" :id="index" :value="type" :checked="((index!=0)? '': 'checked')" @change="createMessage()">
          <label class="form-check-label" :for="index">{{type}}</label>
        </div>
      </div>
      <div class="form-group" v-show="data.schedule == '遅刻します'">
        <label>遅刻時間</label>
        <div class="form-row align-items-center">
          <div class="col-5 form-group">
            <select class="form-control" v-model="data.time1" @change="createMessage()">
                <option v-for="(time, index) in createTimes(0,12)" :key="index">{{time}}</option>
              </select>
          </div>
          <div class="col-2 text-center form-group">
            <span>～</span>
          </div>
          <div class="col-5 form-group">
            <select class="form-control" v-model="data.time2" @change="createMessage()">
              <option v-for="(time, index) in createTimes(1,13)" :key="index">{{time}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="message">メッセージ</label>
        <textarea class="form-control" id="message" rows="5" v-model="data.message"></textarea>
      </div>
      <div class="form-group pt-2">
        <button class="btn btn-primary btn-lg btn-block" type="submit">送信</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'InputForm',
    props: {
      ttl: String
    },
    data() {
      return {
        data: {
          name: '',
          reason: '',
          reason_other: '',
          schedule: '',
          time1: '',
          time2: '',
          message: '',
        },
        reasons: ['電車遅延', '体調不良', '忘れ物', 'その他'],
        types: ['遅刻します', '全休をいただきます', '午前休をいただきます', '午後休をいただきます'],
        text1: 'おはようございます。',
        text2: 'よろしくお願いします。'
      };
    },
    methods: {
      createTimes: function(init, to) {
        const times = [];
        for (let index = init; index < to; index++) {
          times.push(`${index * 5}分`);
        }
        return times;
      },
      createMessage: function() {
        let text, text_reson, text_schedule
  
        if (this.data.reason == "その他") {
          text_reson = this.data.reason_other
        } else {
          text_reson = this.data.reason
        }
  
        if (this.data.schedule == "遅刻します") {
          text_schedule = `${this.data.time1}～${this.data.time2}ほど${this.data.schedule}`
        } else {
          text_schedule = this.data.schedule
        }
  
        text = `${this.text1}${this.data.name}です。${text_reson}のため${text_schedule}。${this.text2}`;
  
        this.data.message = text;
      },
      sendMessage: function() {
        // let a = window.liff.postMessage
        // window.console.log(a)
        window.liff.postMessage({
          type: 'text',
          text: this.data.message
        })
      }
    }
  };
</script>

<style>
  
</style>
