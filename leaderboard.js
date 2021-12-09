let cheerio=require("cheerio");
let request=require("request");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results",cb);
let obj=require("./singlematch");
function cb(error,header,html)
{
    let cheerioselector=cheerio.load(html);
   let eachblock=cheerioselector("div.match-cta-container");
   
   let st=2;
   for(let i=0;i<eachblock.length;i++)
   {
     let block=cheerioselector(eachblock[i]).find("a");
     let link=cheerioselector(block[2]).attr("href");
     let fulllink="https://www.espncricinfo.com"+link;
      obj.singlematch(fulllink,eachblock.length);
   }


    

}