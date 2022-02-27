import videos from './data.js'

window.addEventListener('DOMContentLoaded', _ => {

    let timeout
    let position = 0
    let currentVideo
    let deviceHeight = window.innerHeight
    const videoWrapper = document.querySelector('.wrapper')

    window.addEventListener('resize', _ => {
        deviceHeight = window.innerHeight
        document.querySelectorAll('.video-item').forEach(item => {
            item.setAttribute('position', +item.getAttribute('index') * deviceHeight)
        })
    })

    function createVideoItem({ url, name, profilePhoto }, index) {
        const item = document.createElement('div')
        item.className = 'video-item'
        item.setAttribute('index', position)
        item.setAttribute('position', position * deviceHeight)
        position++
        if (index === videos.length - 2) {
            item.setAttribute('load-videos', 'true')
        }
        const video = document.createElement('video')
        video.src = url

        item.addEventListener('click', _ => {
            if (item.querySelector('video').paused) {
                item.querySelector('video').play()
            } else {
                item.querySelector('video').pause()
            }
        })
        item.appendChild(video)
        item.innerHTML += `
            <footer>
                <section class="channel-info">
                    <div class="user">
                        <div class="avatar">
                            <img src="${profilePhoto}" alt="${name}" />
                        </div>
                        <div>
                            <h4>${name}</h4>
                            <a href="#" class="visit">Visit Profile</a>
                        </div>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ad laudantium commodi architecto magni saepe modi in sed. Exercitationem facere a doloribus amet, nulla corrupti natus facilis voluptate maiores alias.</p>
                </section>
                <section class="actions">
                    <button>
                        <ion-icon name="thumbs-up-outline"></ion-icon>
                    </button>
                    <button>
                        <ion-icon name="thumbs-down-outline"></ion-icon>
                    </button>
                    <button>
                        <ion-icon name="heart-outline"></ion-icon>
                    </button>
                    <button>
                        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>                    
                    </button>
                    <button>
                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>                    
                    </button>
                </section>
            </footer>
        `
        videoWrapper.appendChild(item)
    }

    function detectVideoItem() {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            const item = document.querySelector(`.video-item[position="${Math.floor(videoWrapper.scrollTop)}"]`)
            if (item) {
                if (item.getAttribute('load-videos')) {
                    item.removeAttribute('load-videos')
                    loadVideo()
                }

                if (currentVideo) {
                    currentVideo.pause()
                }
                const video = item.querySelector('video')
                video.play()
                currentVideo = video
            }
        }, 200)
    }

    function loadVideo() {
        videos.forEach((video, index) => createVideoItem(video, index))
    }

    function initalize() {
        loadVideo()
        detectVideoItem()
        videoWrapper.addEventListener('scroll', _ => detectVideoItem())
    }

    initalize()

})