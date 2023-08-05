
// Adding Event-Listener to add array elements having random values for sorting 
document.getElementById('newarray').addEventListener('click',function (){
    document.getElementById("bars").innerHTML = "";
    var n = parseInt(document.getElementById("myRange1").value);
    let values = [];
    while(values.length < n){
        let value = Math.floor(Math.random() * 140) + 35;
        if(values.indexOf(value) == -1){
            values.push(value);
        }
    }
    values.forEach((value)=>{
        const b = document.createElement("div");
        b.classList.add("bar");
        b.style.height = `${value*3}px`
        b.style.width = `${800/n}px`
        document.getElementById("bars").appendChild(b);
    })
})

// Function to disable buttons when a sorting is taking place to avoid overlapping of two or more different Sorting Algorithms
function disable(s){
    //getElementsByCLassName returns a HTMLCollection which is needed to be converted into an array as collection donot have methods like forEach
    Array.from(document.getElementsByClassName("btn")).forEach((element) => {
        element.disabled = s;
    });
    document.getElementById("myRange1").disabled = s;
}

function swap(e1,e2){
    var h = e1.style.height;
    e1.style.height = e2.style.height;
    e2.style.height = h;
}
document.getElementById('bubble').addEventListener('click',async function (){
    disable(1);
    var bar = document.getElementsByClassName("bar");
    var n = parseInt(document.getElementById("myRange1").value);
    for(let i=0;i<n;i++){
        for(let j=0;j<n-i-1;j++){
            bar[j].style.backgroundColor = "red";
            await new Promise(function(resolve,reject){
                setTimeout(resolve,500 - parseInt(document.getElementById("myRange").value));
            })
            if(bar[j].style.height > bar[j+1].style.height)swap(bar[j],bar[j+1]);
            bar[j].style.backgroundColor = "orange";
        }
    }
    disable(0);
}
)
document.getElementById("selection").addEventListener('click',async function(){
    disable(1);
    var bar = document.getElementsByClassName("bar");
    var n = parseInt(document.getElementById("myRange1").value);
    for(let i=0;i<n-1;i++){

        bar[i].style.backgroundColor = "red";
        let minind = i;
        let minnum = bar[i].style.height;
        
        for(let j=i+1;j<n;j++){
            bar[j].style.backgroundColor = "green";
            await new Promise(function(resolve,reject){
                setTimeout(resolve,500 - parseInt(document.getElementById("myRange").value));
            })
            
            if(bar[j].style.height < bar[minind].style.height){
                if(i!=minind)bar[minind].style.backgroundColor = "orange";    
                minind = j;
                bar[minind].style.backgroundColor = "white";
                minnum = bar[i].style.height;
            }
            else bar[j].style.backgroundColor = "orange";
        }
        swap(bar[i],bar[minind]);
        bar[i].style.backgroundColor = "orange";
        bar[minind].style.backgroundColor = "orange";
    }
    disable(0);
})
document.getElementById("insertion").addEventListener('click',async function(){
    disable(1);
    var bar = document.getElementsByClassName("bar");
    var n = parseInt(document.getElementById("myRange1").value);
    for(let i=1;i<n;i++){
        for(let j=i;j>0;j--){
            bar[j].style.backgroundColor = "red";
            // bar[j-1].style.backgroundColor = "white";
            await new Promise(function(resolve,reject){
                setTimeout(resolve,500 - parseInt(document.getElementById("myRange").value));
            })
            if(bar[j].style.height < bar[j-1].style.height){
                swap(bar[j-1],bar[j]);
                bar[j].style.backgroundColor = "orange";
                // bar[j-1].style.backgroundColor = "orange";
            }
            else{
                bar[j].style.backgroundColor = "orange";
                bar[j-1].style.backgroundColor = "orange";
                break;
            } 
        }
    }
    disable(0);
})

async function sleep(){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,500 - parseInt(document.getElementById("myRange").value));
    });
}
async function blink(){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,240);
    });
}

async function quickSort(start,end,arr){
    let i = start,j = end;
    let pivot = arr[start].style.height;
    // arr[end].style.backgroundColor = "white";
    arr[i].style.backgroundColor = "red";
    while(i<j){
        while(j >= start+1 && arr[j].style.height > pivot){
            arr[j].style.backgroundColor = "red";
            await sleep();
            arr[j].style.backgroundColor = "orange";
            j--;
        }
        arr[j].style.backgroundColor = "red";
        while(i < end && arr[i].style.height <= pivot){
            arr[i].style.backgroundColor = "red";
            await sleep();
            arr[i].style.backgroundColor = "orange";
            i++;
        }
        arr[i].style.backgroundColor = "red";
        if(i<j){
            sleep();
            swap(arr[i],arr[j]);
            sleep();
        }
        arr[i].style.backgroundColor = "orange";
        arr[j].style.backgroundColor = "orange";
            
    }
    sleep();
    arr[end].style.backgroundColor = "orange";
    arr[i].style.backgroundColor = "orange";
    swap(arr[j],arr[start]);
    return j;
}

async function helper(start, end, arr){
    if(start < end){
        let partition = await quickSort(start,end,arr);
        await helper(start,partition-1,arr);
        await helper(partition+1,end,arr);
        
    }
    return;
}

document.getElementById("quick").addEventListener('click',() => {
    disable(1);
    helper(0, parseInt(document.getElementById("myRange1").value)-1 ,Array.from(document.getElementsByClassName("bar")));
    disable(0);
});


async function merge(start,mid,end,arr){
    arr[start].style.backgroundColor = "green";
    arr[end].style.backgroundColor = "green";
    var i=start,j=mid+1;
    var newArr = [];
    while(i<=mid && j <= end){
        if(parseInt(arr[i].style.height) <= parseInt(arr[j].style.height)){
            newArr.push(arr[i].style.height);
            i+=1;
        }
        else{
            newArr.push(arr[j].style.height);
            j+=1;
        } 
    }
    while(i<=mid){
        newArr.push(arr[i].style.height);
        i+=1;
    }
    while(j <=end){
        newArr.push(arr[j].style.height);
        j+=1;
    }
    i=start+1;
    arr[start].style.height = newArr[0];
    for(let k=1 ;k < newArr.length ;k++){
        arr[i].style.backgroundColor="white";
        await sleep();
        arr[i].style.height = newArr[k];
        await sleep();
        arr[i].style.backgroundColor="orange";
        i+=1;
    }
    arr[start].style.backgroundColor = "orange";

}

async function mergeSort(start,end,arr){
    if(start < end){
        let mid = Math.floor((end - start) / 2) + start;
        await mergeSort(start,mid,arr);
        await mergeSort(mid+1,end,arr);

       await merge(start,mid,end,arr);
    }    
}

document.getElementById("merge").addEventListener('click',async ()=>{
    disable(1);
    await mergeSort(0, parseInt(document.getElementById("myRange1").value) - 1 ,Array.from(document.getElementsByClassName("bar")));
    disable(0);
});

async function heapify(arr, n, i) {
    var largest = i;
    var left = 2 * i + 1;
    var right = 2 * i + 2;

    if (left < n && parseInt(arr[left].style.height) > parseInt(arr[largest].style.height)) {
        largest = left;
    }

    if (right < n && parseInt(arr[right].style.height) > parseInt(arr[largest].style.height)) {
        largest = right;
    }

    if (largest !== i) {
        arr[i].style.backgroundColor = "green";
        arr[largest].style.backgroundColor = "green";
        await sleep();
        swap(arr[i], arr[largest]);
        await sleep();
        arr[i].style.backgroundColor = "orange";
        arr[largest].style.backgroundColor = "orange";
        await heapify(arr, n, largest);
    }
}
async function heapSort(arr) {
    var n = arr.length;
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }
    for (var i = n - 1; i > 0; i--) {
        await blink();
        arr[0].style.backgroundColor="white";
        await blink();
        arr[0].style.backgroundColor="orange";
        await blink();
        arr[0].style.backgroundColor="white";
        await blink();
        arr[0].style.backgroundColor="orange";
        await blink();
        arr[0].style.backgroundColor="white";
        await blink();
        arr[0].style.backgroundColor="orange";
        swap(arr[0], arr[i]);
        arr[i].style.backgroundColor="white";
        await sleep();
        await heapify(arr, i, 0);
    }
}

document.getElementById("heap").addEventListener("click", async () => {
    disable(1);
    let bars = Array.from(document.getElementsByClassName("bar"));
    await heapSort(bars);
    disable(0);
});
