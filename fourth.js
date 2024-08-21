let dropList=document.querySelectorAll(".drop-list select");
let fromCurrency=document.querySelector(".from select");
let toCurrency=document.querySelector(".to select");
let icon=document.querySelector(".icon");
let exchangeTxT=document.querySelector(".exchange-rate");
let but=document.querySelector("button");

   //adding option tag
  for(let i=0; i<dropList.length; i++){
    for( let currency_code in country_code ){
      let selected=
      i==0
      ?currency_code=="USD"
      ?"selected"
      :""
      :currency_code=="INR"
      ?"selected"
      :"";
        let optionTag=`<option value="${currency_code}" ${selected}>
        ${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change",(e)=>{
      loadFlag(e.target);
    });
  }

  // Fuction to chage the Flag img accdoring to user selected

  function loadFlag(element){
  let code=element.value;
      let imgTag=element.parentElement.querySelector("img");
      let countryname=element.parentElement.querySelector(".country-name");
      imgTag.src=`https://flagcdn.com/16x12/${country_code[code].code.toLowerCase()}.png`;

      //to change the size of country name 

    if(countryname)
      {
      countryname.textContent=country_code[code].name;
      countryname.style.fontsize='16px';
    }
      countryname.textContent=country_code[code].name;
      console.log("Flag image URL:", imgTag.src);
  }

  but.addEventListener("click", (e) =>{
    e.preventDefault();
    getExchangeValue();
  });
  exchangeTxT.style.fontweight='bolder';
  exchangeTxT.style.fontsize='40px';

  function getExchangeValue() {
    const amount=document.querySelector("input");
    let amountVal=amount.value;
    if(amountVal==""|| amountVal=="0"){
      amountVal=1;
    }
    let url=`https://v6.exchangerate-api.com/v6/bf69b56e03fa26b3c619c861/latest/${fromCurrency.value}`
    fetch(url)
    .then(respon =>respon.json())
    .then(result=>{
      let exchangeRate=result.conversion_rates[toCurrency.value];
      let total=(amountVal*exchangeRate).toFixed(2);
      exchangeTxT.innerText=`${amountVal} ${fromCurrency.value}=${total} ${toCurrency.value}`
    })
    .catch(()=>{
      exchangeTxT.innerText="Somthing  went wrong"
    });
  }