/* main.js
   - input masks for phone and date (supports 09xx-xxx-xxxx, +63 xxx-xxx-xxxx, and plain)
   - small utilities (can be expanded)
*/

function onlyDigits(str){ return str.replace(/[^\d+]/g,''); }

/* Phone mask helper */
function formatPhone(v){
  if(!v) return '';
  // remove spaces, parentheses, dashes except plus
  v = v.replace(/[^\d+]/g,'');
  // If starts with +63 or 63 (intl)
  if(v.startsWith('+63')) {
    // +639171234567 -> +63 917-123-4567
    const digits = v.replace(/[^\d]/g,'').slice(2); // remove country code '63'
    if(digits.length <= 3) return '+63 ' + digits;
    if(digits.length <= 6) return '+63 ' + digits.slice(0,3) + '-' + digits.slice(3);
    if(digits.length <= 10) return '+63 ' + digits.slice(0,3) + '-' + digits.slice(3,6) + '-' + digits.slice(6,10);
    return '+63 ' + digits.slice(0,3) + '-' + digits.slice(3,6) + '-' + digits.slice(6,10);
  }
  if(v.startsWith('63') && v.length>2){
    // 63917... handle like +63
    const digits = v.slice(2);
    if(digits.length <= 3) return '63 ' + digits;
    if(digits.length <= 6) return '63 ' + digits.slice(0,3) + '-' + digits.slice(3);
    if(digits.length <= 10) return '63 ' + digits.slice(0,3) + '-' + digits.slice(3,6) + '-' + digits.slice(6,10);
    return '63 ' + digits.slice(0,3) + '-' + digits.slice(3,6) + '-' + digits.slice(6,10);
  }
  // else assume local 09xx...
  const digits = v.replace(/[^\d]/g,'');
  if(digits.length <= 4) return digits;
  if(digits.length <= 7) return digits.slice(0,4) + '-' + digits.slice(4);
  if(digits.length <= 11) return digits.slice(0,4) + '-' + digits.slice(4,7) + '-' + digits.slice(7,11);
  return digits.slice(0,4) + '-' + digits.slice(4,7) + '-' + digits.slice(7,11);
}

/* Date mask (MM/DD/YYYY) */
function formatDate(v){
  if(!v) return '';
  const digits = v.replace(/[^\d]/g,'').slice(0,8);
  if(digits.length <= 2) return digits;
  if(digits.length <= 4) return digits.slice(0,2) + '/' + digits.slice(2);
  return digits.slice(0,2) + '/' + digits.slice(2,4) + '/' + digits.slice(4,8);
}

/* Attach mask listeners (if elements exist) */
document.addEventListener('DOMContentLoaded', function(){
  const phoneEl = document.getElementById('phone');
  if(phoneEl){
    phoneEl.addEventListener('input', function(e){
      const pos = phoneEl.selectionStart;
      phoneEl.value = formatPhone(phoneEl.value);
      // attempt to keep caret near end for convenience
      phoneEl.selectionEnd = phoneEl.value.length;
    });
  }

  const dobEl = document.getElementById('dob');
  if(dobEl){
    dobEl.addEventListener('input', function(e){
      dobEl.value = formatDate(dobEl.value);
      dobEl.selectionEnd = dobEl.value.length;
    });
  }
});
