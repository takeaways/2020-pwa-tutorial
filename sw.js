const CACHE_NAME = 'cache-1'; //캐쉬를 담을 파일명 정의
const filesToCache = [ //캐쉬 할 웹 자원들 정의
    '/',
    '/js/app.js',
    '/css/styles.css'
]

self.addEventListener('install', event =>{ 
    console.log(event)
    event.waitUntil(()=>{
        
    })
})