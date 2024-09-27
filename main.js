const buttonJs = document.querySelector(".button");
    buttonJs.addEventListener("click", function(e){
      e.preventDefault();
      window.open("https://drive.google.com/drive/folders/1PolkFbX4HaqLQGGRKzkdGkgimCKk0Rvx?usp=drive_link", '_blank');
});

const programItemsJs = document.querySelectorAll('.programList li[data-url]');//Get a node list of all the list(li) elements with data-url attribute

  programItemsJs.forEach(function(item){// We use a forEach function because we need ton apply same function in all the list(li) elements
  item.addEventListener('click', function(){//add a click event to the list elements
    const url = item.getAttribute('data-url');//Here we target the data-url attribute to control only the list elements with data-url

    
    if (url) {
      window.open(url, '_blank');
    }
    //We use if statement because if we accidently give a wrong url the browser try to redirect and we got error<--Or we can use simple this but it may redirect wrong url also.
      // window.open(url, '_blank');//<<<<----
      //or
  })
})
