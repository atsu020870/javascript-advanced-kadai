//変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let counttype = 0;

//必要なHTMLの取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const count2 = document.getElementById('count2');


//複数のテキストを格納
const textlists = [
    'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];


// ランダムなテキストを表示
 const createText = ()=> {
   //正タイプした文字列をクリア
   typed = '';
   typedfield.textContent = typed;
   
   //配列のインデックス数からランダムな数値を生成する
   let random = Math.floor(Math.random()*textlists.length);
   
   //配列からランダムにテキストを取得し画面に表示する
   untyped = textlists[random];
    untypedfield.textContent = untyped;
 };
 
 // キー入力の判定・・keyプロパティ？
 const keyPress = e => {
   //誤タイプ
   if(e.key !== untyped.substring(0,1)){
      wrap.classList.add('mistyped');
         setTimeout(() =>{
         wrap.classList.remove('mistyped');
      },100);
      return;
   }

   //正タイプ
   score++;
   counttype++;
   count2.textContent = counttype
   wrap.classList.remove('mistyped');
   typed += untyped.substring(0,1);
   untyped = untyped.substring(1);
   typedfield.textContent = typed;
   untypedfield.textContent = untyped;

   //テキストがなくなったら新しいテキストを表示
   if(untyped === ''){
   createText();
   }
 };
 
 // タイピングスキルのランクを判定
 const rankCheck = score => {
   let text = '';

   if(score < 100){
      text = `あなたのランクはｃです。\Bランクまであと${100-score}もじです。`
   }else if(score < 200){
      text = `あなたのランクはbです。\Aランクまであと${200-score}もじです。`
   }
   else if(score < 300){
      text = `あなたのランクはaです。\sランクまであと${300-score}もじです。`
   }
   else if(score >= 300){
      text = `あなたのランクはsです。\nおめでとうございます！`
   }
   return`${score}文字打てました。\n${text}\n【ok】リトライ/【キャンセル】終了`;
 };
 
 // ゲームを終了
 const gameOver = id => {
   clearInterval(id);
   const result = confirm(rankCheck(score))
   if(result == true){
      window.location.reload();
   }
 };
 
 // カウントダウンタイマー
 const timer = () => {
   let time = count.textContent;

   const id = setInterval(() => {
      time--;
      count.textContent = time;
   if(time <= 0){
      gameOver(id);
   }
 },1000);
 }

 //ゲームスタート時の処理
 start.addEventListener('click',() => {

   timer();
   //ランダムなテキストを表示する
   createText();

   //スタートボタン非表示
   start.style.display = 'none';

   //キーボードのイベント処理
   document.addEventListener('keypress',keyPress);

   setTimeout(() => {
      untypedfield.textContent = 'タイムアップ！';
    }, 59900);
 });
 untypedfield.textContent = 'スタートボタンで開始';