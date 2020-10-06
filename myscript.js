console.log("connected to script");
// for checking
var table =$('table tr');
// Declaring the actual table variable which will be used as the main reference//

function modern()
{
  for(var r=0;r<9;r++)
  {
    for(var c=0;c<9;c++)
    {
      table.eq(r).find('td').eq(c).find('input').val(" ");
      console.log(table.eq(r).find('td').eq(c).find('input').val());
    }
  }
}

function issafe(row,col,num)
{
  //for row wise check //
  for(var c=0;c<9;c++)
  {
    table.eq(row).find('td').eq(c).find('input').css("background-color","yellow");
    if(table.eq(row).find('td').eq(c).find('input').val()==num)
    {
      return false;
    }
  }

  // for column wise check //
  for(var r=0;r<9;r++)
  {
    table.eq(r).find('td').eq(col).find('input').css("background-color","yellow");
    if(table.eq(r).find('td').eq(col).find('input').val()==num)
    {
      return false;
    }
  }

  // for used in box//
  var startrow = row - row%3;
  var startcol = col - col%3;
  for(var r=0;r<3;r++)
  {
    for(var c=0;c<3;c++)
    {
      table.eq(r+startrow).find('td').eq(c+startcol).find('input').css("background-color","yellow");

      if(table.eq(r+startrow).find('td').eq(c+startcol).find('input').val()==num)
      {
        return false;
      }
    }
  }

  return true;
}

function solvesudoku()
{
  var row;
  var col;

  for(row=0;row<9;row++)
  {
    var flag=true;
    for(col=0;col<9;col++)
    {
      if(table.eq(row).find('td').eq(col).find('input').val()==0)
      {
        flag=false;
        break;
      }
    }
    if(flag==false)
    {
      break;
    }
  }

  console.log('row ='+row+' col ='+col);

  if(row===9 && col===9)
  {
    return true;
  }

  for(var num=1;num<=9;num++)
  {
    if(issafe(row,col,num)===true)
    {
      console.log('row = '+row+' col = '+col+'num = '+num);

      table.eq(row).find('td').eq(col).find('input').val(num);



      if(solvesudoku()===true)
      {
        return true;
      }

      table.eq(row).find('td').eq(col).find('input').val(0);

    }
  }
  return false;
}

function changecolor()
{
  for(var r=0;r<9;r++)
  {
    for(var c=0;c<9;c++)
    {
      table.eq(r).find('td').eq(c).find('input').css("background-color","#77b5fe");
    }
  }
}



$(".refreshclass").click(function()
{
  $(".refreshclass").css("background-color","#77b5fe");
  $(".buttonclass").css("background-color","yellow");
  console.log("refreshed");
  modern();
  changecolor();
  console.log("board cleared");
})


$(".buttonclass").click(function()
{
  $(".buttonclass").css("background-color","#77b5fe");
  $(".refreshclass").css("background-color","yellow");
  console.log("solved");
  if(solvesudoku()===true)
  {
    console.log("PROCESS_FINISHED");
  }
  else {
    console.log("IMPOSSIBLE");
  }
})
