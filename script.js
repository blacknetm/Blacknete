const TOTAL_LEVELS = 40;
const LOCK_HOURS = 15;

let state = JSON.parse(localStorage.getItem("bn_state") || "{}");
state.level = state.level || 1;
state.attempts = state.attempts || 0;
state.lockUntil = state.lockUntil || 0;

const missions = {
  1: "Find the default credential used by the system.",
  2: "Identify the exposed service and submit its banner fingerprint.",
  3: "Extract a hidden value from an untrusted input reflection."
};

const levelsEl = document.getElementById("levels");
for(let i=1;i<=TOTAL_LEVELS;i++){
  const tr=document.createElement("tr");
  tr.innerHTML=`<td>${i}</td>
    <td id="l${i}" class="${i<state.level?'unlocked':'locked'}">
    ${i<state.level?'Unlocked':'Locked'}
    </td>`;
  levelsEl.appendChild(tr);
}

function showMission(){
  document.getElementById("challenge").textContent =
    missions[state.level] || "No hints. Only results.";
}
showMission();

function dynamicFlag(level){
  const slice=Math.floor(Date.now()/600000);
  const base=bn-${level}-x;
  let h=0,s=base+slice;
  for(let i=0;i<s.length;i++){
    h=((h<<5)-h)+s.charCodeAt(i);h|=0;
  }
  return ("bn"+Math.abs(h)).slice(0,8);
}

function submitAnswer(){
  const now=Date.now();
  const error=document.getElementById("error");
  const lock=document.getElementById("lock");

  if(state.lockUntil && now<state.lockUntil){
    lock.textContent="LOCKED — try later";
    return false;
  }

  const ans=document.getElementById("answer").value.trim();
  if(ans===dynamicFlag(state.level)){
    document.getElementById(l${state.level}).textContent="Unlocked";
    document.getElementById(l${state.level}).className="unlocked";
    state.level++;
    state.attempts=0;
    error.textContent="";
    lock.textContent="";
    document.getElementById("answer").value="";
    showMission();
  }else{
    state.attempts++;
    error.textContent="ERROR: access denied";
    if(state.attempts>=3){
      state.lockUntil=Date.now()+LOCK_HOURS*60*60*1000;
      lock.textContent="LOCKED for 15 hours";
      state.attempts=0;
    }
  }

  localStorage.setItem("bn_state",JSON.stringify(state));
  return false;
    }
