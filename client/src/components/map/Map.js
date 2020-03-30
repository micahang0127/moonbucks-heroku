/*global kakao*/

import React, { Component } from 'react';
import axios from 'axios';
import * as infoTemplate from  './infoWindowTemplate';
import { markerClickSalesMonth, markerClickSalesTotal, markerClickProduct, markerClickCategory } from '../../containers/map/markerClick';
import './Map.css';


class Map extends Component {

  constructor(props){
      super(props);
      this.state = {
        map: null, 
        marker :null,
        bounds : [],
        infowindow : null, 
        stores : [],
      };
    } 

    componentDidMount() {

    
  

        axios.post('/api/storeAll')   // => 사용) 1. adress(좌표추출) / sideInfo  / infoWindow
             .then(res => res.data)  
             .then(result => {
                 this.setState({ stores : result})
                })
             .catch(err => console.log(err));
     



        const script = document.createElement('script');
        script.async = true;
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=4df73cfcb7cfb8177e418e2c44092262&autoload=false&libraries=services";
        document.head.appendChild(script);

              
          script.onload = () => {
                
                // kakao maps 로드 (여기서 kakao모듈 사용 가능)
            kakao.maps.load(() => {

                const mapContainer = document.getElementById('map');

                // 주소-좌표 변환 객체를 생성
                const geocoder = new kakao.maps.services.Geocoder();
                
                // 지도 범위 재설정(다중 마크가 모두 보이게 중심좌표, 레벨을 재설정)
                this.bounds = new kakao.maps.LatLngBounds();    


                // map 출력
                this.map = new kakao.maps.Map(mapContainer, {                          // 지도 생성 및 객체 리턴
                    center: new kakao.maps.LatLng(33.450701, 126.570667),  // 지도의 중심좌표
                    lever : 12   // 지도의 레벨(확대, 축소 정도)
                });



                this.state.stores.forEach( (stores, index)=> {
                  
                    // 주소-좌표 변환 => (주의)이 내부에서 클릭, 인포메이션 등의 수행을 해야한다) - geocoder 라이브러리 addressSearch 메서드 사용
                    geocoder.addressSearch(stores.address, (result, status) => {
                      
                    
                    // 정상적으로 검색이 완료됐으면 
                    if (status === kakao.maps.services.Status.OK) {

                        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        

                        // 마커 생성 함수
                        this.createMarker(coords);

                        // 객체에 추가된 좌표들을 기준으로 지도 범위 재설정(마커 다보이게)-(중심좌표와 레벨이 변경될 수 있음)
                        this.setBounds();

            
                        // 인포윈도우 생성 함수
                        this.createinfoWindow(stores);



                        // 이벤트 리스너로는 클로저를 만들어 등록
                        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                        kakao.maps.event.addListener(this.marker, 'mouseover', this.makeOverListener(this.map, this.marker, this.infowindow));
                        kakao.maps.event.addListener(this.marker, 'mouseout', this.makeOutListener(this.infowindow));
                        kakao.maps.event.addListener(this.marker, 'click', this.makeClickListener(this.map, this.marker, stores));
                        // kakao.maps.event.addListener(this.marker, 'click', <makeClickListener/>);
                        

                        // 지도의 중심을 결과값으로 받은 위치로 이동 시킴
                        this.map.setCenter(coords); 
                        
                      }
                    })    // end hadleAddress
            
                  })  // end forEach
            });
          };
      }

         
          // [ 마커 생성 함수 ]  
          createMarker = (coords) => {

              this.marker = new kakao.maps.Marker({
                    map: this.map, // 마커를 표시할 지도
                    position: coords, // 마커를 표시할 위치(좌표값) => 좌표값 들어오는함수 return값
                    // title : stores.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              });
              //  마커 표기
              // this.marker.setMap(this.map);

              // LatLngBounds 객체에 좌표를 추가
              this.bounds.extend(coords);

            }


            setBounds = () => {
              // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
              // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
              this.map.setBounds(this.bounds);
            }
          



           // [ 인포윈도우 ]
          createinfoWindow = (store) => {
            // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능.
            const iwContent = infoTemplate.infoWindowTemplate(store)
                  // ,iwRemoveable = true 


            // 인포윈도우를 생성합니다
            this.infowindow = new kakao.maps.InfoWindow({
                content: iwContent ,// 인포윈도우에 표시할 내용
                // removable : iwRemoveable     // 닫기
            });
                // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
                // this.infowindow.open(this.map, this.marker);
            }
 


              // [ 인포윈도우를 표시하는 클로저를 만드는 함수] 
               makeOverListener = (map, marker, infowindow) => {
                  return function() {
                      infowindow.open(map, marker);
                  };
                }

                // [ 인포윈도우를 닫는 클로저를 만드는 함수]
                makeOutListener = (infowindow) => {
                    return function() {
                        infowindow.close();
                    };
                  }


                 

                 // [ 마크 클릭 시 이벤트 ] => 해당 정보가 옆 side로 나온다. 
                makeClickListener = (map, marker, store) => {
 
                  return function (){

                    markerClickSalesTotal(store.name)
                            .then(res => {
                              let template = 
                              '<br/><div><span><b>누적매출 : '+res[0].sum+'</b></span></div>';
                              document.getElementById('total').innerHTML = JSON.stringify(template).replace(/"/gi, "");
                            });



                    markerClickSalesMonth(store.name)
                            .then(res => {
                              let template = 
                              '<div><span><b>금월매출 : '+res[0].total_sales+'</b></span></div>'+
                              '<div><span><b>전월매출 : '+res[1].total_sales+'</b></span></div><br/>';
                              document.getElementById('sales').innerHTML = JSON.stringify(template).replace(/"/gi, "");
                            });


                    markerClickProduct(store.name)  
                            .then(res => {        
                              let template =  
                              `<b>[ 이번 달 전체상품 순위 ]</b>`+
                              `<div><span>1. ${res[0].name}</span></div>`+
                              `<div><span>2. ${res[1].name}</span></div>`+
                              `<div><span>3. ${res[2].name}</span></div><br/>`;
                              document.getElementById('rank').innerHTML = JSON.stringify(template).replace(/"/gi, "");
                            });
 
 
                    markerClickCategory(store.name) 
                            .then(res => {
                              let template =
                              `<br/><b>[ 이번 달 category별 매출 ]</b>`+
                              `<div><span><b>Drink : ${res[0].price}</b></span></div>`+
                              `<div><span><b>Food : ${res[1].price}</b></span></div>`+
                              `<div><span><b>Goods : ${res[2].price}</b></span></div>`;
                              document.getElementById('category_sales').innerHTML = JSON.stringify(template).replace(/"/gi, "");
                            });
   

                      let title = document.getElementById('storeName'); 
                      title.innerHTML = store.name;

                      let template = document.getElementById('default'); 
                      template.innerHTML = 
                                  `
                                  <div>
                                    <div style="font-size: 13px;"><b>주소 : </b>     ${store.address}</div>
                                    <div style="font-size: 13px;"><b>manager : </b> ${store.managers_num} 인</div>
                                    <div style="font-size: 13px;"><b>직원 : </b>     ${store.part_time_num} 인</div>
                                  </div>
                                  `;

                      // menuEl = document.getElementById('menu_wrap')
                      // menuEl.scrollTop = 0;
                      }
                  }   // end makeClickListener
                 


              

        render(props) {

          const style={
              width:'95%', 
              height:'100%',
      
          };
      
        return (  
          <div>
              <div className="map_wrap">
                <div id="map" style={style}></div>
                <div id="menu_wrap" className="bg_white" > 
                  <div id="storeName" className="storeName">
                      Moobucks 매장
                  </div>
                <hr/>
                    <ul id="storeInfo" className="storeInfo">
                        <div id="default" className="default">
                            <div style={{ margin: '5px 0px', fontSize: '14px'}}>이용해 주셔서 감사합니다. </div>
                            해당 매장의 상세한 통계를 <br/>보시고 싶으시다면,<br/> 
                            <b className="bord">마커를 클릭</b>해 주세요<br/>
                        </div>
                        <div>
                          <div  id="total" className="total"></div>
                          <div  id="sales" className="sales" ></div>
                        </div>
                          <div id="rank" className="rank"></div>
                          <div id="category_sales" className="category_sales"></div>
                    </ul> 
                  </div>
                </div>
            </div>
        );
    }
}


export default Map;
