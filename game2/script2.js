            const score=document.querySelector('.score');
            const startScreen=document.querySelector('.startScreen');
            const gameArea=document.querySelector('.gameArea');
            
            let player={speed : 5 , score:0};

            let keys={  ArrowUp : false,
                ArrowDown : false,
                ArrowLeft : false,
                ArrowRight : false
            };
            let eCar=["url('enemy1.png')",
                      "url('enemy2.png')",
                      "url('enemy3.png')",
                      "url('enemy4.png')",
                      "url('enemy5.png')"];
            var d=new Date();
            
            startScreen.addEventListener('click',start); //start callback function

            document.addEventListener('keydown', keyDown);
            function keyDown(e){
                e.preventDefault();
                keys[e.key]=true;
            }
            document.addEventListener('keyup', keyUp);
            function keyUp(e){
                e.preventDefault();
                keys[e.key]=false;
            }


//***************collide function***********/
            function isCollide(a,b){
                aRect=a.getBoundingClientRect();
                bRect=b.getBoundingClientRect();
                return !((aRect.top>bRect.bottom-5) || (aRect.bottom<bRect.top+5) || (aRect.right<bRect.left+5) || (aRect.left>bRect.right-5))
            }

            function moveLines(){
                let lines=document.querySelectorAll('.lines');

                lines.forEach(function(item){

                    if(item.y >= 700){
                        item.y-=750;
                    }

                    item.y +=player.speed;
                    item.style.top = item.y+"px";
                });

            }

            function endGame(){
                player.start=false;
                startScreen.classList.remove('hide');
                startScreen.innerHTML="GAME OVER <br> Your Final Score is "+(player.score+1)+"<br>Press here to restart";
                
            }

            function moveEnemy(car){
                let enemy=document.querySelectorAll('.enemy');
                
                enemy.forEach(function(item){

                    if(isCollide(car,item)){
                        player.speed=5;
                        endGame();
                    }

                    if(item.y >= 750){
                        item.y=-300;
                        item.style.left=Math.floor(Math.random()*350)+"px";
                    }

                    item.y +=player.speed;
                    item.style.top = item.y+"px";
                });

            }

            

            function gamePlay(){
                
                var car=document.querySelector('.car');
                
                let road=gameArea.getBoundingClientRect();
                

                if(player.start){

                    moveLines();
                    moveEnemy(car);

                    if(keys.ArrowUp && player.y>road.top+70){player.y-=player.speed;}
                    if(keys.ArrowDown && player.y<road.bottom-70){player.y+=player.speed;}
                    if(keys.ArrowLeft && player.x>0){player.x-=player.speed;}
                    if(keys.ArrowRight && player.x<road.width-60){player.x+=player.speed;}

                    
/*
                    car.addEventListener("touchmove",function(evt){
                        var touch=evt.touches[0];
                        var height=this.clientHeight/2;
                        var width=this.clientWidth/2;
                        var x=touch.clientX-width;
                        var y=touch.clientY-height;
                        player.style.transform = "translate("+player.x+"px,"+player.y+"px)";
                    });
  */
                    
                    car.addEventListener("touchmove",touchMove)
                    function touchMove(evt){
                        var touch=evt.touches[0];
                        var height=this.clientHeight/2;
                        var width=this.clientWidth;
                        player.x=touch.clientX-width;
                        player.y=touch.clientY-height;
                    };
                    if(player.x<0){
                        player.x=0;
                    }
                    if(player.x+55>gameArea.offsetWidth){
                        player.x=gameArea.offsetWidth-55;
                    }
                    car.style.transform="translate("+player.x+"px,"+player.y+"px)";
                    car.style.top=player.y+"px";
                    car.style.left=player.x+"px";

                    player.score++;
                    if(player.score % 500 == 0){player.speed+=2;}
                    score.innerText="SCORE: "+player.score;

                    
                    window.requestAnimationFrame(gamePlay);
                }
            }

            //********************starting game***************
            
            function start(){
                
                //score.classList.remove('hide');
                gameArea.classList.remove('hide');
                startScreen.classList.add('hide');
                gameArea.innerHTML="";



                player.start=true;
                player.score=0;
                window.requestAnimationFrame(gamePlay); //gamePlay callback function
                
                for(x=0;x<5;x++){
                    let roadLine=document.createElement('div');
                    roadLine.y=x*150;
                    roadLine.setAttribute('class','lines');
                    roadLine.style.top = roadLine.y+"px";
                    gameArea.appendChild(roadLine);
                }

                //  creating a div element inside the gameArea

                let car=document.createElement('div');
                car.setAttribute('class','car');
                gameArea.appendChild(car);

                player.x=car.offsetLeft;
                player.y=car.offsetTop;
                

                for(x=0;x<3;x++){
                    let enemyCar=document.createElement('div');
                    enemyCar.style.backgroundImage=eCar[Math.floor(Math.random() * 5 -0.1)];
                    enemyCar.y=((x+1)*350)*-1;
                    enemyCar.setAttribute('class','enemy');
                    enemyCar.style.top = enemyCar.y+"px";
                    enemyCar.style.left=Math.floor(Math.random()*(gameArea.getBoundingClientRect().width-70))+"px";
                    gameArea.appendChild(enemyCar);
                }
            }

            

            

            

            
