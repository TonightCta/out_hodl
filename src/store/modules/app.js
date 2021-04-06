// import EthTool from '@/utils/web3Config'
// import { Message } from 'element-ui'
const app = {
  state:{
    language:'',//多语言
    token:sessionStorage.getItem('token'),//权限验证
    uid:sessionStorage.getItem('uid'),//用户ID
    isLogin:sessionStorage.getItem('linkStatus'),//0未登录  1已登录
    userToken:sessionStorage.getItem('account'),//用户钱包地址
    mineLoading:false,//个人中心加载
    loading:{display:'none',opacity:'0'},//页面加载
    newID:window.sessionStorage.getItem('newId'),//新闻详情ID
    isReal:window.sessionStorage.getItem('isReal'),//用户是否注册
  },
  mutations:{
    connection(state,result){//连接钱包状态
      let status = result;
      sessionStorage.setItem('linkStatus',status)
      state.isLogin = status;
    },
    accounts(state,result){//账户信息
      let account = result[0];
      sessionStorage.setItem('account',account)
      state.userToken = account;
    },
    mineLoad(state,bool){//各种中心加载
      state.mineLoading = bool;
    },
    upLoadStatus(state,bool){//主体加载状态
      state.loading = bool;
    },
    upNewID(state,id){//新闻ID
      sessionStorage.setItem('newId',id)
      state.newID = id;
    },
    upReal(state,status){//是否已绑定谷歌验证器
      sessionStorage.setItem('isReal',status);
      state.isReal = status;
    },
    upToken(state,token){//接口验证
      sessionStorage.setItem('token',token);
      state.token = token;
    },
    upUid(state,uid){//用户ID
      sessionStorage.setItem('uid',uid);
      state.uid = uid;
    }
  },
  actions:{
    async loginIn({dispatch,commit}){ //登入
      const result = await EthTool.signIn();
      if(result !== undefined && result != 'UnLock'){
        switch (result.code){
          case 4001:
            Message.error("您已取消授权");
          break;
          case -32002:
            Message.error('钱包窗口已打开，请完成当前钱包操作')
          default:
            if(result.length){
              commit('connection',1)
              dispatch('getAccount');
            }
        }
      }else if(result == 'UnLock'){
        Message.error('钱包尚未解锁,请先解锁钱包')
      }else{
        Message.error("您的浏览器尚未安装钱包");
      }
    },
    async loginOut({commit}){//登出

      // const result = await EthTool.signOut();
      // commit('connection',0)
      // sessionStorage.clear()
    },
    async getAccount({commit}){//用户信息
      const result = await EthTool.getAccount();
      commit('accounts',result)
    },
    upLoad({commit},bool){
      commit('upLoadStatus',bool)
    }
  },
  getter:{
    newLoad:state => {
      return state.loading
    }
  }
}
export default app;
