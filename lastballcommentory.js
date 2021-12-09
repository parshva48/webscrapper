let request=require("request");
let cheerio=require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary",cb);
function cb(error,header,html)
{
    let cheerioselector=cheerio.load(html);
    let element=cheerioselector(".match-comment-long-text");
    let txt=cheerioselector(element[1]).text();
    console.log(txt);
}
