// preloader
$(window).ready(function() {
    $('#preloader').delay(100).fadeOut("fast");
});


window.sr = ScrollReveal();
sr.reveal('#load1', { duration: 3000 }, 100);


// aniview


var options = {
    animateThreshold: 10000,
    scrollPollInterval: 5000,
}
$('.aniview').AniView(options);

$(document).ready(function(){

    /**
     * This object controls the nav bar. Implement the add and remove
     * action over the elements of the nav bar that we want to change.
     *
     * @type {{flagAdd: boolean, elements: string[], add: Function, remove: Function}}
     */
    var myNavBar = {
    
        flagAdd: true,
    
        elements: [],
    
        init: function (elements) {
            this.elements = elements;
        },
    
        add : function() {
            if(this.flagAdd) {
                for(var i=0; i < this.elements.length; i++) {
                    document.getElementById(this.elements[i]).className += " fixed-theme";
                }
                this.flagAdd = false;
            }
        },
    
        remove: function() {
            for(var i=0; i < this.elements.length; i++) {
                document.getElementById(this.elements[i]).className =
                        document.getElementById(this.elements[i]).className.replace( /(?:^|\s)fixed-theme(?!\S)/g , '' );
            }
            this.flagAdd = true;
        }
    
    };
    
    /**
     * Init the object. Pass the object the array of elements
     * that we want to change when the scroll goes down
     */
    myNavBar.init(  [
        "header",
        "header-container",
        "brand",
    ]);
    
    /**
     * Function that manage the direction
     * of the scroll
     */
    function offSetManager(){
    
        var yOffset = 0;
        var currYOffSet = window.pageYOffset;
    
        if(yOffset < currYOffSet) {
            myNavBar.add();
        }
        else if(currYOffSet == yOffset){
            myNavBar.remove();
        }
    
    }
    
    /**
     * bind to the document scroll detection
     */
    window.onscroll = function(e) {
        offSetManager();
    }
    
    /**
     * We have to do a first detectation of offset because the page
     * could be load with scroll down set.
     */
    offSetManager();
    });


// function([string1, string2],target id,[color1,color2])    
consoleText(['Hello!', 'My name is Nguyen Hai Dang', 'My Birthday: 16/08/1989'], 'text',['Red','Green','lightblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 300)
}    