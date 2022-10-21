import './css/style.css';
import IMask from 'imask';

const bgShadow1 = window.document.querySelector('.cc svg > g g:nth-child(1) path')
const bgShadow2 = window.document.querySelector('.cc svg > g g:nth-child(2) path')
const ccIcon = window.document.querySelector('.cc-logo span:nth-child(2) img:nth-child(1)')


function setCardType(type){
    const colors ={
        visa:["#2D57F2","#436D99"],
        mastercard:["#DF6F29","#C69347"],
        default:["black","gray"],
    }


    bgShadow1.setAttribute('fill',colors[type][0])
    bgShadow2.setAttribute('fill',colors[type][1])
    ccIcon.setAttribute("src", `public/${type}.svg`)
}


//setCardType('default')
globalThis.setCardType = setCardType

//iMask

const cvc = window.document.querySelector('#CVC')
const cvcPattern  = {mask:'000'}
const cvcMasked = IMask(cvc, cvcPattern);

const expiration = window.document.querySelector('#expiration')
const expirationPattern = {
    mask:'MM{/}YY', 
    blocks: {
        YY: {
           mask: IMask.MaskedRange,
           from: String(new Date().getFullYear()).slice(2),
           to:String(new Date().getFullYear()+10).slice(2),
        },

        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
    }
}
const expirationMasked = IMask(expiration, expirationPattern);


/* 
const namePattern = {mask:String, min:1,max:10};
const nameMasked=IMask(name,namePattern); */

const cardNumber = window.document.querySelector('#number')
const cardNumberPattern = {
    mask:[
        {
            mask:'0000 0000 0000 0000',
            regex:/^4\d{0,15}/,
            cardType:'visa'
        },
        {
            mask:'0000 0000 0000 0000',
            regex:/(^2[3-7]\d{0,2}|^22[2-9]\d|^5[1-5]\d{0,2})\d{0,12}/,
            cardType:'mastercard'
        },
        {
            mask:'0000 0000 0000 0000',
            cardType:'default'
        }
    ],
    dispatch: function(appended,dynamicMasked){
        const number = (dynamicMasked.value + appended).replace(/\D\g/,'') //Não adiciona NÃO DÍGITOS
        const foundMask = dynamicMasked.compiledMasks.find(({regex}) =>  //compiledMasks agrupa o array de máscaras e o find vai procurar algo dentro desse array e, se encontrar, vai retornar esse elemento
        number.match(regex) //agrupa os padrões em um array  //No caso, ele vai ver se os valores digitados no input coincidem com o regex estabelecido
        ) 
        console.log(foundMask)
        return foundMask     
    }
}
const cardNumberMasked=IMask(cardNumber,cardNumberPattern);
console.log(cardNumberMasked)



const addButton = window.document.querySelector('#add-card')
addButton.addEventListener('click', ()=>{
    alert('Cartão adicionado!')
})
document.querySelector('form').addEventListener('submit',(event)=>{
    event.preventDefault() //Cancela o evento padrão //No caso, cancelou o reload do submit do button
})


const name = window.document.querySelector('#name');
name.addEventListener('input',()=>{
    const infoName = document.querySelector('.name')
    infoName.innerText = name.value.length === 0 ? 'Blair Walldorf' : name.value
})

cardNumber.addEventListener('input',()=>{
    const infoNumber = document.querySelector('.cc-number')
    infoNumber.innerHTML = number.value.length === 0 ? '1234 5678 9123 9123' : number.value
})

cvc.addEventListener('input',()=>{
    const infoCVC = document.querySelector('.cvc')
    infoCVC.innerHTML = cvc.value.length === 0 ? '115' : cvc.value
}) 
expiration.addEventListener('input',()=>{
    const infoExpiration = document.querySelector('.exp')
    infoExpiration.innerHTML = expiration.value.length === 0 ? '02/30' : expiration.value
}) 