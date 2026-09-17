const inputText=document.getElementById("inputText");
const outputBox=document.getElementById("outputBox");
const encryptBtn=document.getElementById("encryptBtn");
const decryptBtn=document.getElementById("decryptBtn");
const processBtn=document.getElementById("processBtn");
const processText=document.getElementById("processText");
const shiftInput=document.getElementById("shift");
const shiftRange=document.getElementById("shiftRange");
const minusBtn=document.getElementById("minusBtn");
const plusBtn=document.getElementById("plusBtn");
const charCount=document.getElementById("charCount");
const copyBtn=document.getElementById("copyBtn");
const historyList=document.getElementById("historyList");
const clearHistoryBtn=document.getElementById("clearHistoryBtn");
const toast=document.getElementById("toast");
let currentMode="encrypt",toastTimer;

inputText.addEventListener("input",()=>charCount.textContent=inputText.value.length);

encryptBtn.addEventListener("click",()=>{
 currentMode="encrypt"; encryptBtn.classList.add("active"); decryptBtn.classList.remove("active");
 processText.textContent="EXECUTE ENCRYPTION";
});
decryptBtn.addEventListener("click",()=>{
 currentMode="decrypt"; decryptBtn.classList.add("active"); encryptBtn.classList.remove("active");
 processText.textContent="EXECUTE DECRYPTION";
});

function updateShift(value){
 let shift=Number(value); if(isNaN(shift)) shift=0;
 shift=Math.max(0,Math.min(25,shift)); shiftInput.value=shift; shiftRange.value=shift;
}
shiftInput.addEventListener("input",()=>updateShift(shiftInput.value));
shiftRange.addEventListener("input",()=>updateShift(shiftRange.value));
minusBtn.addEventListener("click",()=>updateShift(Number(shiftInput.value)-1));
plusBtn.addEventListener("click",()=>updateShift(Number(shiftInput.value)+1));

function caesarCipher(text,shift,decrypt=false){
 if(decrypt) shift=-shift;
 return text.split("").map(ch=>{
  const code=ch.charCodeAt(0);
  if(code>=65&&code<=90) return String.fromCharCode(((code-65+shift+26)%26)+65);
  if(code>=97&&code<=122) return String.fromCharCode(((code-97+shift+26)%26)+97);
  return ch;
 }).join("");
}
function escapeHTML(text){const div=document.createElement("div");div.textContent=text;return div.innerHTML;}

processBtn.addEventListener("click",()=>{
 const text=inputText.value;
 if(!text.trim()){showToast("⚠ Enter a message first");inputText.focus();return;}
 const shift=Number(shiftInput.value);
 processBtn.classList.add("loading"); processText.textContent="PROCESSING...";
 outputBox.innerHTML='<span class="placeholder">Processing character matrix...</span>';
 setTimeout(()=>{
  const result=caesarCipher(text,shift,currentMode==="decrypt");
  outputBox.innerHTML=`<span class="output-text">${escapeHTML(result)}</span>`;
  processBtn.classList.remove("loading");
  processText.textContent=currentMode==="encrypt"?"EXECUTE ENCRYPTION":"EXECUTE DECRYPTION";
  addHistory(currentMode,shift,result);
 },550);
});

copyBtn.addEventListener("click",async()=>{
 const output=outputBox.innerText;
 if(!output||output.includes("Encrypted output")||output.includes("Processing character")){
  showToast("⚠ Nothing to copy");return;
 }
 try{await navigator.clipboard.writeText(output);}
 catch(e){const ta=document.createElement("textarea");ta.value=output;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();}
 showToast("✓ Output copied to clipboard");
});

function getHistory(){return JSON.parse(localStorage.getItem("cryptxHistory")||"[]");}
function saveHistory(history){localStorage.setItem("cryptxHistory",JSON.stringify(history));}
function addHistory(type,shift,result){
 const history=getHistory();
 history.unshift({type,shift,result,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})});
 if(history.length>10) history.pop(); saveHistory(history); renderHistory();
}
function renderHistory(){
 const history=getHistory();
 if(!history.length){historyList.innerHTML='<div class="empty-history"><span>⌁</span><p>No operations recorded yet.</p></div>';return;}
 historyList.innerHTML=history.map(item=>{
  const preview=item.result.length>70?item.result.substring(0,70)+"...":item.result;
  return `<div class="history-item"><div class="history-type">${item.type==="encrypt"?"🔐 ENCRYPT":"🔓 DECRYPT"}</div><div class="history-key">KEY: ${item.shift}</div><div class="history-message">${escapeHTML(preview)}</div><div class="history-time">${item.time}</div></div>`;
 }).join("");
}
clearHistoryBtn.addEventListener("click",()=>{
 if(!getHistory().length){showToast("History is already empty");return;}
 localStorage.removeItem("cryptxHistory");renderHistory();showToast("✓ History cleared");
});
function showToast(message){
 toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);
}
document.addEventListener("keydown",e=>{if(e.ctrlKey&&e.key==="Enter")processBtn.click();});
renderHistory();updateShift(3);
