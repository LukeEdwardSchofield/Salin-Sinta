//borrowing,explicating,modulation,equivalence,adaptation

const menu1 = document.querySelectorAll(".pagtutugma-menu");
const menu2 = document.querySelectorAll(".sitwasyonal-menu");
const menu3 = document.querySelectorAll(".limitadong-oras-menu");

const button1 = document.querySelector("#pagtutugma-button");
const button2 = document.querySelector("#sitwasyonal-button");
const button3 = document.querySelector("#limitadong-oras-button");

//show a
//hide button
//hide other a
//show other button

function show1(){
  //show a
  menu1.forEach(element => {element.style.display = "block";});
  //hide button
  if(button1) button1.style.display = "none";
 
  //hide other a
  if(menu2) menu2.forEach(element => {element.style.display = "none";}); 
  if(menu3) menu3.forEach(element => { element.style.display = "none";}); 
  //show other button
  if(button2) button2.style.display = "block";
  if(button3) button3.style.display = "block" ;
}


function show2(){
  //show a
  menu2.forEach(element => {element.style.display = "block";});
  //hide button
  if(button2) button2.style.display = "none";

  //hide other a
  if(menu1) menu1.forEach(element => {element.style.display = "none";});
  if(menu3) menu3.forEach(element => {element.style.display = "none";});
  //show other button
  if(button1) button1.style.display = "block";
  if(button3) button3.style.display = "block";
}

function show3(){
  //show a
  menu3.forEach(element => {element.style.display = "block";});
  //hide button
  if(button3) button3.style.display = "none";

  //hide other a
  if(menu1) menu1.forEach(element => {element.style.display = "none";}); 
  if(menu2) menu2.forEach(element => {element.style.display = "none";});
  //show other  button
  if(button1) button1.style.display = "block";
  if(button2) button2.style.display = "block";
}


