//var logLevel = -1;//debug
var logLevel = 1;//info

//include jQuery
// include('//ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js');

// log(0,"Wait for jQuery");
//wait for jquery to be loaded and execute a callback
// waitForJQ(0,function(){
//   jQuery(function($){
    var wmUrl = "webmanager.nsf.gov/webmanager/secured/uipublish.jsp",
        wmForm = $("form#publishForm"),
        prefix = "treeFile::/opt/apps/www-acpt/docroot/";
        data = [];


    if (window.location.href.toLowerCase().includes(wmUrl)){
      data = window.prompt("EXTERNAL - enter comma delimited list (eg '/events/advisory.jsp')","").split(",");
      data.forEach(function(item, index){
        var value = data[index].trim().replace(/\\/g,"/");
        if (value != "/" && value.length > 1)
          wmForm.append('<input type="checkbox" checked="checked" name="'+ (prefix + value).replace(/\/\//g,"/") +'" />'+ value +'<br>');
      });

    } else { alert("wrong page"); }
    //console.log("doc_titl:", $("input[name='doc_titl'][type='hidden']")); 
//   });
// });




var hIncludes = null;
function include(sURI)
{
  if (document.getElementsByTagName)
  {
    if (!hIncludes)
    {
      hIncludes = {};
      var cScripts = document.getElementsByTagName("script");
      for (var i=0,len=cScripts.length; i < len; i++)
        if (cScripts[i].src) hIncludes[cScripts[i].src] = true;
    }
    if (!hIncludes[sURI])
    {
      var oNew = document.createElement("script");
      oNew.type = "text/javascript";
      oNew.src = sURI;
      hIncludes[sURI]=true;
      document.getElementsByTagName("head")[0].appendChild(oNew);
    }
  }
}



//generic log function
// 0 - debug
// 5 - info
// 7 - warning
// 10 - error
function log() {
    var args = [],
        desc = [],
        display = true,
        type = 0,
        minLogCode = logLevel || -1;

    desc[0]  = "DEBUG\t-\t";
    desc[5]  = "INFO \t-\t";
    desc[7]  = "WARN \t-\t";
    desc[10] = "ERROR\t-\t";

    for (var i=0; i<arguments.length; i++){
        if (i==0 && isNaN(arguments[i]-0) === false){
            type = arguments[i]-0;
            if (type > minLogCode){
                //replace the log code with the desc
                //args.push(desc[arguments[i]]);
            }else{
                return false;
            }
        } else {
            args.push(arguments[i]);
        }
    }

    if (typeof(console) !== 'undefined'){
      if (typeof(console.info) !== 'undefined' &&
          typeof(console.warn) !== 'undefined' &&
          typeof(console.error) !== 'undefined'){

        switch (type){
            case 5:
                return console.info.apply(console, args);
                break;
            case 7:
                return console.warn.apply(console, args);
                break;
            case 10:
                return console.error.apply(console, args);
                break;
            default:
                return console.log.apply(console, args);
        }
      }else{
        return console.log.apply(console, args);
      }

    }else{
        var strArgs = args.join(" ");
        //alert(args);
    }


}

function waitForJQ(max,cb){
    max++;
    //log("typeof(jQuery):", typeof(jQuery), "max:"+ max);
    if (typeof(jQuery) === 'undefined'){
        if (max > 50){
            log("jQuery never loaded");
            return false;
        }

        setTimeout(function(){
            waitForJQ(max,cb);
        },30);
    }else{
        cb();
    }
    return true;
}
