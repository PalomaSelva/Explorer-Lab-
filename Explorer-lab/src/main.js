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

const name = window.document.querySelector('#name');
const namePattern = {mask:String, min:1,max:10};
const nameMasked=IMask(name,namePattern);

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
            regex:/(^2\d[3-7]\d{0,2}|^22\d[2-9]\d|^5\d[1-5]\d{0,2})\d{0,12}/,
            cardType:'mastercard'
        },
        {
            mask:'0000 0000 0000 0000',
            cardType:'default'
        }
    ],
    dispatch: function(appended,dynamicMasked){
        const number = (dynamicMasked.value + appended).replace(/\D\g/,'')
    }
}
console.log(cardNumber)

console.log(window.document.querySelector('#CVC').value)
