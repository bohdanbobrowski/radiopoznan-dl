'use strict';
module.exports = (url, opts) => {  
   const scrapeIt = require("scrape-it");
   const download = require('download-file')
   function downloadPodcasts(podcasts, index) {
      var podcast = podcasts[index];
      scrapeIt(podcast.url, {
         title: ".news_show h1",
         file: {
            selector: "div.rm-audio-group li",
            data: {
               title: {
                  selector: 'a',
                  attr: 'data-title'
               },
               author: {
                  selector: 'a',
                  attr: 'data-author'
               },
               url: {
                  selector: 'a',
                  attr: 'data-hash'
               },
            }
         }
      }).then(podcast_page=>{
         console.log((index+1)+'. '+podcast_page.title);
         var options = {
            directory: "./",
            filename: podcast_page.title+'.mp3'
         } 
         download(podcast_page.file.url, options, function(){
            if(podcasts.length > index) {
               downloadPodcasts(podcasts, index+1);
            }
         });
      });
   }
   scrapeIt(url, {
      title: ".news_show h1",
      podcasts: {
         listItem: ".rm-broadcast-item",
         data: {
            image:{
               selector: 'figure>img',
               attr: 'src'
            },
            title:{
               selector: 'div.preview>a'
            },
            url:{
               selector: 'div.preview>a',
               attr: 'href'
            }
         }
      }
   }).then(page => {
      downloadPodcasts(page.podcasts, 0);
   });
};
