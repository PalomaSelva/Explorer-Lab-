import './css/style.css';

const bgShadow1 = window.document.querySelector('.cc svg g:nth-child(3) g:nth-child(1) path')
const bgShadow2 = window.document.querySelector('.cc svg g:nth-child(3) g:nth-child(2) path')
const Icon = window.document.querySelector('.cc svg path:nth-child(5)')
console.log(Icon)

function setCardType(type){
    const colors ={
        visa:["#2D57F2","#436D99"],
        mastercard:["#DF6F29","#C69347"],
        default:["black","gray"],
    }


    bgShadow1.setAttribute('fill',colors[type][0])
    bgShadow2.setAttribute('fill',colors[type][1])
    
}

function setIconType(type){
    
}

setCardType('default')
