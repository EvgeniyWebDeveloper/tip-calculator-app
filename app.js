
const state={
  bill:0,
  percent:0,
  numOfPeople:0,
  tip:0,
  totalPerson:0,
  tipPerson:0,
  tipAmount:0,
  formControls:{
    isValidBill:false,
    isValidPersent:false,
    isValidNumber:false
  }
 
}

const inputs=document.querySelectorAll('.input')
const bill=document.querySelector('.bill')
const number=document.querySelector('.number')
const customInp=document.querySelector('.custom')
const buttons=document.querySelectorAll('.percent__button')
const reset=document.querySelector('.reset')
const amount = document.querySelector('.amount')
const total = document.querySelector('.total')
const warn=document.querySelector('.warning')
reset.addEventListener('click',()=>{
  for(let item of buttons){
    item.classList.remove("active_button")
  }
  
  bill.value="0.0";
  customInp.value="Custom";
  number.value="0";
  amount.textContent='$0'
  total.textContent='$0'
})
bill.addEventListener('input',(event)=>{
  state.bill=bill.value
 
})
customInp.addEventListener('input',(event)=>{
  state.percent=customInp.value
 console.log( state.percent)
})
number.addEventListener('input',()=>{
  state.numOfPeople=number.value
})

for (let button of buttons ){
  
  button.addEventListener('click',function(){
    for(let item of buttons){
      item.classList.remove("active_button")
    }
    button.classList.toggle('active_button')
    state.percent=Number(button.getAttribute("data-per"))

  })
}
for(let input of inputs){
  input.addEventListener('focus', ()=>{
    
   input.closest('.input-wrapper').classList.add("primary-outline")
   
  })
  input.addEventListener('blur', ()=>{
    
    input.closest('.input-wrapper').classList.remove("primary-outline")
   })
   
}
customInp.addEventListener('click',()=>{
  for(let item of buttons){
    item.classList.remove("active_button")
  }
})
function getActiveButton(){

  buttons.forEach(button => {
    if(button.classList.contains('active_button')){
      state.percent=button.getAttribute("data-per")
    }
}) 
}
function checkValidation(){
  if(!isNaN(state.bill) && state.bill!=='' && state.bill!=='0.0' && state.bill!==0){
    state.formControls.isValidBill=true
    bill.closest('.input-wrapper').classList.remove("error-outline")
  }
  else{
    bill.closest('.input-wrapper').classList.add("error-outline")
  }

  if(!isNaN(state.percent) && Number.isInteger(Number(state.percent)) && state.percent!==' ' && state.percent!==0 ){
    state.formControls.isValidPersent=true
    customInp.closest('.input-wrapper').classList.remove("error-outline")
  }
  else{
    customInp.closest('.input-wrapper').classList.add("error-outline")
  }

  if(!isNaN(state.numOfPeople && state.numOfPeople!=='') && Number.isInteger(Number(state.numOfPeople)) && Number(state.numOfPeople)!==0){
    state.formControls.isValidNumber=true
    warn.style.display='none'
    number.closest('.input-wrapper').classList.remove("error-outline")
  }
  else{
    warn.style.display='block'
    number.closest('.input-wrapper').classList.add("error-outline")
  }


} 
function toFill(){
  amount.textContent=`$${Math.round((state.tipPerson)*100)/100}`
  total.textContent=`$${Math.round((state.totalPerson)*100)/100}`
 
}
function calculateTip(){
  let sum;
  state.tip=state.bill*(state.percent/100)

  sum=Number(state.bill) + Number(state.tip)

  state.totalPerson=sum/state.numOfPeople
  state.tipPerson=state.tip/state.numOfPeople

}

document.addEventListener( 'keyup', event => {
  if( event.code === 'Enter' ) {
    checkValidation()
    if(state.formControls.isValidBill && state.formControls.isValidNumber && state.formControls.isValidPersent){
        calculateTip()
        toFill()
    }
    else{
      alert(" Incorrect input...  Are you crazy?")
    }
  }
});



