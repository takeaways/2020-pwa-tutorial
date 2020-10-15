const CACHE_NAME = 'pwa-offline-v1'; //캐쉬를 담을 파일명 정의
const filesToCache = [ //캐쉬 할 웹 자원들 목록
    '/', //index.html을 담당
    '/public/css/styles.css' 
]
// 서비스 워커 설치 (웹 자원 캐싱)
self.addEventListener('install', (event)=>{
    console.log('install ')
event.waitUntil(//끝나기 전까지는 이벤트가 끝나지 않는다.
    //caches 브라우져 예약어
    caches.open(CACHE_NAME)
    .then((cache)=>{//캐쉬를 열고 접근 할 수 있는 캐쉬를 얻을 수 있다.
        //캐쉬에 넣어라
        return cache.addAll(filesToCache)
    })
    .catch(error=>{
        return console.log(error)
    })
)
})

self.addEventListener('fetch',(event)=>{
    console.log('fetch', event.request)
    event.respondWith(
        caches.match(event.request)
        .then((response)=>response || fetch(event.request))
        .catch(console.error)
    );
})