/* Optional copy enhancement. Text remains selectable without JS; no storage or network. */
(function(){'use strict';
 document.addEventListener('click',async function(event){
  var button=event.target.closest('[data-ed-copy]'); if(!button)return;
  var input=document.getElementById(button.getAttribute('data-ed-copy'));
  var status=button.parentElement.querySelector('.ed-copy-status');
  if(!input)return;
  try{if(!navigator.clipboard||!window.isSecureContext)throw new Error('Clipboard unavailable');
   await navigator.clipboard.writeText(input.value);
   if(status)status.textContent='Copied. Fill in the placeholders before sending.';
  }catch(_){input.focus();input.select();if(status)status.textContent='Text selected. Use your device copy command.';}
 });
}());
