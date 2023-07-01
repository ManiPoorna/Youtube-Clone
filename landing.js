const BASE = 'https://www.googleapis.com/youtube/v3';
const API = 'AIzaSyBjXB5oK7rTXjBzlWsQdyfnzQii4AbH5Cw';

const videos_list = document.getElementById("videos-list");
videos_list.className = "videos-list";


//Making API Search for videosObject

async function getVideos(){
    try{
        const URL =  `${BASE}/search?key=${API}&type=videos&maxResults=20`;
        const response = await fetch(URL);
        const data = await response.json();
        const videosObj = data.items;
        console.log("Video Obj : ", videosObj);
        getVideoDetails(videosObj);
    }
    catch(error){
        console.log(error)
    }
}

// Getting video data by VideoID

async function getVideoData(videoId){
    const URL = `${BASE}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API}&`;
    const response = await fetch(URL, {method : "GET"});
    const data = await response.json();
    return data.items[0];
}

// Getting video Details like title, desc, channel-name etc...

async function getVideoDetails(videos){
    let videoList = [];
    for(let i=0;i<videos.length;i++){
        const video = videos[i];
        const videoid = video.id.videoId;
        videoList.push(await getVideoData(videoid));
    }
    console.log("Video List : ",videoList);
    displayVideos(videoList);
}

// Rendering Videos into UI

function displayVideos(videosList){
    videos_list.innerHTML = '';
    for(let i=0;i<videosList.length;i++){
        let video = videosList[i];
        videos_list.innerHTML += `
        <div class="video" id="video" onclick="openvideo('${video.id}')">
        <div class="details">
            <div class="thumbnail">
                <img src="${video.snippet.thumbnails.high.url}" alt="insta">
            </div>
            <div class="desc">
                <div class="desc-img">
                    <img src="./assets/Profile.png" alt="p">
                </div>
                <div class="desc-details">
                    <div class="desc">${video.snippet.title}</div>
                    <div class="title">${video.snippet.channelTitle}</div>
                    <div class="views-date">
                        <span>${Math.floor((video.statistics.viewCount)/1000)}K Views</span>
                        <span>2 Weeks ago</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    }
}

function openvideo(videoId){
    localStorage.setItem("videoId", videoId);
    window.open("./videopage/index.html");
}

//invoking functions
getVideos();