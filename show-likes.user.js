// ==UserScript==
// @name         Youtube Show Likes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hobi project
// @author       Tolga Konat
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

//array e atma kaldi

(function() {
    'use strict';

    let getParentforChilds = function(index)
    {
        let parent = document.querySelectorAll('div#contents[class="style-scope ytd-rich-grid-row"]').item(index)
        return parent;
    }

    let getChildsFromParents = function(parent,index)
    {
//        let tmep = document.querySelectorAll('div#contents[class="style-scope ytd-rich-grid-row"]').item(0).childNodes[0].querySelectorAll("#metadata-line").item(0).getElementsByClassName("style-scope ytd-video-meta-block")[1];
        let tmep = parent.childNodes[index].querySelectorAll("#metadata-line").item(0).getElementsByClassName("style-scope ytd-video-meta-block")[1];
        return tmep;
    }

    let run = function()
    {
//        let tmep = document.querySelectorAll('div#contents[class="style-scope ytd-rich-grid-row"]').item(0).childNodes[0].querySelectorAll("#metadata-line").item(0).getElementsByClassName("style-scope ytd-video-meta-block")[1];
                console.log("Working!");

        let parent = document.querySelectorAll('div#contents[class="style-scope ytd-rich-grid-row"]').length;

        for(let i = 0; i < parent; i++)
        {
            let forchild = getParentforChilds(i);

            for(let j = 0; j < forchild.childNodes.length ; j++)
            {
                console.log(getChildsFromParents(forchild,j));

            }



        }

    }

        setTimeout(run,3000);
})();