(function(){
"use strict";
if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
const targets=[...document.querySelectorAll(".cc-reveal, .cc-feature-card, .cc-highlight-card, .cc-trust-item, .cc-showcase")];
if(!targets.length)return;
document.body.classList.add("cc-motion-ready");
const observer=new IntersectionObserver(entries=>{
 for(const entry of entries){
  if(!entry.isIntersecting)continue;
  entry.target.classList.add("cc-in-view");
  observer.unobserve(entry.target);
 }
},{threshold:0.06,rootMargin:"0px 0px 34px 0px"});
targets.forEach((target,i)=>{
 target.classList.add("cc-reveal");
 target.style.setProperty("--cc-delay",Math.min(i%3,2)*85+"ms");
 observer.observe(target);
});
})();
