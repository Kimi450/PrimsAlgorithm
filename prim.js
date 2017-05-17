(function(){

    var interval;
    var context;
    var canvas;
    var primStart=true;
    var primElements=[]
    var elementSize=4;
    var maxCost=100;
    var elements=4;
    var small_1=[null,null,maxCost+1];
    var small_2=[null,null,small_1];
    var index;
    var time= new Date().getTime();
    var test=[]
    var costs=[]
    var pointer;
    var cost=0;
    var count=0;
    var done=new Set();

    document.addEventListener("DOMContentLoaded",init,false)
    function init(){
        canvas=document.querySelector("canvas");
        context=canvas.getContext("2d");
        width = canvas.width;
        height = canvas.height;
        interval=window.setInterval(prim, 1000);
    }
    function prim(){
        if (primStart===true){
            done.add(0)
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

            //drawing lines between all the dots
            for (var i=0;i<primElements.length;i++){
                for(var j=i+1; j<primElements.length;j++){


                    /*
                    //add costs for the line part 1 (random cost for new lines)
                    costs[i][j]=getRandomNumber(1,maxCost)
                    */
                    //set values for now
                    



                    //draw lines
                    draw(primElements[i].x,primElements[i].y,primElements[j].x,primElements[j].y);
                }
                //add costs to the lines part 2 (existing lines given the correct costs)
                /*
                pointer=0
                do {
                    costs[i][pointer]=costs[pointer][i]
                    pointer++;
                }
                while(pointer<i);
                */
            }
            costs=[[0,5,1,2],[5,0,3,2],[1,3,0,3],[2,2,3,0]]
            context.strokeStyle = '#ffffff';
        }
        
       console.log(costs[0],costs[1],costs[2],costs[3],cost)
        //code for prim
        smallest()
    }
    function smallest(){
        var i=0;
        //i=starting element
        //j=destination element
        do{
            for (var j=i+1;j<primElements.length;j++){
                console.log(cost+costs[i][j],cost)
                if(costs[i][j]<=small_1[2] && !(done.has(j))){
                    small_1=[i,j,costs[i][j]]
                    console.log(1)
                }
            }cost+=small_1[2];
            for( var j=i+1;j<primElements.length;j++){
                if (cost+costs[i][j]<cost){
                    
                }
            }
            done.add(small_1[1]);

            context.strokeStyle = '#ffffff';
            draw(primElements[i].x,primElements[i].y,primElements[small_1[1]].x,primElements[small_1[1]].y);
            i=small_1[1]
            small_1=small_2
            // i=small_1[1];
        }
        while(done.size<primElements.length && i<=0)
        // console.log(done)









        // var currTime=new Date().getTime();
        // var i=0;
        
        // do{
        //     if (currTime>=time+2000){      
        //         // for(var i=0;i<primElements.length;i++){        
        //             for(var j=i+1;j<primElements.length;j++){
        //                 if(costs[i][j]<small_1[2]){
        //                     // small_2=small_1;
        //                     small_1=[i,j,costs[i][j]];//stored the element,line,cost
                            
        //                 }
        //             }
        //         // }
        //         cost+=small_1[2];
        //         count++;
        //         i++;
        //         time=new Date().getTime();
        //         draw(primElements[i].x,primElements[i].y,primElements[j-1].x,primElements[j-1].y)
        //     }
        // }
        // while(count<primElements.length);

        
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