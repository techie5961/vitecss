// expands nav a
function ExpandNav(element){
  try{
    
    let parent=element.parentNode;
    if(parent.classList.contains('active')){
        parent.classList.remove('active');
    } else{
        parent.classList.add('active');
    }
  }catch(error){
    alert(error.stack);
  }
}
// toggle nav
function ToggleNav(){
 document.body.classList.add('nav-shown');
}
// hide nav
function HideNav(){
  document.body.classList.remove('nav-shown');
}
// stop progation
function StopPropagation(event){
  event.stopPropagation();
}