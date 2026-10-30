(() => {
  const key = "slide-public-advertising-v1";
  const region = document.querySelector("[data-ad-region]");
  if (!region) return;
  const privacySignal = navigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
  let choice = null;
  try { choice = localStorage.getItem(key); } catch { /* Explicit choice still works without storage. */ }
  function remember(value) { choice=value;try{localStorage.setItem(key,value);}catch{} }
  function loadAds() {
    if (privacySignal || location.hostname !== "sillyventures.co") return;
    region.innerHTML = '<small>Advertisement</small><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1437405356729084" data-ad-slot="3962309547" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    window.adsbygoogle=window.adsbygoogle||[];
    window.adsbygoogle.requestNonPersonalizedAds=1;
    const script=document.createElement("script");script.async=true;script.crossOrigin="anonymous";
    script.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1437405356729084";
    script.onload=()=>{try{window.adsbygoogle.push({});}catch{region.hidden=true;}};
    script.onerror=()=>{region.hidden=true;};document.head.append(script);
  }
  function showChoices() {
    region.hidden=false;
    region.innerHTML='<small>Optional advertising</small><p>Google ads can help fund free Slide. If enabled, Google receives device and network information. Your notes and presentations stay in the separate editor.</p><button type="button" data-allow-ads>Allow Google ads</button> <button type="button" data-decline-ads>Keep ads off</button> <a href="/slide/privacy.html">Privacy details</a>';
    region.querySelector("[data-allow-ads]").disabled=privacySignal;
    if(privacySignal){const notice=document.createElement("p");notice.textContent="Your browser privacy signal keeps advertising off.";region.append(notice);}
    region.querySelector("[data-allow-ads]").addEventListener("click",()=>{remember("granted");loadAds();});
    region.querySelector("[data-decline-ads]").addEventListener("click",()=>{remember("denied");region.hidden=true;});
  }
  const preferences=document.querySelector("[data-ad-preferences]");
  preferences?.addEventListener("click",()=>{if(choice==="granted"){remember("denied");location.reload();}else showChoices();});
  if(choice==="granted"&&!privacySignal)loadAds();else if(choice!=="denied")showChoices();else region.hidden=true;
})();
