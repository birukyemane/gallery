let slide = {
  allPhotos: photos,
  currentPhotoIndex:0,
  photoBaseWidth: 250, // defailt width
  widthIncrement: 0,
  showItem : function () {
    let currentElement = this.allPhotos[this.currentPhotoIndex];
    let picture = '', skills = '', moreinfo = '', name = '', favoriteQuote = '';
    for(property in currentElement){   
      moreinfo = `<div id="moreInfo">
        <div> <span class="infoTitle">Nationality :</span> ${currentElement.nationality}</div>
        <div> <span class="infoTitle">Joined on :</span> ${currentElement.joinedOn}</div>
        <div> <span class="infoTitle">Why software developer :</span> ${currentElement.whySofterDeveloper}</div>
        <div> <span class="infoTitle">Long term vision :</span> ${currentElement.longTermVision}</div>
        <div> <span class="infoTitle">Motivates me :</span> ${currentElement.motivatesMe}</div>        
        <div id="skillsSection" >
          <button class="collapsible" onclick="slide.collapse()">        
           <div id="accordionSigns">Skills: <i id="accordionPlusSign" class="fa fa-plus-circle"></i>
              <i id="accordionMinusSign" class="fa fa-minus-circle"></i>
            </div>
          </button>
          <div id="skills" class="dontShow">${this.skills(currentElement.skills)}</div>
        </div>
      </div>`;
      title = `<div id="title">${currentElement.title}</div>`;   
      picture =  `<div id="imgWrapper"><img id ="itemImage" style = "width:${(this.photoBaseWidth + this.widthIncrement)+'px'}" src="./images/${currentElement.src}" alt="${currentElement.alt}">
      <i id="forward" class="fa fa-forward" onclick="slide.nextPic()"></i> <i id="backward" class="fa fa-backward" onclick="slide.previousPic()"></i>
      <div id="name">${currentElement.firstName} ${currentElement.lastName}</div>
      </div>`;     
      favoriteQuote = `<div id="quote">"${currentElement.favoriteQuote}"</div>`;
    }   
    document.querySelector('#item').innerHTML = `<div id="pictureSection">${picture} <div id="indicator">${this.currentPhotoIndex + 1}/${this.allPhotos.length}</div>
    <button class="buttons" onclick="slide.toggleViews()">Details</button>
    <input type="range" min="1" max="50" value="${this.widthIncrement}" class="slider" id="myRange" onchange="slide.resizeImg()"></div>
    <div id="info" class="dontShow">${title}${favoriteQuote}${moreinfo}</div>  
    `;              
  },
  skills: function(skills){
  return skills.map(elt => {
      return `<div class="skill">${elt}</div>`;
    }).join('');
  },
  nextPic: function (){
    if(this.currentPhotoIndex == this.allPhotos.length-1){
      this.currentPhotoIndex = 0;
      this.showItem();
    } else {
      this.currentPhotoIndex ++;
      this.showItem();
    }    
  } , 
  previousPic: function(){
    if(this.currentPhotoIndex == 0){  
      this.currentPhotoIndex = this.allPhotos.length-1;
      this.showItem();
    } else {
      this.currentPhotoIndex --;
      this.showItem();
    }  
  }, 
  collapse: function(){
    document.querySelector('#skills').classList.toggle('active');
    document.querySelector('.collapsible').classList.toggle('activeButton');
    if (document.querySelector('#accordionPlusSign').style.display == 'none'){
      document.querySelector('#accordionPlusSign').style.display = 'inline-block';
      document.querySelector('#accordionMinusSign').style.display = 'none';
    } else {
      document.querySelector('#accordionPlusSign').style.display = 'none';
      document.querySelector('#accordionMinusSign').style.display = 'inline-block';
    }  
  },
  toggleViews: function() {
    document.querySelector('#info').classList.toggle('info-active');    
    if(document.querySelector('.buttons').textContent == 'Back to gallary') {
      document.querySelector('.buttons').textContent = 'Details';
      document.querySelector('#forward').style.display = 'inline-block';
      document.querySelector('#backward').style.display = 'inline-block';
      document.querySelector('#indicator').style.display = 'inline-block';
      document.querySelector('#myRange').style.display = 'inline-block';
    } else {
      document.querySelector('.buttons').textContent = 'Back to gallary';
      document.querySelector('#forward').style.display = 'none';
      document.querySelector('#backward').style.display = 'none';
      document.querySelector('#indicator').style.display = 'none';
      document.querySelector('#myRange').style.display = 'none';
      document.querySelector('#accordionPlusSign').style.display = 'inline-block';
      document.querySelector('#accordionMinusSign').style.display = 'none';
      document.querySelector('#skills').classList.remove('active');
    }
  },
  resizeImg: function() {
    this.widthIncrement = Number(document.querySelector('#myRange').value);
    let newWidth = this.photoBaseWidth + this.widthIncrement; // 250 is the base width or default
    console.log(newWidth,this.widthIncrement,document.querySelector('#itemImage').offsetWidth);
    document.querySelector('#itemImage').style.width = newWidth + 'px';
  }
}

// when the page loads

slide.showItem();