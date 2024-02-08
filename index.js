
    var langId="0";
    var id;
    var l=document.getElementById("language")
    l.addEventListener("click",function(){
    var lang=l.value;
    if(lang==="C"){
        langId="7";
    }else if(lang==="Python"){
        langId="0";
    }else if(lang==="C++")
    langId="77";
    else if(lang==="Java")
    langId="8";
    else
    langId="4";
    
    })
    var outputis={data:{}};
    var code=document.getElementById("code");
    var codeis="";
    function codefunction(){
    codeis=code.value;
    console.log(codeis)
    }
    var compile=document.getElementById("compile");
    compile.addEventListener("click",function(){
    console.log("clicking for code submition");

    var req=new XMLHttpRequest();
    req.open("POST","https://codequotient.com/api/executeCode");
    req.setRequestHeader("Content-Type","application/json");
    var data={
        "code":codeis,
        "langId":langId,
    };
    console.log(JSON.stringify(data));
    req.send(JSON.stringify(data));
    req.onload=function(){
    codeId=JSON.parse(req.responseText);
    codeId=codeId.codeId;
        console.log(codeId+" type of "+typeof(codeId));
        id=setInterval(function(){
        getresult();
        },5000)
    }
})
var t;
var result=document.getElementById("output");
   
function getresult(){
    if(outputis.data!={}){
        console.log("id removed");
        setTimeout(function(){
            clearInterval(id)
        })
    }
    var outputReq=new XMLHttpRequest();
    var url="https://codequotient.com/api/codeResult/"
    console.log(url+codeId)
    outputReq.open("GET",url+codeId);
    outputReq.send();
    outputReq.onload=function(){
        console.log("...type of"+ typeof(outputReq.responseText)+" "+outputReq.responseText);
        outputis=JSON.parse(outputReq.responseText);
        var tempis="";
        console.log("...type of)))"+ typeof(outputis)+" "+ outputis);
        console.log("_______"+outputis.data);

        var obj=JSON.parse(outputis.data);
        
        for(var key in obj){
            console.log(`${key}:${obj[key]}`);
            if(`${key}`==="output"){
                tempis=`${obj[key]}`;
            }
            if(tempis== ""){
                if(`${key}`==="errors"){
                tempis=`${obj[key]}`;
                }
            }
        }
        result.innerText=tempis;
    }
}
