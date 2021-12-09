let cheerio=require("cheerio");
const { nextAll } = require("cheerio/lib/api/traversing");
let request=require("request");

//request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard",cb);
//request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",cb);
let count=0;
let statsarray=[];
let gcount;
function wrapper(url,global)
{
     gcount=global;
    request(url,cb);
}
function CorrectedName(name)
{
    let st="";
    for(let i=0;i<name.length;i++)
    {
        if(name.charAt(i)>='1' && name.charAt(i)<='9' || name.charAt(i)=='(')
        {
            break;
        }
        st+=name.charAt(i);
    }
    return st;
}

function cb(error,header,html)
{
    
    let cheerioselector=cheerio.load(html);
   let element=cheerioselector(".match-info.match-info-MATCH.match-info-MATCH-half-width .teams .team");
   for(let i=0;i<element.length;i++)
   {
    if(cheerioselector(element[i]).hasClass("team-gray")==false)
    {
       let wteam=cheerioselector(element[i]).text();
       wteam=CorrectedName(wteam);
       
       let bothtables=cheerioselector(".Collapsible");
       for(let j=0;j<bothtables.length;j++)
       {
           let tname=cheerioselector(bothtables[j]).find(".Collapsible .header-title.label");
         tname= cheerioselector(tname).text();
         if(tname.split("INNINGS")[0].trim()==wteam)
         {
           let table=cheerioselector(bothtables[j]).find(".table.batsman");
           let rows=cheerioselector(table).find("tr");
           for(let r=1;r<rows.length;r++)
           {
                 let cols=cheerioselector(rows[r]).find("td");
                 if(cols.length>5)
                 {
                     let bat=cheerioselector(cols[0]).text();
                     let run=cheerioselector(cols[2]).text();
                     let flag=true;
                     for(let m=0;m<statsarray.length;m++)
                     {
                        if(statsarray[m].name==bat)
                        {
                            statsarray[m].runs+=Number(run);
                            flag=false;
                            break;
                        }
                     }
                     if(flag)
                     {
                         statsarray.push({
                        name:bat,
                          runs:Number(run) 
                         });
                     }
                 }
           }
           
         }
       }
    }



   }
  count++;
  if(count==gcount)
  {
      console.table(statsarray);
  }
  }
 module.exports={
    singlematch:wrapper
 }
