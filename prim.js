(function(){

    var interval;
    var context;
    var canvas;
    var primStart=true;
    var primElements=[]
    var elementSize=4;
    // var maxCost=100;
    var delay=8;
    var elements=320;
    var small_1;
    var index;
    var time= new Date().getTime();
    var costs=[]
    var pointer;
    var done=[0];

    document.addEventListener("DOMContentLoaded",init,false)
    function init(){
        canvas=document.querySelector("canvas");
        context=canvas.getContext("2d");
        width = canvas.width;
        height = canvas.height;

        small_1=[null,null,((width)**2+(height)**2)];
        //first iteration this will create the dots
        // primElements=[{x:100,y:50},{x:200,y:50},{x:200,y:150},{x:100,y:150}]

        for(var i=0;i<elements;i++){
            e={
                x:getRandomNumber(0,width-elementSize),
                y:getRandomNumber(0,height-elementSize)
            };
            costs.push([]);
            for(var j=0;j<elements;j++){
                costs[i].push(0);
            }
                primElements.push(e);
            context.fillRect(primElements[i].x,primElements[i].y,elementSize,elementSize);
        }
        //drawing lines between all the dots
        for (var i=0;i<primElements.length;i++){
            for(var j=i+1; j<primElements.length;j++){

                //add costs for the line part 1 (random cost for new lines)
                // costs[i][j]=getRandomNumber(1,maxCost);
                costs[i][j]=((primElements[j].x-primElements[i].x)**2+(primElements[j].y-primElements[i].y)**2)**0.5

                //draw lines
                // draw(primElements[i].x,primElements[i].y,primElements[j].x,primElements[j].y);
            }
            //add costs to the lines part 2 (existing lines given the correct costs)
            pointer=0;
            do {
                costs[i][pointer]=costs[pointer][i];
                pointer++;
            }
            while(pointer<i);
        }
        // costs=[[0,5,1,2],[5,0,3,2],[1,3,0,3],[2,2,3,0]]
        context.strokeStyle = '#ffffff';

    
        interval=window.setInterval(prim, delay);
    }
    function prim(){

        //i=starting elementS
        //j=destination element
        
        for(var i=0;i<done.length;i++){
            for (var j=0;j<primElements.length;j++){//was j=done[i]+1 and that broke it
                if(costs[done[i]][j]<=small_1[2]&&!(done.includes(j))){
                    small_1=[done[i],j,costs[done[i]][j]];
                }
            }
        }
        if (done.length===primElements.length){
            stop();
        }   
        done.push(small_1[1]);
        context.strokeStyle = '#ffffff';
        draw(primElements[small_1[0]].x,primElements[small_1[0]].y,primElements[small_1[1]].x,primElements[small_1[1]].y);
        draw(primElements[small_1[0]].x,primElements[small_1[0]].y,primElements[small_1[1]].x,primElements[small_1[1]].y);      
        small_1=[null,null,((width)**2+(height)**2)];
        time=new Date().getTime()
    }
    
    function stop(){
        clearInterval(interval);
    }
    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    function draw(from_x,from_y,to_x,to_y){
        context.beginPath();
        context.moveTo(from_x+elementSize/2,from_y+elementSize/2);
        context.lineTo(to_x+elementSize/2,to_y+elementSize/2);
        context.stroke();
    }

})();