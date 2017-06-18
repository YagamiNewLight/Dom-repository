/**
 * Created by WKZ on 2017/6/9.
 */
window.dom = {
    create : function(tagName,content,attributes){
    var tag = document.createElement(tagName)
    if(content instanceof HTMLElement)
    {
        tag.append(content)
    }
    else if(typeof content === 'string')
    {
        tag.appendChild(document.createTextNode(content))
    }
    else if(content instanceof  Array) {
        for (var i = 0; i < content.length; i++) {
            if (content[i] instanceof HTMLElement) {
                tag.append(content[i])
            }
            else if (typeof content[i] === 'string') {
                tag.appendChild(document.createTextNode(content[i]))
            }
        }
    }
    if(typeof attributes === 'string'){
        tag.style.cssText = attributes;
    }
    else if(typeof attributes === 'object'){
         for(var key in attributes){
            var value = attributes[key];
            tag.setAttribute(key,value);
        }
    }
   return tag
},

     find : function (selector,scope){
       var result =  scope instanceof HTMLElement ? scope.querySelectorAll(selector):document.querySelectorAll(selector);
       return result;
    },
     findParent : function(selector,scope){
        var result =  scope instanceof HTMLElement ? scope.querySelector(selector):document.querySelector(selector);
        return result.parentNode;
    },
     findChildren : function(tag){
        return tag.childNodes
    },
     emptyChild : function(element){
        for(var i = 0,len = element.childNodes.length;i<len;i++){
            element.childNodes[0].remove();
        }
    },
 /*  findOlderSibling : function (element){
        var a = element.previousSibling;
        if(a!==null){
        switch (a.nodeType){
            case 3:
                return findOlderSibling(a);
            case 1:
                return a;
        }
        }
        return null;
    }
*/ //重构如下
     bigBrother : function (tag){
        var a = tag.previousSibling;
        while( a !== null && a.nodeType !==1){
            a = a.previousSibling;
        }
        return a ;
    },
     lessBorther : function (tag){
    var a = tag.nextSibling;
    while( a !== null && a.nodeType !==1){
        a = a.nextSibling;
    }
    return a ;
    },

     findText : function(tag){
        var text = ''
       for(var i = 0; i<tag.childNodes.length;i++){
           if(tag.childNodes[i].nodeType === 3){
               text += tag.childNodes[i].textContent
           }
           else{
               text += findText(tag.childNodes[i]);
           }
       }
       return text.trim();
    },
     attr : function (tag,attributes){
             for(var key in attributes){
                 var value = attributes[key];
                 tag.setAttribute(key,value);
             }
    },
    style:function (tag,content){
            tag.style.cssText = content;
    }
}
