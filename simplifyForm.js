/**
 * form
 *
 * version: 1.12
 * author: Wallace Rio <wallrio@gmail.com>
 * 
 */

function simplifyForm(){}


simplifyForm.addEvent  = function(objs,event,callback,mode,par1,par2){        
    if(mode == undefined)
        mode = true;

    if(objs == undefined)
        objs = window; 
    if(objs.addEventListener){              
        return objs.addEventListener(event,function(e){
            if(callback)
                return callback(e,objs,par1,par2);
        },mode); 
    }else if(objs.attachEvent){
        return objs.attachEvent('on'+event,function(e){
            if(callback)
                return callback(e,objs,par1,par2);
        }); 
    }
};

/**
 * função ajax
 * @param  {[json]} options [parametros json]
 * 
 */
simplifyForm.ajax = function(options){
    var url = options['url'] || null;
    var success = options['success'] || null;
    var progress = options['progress'] || null;
    var data = options['data'] || null;
    var type = options['type'] || 'post';

    if(type=='get'){
        serialize = function(obj, prefix) {
          var str = [], p;
          for(p in obj) {
            if (obj.hasOwnProperty(p)) {
              var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
              str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
          }
          return str.join("&");
        }
        url = url +'?'+ serialize(data);
    }   
        
   
    var xhr = (function(){
        try{return new XMLHttpRequest();}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP");}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP");}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP");}catch(e){}return null;
    })();
    
        xhr.open(type, url, true);

        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                if(progress)
                progress(e.loaded,e.total);          
            }
        }
        xhr.upload.onloadstart = function (e) {             
            if(progress)
            progress(0,e.total);
        }
        xhr.upload.onloadend = function (e) {             
            if(progress)
            progress(e.loaded,e.total);
        }
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var ratio = Math.floor((e.loaded / e.total) * 100) + '%';                        
            }
        }

        xhr.onreadystatechange = function () {

            if(xhr.readyState > 3)
                if(success)
                    success(xhr.responseText);              
        };

        var dataForm = new FormData();
                
        // dataForm = data;
        
        for (key in data) {
            if (data.hasOwnProperty(key)){                                      

                if(typeof data[key] == 'object'){                    
                    data[key] = JSON.stringify(data[key]);
                }             

                dataForm.append(key,data[key]);
            }
        }
        


        xhr.send(dataForm);
};

simplifyForm.md5 = function(string){
    // MD5 Cript
    var convertToMD5 = function(e) {function h(a, b) {var c, d, e, f, g; e = a & 2147483648; f = b & 2147483648; c = a & 1073741824; d = b & 1073741824; g = (a & 1073741823) + (b & 1073741823); return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f } function k(a, b, c, d, e, f, g) {a = h(a, h(h(b & c | ~b & d, e), g)); return h(a << f | a >>> 32 - f, b) } function l(a, b, c, d, e, f, g) {a = h(a, h(h(b & d | c & ~d, e), g)); return h(a << f | a >>> 32 - f, b) } function m(a, b, d, c, e, f, g) {a = h(a, h(h(b ^ d ^ c, e), g)); return h(a << f | a >>> 32 - f, b) } function n(a, b, d, c, e, f, g) {a = h(a, h(h(d ^ (b | ~c), e), g)); return h(a << f | a >>> 32 - f, b) } function p(a) {var b = "", d = "", c; for (c = 0; 3 >= c; c++) d = a >>> 8 * c & 255, d = "0" + d.toString(16), b += d.substr(d.length - 2, 2); return b } var f = [], q, r, s, t, a, b, c, d; e = function(a) {a = a.replace(/\r\n/g, "\n"); for (var b = "", d = 0; d < a.length; d++) {var c = a.charCodeAt(d); 128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128)) } return b }(e); f = function(b) {var a, c = b.length; a = c + 8; for (var d = 16 * ((a - a % 64) / 64 + 1), e = Array(d - 1), f = 0, g = 0; g < c;) a = (g - g % 4) / 4, f = g % 4 * 8, e[a] |= b.charCodeAt(g) << f, g++; a = (g - g % 4) / 4; e[a] |= 128 << g % 4 * 8; e[d - 2] = c << 3; e[d - 1] = c >>> 29; return e }(e); a = 1732584193; b = 4023233417; c = 2562383102; d = 271733878; for (e = 0; e < f.length; e += 16) q = a, r = b, s = c, t = d, a = k(a, b, c, d, f[e + 0], 7, 3614090360), d = k(d, a, b, c, f[e + 1], 12, 3905402710), c = k(c, d, a, b, f[e + 2], 17, 606105819), b = k(b, c, d, a, f[e + 3], 22, 3250441966), a = k(a, b, c, d, f[e + 4], 7, 4118548399), d = k(d, a, b, c, f[e + 5], 12, 1200080426), c = k(c, d, a, b, f[e + 6], 17, 2821735955), b = k(b, c, d, a, f[e + 7], 22, 4249261313), a = k(a, b, c, d, f[e + 8], 7, 1770035416), d = k(d, a, b, c, f[e + 9], 12, 2336552879), c = k(c, d, a, b, f[e + 10], 17, 4294925233), b = k(b, c, d, a, f[e + 11], 22, 2304563134), a = k(a, b, c, d, f[e + 12], 7, 1804603682), d = k(d, a, b, c, f[e + 13], 12, 4254626195), c = k(c, d, a, b, f[e + 14], 17, 2792965006), b = k(b, c, d, a, f[e + 15], 22, 1236535329), a = l(a, b, c, d, f[e + 1], 5, 4129170786), d = l(d, a, b, c, f[e + 6], 9, 3225465664), c = l(c, d, a, b, f[e + 11], 14, 643717713), b = l(b, c, d, a, f[e + 0], 20, 3921069994), a = l(a, b, c, d, f[e + 5], 5, 3593408605), d = l(d, a, b, c, f[e + 10], 9, 38016083), c = l(c, d, a, b, f[e + 15], 14, 3634488961), b = l(b, c, d, a, f[e + 4], 20, 3889429448), a = l(a, b, c, d, f[e + 9], 5, 568446438), d = l(d, a, b, c, f[e + 14], 9, 3275163606), c = l(c, d, a, b, f[e + 3], 14, 4107603335), b = l(b, c, d, a, f[e + 8], 20, 1163531501), a = l(a, b, c, d, f[e + 13], 5, 2850285829), d = l(d, a, b, c, f[e + 2], 9, 4243563512), c = l(c, d, a, b, f[e + 7], 14, 1735328473), b = l(b, c, d, a, f[e + 12], 20, 2368359562), a = m(a, b, c, d, f[e + 5], 4, 4294588738), d = m(d, a, b, c, f[e + 8], 11, 2272392833), c = m(c, d, a, b, f[e + 11], 16, 1839030562), b = m(b, c, d, a, f[e + 14], 23, 4259657740), a = m(a, b, c, d, f[e + 1], 4, 2763975236), d = m(d, a, b, c, f[e + 4], 11, 1272893353), c = m(c, d, a, b, f[e + 7], 16, 4139469664), b = m(b, c, d, a, f[e + 10], 23, 3200236656), a = m(a, b, c, d, f[e + 13], 4, 681279174), d = m(d, a, b, c, f[e + 0], 11, 3936430074), c = m(c, d, a, b, f[e + 3], 16, 3572445317), b = m(b, c, d, a, f[e + 6], 23, 76029189), a = m(a, b, c, d, f[e + 9], 4, 3654602809), d = m(d, a, b, c, f[e + 12], 11, 3873151461), c = m(c, d, a, b, f[e + 15], 16, 530742520), b = m(b, c, d, a, f[e + 2], 23, 3299628645), a = n(a, b, c, d, f[e + 0], 6, 4096336452), d = n(d, a, b, c, f[e + 7], 10, 1126891415), c = n(c, d, a, b, f[e + 14], 15, 2878612391), b = n(b, c, d, a, f[e + 5], 21, 4237533241), a = n(a, b, c, d, f[e + 12], 6, 1700485571), d = n(d, a, b, c, f[e + 3], 10, 2399980690), c = n(c, d, a, b, f[e + 10], 15, 4293915773), b = n(b, c, d, a, f[e + 1], 21, 2240044497), a = n(a, b, c, d, f[e + 8], 6, 1873313359), d = n(d, a, b, c, f[e + 15], 10, 4264355552), c = n(c, d, a, b, f[e + 6], 15, 2734768916), b = n(b, c, d, a, f[e + 13], 21, 1309151649), a = n(a, b, c, d, f[e + 4], 6, 4149444226), d = n(d, a, b, c, f[e + 11], 10, 3174756917), c = n(c, d, a, b, f[e + 2], 15, 718787259), b = n(b, c, d, a, f[e + 9], 21, 3951481745), a = h(a, q), b = h(b, r), c = h(c, s), d = h(d, t); return (p(a) + p(b) + p(c) + p(d)).toLowerCase() };    
    return convertToMD5(string);
}


simplifyForm.focus = function(formId,elemendId){    

    if(!document.querySelector(formId))
        return false;

    var el = document.querySelector(formId).querySelectorAll('input:not([type="submit"]),textarea,select');
    for (var i = 0; i < el.length; i++) {
        
        if(elemendId){
                        
            if(el[i].name === document.querySelector(formId).querySelector(elemendId).name){
                el[i].focus();
                break;          
            }

          
        }else{            
            el[i].focus();
            break;          
        }
                
    };
}


simplifyForm.input = function(formId){    
    if(!document.querySelector(formId))
        return false;

    var inputs = {};

    var el = document.querySelector(formId).querySelectorAll('input:not([type="submit"]),textarea,select');
    for (var i = 0; i < el.length; i++) {                    
        inputs[el[i].name] = el[i];
    };
    
    return inputs;
}

simplifyForm.clear = function(formId,elemendId){    

    if(!document.querySelector(formId))
        return false;

    var el = document.querySelector(formId).querySelectorAll('input:not([type="submit"]),textarea,select');
    for (var i = 0; i < el.length; i++) {                 
        if(el[i].tagName.toLowerCase() == 'select' && el[i].list != undefined){           
            if(el[i].getAttribute('data-SFnochange')!='true')
            el[i].innerHTML = "";            
        }else{
            if(el[i].getAttribute('data-SFnochange')!='true')
            el[i].value = ""; 
        }        

        el[i].checked = false;

    };
    
}


simplifyForm.change = function(formId,options){        
   
    var event = options['event'] || 'change';
    var callback = options['callback'];

    if(!document.querySelector(formId))
        return false;

    var el = document.querySelector(formId).querySelectorAll('input:not([type="submit"]),textarea,select');
    var elements = Object();
    var elementsEl = Object();

   var changeFunc = function(obj){
        for (var i = 0; i < el.length; i++) {                
            elements[el[i].name] = el[i].value;
            elementsEl[el[i].name] = el[i];
            if(el[i].list != null){                    
                elements[el[i].name] = el[i].list[el[i].name];                                             
                elementsEl[el[i].name] = el[i];                                             
            }

        }
        if(callback)
            callback(obj,elements,elementsEl,obj.name);

   }

    for (var i = 0; i < el.length; i++) {        
        
        simplifyForm.addEvent(el[i],event,function(e,obj){
            
            var NotUseArray = Array(
                20,     //  caps-lock
                27,     //  escape
                37,     // arrow
                38,     // arrow
                39,     // arrow
                40      // arrow
            );
            
       
            if(NotUseArray.indexOf(e.keyCode)!=-1)
                return false;
        
            changeFunc(obj);
        });
        
    };

}


simplifyForm.updateElements = function(formId,arrayInputs,callback){    
     if(!document.querySelector(formId))
        return false;

    simplifyForm.clear(formId);
    simplifyForm.populate(formId,arrayInputs,callback);

}

simplifyForm.populate = function(formId,arrayInputs,callback){    
    if(!document.querySelector(formId))
        return false;

    var elements = Object();
    

    var el = document.querySelector(formId).querySelectorAll('input:not([type="submit"]),textarea,select,button');
    for (var i = 0; i < el.length; i++) {        
        var name = el[i].name;    
        
        if(arrayInputs[name]){

            if(typeof arrayInputs[name] == 'object'){

                var listArray = Object();
                
                listArray[name] = Object();

                for(key in arrayInputs[name]){

                
                    if(listArray[name][key] == undefined)
                    listArray[name][key] = Object();

                    var item = document.createElement('option');
                    item.value = key;
                   
                    if(arrayInputs[name][key]['selected'] && arrayInputs[name][key]['selected'] == true)
                        item.setAttribute('selected','selected');
                    
                    var subitem = arrayInputs[name][key];

                    item.data = {};
                    for(key2 in subitem){                        
                        item.data[key2] = subitem[key2]; 
                        listArray[name][key][key2] = subitem[key2]; 
                    }
                    
                    if(item.data.title)
                    item.innerHTML = item.data.title;
                 
                    el[i].appendChild(item);
                }

                if(listArray)
                el[i].list = listArray;

            }else{
                if(el[i].getAttribute('data-SFnochange')!='true')
                el[i].value = arrayInputs[name];                      
            }

            
        }


        elements[name] = el[i];                
        
    }


    if(callback)
        callback(elements);

}

// simulate submit of forms 
simplifyForm.submit = function(formId){    
    if(!document.querySelector(formId))
        return false;
    var submitEl = document.createElement('input');
    submitEl.type="submit";
    submitEl.value="submit";    
    document.querySelector(formId).appendChild(submitEl);       
    submitEl.style.display="none";    
    submitEl.click();
    submitEl.parentNode.removeChild(submitEl);
}   


simplifyForm.elements = function(formId,options){

    if(!document.querySelector(formId))
        return false;

    var elementsAll = document.querySelectorAll(formId);

    var elements = Object();
    var listArray = Object();
    for (var i = 0; i < elementsAll.length; i++) {

        var data = Object();
            var el = elementsAll[i].querySelectorAll('input:not([type="submit"]),textarea,select');
            for (var a = 0; a < el.length; a++) {
                var name = el[a].name;
                var value = el[a].value;
                data[name] = value;     

                if(el[a].list != null){                    
                    data[name] = el[a].list[name] ;                                             
                }
               

            };
    }

    return data;

}

simplifyForm.register = function(formId,options){

    var callback = options['callback'];
    var onregister = options['onregister'];
    var validator = options['validator'];
    


    if(!document.querySelector(formId)){        
        setTimeout(function(){
            simplifyForm.register(formId,options);
        },1000);        
        return false;
    }

    var elementsAll = document.querySelectorAll(formId);

    

    var elements = Object();
    var listArray = Object();
    for (var i = 0; i < elementsAll.length; i++) {

        var el2 = elementsAll[i].querySelectorAll('*');
        for (var a = 0; a < el2.length; a++) {
            var name = el2[a].name;
            var value = el2[a].value;
            elements[name] = el2[a];  
            listArray[name] = el2[a].value;  
            if(el2[a].list != null){                    
                listArray[name] = el2[a].list;                                             
            }   
        }


        elementsAll[i].onsubmit = function(e){    
                       
            var data = Object();
            var el = this.querySelectorAll('input:not([type="submit"]),textarea,select');
            for (var i = 0; i < el.length; i++) {
                var name = el[i].name;
                var value = el[i].value;
                var tagName = el[i].tagName.toLowerCase();
                var type = el[i].type;
                data[name] = value;     

                if(tagName == 'input' && type == 'checkbox'){
                    
                    if(el[i].checked){
                        data[name] = el[i].getAttribute('value') || el[i].checked;  
                    }else{                        
                        data[name] = ((el[i].getAttribute('value'))?"":el[i].checked) ;  
                    }
                }
                if(tagName == 'input' && type == 'radio'){                    
                    if(el[i].parentNode.parentNode.querySelector('[name="'+name+'"][type="radio"]:checked')){
                        var radioGroup = el[i].parentNode.parentNode.querySelector('[name="'+name+'"][type="radio"]:checked');
                        data[name] = radioGroup.getAttribute('value') || radioGroup.id;  
                    }else{
                        delete data[name];  
                    }
                }

                if(el[i].list != null){                    
                    data[name] = el[i].list;                                             
                }
               

            };
            
            if(validator){
                var resultValidator = validator.call(this,data);
                if( resultValidator === false)
                    return false;


                if(resultValidator !== null &&
                    resultValidator !== undefined)
                data = resultValidator;            
            }
            

                
            simplifyForm.send(this,data,options);

            

            return false;
        };
    };


    if(onregister)
        onregister(elements,listArray);
    
}



simplifyForm.send = function(context,dataSend,options){
    var action = options.action;
    var dataAttach = options.dataAttach;

    var callback = options['callback'];
    var validator = options['validator'];
    var method = options['method'] || "get";   

    for(key in dataAttach){        
        dataSend[key] = dataAttach[key];
    }

    if(action == undefined){
        if(callback)
                callback.call(context,null,dataSend);
        return false;
    }
        
    simplifyForm.ajax({
        url:action,
        data:dataSend,
        type:method,
        success:function(response){            
            if(callback)
                callback.call(context,response,dataSend);
        }
    });
}
