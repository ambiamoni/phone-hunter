const loadPhones=async(searchText,dataLimit)=>{
    const url=(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const res=await fetch (url);
    const data=await res.json();
    displayPhones(data.data,dataLimit);
}

const displayPhones=(phones,dataLimit)=>{
    const phonesContainer=document.getElementById('phones-container');
    phonesContainer.innerText='';
      // display only 10 phones 
      const showAll=document.getElementById('show-all');
      if(dataLimit && phones.length>10){
          phones = phones.slice(0,10);
          showAll.classList.remove('d-none');
      }else{
          showAll.classList.add('d-none')
      }
    // display no phone found message
    const noPhone=document.getElementById('no-found-message');
    if(phones.length===0){
       noPhone.classList.remove('d-none')
    }else{
        noPhone.classList.add('d-none')
    }
  
//  show all phones
    phones.forEach(phone=>{
        const phoneDiv=document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`       
        <div class="card p-4">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Phone Name:${phone.phone_name}</h5>
            <p class="card-text">This is nothing but a text</div>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        </div>     
        `
        phonesContainer.appendChild(phoneDiv);
    })
    // stop loader
    toogleSpinner(false);
}
const processSearch=(dataLimit)=>{
    toogleSpinner(true)
    const  searchField=document.getElementById('search-field');
    const searchText=searchField.value ;
    loadPhones(searchText,dataLimit);
}
document.getElementById('btn-search').addEventListener('click',function(){
    // start loader
        processSearch(10);
})
// Execute a function when the user presses a key on the keyboard
document.getElementById('search-field').addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        processSearch(10);
    }
  });
const toogleSpinner=isLoading=>{
const loaderSection=document.getElementById('loader');
if(isLoading){
    loaderSection.classList.remove('d-none')
}else{
    loaderSection.classList.add('d-none')
}
}

document.getElementById('btn-show-all').addEventListener('click',function(){
processSearch();
})


const loadPhoneDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayPhoneDetails(data.data)
}
const displayPhoneDetails=phone=>{
    const modalTitle=document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText=phone.name;
    const phoneDetails=document.getElementById('phone-details');
phoneDetails.innerHTML=`
 <p>Release date:${phone.releaseDate ? phone.releaseDate : 'no releaseDate shown'}</p>
 <p>Others:${phone.others ? phone.others.bluetooth: 'No bluetooth'}</p>
 <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
 <img src="${phone.image}">
`

}


loadPhones('apple');