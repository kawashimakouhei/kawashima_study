'use strict';

const list = [
  {name:'山田',birthday: '1988年4月24日',postcode:'2230061'} ,
  {name:'佐藤',birthday: '1990年6月20日',postcode:'2230061'} ,
  {name:'山田',birthday: '1999年10月3日',postcode:'223-0062'} ,
];

const btn = document.getElementById('btn');
const search = document.getElementById('search');
const result = document.getElementById('result');
const TelNo = document.getElementById('TelNo');
const all = document.getElementById('CheckAll');
const  checks = document.getElementsByName('checks');
const thead = document.getElementById('thead');

//検索ボタンクリック時処理
btn.addEventListener('click' , () => {
  const re = search.value;
  while( thead.rows[ 1 ] ) thead.deleteRow( 1 );
  if (re.length === 0) {
    alert('入力欄が未入力です')
    return
  } else {
    ListFound(re);
  }
});

function ListFound(name) {
  let results = list.filter((list) => list.name === name );
  let data_count = 0;
  
    results.forEach((result) => {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td'); 
      const td3 = document.createElement('td');
      thead.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      td1.textContent = result.name.substring(0,15)
      td2.textContent = result.birthday.substring(0,15)

      // 郵便番号より取得した住所データを表示
      fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${result.postcode}`)
        .then(response => response.json())
        .then(data => {
          let address = data.results[0].address1 + data.results[0].address2 + data.results[0].address3
          td3.textContent = address.substring(0,30)
        })
        data_count = data_count + 1;
      });
      result.textContent = '検索結果:' + data_count + '件'
      if(data_count == 0) {
        thead.style.display = "none";
      } else {
        thead.style.display = "block";
      }
}

//検索入力欄フォーカスアウトチェック処理
search.addEventListener('focusout', (e) => {
  if (search.value.length > 10) {   
    alert('10文字以内での入力をお願い致します')
  } else if (search.value.match(/^[^\x20-\x7e]*$/) === null) {
    alert('全角文字での入力をお願い致します')
  }
 });

 // 電話番号入力欄フォーカスアウトチェック処理
TelNo.addEventListener('focusout', (e) => {
  if (TelNo.value.match(/^[A-Za-z0-9]*$/) && TelNo.value.length == 11) {    
  } else if (TelNo.value === '') {
  } else {
    alert('電話番号は半角数字11桁での入力をお願い致します')
  } 
 });

 // チェックボックスクリック時処理
all.addEventListener('click' , () => {
  if(all.checked){
    for(let i = 0; i < checks.length; i++) {
      checks[i].checked = true
    }
  } else {
    for(let i = 0; i < checks.length; i++) {
      checks[i].checked = false
    }
  }
});
