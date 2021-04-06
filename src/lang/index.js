import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './language/en'
import zh from './language/zh-CN'
import store from '../store'

Vue.use(VueI18n)

let langType;
if(store.state.language == null || store.state.language == ''){
  langType = 'zh-CN'
}else{
  langType = store.state.language;
}
const messages = {
  'zh-CN':zh,
  'en':en
};
const i18n = new VueI18n({
  locale:langType,
  messages
});

export default i18n;
