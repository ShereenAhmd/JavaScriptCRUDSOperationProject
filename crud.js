let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let catagory=document.getElementById('catagory')
let submit=document.getElementById('submit')
let search=document.getElementById('search')
let table=document.getElementById('table')
let searchtitle=document.getElementById('searchtitle')
let searchcatagory=document.getElementById('searchcatagory')
let tbody=document.getElementById('tbody')

//console.log(search,submit,catagory,title,price,taxes,ads,discount,total,count)
let mood ='create';
let tmp;
function getprice(){

    if(price.value !='')
    {
        let result= (+price.value + +taxes.value + +ads.value )- +discount.value ;
        total.innerHTML=result;
        total.style.background='green';
    }
    else{
        price.value=''
        total.style.background=''
        //total.style.background= 'rgb(73, 3, 3)';
    }}

    let datapro;

    if(localStorage.product !=null){
        datapro= JSON.parse(localStorage.product)
    }
    else{
        datapro=[];
    }

    //submit dataaaaaaaaaaa

   submit.onclick=function() {    
    
    let newpro = {
        title:title.value,
        price: price.value,
        taxes:taxes.value,
        ads: ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catagory:catagory.value,
    }
     if(mood === 'create'){
    if(newpro.count>1){
        for(let i=0;i<newpro.count;i++){
            datapro.push(newpro);
            submit.innerHTML='Create'
        }
    }else{
        datapro.push(newpro);
    }
}    
        
    else {  

        datapro[ tmp ]= newpro;

        mood='create';
        submit.innerHTML='Create';
        submit.style.background='';
        count.style.display='block';
        
    }

    localStorage.setItem( 'product',JSON.stringify(datapro))
    cleardata();
    showdata()  ;
}
//clear dataaaaaaaa
    function cleardata(){
        title.value='',
         price.value='',
        taxes.value='',
         ads.value='',
        discount.value='',
        total.innerHTML='',
        count.value='',
        catagory.value=''
    }
    //showwwwwwwwwwww data
    function showdata(){
        getprice()
        table='';
        for(let i=0;i< datapro.length ; i++){

            table+=
            `
            <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catagory}</td>
            <td><button  onclick="ubdateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete </button></td>
            </tr>
         `
           }
        tbody.innerHTML=table;
        
        if(datapro.length>0)
        {
            let deleteall=document.getElementById('deleteall').innerHTML=`
            <button onclick="deleteAll()">Delete All (${datapro.length})</button>
            `
        }else{ deleteall.innerHTML='';}
    }
    //updattttttttttttte data
    function ubdateData(i){
        title.value=datapro[i].title
        price.value=datapro[i].price
        taxes.value=datapro[i].taxes
        ads.value=datapro[i].ads
        discount.value=datapro[i].discount
        catagory.value=datapro[i].catagory;
        count.style.display='none'
        getprice();
        title.focus();
        
        
        submit.innerHTML='Ubdat';
        mood='ubdate' ;
        tmp = i;
        submit.style.color='white'
        submit.style.background='rgb(21, 21, 78)'
        scroll({
            top:0,
            behavior:"smooth"

        })

        
    }
    
    //dalete allllllllllllll
    
    function deleteAll(){
        datapro.splice(0);
        localStorage.clear();
        showdata();
       }
    showdata();
    
    //delete one item
   function deleteData(i){
    datapro.splice(i,1)
    localStorage.product= JSON.stringify(datapro);
    showdata();
   }

   let searchmood='title';

   let searchData = function(id){
    if(id === 'searchtitle'){
        searchmood='title';       
        search.placeholder='search By Title';
    }else{
        searchmood='catagory';
        search.placeholder='search By Catagory'
        
    }
    search.focus();
}
   
   function searchBy(value){
    let table='';
    if(searchmood == 'title'){
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.includes(value)){        
            
            table+=
            `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catagory}</td>
            <td><button  onclick="ubdateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete </button></td>
            </tr>
         `
         
            }

        }
    }else{
        for(let i=0;i<datapro.length;i++){
        if(datapro[i].catagory.includes(value)){
            
            table+=
            `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catagory}</td>
            <td><button  onclick="ubdateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete </button></td>
            </tr>
         `
         
            }
    }}
    tbody.innerHTML=table;
   
   }
