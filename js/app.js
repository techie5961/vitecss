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
         let cont=input.closest('.cont');
        //  FIRST REMOVE EMPTY STATE
         if(cont){
         
        
            cont.classList.remove('empty');
           
           }else{
          
             input.classList.remove('empty');
            
           }
        //    CHECK FOR EMPTY INPUTS THAT ARE REQUIRED

        if(input.value.trim() == ''){
            isEmpty=true;
          
           
        if(cont){
            cont.classList.add('empty');
            
        }else{
              input.classList.add('empty');
        }
        }

    });
 }
 
 if(!isEmpty){
  
    element.querySelector('button').classList.add('active');
    let inps=element.querySelectorAll('.input');
    let form=new FormData();
   
    inps.forEach((inp)=>{
       form.append(inp.name,inp.value);
    });
    // check for photos
    let files=element.querySelectorAll('input[type=file]');
    if(files){
        files.forEach((inp)=>{
            let file=inp.files[0];
            if(file){
                form.append(inp.name,file);
            }
        })
    }

    
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
            callback(data,event);
        }
        element.querySelector('button').classList.remove('active');
     }else{
        CreateNotify('error','Internal Error: ' + response.status + ' Error');
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
    let notifies=document.querySelectorAll('.notify');
    if(notifies){
        notifies.forEach((notify)=>{
            notify.remove();
        })
    }
  let section=document.createElement('section');
  section.classList.add('notify');
  section.classList.add(status);
  section.innerHTML=` <div class="row g-5 w-full p-5 body space-between align-center">
            <div class="icon"></div>
            <div class="message m-right-auto">
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
       },500)

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
async function GetRequest(event,url,element=null,callback=null){
    try{
        event.preventDefault();
        if(element !== null){
            element.classList.add('active');
        }
        let response=await fetch(url);
        if(response.ok){
           
            if(element !== null){
            element.classList.remove('active');
        }
             if(callback !== null){
                callback(await response.text(),event);
            }
        } else{
            CreateNotify('error',response.status + ' Error');
           if(element !== null){
            element.classList.remove('active');
        }
        }
    }catch(error){
        CreateNotify('error',error.stack);
       if(element !== null){
            element.classList.remove('active');
        }
    }
}
// search request
async function SearchRequest(event,element,url,result){
    event.preventDefault();
    if(element.value == ''){
        result.classList.add('display-none');
    }else{

       
        let response=await fetch(url);
        if(response.ok){
           
            result.innerHTML=await response.text();
             result.classList.remove('display-none');
        }else{
             result.classList.remove('display-none');
            result.innerHTML=` <a class="row no-u text-dim clip-10 align-center g-5 space-between p-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#708090" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.08,64a8,8,0,1,1-13.84,8c-7.47-12.91-19.21-20-33.08-20s-25.61,7.1-33.08,20a8,8,0,1,1-13.84-8c10.29-17.79,27.39-28,46.92-28S164.63,154.2,174.92,172Z"></path></svg>
                 <span class="right-auto">${response.status} Error</span>
                   </a>`
        }
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
function HidePopUp(callback=null){
   try{
     document.querySelector('.popup').classList.remove('active');
    document.body.classList.remove('overflow-hidden');
    document.body.style.overflow="auto";
    callback?.();
   }catch(error){
    CreateNotify('error',error.stack);
   }
}
// slideup
function SlideUp(content=null){
    if(content !== null){
        document.querySelector('.slideup .child').innerHTML=content;
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
function InfiniteLoading(){
  
  let observer=new IntersectionObserver((entries)=>{
    entries.forEach(async (entry)=>{
        if(entry.isIntersecting){
          //  observer.unobserve(entry.target);
            let url=entry.target.dataset.url;
           
           
           let response=await fetch(url);
           if(response.ok){
            let data=await response.text();
         entry.target.outerHTML=data;
        
           //entry.target.remove();
        InfiniteLoading();
           }
        }
    })
  })
//   observe
let element=document.querySelector('.infinite-loading');
if(element){
    observer.observe(element);
}
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
    let loading=document.querySelector(".loading");
    if(loading){
        loading.style.display='none'
    }
   

}
// set vh
function SetWindowHeight(){
    let height=window.innerHeight;
    document.body.style.minHeight=height + 'px';
}
// remove empty class from inputs and conts
function UnEmpty(){
    let inps=document.querySelectorAll('.inp.required');
    
    if(inps){
        inps.forEach((inp)=>{
           inp.addEventListener('focus',()=>{
             let cont=inp.closest('.cont');
            if(cont){
                cont.classList.remove('empty');
            }else{
                inp.classList.remove('empty');
            }
           })
        })
    }
}
// single page navigation
async function spa(event,url,callback=null){
  try{
      // select main 
    let main=document.querySelector('main');
    //    add active class to the bottom nav
    // if(element !== null){
    //     let navs=document.querySelectorAll('footer .nav');
    //     navs.forEach((nav)=>{
    //         nav.classList.remove('active');
    //     })
    //         element.classList.add('active');
    //     }
      

      
      let spa_loader=document.querySelector('template.spa_loader');
      if(spa_loader){
        main.innerHTML=spa_loader.innerHTML;
      }

        // fetch page
        let response=await fetch(url);
        if(response.ok){
            let data=await response.text();
            // create a div and put fetched data in it to be able to select
            let div=document.createElement('div');
            div.innerHTML=data;
            // remove old link with .css class if exists
            let old_css=document.querySelectorAll('link.css');
            if(old_css){
                old_css.forEach((css)=>{
                   css.remove();
                });
            }
            // remove old styles with .css class if exists
            let old_styles=document.querySelectorAll('style.css');
            if(old_styles){
                old_styles.forEach((style)=>{
                    style.remove();
                });
            }
            //  attach page link with css class if exists
            let new_css=div.querySelectorAll('link.css');
            if(new_css){
                new_css.forEach(async (css)=>{
                  await new Promise((resolve)=>{
                      let link=document.createElement('link');
                    link.classList.add('css');
                    link.href=css.href;
                    link.rel='stylesheet';
                    document.head.appendChild(link);
                    return resolve();
                  })
                })
            }
            //  attach page styles with .css tag if exists
            let new_styles=div.querySelectorAll('style.css');
            if(new_styles){
               new_styles.forEach(async (css)=>{
                await new Promise((resolve)=>{
                    let style=document.createElement('style');
                    style.classList.add('css');
                    style.textContent=css.textContent;
                    document.head.appendChild(style);
                    return resolve();
                })
               })
            }
            // redeclare my func to be an empty object
            window.MyFunc={};
            // attach new header
            await new Promise((resolve)=>{
                document.querySelector('header').outerHTML=div.querySelector('header').outerHTML;
                return resolve();
            })
            // attach new main
            await new Promise((resolve)=>{
                main.className=div.querySelector('main').className;
                main.innerHTML=div.querySelector('main').innerHTML;
                return resolve();
            })
            
            // remove old js if exists
            let old_js=document.querySelectorAll('script.js');
            
            if(old_js){
                old_js.forEach((js)=>{
                    js.remove();
                })
            }

            // attach new js if exists
            let new_js=div.querySelectorAll('script.js');
            if(new_js){
                new_js.forEach((js)=>{
                    let script=document.createElement('script');
                    script.classList.add('js');
                    if(js.src){
                        script.src=js.src;
                    }else{
                        script.textContent=js.textContent;
                    }
                    document.body.appendChild(script);
                })
            }
            
            // push state
            history.pushState({},'',url);
            document.title=div.querySelector('title').innerText;
            if(callback !== null){
                callback(event,url);
            }
            
            
        }else{
            main.innerHTML=` <section class="column grid-full m-y-auto align-center no-select m-x-auto g-5">
        <div class="spa-error h-100 w-100"></div>
        <span class="desc bold  c-primary">${response.status} Error</span>
        <span>Oops! an unknown error occured</span>

    </section>`;
        }
  }catch(error){
    CreateNotify('error',error.stack);
  }
}
// remove classes from elements
function RemoveClasses(elements,class_name){
    if(elements){
        elements.forEach((element)=>{
            element.classList.remove(class_name);
        });
    }

}
// add classes from elements
function AddClasses(elements,class_name){
    if(elements){
        elements.forEach((element)=>{
            element.classList.add(class_name);
        });
    }

}
// add class to a single element
function AddClass(element,class_name){
   try{
     if(element){
    
            element.classList.add(class_name);
     
    }

   }catch(error){
    alert(error.stack)
   }
}
// remove class from a single element
function RemoveClass(element,class_name){
    if(element){
      
            element.classList.remove(class_name);
     
    }

}
// toggle nav group
function ToggleNavGroup(element){
    let group=element.closest('.group');
    if(group.classList.contains('active')){
 group.classList.remove('active');
    }else{
         group.classList.add('active');
    }
   
}
// toggle nav
function ToggleNav(){
    document.querySelector('nav').classList.add('active');
}
// Hide nav
function HideNav(){
    document.querySelector('nav').classList.remove('active');
}
// auto fill
function AutoFill(val,input,element){
   // alert(10)
   input.value=val;
   if(element !== null){
    element.classList.add('active');
   }


}
// placehoder input focus detection
function HandleFocus(){
    let placeholder_input=document.querySelectorAll('.placeholder-input');
    if(placeholder_input){
        placeholder_input.forEach((input)=>{
          input.addEventListener('focus',()=>{
              let cont=input.closest('.cont');
            if(cont){
                cont.classList.add('border-color-primary');
            }
          })
        })
    }
}
// placehoder input unfocus detection
function HandleBlur(){
    let placeholder_input=document.querySelectorAll('.placeholder-input');
    if(placeholder_input){
        placeholder_input.forEach((input)=>{
           input.addEventListener('blur',()=>{
             let cont=input.closest('.cont');
            if(cont){
              if(input.value == ''){
                  cont.classList.remove('border-color-primary');
              }
            }
           })
        })
    }
}
// calling functions


window.onload=function(){
    HideLoading();
    SetWindowHeight();
    UnEmpty();
    
}
