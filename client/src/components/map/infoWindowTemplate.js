
export function infoWindowTemplate (store) { 

    let driveThru, park = '';

    if(store.drive_thru === 0) { driveThru = "운영"}
    else { driveThru = "미운영" }

    if(store.park === 0) { park = "운영"}
    else { park = "미운영" }

    return (`
    <div style=" padding: 8px; height: 200px; width: 220px;">
        <header style="margin: 5px 0px 10px 0px;">
            <a><strong style="font-size: 13px;">${store.name}</strong></a> 
        </header>
        <container>
        <main>
                <div style="margin: 3px 0px;">
                <b>매장규모 : </b>
                    <span>${store.size} </span> / <span> ${store.floor} 층</span>
                </div>
                <div style="margin: 3px 0px;"><b>이용조건 : </b> ${store.utilization}</div>
                <div style="margin: 3px 0px;"> <b>매장소개 : </b> ${store.introduction}</div>
                <div>
                    <div style="margin: 3px 0px;"><b>phone : </b> ${store.phone}</div>
                    <div style="margin: 3px 0px;"><b>주소 : </b> ${store.address}</div>
                </div>
                <div style="margin: 3px 0px;">
                    <span><b>Drive Thru : </b> ${driveThru}</span> /
                    <span><b>주차 : </b> ${park}</span>
                </div>
                <div style="margin: 3px 0px;">
                    <b>운영</b>
                    <span>${store.open}</span> ~ <span>${store.close}</span>
                    <span>${store.holiday}</span>
                </div>
        </main>
        </container>
    </div>
`);
}
