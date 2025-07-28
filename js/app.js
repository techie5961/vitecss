//  show ball loading
function BallLoad(){
    document.body.classList.add('loading');
}
//  hide ball loading
function HideBallLoad(){
   document.body.classList.remove('loading');
}
// post request
async function PostRequest(event,element,callback=null){
 try{
      event.preventDefault();
   let IsEmpty=false;
    let conts=element.querySelectorAll('.cont');
    conts.forEach((cont)=>{
        let inp=cont.querySelector('.input');
        if(inp.value == ''){
            cont.querySelector('.prompt').style.display='flex';
             IsEmpty=true;
        }
    });
    if(!IsEmpty){
        BallLoad();
        let inputs=element.querySelectorAll('.input');
        let form=new FormData();
        if(inputs){
           inputs.forEach((input)=>{
            form.append(input.name,input.value);
           });
        }
        let files=element.querySelectorAll(".file");
        if(files){
            files.forEach((file)=>{
                let fil=file.files[0];
                if(fil){
                    form.append(file.name,fil);
                }
            });
        }
        let response=await fetch(element.action,{
            method : 'POST',
            body : form
        });
        if(response.ok){
            let data=await response.json();
            CreateNotify(data.status,data.message);
            if(callback !== null){
                callback(JSON.stringify(data),event);
            }
            HideBallLoad();
        } else{
           CreateNotify('error',response.status + ' Error');

            HideBallLoad()
        }

    }
   
 }catch(error){
    alert(error.stack)
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
    let notify= document.querySelector('.notify');
    if(notify){
     notify.remove();
    }
   
    let div=document.createElement('div');
    div.classList.add('notify');
    div.classList.add(status);
    div.classList.add('row');
    div.classList.add('space-between');
    div.classList.add('align-center');
    div.classList.add('g-5');
    div.classList.add('g-10');
    div.classList.add('p-10')
    div.innerHTML=`  <svg class="svg check" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
    <svg class="svg error" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"></path></svg>
    <span class="right-auto">${message}</span>
    <svg onclick="HideNotify()" class="bottom-auto pc-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 256 256"><path d="M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z"></path></svg>
  <div class="bar-line"></div>`;
  document.body.appendChild(div);
  setTimeout(()=>{
    div.remove();
  },2000)
    
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
HidePrompt();
SetWindowHeight();
window.onload=function(){
    HideLoading();
}
