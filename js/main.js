const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
const container = document.getElementById('container');
const buttonLike = document.getElementsByClassName('like-button');

init();








// ********************************************** FUNZIONI **********************************************


/**
 * funzione iniziale
 */
function init(){
    generatePosts();
    likeButton();
};


/**
 * genera i post che mi servono scomponendo l'array e ottenendo tutti i dati che utilizzerò, e stampa le card
 */
function generatePosts(){
    posts.forEach(post => {
        container.innerHTML += createDocument(post);  
    });

}


/**
 * grazie a questa funzione creo la card a seconda di se c'è o no l'img di profilo
 * @param {oggetto} post passare l'oggetto da cui prendere i dati
 * @returns card compilata pronta per essere stampata
 */
function createDocument(post){
    const {id, content, media, author, likes, created } = post;
    const {name, image} = author;
    let card = '';
    let newImg = checkImg(image, name);
    let newDate = transformDate(created);

    if(image == null){
        card =     `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                       <div class="profile-pic-default"> ${newImg}  </div>                  
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${name}</div>
                        <div class="post-meta__time">${newDate}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">
              ${content}
            </div>
            <div class="post__image">
                <img src="${media}" alt="Pic of post">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}" >
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>  
    `;
    }else {
        card = 
        `
            <div class="post">
                <div class="post__header">
                    <div class="post-meta">                    
                        <div class="post-meta__icon">
                            <img class="profile-pic"  src="${image}" alt="${name}">                    
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${name}</div>
                            <div class="post-meta__time">${newDate}</div>
                        </div>                    
                    </div>
                </div>
                <div class="post__text">
                  ${content}
                </div>
                <div class="post__image">
                    <img src="${media}" alt="Pic of post">
                </div>
                <div class="post__footer">
                    <div class="likes js-likes">
                        <div class="likes__cta">
                            <a class="like-button  js-like-button" href="#" data-postid="${id}" >
                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                <span class="like-button__label">Mi Piace</span>
                            </a>
                        </div>
                        <div class="likes__counter">
                            Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                        </div>
                    </div> 
                </div>            
            </div>  
        `;
    }
    
    return card;
}

/**
 * grazie a questa funzione mi estrapolo le iniziali del nome solo quando non c'è l'img nell'oggetto
 * @param {string} image 
 * @param {string} name 
 * @returns Iniziali nome
 */
 function checkImg(image, name){
    let noSpace = "";
    if(image == null) {
        
    name.split("").map(char => {
            if(char == char.toUpperCase()){
                noSpace += char.replace(/\s/g, '');
            }
        })
        return noSpace;
    };   
};

/**
 * 
 * @param {string} date data da rigirare in formato anno/mese/giorno
 * @returns data girata in formato giorno/mese/anno
 */
function transformDate(date){
    let anno = date.slice(0, 4);
    let mese = date.slice(5,7);
    let giorno = date.slice(8);
    
   return giorno + '-' + mese + '-' + anno;
};


/**
 * quando premo sul button like mi aggiunge il like nei likes e mi colora il bottono di verde
 */
let isClicked = false;
function likeButton(){
    for(let i = 0; i < buttonLike.length; i++ ){
        buttonLike[i].addEventListener('click', function(e){
            e.preventDefault();
            let id = this.getAttribute('data-postid');
            let numberTheLikes = parseInt(posts[i].likes);
            let numberOfLikes;
            if(!isClicked){
                this.classList.add("like-button--liked");
                numberOfLikes = numberTheLikes + 1;
                isClicked = true;
            }else {
                this.classList.remove("like-button--liked");
                numberOfLikes = numberTheLikes;
                isClicked = false;
            }
           

            document.getElementById(`like-counter-${id}`).innerHTML = numberOfLikes;
        })
    }
}
