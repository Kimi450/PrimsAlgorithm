(function(){

    var interval;
    var context;
    var canvas;
    var primStart=true;
    var primElements=[]
    var elementSize=4;
    var maxCost=100;
    var elements=10;
    var small_1=maxCost;
    var small_2=small_1;
    var index;
    var time= new Date().getTime();
    var test=[]

    document.addEventListener("DOMContentLoaded",init,false)
    function init(){
        canvas=document.querySelector("canvas");
        context=canvas.getContext("2d");
        width = canvas.width;
        height = canvas.height;
		interval=window.setInterval(prim, 33);
    }
    function prim(){
        if (primStart===true){
            //first itteration this will create the dots
            primStart=false;
            for(var i=0;i<elements;i++){
                e={
                    x:getRandomNumber(0,width-elementSize),
                    y:getRandomNumber(0,height-elementSize),
                    size:elementSize,
                    cost:getRandomNumber(1,maxCost)
                }
                primElements.push(e);
                test.push(e.cost)
                context.fillRect(primElements[i].x,primElements[i].y,primElements[i].size,primElements[i].size);
            }
            //drawing lines between all the dots
            for (var i=0;i<primElements.length;i++){
                for(var j=i; j<primElements.length;j++){
                                        
                    context.beginPath();
                    context.moveTo(primElements[i].x,primElements[i].y);
                    context.lineTo(primElements[j].x,primElements[j].y);
                    context.stroke();

                }
            }
        }
        

        //code for prim
        smallest()
        console.log(primElements,test)

    }
    function smallest(){
        var currTime=new Date().getTime();
        small_1=maxCost;
        small_2=small_1;
        if (currTime>=time+2000){
            for(var i=1;i<primElements.length;i++){//start is 0therefore that cost isnt removed
                if(primElements[i].cost<=small_1){
                    index=i;
                    small_2=small_1;
                    small_1=primElements[i].cost;
                }
            }
            time=new Date().getTime();
            primElements.splice(index,1);
        }
    }
    function stop(){
        clearInterval(interval);
    }
    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

})();