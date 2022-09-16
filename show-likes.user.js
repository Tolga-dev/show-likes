// ==UserScript==
// @name         Youtube Show Likes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hobi project
// @author       Tolga Konat
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// ==/UserScript==

//array e atma kaldi

(function() {
    'use strict';
    let UsedElements = [];
    let gate = 0;

    let getParentforChilds = function(index)
    {
        let parent = document.querySelectorAll('div#contents[class="style-scope ytd-rich-grid-row"]').item(index)

        return parent;
    }

    let getChildsFromParents = function(parent,index)
    {
        let temp = parent.childNodes[index];
        let meta = temp.querySelectorAll("#metadata-line").item(0).getElementsByClassName("style-scope ytd-video-meta-block")[0];
        let videoLink = getChildLinkFromParent(temp);
        if(!UsedElements.includes(videoLink))
        {
            UsedElements.push(videoLink);
            getPage(videoLink, function(response)
                {
                       meta.append(' ' + getLike(response) + ' likes');
                }
                );
        }
    }
    let getChildLinkFromParent = function(child)
    {

        var title = "https://www.youtube.com/" + child.querySelectorAll('a#thumbnail').item(this).getAttribute('href');
        return title;
    }


    let run = function()
    {
        console.log("Working!");

        let parent = document.querySelectorAll('div#contents[class="style-scope ytd-rich-grid-row"]').length;

        for(let i = 0; i < parent; i++)
        {
            let forchild = getParentforChilds(i);
            for(let j = 0; j < forchild.childNodes.length ; j++)
            {
                getChildsFromParents(forchild,j)
            }
        }

    }

    setInterval(run,3000);

    let getPage = function(url, callBack)
    {

        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: callBack
        });

    }
    let getLike = function(response)
    {
        let pageSource = response.responseText;
        let rightAnchor = ' likes"}';
        let rightIdx = pageSource.indexOf(rightAnchor);
        let chunk = pageSource.substring(rightIdx-20, rightIdx);
        let leftAnchor = '"label":"';
        let leftIdx = chunk.indexOf('"label":"');
        return chunk.substring(leftIdx + leftAnchor.length);

    }

/*
    let checkGate = function()
    {

        if(!checkGate())
        {

            gate = 1;
            parent = document.querySelectorAll('div#contents[class="style-scope ytd-item-section-renderer"]').item(2).childNodes.length;
                //.item(2).childNodes[0].querySelector('div#metadata-line[class="style-scope ytd-video-meta-block"]')

        }
        console.log(gate + " gate" );
        console.log(parent);


        if(gate == 1)
        {
            return 1;
        }
        if(gate == 0)
        {
            return 0;
        }

    }

*/


})();