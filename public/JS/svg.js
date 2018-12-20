var svg;
var rect;

function grayDiceicon(){
  // svg = document.createElement('svg');
  //             svg.setAttribute("width", "100%");
  //             svg.setAttribute("height", "100%");


  rect = document.createElement('rect');
              rect.setAttribute("x", 0);
              rect.setAttribute("y", 0);
              rect.setAttribute("rx", 5);
              rect.setAttribute("ry", 5);
              rect.setAttribute("width", 32);
              rect.setAttribute("height", 32);
              rect.setAttribute("style","float:left;margin 0 2;fill:gray;stroke-width:1;opacity:1");
              return rect;




}

  function grayDiceImage(){
    svg = document.createElement('img');

                svg.setAttribute("src", "./images/gray.png");
                svg.setAttribute("style","width:24px;height:24px;margin:0px 1px");


  return svg;
    }

    function emptyDiceImage(){
      svg = document.createElement('img');

                  svg.setAttribute("src", "./images/EmptyDice.png");
                  svg.setAttribute("style","width:24px;height:24px;margin:0px 1px");


    return svg;
      }

    function plusImage(){
      svg = document.createElement('img');

                  svg.setAttribute("src", "./images/plus.png");
                  svg.setAttribute("style","width:16px;height:16px;margin:auto 1px");


    return svg;
      }

      function sumImage(){
        svg = document.createElement('img');

                    svg.setAttribute("src", "./images/sum.png");
                    svg.setAttribute("style","width:32px;height:32px;margin:auto 1px");


      return svg;
        }

        function bonusImage(){
          svg = document.createElement('img');

                      svg.setAttribute("src", "./images/bonus.png");
                      svg.setAttribute("style","width:32px;height:32px;margin:auto 1px");


        return svg;
          }
