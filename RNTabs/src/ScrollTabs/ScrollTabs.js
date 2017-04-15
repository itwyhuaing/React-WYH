var React = require("react");
import './ScrollTabs.css';

var renderThis = null;
var tab_items = ["测是0","测是1","测是2","测是3","测是4","测是5","测是6","测是7","测是8"];
var content_item_heights = [];
var content_item_scrollHeights = [];
var tab_bar_height = 0;
var isManualScroll = false;
var scrollDirection = 0;
var currentY = 0;
var touchEnable = true;
var lastSelectedIndex = 0;


/* jQury 代码 设计交互效果*/
$(window).scroll(function() {

  console.log(" -scroll- ");

  /* 1. 滑动过程中 - 判断是否 fixed Tab */
  if($(window).scrollTop() > document.getElementById("roll_imgsSection_id").scrollHeight){
        $("#tab_section_id").addClass("tab_fixedCL");
        var tmp_offset =document.getElementById("title_bar_ID").scrollHeight;
        $(".tab_fixedCL").css("top",tmp_offset);
  }else{
      $("#tab_section_id").removeClass("tab_fixedCL");
  }

  console.log("isManualScroll :",isManualScroll);
  if (isManualScroll) {
    var tmp_roll_height = document.getElementById("roll_imgsSection_id").scrollHeight;
    var arr_length = content_item_scrollHeights.length;
    for (var i = 0; i < arr_length; i++) {

      if (scrollDirection == 2) {
        console.log("UP");
      }else if (scrollDirection == 1) {
        console.log("DOWN");
      }else {
        console.log("无滚动");
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
  touchEnable = true;
  currentY = e.originalEvent.changedTouches[0].pageY;
});

$("body").on("touchmove",function(e){
  if (touchEnable) {
    var startY = currentY;
    currentY = e.originalEvent.changedTouches[0].pageY;
    if (currentY - startY < 0) {
      isManualScroll = true;
      scrollDirection = 2;
    }else if(currentY - startY > 0){
      isManualScroll = true;
      scrollDirection = 1;
    }else {
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

/* 主界面渲染 */
class ScrollTabs extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        currentImgNum:0
      };
      renderThis = this;
  }

  componentWillMount(){
    console.log("componentWillMount");
    document.title = "TestView";
    console.log("设备尺寸 ：",screen.width,screen.height);

  }

  render(){
    return (

           <div id="main_container">
              <div id="title_bar_ID">
                导航栏
              </div>
            <div id="roll_imgsSection_id">
                轮播图
            </div>
            <div id="tab_scrollSection_id">
                <div id="tab_section_id">
                  <div id="tab_bar_id">
                    {
                      tab_items.map((itemText,itemIndex) => {
                        var tmp_id = "item_id_"+itemIndex;
                        var content_id = "item_content_id_"+itemIndex;
                        return (
                          <div className="tab_item_cl" id={tmp_id}>
                            <div className="tab_item_content" id={content_id} onClick={(e) => {
                              var clicked_index = e.target.id.substr(16,e.target.id.length);
                              console.log("e :"+e);
                              console.log("e.target :"+e.target);
                              this.scrollToShowContent(parseInt(clicked_index));

                            }}>{itemText}</div>
                          </div>);
                      })
                    }
                  </div>
                </div>
                <div id="tab_bar_content_id">
                  {
                    tab_items.map((itemContent,index) => {
                      return (
                          <div id={"index_id_"+index} className="index_content_cl">
                            <div className="index_item_content">{itemContent}</div>
                          </div>
                      );
                    })
                  }
                </div>
            </div>
            <div id="fixed_btnSection_id">
              <div className="div_left">
                <a className="a_cl a_left" onClick={(e) => {
                  console.log(" 签约 999 ");
                }}>
                  签约
                </a>
              </div>
              <div className="div_right">
                <a className="a_cl a_right" onClick={(e) => {
                  console.log(" 预约赴美生子 888 ");
                }}>
                  预约赴美生子
                </a>
              </div>
            </div>
         </div>
    );
  }

  componentDidMount(){
    console.log("componentDidMount");
    this.caculateHeightValues();

    // $("#tab_bar_id").scroll(function() {
    //
    //   console.log(" ----- ");
    //
    // });
  }

  /* 网络请求后 - 计算各个参数*/
  caculateHeightValues(){
    console.log(" ---> 计算各个参数 ");
    tab_bar_height = document.getElementById("tab_bar_id").scrollHeight;
    var index_id_x = 'index_id_';
    var index_height = 0;
    for (var i = 0; i < tab_items.length; i++) {
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
      console.log("tmp :"+tmp);
      content_item_scrollHeights.push(tmp);
      console.log("content_item_scrollHeights :"+content_item_scrollHeights);
    }

  }

  /* 点击 Tab 响应方法*/
  scrollToShowContent(location){

    console.log(" scrollToShowContent ");
    isManualScroll = false;
    console.log(location + "," + content_item_scrollHeights);
    if (location < content_item_scrollHeights.length) {
        var offHeight = document.getElementById("roll_imgsSection_id").scrollHeight+content_item_scrollHeights[location];
        // window.scrollTo(0,offHeight);
        $(window).scrollTop(offHeight);
    }

    this.updateSelectedTabIndex(location);
  }

  /* 被选中 Tab 样式修改*/
  updateSelectedTabIndex(index){
    console.log("lastSelectedIndex :"+lastSelectedIndex+","+"index:"+index);
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

}
module.exports = ScrollTabs;
