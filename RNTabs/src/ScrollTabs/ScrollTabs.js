var React = require('react');
import '../ScrollTabs.css';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

import img1 from '../image/1.jpg';

var bannerDefImg = '//cache.hinabian.com/images/native/banner_default_img.png';

/*全局常量、变量*/
const TabPane = Tabs.TabPane;
var header_info_dic = {
  h_name:"",
  h_type:"",
  h_price:"",
  h_price_desc:"",
  h_summary:""
};
var imgs_sourceData = [bannerDefImg];
var items_content = [];
var tab_items = []; // "安心服务0","居住环境1","膳食标准2","接送服务3","测是4","测是5","测是6","测是7"
var tab_bar_height = 0;
var content_item_heights = [];
var content_item_scrollHeights = [];
var renderThis = null;
var isLogin = false;
var proId = null;
var isAutoplay = false;
var lastSelectedIndex = 0;
var isManualScroll = false;
var isTerminalDevice = false;
var currentY = 0;
var scrollDirection = 0;
var touchEnable = true;

/* jQury 代码 设计交互效果*/
// 定位效果
$(window).scroll(function() {

  console.log(" -scroll- ");

  /* 1. 滑动过程中 - 判断是否 fixed Tab */
  if($(window).scrollTop() > document.getElementById("roll_imgsSection_id").scrollHeight){
    $("#tab_section_id").addClass("tab_fixedCL");
    if (isTerminalDevice) {
        $(".tab_fixedCL").css("top","0rem");
    }else {
        $(".tab_fixedCL").css("top","0.9rem");
    }
  }else{
    $("#tab_section_id").removeClass("tab_fixedCL");
  }

  if (isManualScroll) {
    var tmp_roll_height = document.getElementById("roll_imgsSection_id").scrollHeight;
    var arr_length = content_item_scrollHeights.length;
    for (var i = 0; i < arr_length; i++) {

      if (scrollDirection == 2) {
        console.log("UP");
      }else if (scrollDirection == 1) {
        console.log("DOWN");
      }


      if (i == 0) {
            if ($(window).scrollTop() < content_item_scrollHeights[i+1]+tmp_roll_height-100 &&
                $(window).scrollTop() >= content_item_scrollHeights[0]+tmp_roll_height) {
              i = parseInt(i);
              renderThis.updateSelectedTabIndex(i);
            }
      } else if (i == arr_length - 1) {
            if ($(window).scrollTop() >= content_item_scrollHeights[arr_length - 1]+tmp_roll_height) {
              i = parseInt(i);
              renderThis.updateSelectedTabIndex(i);
            }
      }else {
            if ($(window).scrollTop() < content_item_scrollHeights[i+1]+tmp_roll_height-100 &&
                $(window).scrollTop() >= content_item_scrollHeights[i]+tmp_roll_height-100) {
              i = parseInt(i);
              renderThis.updateSelectedTabIndex(i);
            }
      }
    }
  }

});


$("body").on("touchstart",function(e){
  // e.preventDefault();
  touchEnable = true;
  currentY = e.originalEvent.changedTouches[0].pageY;
  console.log(" touchstart ");

});

$("body").on("touchmove",function(e){
  // e.preventDefault();
  console.log(" touchmove ");
  if (touchEnable) {
    var startY = currentY;
    currentY = e.originalEvent.changedTouches[0].pageY;
    console.log(" ------ > startY"+startY+","+"currentY"+currentY);

    if (currentY - startY < 0) {
      console.log(" 向上 up");
      isManualScroll = true;
      scrollDirection = 2;
    }else if(currentY - startY > 0){
      console.log(" 向下 down");
      isManualScroll = true;
      scrollDirection = 1;
    }else {
      console.log(" 无滚动 ");
      isManualScroll = false;
      scrollDirection = 0;
    }
  }
  touchEnable = false;
});


$("body").on("touchend",function(e){
  // e.preventDefault();
  console.log(" touchend ");
});

/*主界面渲染*/
class TestView extends React.Component {

      constructor(props) {
          super(props);
          this.state = {
            headerInfo:{},
            imgsData:[],
            tabLists:[],
            itemsContent:[],
            currentImgNum:0
          };
          renderThis = this;
      }

      componentWillMount(){
        console.log("componentWillMount");
        document.title = "TestView";

        console.log("设备尺寸 ：",screen.width,screen.height);

      }



    render() {
      // 与 APP 分享相关的参数
      window.APP_SHARE_TITLE = "海那边赴美生子套餐"+this.state.headerInfo.h_name+"详情";
      window.APP_SHARE_FRIEND_TITLE = "海那边赴美生子套餐"+this.state.headerInfo.h_name+"详情";
      window.APP_SHARE_FRIEND_DESC = "海那边高端直营月子会所安全、省心、贴心，您和宝宝最好的选择";
      window.APP_SHARE_IMG = imgs_sourceData[0];
      window.APP_SHARE_URL = window.location.href;

      // 只有一张图片时 不允许滚动
      if (imgs_sourceData.length > 1) {
        isAutoplay = true;
      }

        return (
             <div id="main_container">
              <TitleBar id="title_bar_ID"
              friend_quan_title = {"海那边赴美生子套餐"+this.state.headerInfo.h_name+"详情"}
              friend_title= {"海那边赴美生子套餐"+this.state.headerInfo.h_name+"详情"}
              friend_desc="海那边高端直营月子会所安全、省心、贴心，您和宝宝最好的选择"
              share_img = {imgs_sourceData[0]}
              share_link = {window.location.href}
              />
              <div id="roll_imgsSection_id">
                  <div>
                    <div className="my-carousel"></div>
                    <div className="roll_num__cl">{this.state.currentImgNum + 1}/{this.state.imgsData.length}</div>
                  </div>
                  <div className="roll_text_cl">
                    <div className="roll_text_one"><div className="text_item_title">{this.state.headerInfo.h_name}</div><div className="text_item_type"><div className="text_item_content_type">{this.state.headerInfo.h_type}</div></div></div>
                    <div className="roll_text_two"><span className="text_item_price"><span className="text_item_price_flag">$</span>{this.state.headerInfo.h_price}</span><span className="text_item_rmb">{this.state.headerInfo.h_price_desc}</span></div>
                    <div className="roll_text_three"><span className="text_item_des">{this.state.headerInfo.h_summary}</span></div>
                  </div>
              </div>
              <div id="tab_scrollSection_id">
                    <div id="tab_section_id">
                      <div id="tab_bar_id">
                        {
                          this.state.tabLists.map((itemText,itemIndex) => {
                            var tmp_id = "item_id_"+itemIndex;
                            var content_id = "item_content_id_"+itemIndex;
                            return (
                              <div className="tab_item_cl" id={tmp_id}>
                                <div className="tab_item_content" id={content_id} onClick={(e) => {
                                  var clicked_index = e.target.id.substr(16,e.target.id.length);
                                  this.scrollToShowContent(parseInt(clicked_index));

                                  var clicked_count = "act_bai_yuezi_"+proId+"_"+clicked_index;
                                  console.log("clicked_count :",clicked_count + ","+typeof clicked_count);
                                  $.rpCommParam({"act": clicked_count});

                                }}>{itemText}</div>
                              </div>);
                          })
                        }
                      </div>
                    </div>
                  <div>
                      {
                        items_content.map((itemContent,index) => {
                          return (
                              <div id={"index_id_"+index} className="index_content_cl">
                                <TabContentCell dataInfo={itemContent} />
                              </div>
                          );
                        })
                      }
                  </div>
              </div>
              <div id="fixed_btnSection_id">
                <div className="div_left">
                  <a className="a_cl a_left" onClick={(e) => {
                    e.preventDefault();
                    $.rpCommParam({"act": "act_bia_yuezi_sign_entry"},true);
                    if (isLogin) {
                        window.location.href = "https://m.hinabian.com/transact/freeSign/12021064.html";
                    } else {
                        // window.location.href = "https://m.hinabian.com/user_login.html?login_referrer=https://m.hinabian.com/native/bia/givebabydetail/?id="+proId;
                        window.location.href = "https://m.hinabian.com/user_login.html?login_referrer=https://m.hinabian.com/transact/freeSign/12021064.html";
                    }

                  }}>
                    签约
                  </a>
                </div>
                <div className="div_right">
                  <a className="a_cl a_right" onClick={(e) => {
                    e.preventDefault();
                    $.rpCommParam({"act": "act_bia_yuezi_reserve_entry"},true);
                    window.location.href="https://m.hinabian.com/project/reservation.html?project_id=12021064"

                  }}>
                    预约赴美生子
                  </a>
                </div>
              </div>
           </div>
           )
    }

    componentDidMount(){
      console.log("componentDidMount");
      proId = this.GetQueryString("id");
      proId = "6";
      console.log("proId:"+proId);
      this.reqDataFromNetIndexGiveBaby();
      this.fetchDataAoubtLoginInfo();
      this.checkUA();


      // $("#tab_bar_id").scroll(function() {
      //
      //   console.log(" ----- ");
      //
      // });


    }

    GetQueryString(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)
        return  unescape(r[2]);
      return null;
    }

    /* 赴美生子 - 网络请求 */
    reqDataFromNetIndexGiveBaby(){
      console.log("reqDataFromNetIndexGiveBaby");
      let localURL = "http://172.16.20.130:8866/givebabydetail.json";
      fetch(localURL,{
        credentials: 'include',
      })
       .then((response) => response.json())
       .then((responseDic) => {
         console.log(" 赴美生子 - responseDic:",responseDic);
         if (responseDic.state == 0) {
           var dataDic = responseDic.data;
            // document.title = dataDic.f_name + "详情";

            header_info_dic.h_name = dataDic.f_name;
            header_info_dic.h_type = dataDic.type_name;
            header_info_dic.h_price = dataDic.f_price;
            header_info_dic.h_price_desc = dataDic.f_price_desc;
            header_info_dic.h_summary = dataDic.f_summary;

            imgs_sourceData = dataDic.f_img_list;

            items_content = dataDic.f_module;
            for (var i = 0; i < items_content.length; i++) {
                var tmpDic = items_content[i];
                tab_items.push(tmpDic.module_name);
            }

            $(".roll_num__cl").addClass("roll_num__cl_block");
            this.setState({
              headerInfo:header_info_dic,
              imgsData:imgs_sourceData,
              tabLists:tab_items,
              itemsContent:items_content
            });
            this.caculateHeightValues();
          }

       })
       .catch((error) => {

       });
    }

    /* 网络请求后 - 计算各个参数*/
    caculateHeightValues(){

      console.log(" ---> 计算各个参数 ");
      tab_bar_height = document.getElementById("tab_bar_id").scrollHeight;
      var index_id_x = 'index_id_';
      var index_height = 0;
      for (var i = 0; i < items_content.length; i++) {
          index_id_x = 'index_id_';
          index_id_x += i;
          index_height = document.getElementById(index_id_x).scrollHeight;
          // console.log(" ---> index_height : ",index_height);
          content_item_heights.push(index_height);
      }

      // 滚动阈值
      var tmp = 0;
      for (var i = 0; i < content_item_heights.length; i++) {
        if (i == 1) {
          tmp -= tab_bar_height;
          tmp += content_item_heights[i-1];
        }else if (i > 1) {
          tmp += content_item_heights[i-1];
        }
        content_item_scrollHeights.push(tmp);
      }

    }

    /* 点击 Tab 响应方法*/
    scrollToShowContent(location){

      console.log(" scrollToShowContent ");
      isManualScroll = false;
      if (location < content_item_scrollHeights.length) {
          var offHeight = document.getElementById("roll_imgsSection_id").scrollHeight+content_item_scrollHeights[location];
          // window.scrollTo(0,offHeight);
          $(window).scrollTop(offHeight);
      }

      this.updateSelectedTabIndex(location);
    }

    /* 判断是否登录 */
    fetchDataAoubtLoginInfo() {

        let url = "//m.hinabian.com/personal_center/getCerifiedInfo";
        fetch(url,
            {
                credentials: 'include',
            })
            .then((response) => response.json())//取数据
            .then((responseDic) => {//处理数据
                if (responseDic.state == 0) {
                    isLogin = responseDic.data.isLogin;
                }
                console.log("fetchDataAoubtLoginInfo - responseDic - isLogin ",responseDic,isLogin);
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    /* 被选中 Tab 样式修改*/
    updateSelectedTabIndex(index){
      // console.log("lastSelectedIndex :"+lastSelectedIndex+","+"index:"+index);
      if (lastSelectedIndex != index) {
        var tmp = index - 1;
        if (tmp < 0) {
          tmp = 0;
        }

        $("#tab_bar_id").animate({
          scrollLeft: $(".tab_item_cl").width() * tmp
        },300);

        $('#item_content_id_'+lastSelectedIndex).css({"color":"#666","border-bottom":"0.04rem solid transparent"});
        $('#item_content_id_'+index).css({"color":"#62cff8","border-bottom":"0.04rem solid #62cff8"});
        lastSelectedIndex = index;
      }
    }

    /* UA 判断 */
    checkUA(){
      var ua = navigator.userAgent;
      isTerminalDevice = ua.indexOf('App_Android_Hinabian') > -1 || ua.indexOf('App_IOS_Hinabian') > -1;
      console.log("ua :"+ua+",isTerminalDevice :",isTerminalDevice);

    }

}
export default TestView;
