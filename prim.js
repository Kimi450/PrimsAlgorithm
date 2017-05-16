(function(){

    var interval;
    var context;
    var canvas;
    var primStart=true;
    var primElements=[]
    var elementSize=4;
    var maxCost=100;
    var elements=4;
    var small_1=maxCost;
    var small_2=small_1;
    var index;
    var time= new Date().getTime();
    var test=[]
    var costs=[]
    var pointer;

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
            //first iteration this will create the dots
            primStart=false;
            for(var i=0;i<elements;i++){
                e={
                    x:getRandomNumber(0,width-elementSize),
                    y:getRandomNumber(0,height-elementSize)
                }
                costs.push([])
                for(var j=0;j<elements;j++){
                    costs[i].push(0)
                }
                primElements.push(e);
                test.push(e.cost)
                context.fillRect(primElements[i].x,primElements[i].y,elementSize,elementSize);
            }

            console.log(costs)

            //drawing lines between all the dots
            for (var i=0;i<primElements.length;i++){
                for(var j=i+1; j<primElements.length;j++){
                    //add costs for the line part 1 (random cost for new lines)
                    costs[i][j]=getRandomNumber(1,100)

                    //draw lines
                    context.beginPath();
                    context.moveTo(primElements[i].x+elementSize/2,primElements[i].y+elementSize/2);
                    context.lineTo(primElements[j].x+elementSize/2,primElements[j].y+elementSize/2);
                    context.stroke();
                }
                //add costs to the lines part 2 (existing lines given the correct costs)
                pointer=0
                do {
                    costs[i][pointer]=costs[pointer][i]
                    pointer++;
                }
                while(pointer<i);

            }
        }
        
        console.log(costs[0],costs[1],costs[2],costs[3])
        //code for prim
        smallest()
       // console.log(primElements,test)


// 0=[0,1,2,3]
// 1=[1,0,8,9]
// 2=[2,8,0,6]
// 3=[3,9,6,0]

// 0=[   0,   1,   2,   3]
// 1=[0[1],   0,   8,   9]
// 2=[0[2],1[2],   0,   6]
// 3=[0[3],1[3],2[3],   0]


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