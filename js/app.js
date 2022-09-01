const loadPhones=async (searchText,dataLimit)=>{
    const url=` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res=await  fetch(url);
    const data=await res.json();
    displayPhones(data.data,dataLimit);
}
displayPhones=(phones,dataLimit)=>{
   const phonesContainer=document.getElementById("phones-container");
   phonesContainer.innerText='';



   const showAll=document.getElementById('show-all');
    if(dataLimit && phones.length>10){
        //    display 10 phones only
              phones=phones.slice(0,10);
              showAll.classList.remove('d-none')
           }else{
            showAll.classList.add('d-none');
           }


//    display no phone
const noFoundAndMessage=document.getElementById('no-found-mssage');
if(phones.length===0){
    noFoundAndMessage.classList.remove('d-none');
    toogleSpinner(false);
}else{
    noFoundAndMessage.classList.add('d-none');
    
}
//    display all phones
   phones.forEach(phone=>{
    const phoneDiv=document.createElement('div')
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML=`  
                  <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadPhoneDetails('${phone_slug})" type="button" class="btn btn-secondary btn-sm">Go SomeWhere</button>
                    </div>
                  </div>
                `;
               phonesContainer.appendChild(phoneDiv) 
// stop loader
toogleSpinner(false);

   })
}

// search button click
const processSearch=(dataLimit=10)=>{
    // start loader
    toogleSpinner(true);
    const searchField=document.getElementById('search-field');
    searchText=searchField.value ;
    loadPhones(searchText,dataLimit);

}
const toogleSpinner=isLoading=>{
    const loaderSection=document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }else{
        loaderSection.classList.add('d-none')
    }
}


// not best practice
const showAllPhones=()=>{
    processSearch();

}
const loadPhoneDetails=id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data=await res.json();
    console.log(data)
}

// loadPhones();