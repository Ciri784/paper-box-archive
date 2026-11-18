const docs={
 welcome:{id:'PB-00 / READ FIRST',title:'入館須知',body:`<p>這裡收存紙箱居民留下的作品、碎片與不肯歸檔的想法。</p><p>若你在閱讀途中看見自己的名字，請不要驚訝。系統會替每位願意停留的人建立索引，方便他們下次回來。</p><blockquote>「檔案不會記得你離開的樣子，只會記得你第一次打開它時的樣子。」</blockquote>`},
 light:{id:'PB-11 / CONSUMED OBJECT',title:'燈泡鑑定報告',body:`<p>物件：一枚已食用的日光燈泡。外殼沒有碎裂；燈絲消失，像是被舌頭耐心地捲走。</p><p>目擊者表示，居民說它「嚐起來像 4:20」。檔案員無法確認時間是否具有味道。</p><blockquote>補記：事件發生於 04:20。登錄時間亦為 04:20。牆上的時鐘直到今天都還是。</blockquote>`},
 log:{id:'PB-24 / NIGHT SHIFT',title:'夜間值班紀錄',body:`<p>04:17：走廊的燈亮了。沒有人經過。</p><p>04:20：檔案室外傳來抓紙箱的聲音。值班員確認箱子裡沒有東西後，聲音從箱子裡回應：「那你是誰？」</p><p>04:21：值班員申請離館。系統回覆：<em>「訪客尚未完成登錄。」</em></p>`},
 visitor:{id:'PB-? / VISITOR INDEX',title:'訪客索引卡',body:`<p>姓名：<span class="redacted">██████</span></p><p>首次閱覽時間：剛才。</p><p>回訪次數：尚未結束。</p><blockquote>請不要試著撕掉這張卡。你會發現另一面也寫著同樣的事。</blockquote>`}
};
const title=document.querySelector('#doc-title'),body=document.querySelector('#doc-body'),id=document.querySelector('#doc-id'),integrity=document.querySelector('#integrity'),out=document.querySelector('#output'),notice=document.querySelector('#notice');
let read=new Set(),damage=0;
function show(key){const doc=docs[key];id.textContent=doc.id;title.textContent=doc.title;body.innerHTML=doc.body;document.querySelectorAll('.file').forEach(x=>x.classList.toggle('active',x.dataset.file===key));read.add(key);if(read.size>1){damage=Math.min(23,(read.size-1)*7);integrity.textContent=`${100-damage}%`;}}
document.querySelectorAll('.file').forEach(btn=>btn.addEventListener('click',()=>show(btn.dataset.file)));
document.querySelector('#mark').addEventListener('click',()=>{notice.innerHTML='<strong>系統訊息</strong>：已標記。謝謝你協助整理自己。';document.querySelector('#mark').textContent='已讀 / 已登錄';});
function write(text,klass=''){out.innerHTML+=`\n<span class="${klass}">${text}</span>`;out.scrollTop=out.scrollHeight}
const replies={help:'可用指令：help · files · status · where · leave · clear',files:'PB-00  PB-11  PB-24  PB-?',status:()=>`檔案完整度：${100-damage}%\n訪客狀態：已建立索引。`,where:'你在紙箱裡。或者紙箱在你周圍。',leave:'出口已記錄為「已讀」。請先完成離館程序。'};
document.querySelector('#terminal').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#command'),cmd=input.value.trim().toLowerCase();if(!cmd)return;write(`› ${cmd}`,'found');input.value='';if(cmd==='clear'){out.innerHTML='';return}const reply=replies[cmd];write(reply?(typeof reply==='function'?reply():reply):`${cmd}: 找不到指令。檔案館不認識這個字。`,cmd==='leave'?'warn':'');if(cmd==='leave'){damage=Math.max(damage,21);integrity.textContent=`${100-damage}%`;}});
setInterval(()=>document.querySelector('#clock').textContent=new Date().toLocaleTimeString('en-GB',{hour12:false}),1000);
document.querySelector('#clock').textContent=new Date().toLocaleTimeString('en-GB',{hour12:false});
