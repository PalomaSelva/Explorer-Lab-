import './css/style.css';

const bgShadow1 = window.document.querySelector('.cc svg > g g:nth-child(1) path')
const bgShadow2 = window.document.querySelector('.cc svg > g g:nth-child(2) path')
const ccIcon = window.document.querySelector('.cc-logo span:nth-child(2) img:nth-child(1)')
console.log(bgShadow1)
console.log(bgShadow2)
console.log(ccIcon)

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