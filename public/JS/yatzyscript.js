var checkHeader = function(){
  let scrollPosition = Math.round(window.scrollY);
  if(scrollPosition > 25){
    document.querySelector('header').classList.add('sticky');
    document.querySelector('header h1').classList.add('sticky');
    console.log("Adding sticky");
  }else{
    document.querySelector('header').classList.remove('sticky');
    document.querySelector('header h1').classList.remove('sticky');
    console.log("Removing sticky");
  }
};

window.addEventListener('scroll', checkHeader);
console.log("This is working");
