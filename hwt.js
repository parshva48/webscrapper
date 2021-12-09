

let cheerio=require("cheerio");
let request=require("request");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",cb);
function cb(error,header,html)
{
    let cheerioselector=cheerio.load(html);
    let elements=cheerioselector(".table.batsman");
    let maxrun=0;
    let batter="";
     for(let i=0;i<elements.length;i++)
     {
         let rows= cheerioselector(elements[i]).find("tr");
        for(let j=0;j<rows.length;j++)
        {
            let cols=cheerioselector(rows[j]).find("td");
            if(cols.length>5)
            { 
                if(maxrun<parseInt(cheerioselector(cols[2]).text()))
                {
                    maxrun=parseInt(cheerioselector(cols[2]).text());
                   
                    batter=cheerioselector(cols[0]).text()
                }
               
               
                
            }
        }
     }
     console.log("highest run getter"+batter+"runs->"+maxrun);
}
