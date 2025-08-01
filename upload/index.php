<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Move files to pc</title>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Teachers">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons">
    <style>
        :root{
           --font-size:1rem;
           --background:#121212;
           --back:#ffd700;
           
        }
         *{
            outline:none;
           font-family:poppins;
        }
        body{
            background:var(--background);
            color:#ffd700;
            display:flex;
            flex-direction:column;
            align-items: center;
            justify-content:center;
            min-height:100vh;
        }
        html,body{
            margin:0;
            padding:0;
        }
        h3{
            font-size:var(--font-size);
            
        }
        form{
            border:0.1px solid #ffd700;
            width:90%;
            padding:10px;
        }
     
        textarea{
            background:#232323;
            margin:5px 0;
            border:0.1px solid #ffd700;
            width:100%;
            height:500px;
            color:#4caf50;
            font-family:monospace;
        }
       button[type=submit]{
           border:none;
           background:var(--back);
           padding:10px 20px;
           display:flex;
           align-items:center;
       }
       .cont{
           width:100%;
           background:#343434;
           border:1px solid var(--back);
           position:relative;
           height:40px;
           border-radius:5px;
       }
       .cont_input{
           height:90%;
           border:none;
           width:90%;
           color:var(--back);
           background:inherit;
           border-radius:5px;
       }
        .label{
           position:absolute;
          left:5%;
          top:25%;
          pointer-events:none;
          transition-duration:0.5s;
          padding:0px 10px;
        }
        .cont_input:focus + .label,.cont_input:not(:placeholder-shown) + .label{
            top:-25%;
            background:var(--background)
        }
        .notice{
            background:#4caf50;
            color:white;
            transition-duration:1s;
            padding:10px;
            position:fixed;
            min-width:fit-content;
            white-space:nowrap;
            top:1%;
            left:100%;
            display:flex;
            align-items:center;
            gap:20px;
            z-index:2000;
        }
        .notice  *{
            user-select:none;
        }
        @media(min-width:800px){
            .cont{
                width:70%;
                height:50px;
            }
            .times{
                cursor:pointer;
            }
        }
    </style>
</head>
<body>
    <section style="display:<?php if(isset($_SESSION['notify'])){ echo 'flex'; }else{ echo 'none'; }?>" class="notice">
<span><?php if(isset($_SESSION['notify'])){ echo $_SESSION['notify']; unset($_SESSION['notify']); } ?></span>
<span class="times">&times</span>
    </section>
    <form action="upload_process.php" method="post">
        <h3>Create files</h3>
       
        <label>Type code here</label>
        <textarea name="content"></textarea>
        <button type="submit">CREATE FILE<i class="material-icons">chevron_right</i></button>
    </form>
    <script>
        let times=document.querySelector(".times");
let notice=document.querySelector(".notice");
setTimeout(function(){
    notice.style.left="1%";
},1000);
times.addEventListener("click",function(){
           notice.style.left="100%"; 
        })
    </script>
</body>
</html>