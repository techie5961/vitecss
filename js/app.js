//  show ball loading
function BallLoad(){
    document.body.classList.add('loading');
}
//  hide ball loading
function HideBallLoad(){
   document.body.classList.remove('loading');
}
function IsJSONABLE(data){
    try{
      JSON.parse(data);
      return true;
    }catch{
        return false;
    }
}
// post request
async function PostRequest(event,element,callback=null){
  try{
      event.preventDefault();
 let inputs=element.querySelectorAll('.inp.required');
 
 
 let isEmpty = false;

 if(inputs){
    inputs.forEach((input)=>{
        if(input.value == ''){
           // isEmpty=true;
            input.classList.add('empty');
        }else{
            input.classList.remove('empty');
        }

    });
 }
 if(isEmpty){
    alert(10)
 }
 if(!isEmpty){
  
    element.querySelector('button').classList.add('active');
    let inps=element.querySelectorAll('.input');
    let form=new FormData();
    inps.forEach((inp)=>{
       form.append(inp.name,inp.value);
    });
    let response=await fetch(element.action,{
        method : 'POST',
        body : form
     });
     if(response.ok){
        let data=await response.text();
        if(IsJSONABLE(data)){
            let json=JSON.parse(data);
            CreateNotify(json.status,json.message);
        }else{
            CreateNotify('error',data);
        }
        if(callback !== null){
            callback(response,event);
        }
        element.querySelector('button').classList.remove('active');
     }
 }
  }catch(error){
    CreateNotify('error',error.stack);
    element.querySelector('button').classList.remove('active');
  }
}

//  hide prompt
function HidePrompt(){
    let conts=document.querySelectorAll('.cont.required');
  if(conts){
      conts.forEach((cont)=>{
        let inp=cont.querySelector('.input');
        inp.addEventListener('focus',()=>{
            conts.forEach((required)=>{
                required.querySelector('.prompt').style.display="none";
            })
        })
    })
  }
}
// create notify
function CreateNotify(status,message){
  let section=document.createElement('section');
  section.classList.add('notify');
  section.classList.add(status);
  section.innerHTML=` <div class="row g-5 w-full p-5 body space-between align-center">
            <div class="icon"></div>
            <div class="message right-auto">
            ${message}
        </div>
        <div onclick="HideNotify()" class="close pc-pointer bottom-auto"></div>
        </div>
        <div class="footer">
            <span></span>
        </div>`;
       
        section.addEventListener('touchstart',function(){
       ScheduledTimeout=setTimeout(()=>{
       clearTimeout(RemoveNotify);
       section.querySelector('.footer span').style.animationPlayState='paused';
       },1000)

        });
        section.addEventListener('touchend',()=>{
            clearTimeout(ScheduledTimeout);
        })
       
        document.body.appendChild(section);
        let RemoveNotify=setTimeout(()=>{
            section.remove();
        },5000);
    
}
function HideNotify(){
  let notify= document.querySelector('.notify');
    if(notify){
     notify.remove();
    }
}
// get request
async function GetRequest(event,url,callback=null){
    try{
        event.preventDefault();
        BallLoad();
        let response=await fetch(url);
        if(response.ok){
           
            HideBallLoad();
             if(callback !== null){
                callback(await response.text(),event);
            }
        } else{
            CreateNotify('error',response.status + ' Error');
            HideBallLoad();
        }
    }catch(error){
        CreateNotify('error',error.stack);
        HideBallLoad();
    }
}
// copy
function copy(data){
    if(navigator.clipboard.writeText(data)){
        CreateNotify('success','copied successfully');
    }
} 
// show popup
function PopUp(data=null){
    if(data !== null){
        document.querySelector('.popup .child').innerHTML=data;
    }
    document.querySelector('.popup').classList.add('active');
    document.body.classList.add('overflow-hidden');
    document.body.style.overflow="hidden";
}
// hide popup
function HidePopUp(){
    document.querySelector('.popup').classList.remove('active');
    document.body.classList.remove('overflow-hidden');
    document.body.style.overflow="auto";
}
// slideup
function SlideUp(content=null){
    if(content !== null){
        document.querySelector('.slideup .child .body').innerHTML=content;
    }
    document.querySelector('.slideup').classList.add('active');
    document.body.classList.add('overflow-hidden');
}
//  hide side up
function HideSlideUp(){
      document.querySelector('.slideup').classList.remove('active');
    document.body.classList.remove('overflow-hidden');
}
// stop propagation
function StopPropagation(event){
    event.stopPropagation();
}
// Infinite lloading
async function InfiniteLoading(){
    let observer=new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
               
            }
        })
    })
}
// preview photo
function PreviewPhoto(element,label){
    let file=element.files[0];
    
    if(file){
        label.children[0].style.display='none';
        label.style.backgroundImage=`url('${URL.createObjectURL(file)}')`;
        label.classList.remove('bg');

    }else{
        label.style.backgroundImage='';
        label.children[0].style.display='flex';
         label.classList.add('bg');
    }

}
// hide loading
function HideLoading(){
    document.querySelector(".loading").style.display='none';
    document.body.classList.remove('overflow-hidden');

}
// set vh
function SetWindowHeight(){
    let height=window.innerHeight;
    document.body.style.minHeight=height + 'px';
}
// calling functions

SetWindowHeight();
window.onload=function(){
    HideLoading();
}
