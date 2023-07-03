'use strict';

const list = [
  {name:'山田',birthday: '1988年4月24日',address:'神奈川県横浜市日吉◯丁目△△番地◯◯号△△マンション101号室'} ,
  {name:'佐藤',birthday: '1990年6月20日',address:'東京都大田区'} ,
  {name:'山田',birthday: '1999年10月3日',address:'東京都港区'} ,
];

const btn = document.getElementById('btn');
const search = document.getElementById('search');
const result = document.getElementById('result');
const TelNo = document.getElementById('TelNo');
const all = document.getElementById('CheckAll');
const  checks = document.getElementsByName('checks');

//検索ボタンクリック時処理
btn.addEventListener('click' , () => {
  const re = search.value;
  if (re.length === 0) {
    alert('入力欄が未入力です')
    return
  } else {
    ListFound(re);
  }
});

function ListFound(name) {
  let results = list.filter((list) => list.name === name );
  if (results.length === 0){
    result.textContent = '検索結果:0件'
  } 
  else {
    result.textContent = '検索結果:' + results.length + '件'
    thead.style.display = "block";

    results.forEach((result) => {
    const thead = document.getElementById('thead');
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
    td3.textContent = result.address.substring(0,30)
    });
  }
}

//検索入力欄フォーカスアウトチェック処理
search.addEventListener('focusout', (e) => {
  if (search.value.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/) && search.value.length <= 10) {    
  } else if (search.value === '') {
    alert('入力欄が未入力です')
  } else if (search.value.length > 10) {
    alert('全角文字１０文字以内の入力をお願い致します')
  } else {
    alert('全角文字での入力をお願い致します')
  }
 });

 // 電話番号入力欄フォーカスアウトチェック処理
TelNo.addEventListener('focusout', (e) => {
  if (TelNo.value.match(/^[A-Za-z0-9]*$/) && TelNo.value.length == 11) {    
  } else if (TelNo.value === '') {
    alert('入力欄が未入力です')
  } else {
    alert('電話番号は半角数字11桁での入力をお願い致します')
  } 
 });

 // チェックボックスクリック時処理
all.addEventListener('click' , () => {
  for(let i = 0; i < checks.length; i++) {
    checks[i].checked = true
  }
});
