<!-- 个人中心 -->
<template lang="html">
  <div class="mineBox">
    <div class="w1280">
      <!-- 用户信息 & 菜单栏 -->
      <div class="mineMsg">
        <i class="iconfont iconmorentouxiang avatr"></i>
        <p class="userName">456</p>
        <p class="userID">
          <i class="iconfont iconbianhao_id"></i>
          <span v-if="app.isReal == 1">{{app.uid}}</span>
          <span v-else>-</span>
        </p>
        <p class="subscribe">
          <img :src="require('@/assets/images/vipYear.png')" alt="">
          {{$t('mine.subYear')}}
        </p>
        <p class="line"></p>
        <!-- 菜单 -->
        <ul>
          <router-link v-for="(menu,indexM) in menuList" :to="menu.url" :key="indexM" tag="li" @click.native="changeTurn(indexM)" :class="{nowTurnStyle:nowTurn == indexM}">
            <i :class="menu.icon"></i>
            {{menu.title}}
          </router-link>
        </ul>
        <!-- 退出 -->
        <p class="line"></p>
        <p class="loginOut">
          <i class="iconfont icontuichu_logout"></i>
          {{$t('public.loginOut')}}
        </p>
      </div>
      <!-- 用户详细信息 -->
      <div class="mineContent">
        <p class="contentTitle">
          <span class="line"></span>
          <i class="iconfont icontixing_remind"></i>
          <span class="sysNot">{{$t('public.sysNot')}}</span>
          <span class="binding">{{$t('public.binding')}}</span>
          <span class="bindingUsed">
            <i class="iconfont iconlianjie_link"></i>
            &nbsp;
            {{$t('public.bindingUsed')}}
          </span>
        </p>
        <div class="contentMsg"

        >
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- 移动端个人中心 -->
    <div class="mobileBox">
      <!-- 菜单 -->
      <div class="menuBox">
        <ul class="menu">
          <router-link :to="menuMo.url" tag="li" v-for="(menuMo,indexM) in menuListMo"
          :class="{nowTurnMoStyle:nowTurnMo == indexM}"
          @click.native="nowTurnMo = indexM"
          :key="indexM"
          >
            {{menuMo.title}}
            <span class="line"></span>
          </router-link>
        </ul>
      </div>
      <!-- 绑定旧帐号 -->
      <div class="bindBox">
        <div class="bindBtn">
          <p>
            <span class="line"></span>
            <i class="iconfont icontixing_remind"></i>
            <span>{{$t('public.sysNot')}}</span>
          </p>
          <p>
            <i class="iconfont iconlianjie_link"></i>
            <button type="button" name="button">{{$t('public.bindingUsed')}}</button>
          </p>
        </div>
        <p class="bindRe">{{$t('public.binding')}}</p>
      </div>
      <!-- 详细信息 -->
      <div class="viewMobile">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'Mine',
  data(){
    return{
      userToken:'',//用户地址
      userId:84548915,//用户ID
      nowTurn:0,//当前选中
      nowTurnMo:0,//移动端当前选中
    }
  },
  computed:{
    ...mapState(['app']),
    loadMsg(){
      return this.app.mineLoading
    },
    // pc菜单列表
    menuList(){
      return [
        {
          icon:'iconfont iconyonghu_user',
          title:this.$t('mine.menuTitle'),
          url:'/mineCenter'
        },
        {
          icon:'iconfont icondingdan_order',
          title:this.$t('mine.menuTitleOrder'),
          url:'/mineOrder'
        },
        {
          icon:'iconfont iconbiaoqingxinxi_message-emoji',
          title:this.$t('mine.menuTitlePro'),
          url:'/mineService'
        },
        {
          icon:'iconfont icontishi_tips',
          title:this.$t('mine.menuTitleCom'),
          url:'/mineComplaint'
        },
      ]
    },
    // mobile菜单列表
    menuListMo(){
      return [
        {
          title:this.$t('mine.menuTitle'),
          url:'/'
        },
        {
          title:this.$t('mine.menuTitleOrder'),
          url:'/'
        },
        {
          title:this.$t('mine.menuTitlePro'),
          url:'/'
        },
        {
          title:this.$t('mine.menuHouse'),
          url:'/'
        },
        {
          title:this.$t('mine.menuTitleCom'),
          url:'/'
        },
      ]
    }
  },
  created(){
    this.userToken = this.app.userToken;
    let routeName = this.$route.name;
    if(routeName == 'MineCenter'){
      this.nowTurn = 0;
    }else if(routeName == 'MineOrder'){
      this.nowTurn = 1;
    }else if(routeName == 'MineService' || routeName == 'ServiceDetails' || routeName == 'Library' || routeName == 'LibrsryDetails'){
      this.nowTurn = 2;
    }else if(routeName == 'MineComplaint'){
      this.nowTurn = 3;
    }
  },
  methods:{
    changeTurn(index){
      this.nowTurn = index;
      // this.loadMsg = true;
      // setTimeout(() => {
      //   this.loadMsg = false;
      // },1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.mineBox{
  width: 100%;
  padding-top: 40px;
  padding-bottom: 80px;
  background: $evenBg;
  .w1280{
    width: 1280px;
    margin:0 auto;
    display: flex;
    justify-content: space-between;
  }
  .mineMsg{
    width: 304px;
    height: 705px;
    background: white;
    padding-top: 60px;
    text-align: center;
    .avatr{
      display: inline-block;
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: $evenBg;
      font-size: 50px;
      line-height: 96px;
      color:$iconBg;
    }
    .userName{
      margin-top: 24px;
      font-size: $textSize + 2;
      color:$titleColor;
    }
    .userID{
      font-size: $textSize - 2;
      color:$maskColor;
      margin-bottom: 24px;
      position: relative;
      i{
        color:#999;
        display: inline-block;
        margin-right: 4px;
        font-size: $iconSize;
        position: absolute;
        left:99px;
        top:1px;
      }
    }
    .subscribe{
      width: 120px;
      height: 40px;
      border-radius: 60px;
      margin:0 auto;
      background: $firstBg;
      font-size: $textSize;
      color:$firstColor;
      font-weight: 600;
      line-height: 43px;
      position: relative;
      padding-left: 20px;
      img{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        position: absolute;
        left: 8px;
        top:8px;
      }
    }
    .line{
      width: 256px;
      height: 1px;
      background: $lineColor;
      margin:0 auto;
      margin-top: 50px;
      margin-bottom: 16px;
    }
    ul{
      width: 100%;
      display: flex;
      flex-direction: column;
      li{
        height: 56px;
        padding-left: 82px;
        text-align: left;
        line-height: 56px;
        position: relative;
        font-size: $textSize;
        color:$maskColor;
        cursor:pointer;
        transition: .3s all;
        i{
          transition: .3s all;
          position: absolute;
          font-size: 18px;
          left: 50px;
          top:0;
          color:$mineIconColor;
        }
      }
      li:hover{
        color:$titleColor;
        i{
          color:$titleColor;
        }
      }
      .nowTurnStyle{
        color:$themeColor;
        i{
          color:$themeColor;
        }
      }
      .nowTurnStyle:hover{
        color:$themeColor;
        i{
          color:$themeColor;
        }
      }
    }
    .loginOut{
      height: 56px;
      margin-top: -10px;
      line-height: 56px;
      position: relative;
      text-align: left;
      padding-left: 82px;
      font-size: $textSize;
      color: $maskColor;
      cursor:pointer;
      i{
        font-size: 18px;
        position: absolute;
        left:52px;
        color:$mineIconColor;
      }
    }
  }
  .mineContent{
    width: 952px;
    position: relative;
    .contentTitle{
      width: 100%;
      height: 60px;
      margin-bottom: 16px;
      background: white;
      line-height: 60px;
      position: relative;
      text-align: left;
      padding-left: 55px;
      font-size: $textSize;
      .line{
        display: inline-block;
        width: 3px;
        height: 24px;
        background: $themeColor;
        position: absolute;
        left:0;
        top:50%;
        margin-top: -12px;
      }
      .icontixing_remind{
        font-size: 22px;
        color:$themeColor;
        position: absolute;
        left:25px;
        top:0;
      }
      .sysNot{
        color: $themeColor;
        font-weight: bold;
      }
      .binding{
        margin-left: 24px;
        color:$maskColor;
      }
      .bindingUsed{
        display: inline-block;
        margin-top: 10px;
        margin-left: 133px;
        width: 140px;
        height: 40px;
        background: $themeColor;
        line-height: 40px;
        text-align: center;
        border-radius: $contentRadius + 8;
        color:white;
        font-size: $textSize;
        cursor:pointer;
      }
    }
    .contentMsg{
      width: 100%;
      min-height: 500px;
      background: white;
      box-sizing: border-box;
    }
  }
  @media screen and (min-width: 1025px){
    .mobileBox{
      display: none;
    }
  }
  @media screen and (max-width: 1024px){
    padding-top: 0;
    padding-bottom: 1.62rem;
    .w1280{
      display: none;
    }
    .mobileBox{
      .menuBox{
        width: 100%;
        overflow-x:auto;
        .menu{
          width: 112%;
          overflow-x: auto;
          display: flex;
          background: white;
          border-top: 1px solid $lineColor;
          padding-left: $padd12;
          border-bottom: 1px solid #eee;
          li{
            height: 1.1rem;
            line-height: 1.1rem;
            padding: 0 $padd12;
            font-size: $font14;
            transition: .3s all;
            position: relative;
            .line{
              display: inline-block;
              position: absolute;
              width: 0;
              height: 2px;
              left: 50%;
              margin-left: -15%;
              bottom:1px;
              background: $themeColor;
              transition: .3s all;
            }
          }
          .nowTurnMoStyle{
            color:$themeColor;
            .line{
              width: 30%;
            }
          }
        }
      }
      .menuBox::-webkit-scrollbar{
        display: none;
      }
      .bindBox{
        padding: $padd16 0 $padd24 0;
        background: white;
        .bindBtn{
          display: flex;
          p:first-child{
            position: relative;
            font-size: $font14;
            color:$themeColor;
            font-weight: bold;
            height: $padd32;
            line-height: $padd32;
            padding-left: $padd48;
            .line{
              display: inline-block;
              width: .08rem;
              height: $font16;
              background: $themeColor;
              position: absolute;
              left:0;
              top:50%;
              margin-top:-.21rem;
            }
            i{
              position: absolute;
              font-size: $font16;
              left:.67rem;
              top:0;
            }
          }
          p:last-child{
            flex:1;
            height: $padd32;
            line-height: $padd32;
            display: flex;
            justify-content: flex-end;
            padding-right: $padd24;
            position: relative;
            button{
              height: 100%;
              width: 3.44rem;
              border-radius: $btnRadiius;
              font-size: $font14;
              color:white;
              background: $themeColor;
              padding-left: .8rem;
            }
            i{
              position: absolute;
              font-size: $font16;
              color:white;
              right:3.2rem;
            }
          }
        }
        .bindRe{
          font-size: $font14;
          color:$maskColor;
          padding: 0 $padd24;
          margin-top: $padd24;
          text-align: left;
          line-height: $padd24;
        }
      }
      .viewMobile{
        margin-top: $padd24;
        // padding: $padd24;
        background: white;
      }
    }
  }
}
</style>
