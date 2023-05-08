
// Adding Event-Listener to add array elements having random values for sorting 
// var n = 100;
document.getElementById('newarray').addEventListener('click',function (){
    document.getElementById("bars").innerHTML = "";
    var n = parseInt(document.getElementById("myRange1").value);
    for (let index = 0; index < n; index++) {
    let value = Math.floor(Math.random() * 50) + 35;
        const b = document.createElement("div");
        b.classList.add("bar");
        b.style.height = `${value*3}px`
        b.style.width = `${600/n}px`
        console.log(b);
        document.getElementById("bars").appendChild(b);
    }
})

// Function to disable buttons when a sorting is taking place to avoid overlapping of two or more different Sorting Algorithms
function disable(s){
    let m = false;
    if(s == 1){
        m=true;
    }
    document.getElementById("myRange1").disabled = m;
    document.getElementById("newarray").disabled = m;
    document.getElementById("bubble").disabled = m;
    document.getElementById("selection").disabled = m;
    document.getElementById("insertion").disabled = m;
}

function wait(e1,e2){
    if(e1.style.height >= e2.style.height){
        var h = e1.style.getPropertyValue("height");
        e1.style.height = e2.style.getPropertyValue("height");
        e2.style.height = h;
    }
}
document.getElementById('bubble').addEventListener('click',async function (){
    disable(1);
    var arj = document.getElementsByClassName("bar");
    var n = parseInt(document.getElementById("myRange1").value);
    for(let i=0;i<n;i++){
        for(let j=0;j<n-i-1;j++){
            arj[j].style.backgroundColor = "red";
            await new Promise(function(resolve,reject){
                setTimeout(resolve,500 - parseInt(document.getElementById("myRange").value));
            })
            wait(arj[j],arj[j+1]);
            arj[j].style.backgroundColor = "orange";
        }
    }
    disable(0);
}
)
document.getElementById("selection").addEventListener('click',async function(){
    disable(1);
    var arj = document.getElementsByClassName("bar");
    var n = parseInt(document.getElementById("myRange1").value);
    for(let i=0;i<n-1;i++){

        arj[i].style.backgroundColor = "red";
        let minind = i;
        let minnum = arj[i].style.height;
        
        for(let j=i+1;j<n;j++){
            arj[j].style.backgroundColor = "green";
            await new Promise(function(resolve,reject){
                setTimeout(resolve,500 - parseInt(document.getElementById("myRange").value));
            })
            
            if(arj[j].style.height < arj[minind].style.height){
                // wait(arj[j],arj[minind]);
                if(i!=minind)arj[minind].style.backgroundColor = "orange";    
                minind = j;
                arj[minind].style.backgroundColor = "white";
                minnum = arj[i].style.height;
            }
            else arj[j].style.backgroundColor = "orange";
        }
        wait(arj[i],arj[minind]);
        arj[i].style.backgroundColor = "orange";
        arj[minind].style.backgroundColor = "orange";
    }
    disable(0);
})
document.getElementById("insertion").addEventListener('click',async function(){
    disable(1);
    var arj = document.getElementsByClassName("bar");
    var n = parseInt(document.getElementById("myRange1").value);
    for(let i=1;i<n;i++){
        for(let j=i;j>0;j--){
            arj[j].style.backgroundColor = "red";
            // arj[j-1].style.backgroundColor = "white";
            await new Promise(function(resolve,reject){
                setTimeout(resolve,500 - parseInt(document.getElementById("myRange").value));
            })
            if(arj[j].style.height < arj[j-1].style.height){
                wait(arj[j-1],arj[j]);
                arj[j].style.backgroundColor = "orange";
                // arj[j-1].style.backgroundColor = "orange";
            }
            else{
                arj[j].style.backgroundColor = "orange";
                arj[j-1].style.backgroundColor = "orange";
                break;
            } 
        }
    }
    disable(0);
})