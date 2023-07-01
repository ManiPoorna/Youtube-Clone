const BASE = 'https://www.googleapis.com/youtube/v3';
const API = 'AIzaSyBFEn4APeE7isZWQWQlS8Km9ZxjbMggtDo';

// Extracting YouTube video 

const iframe = document.getElementById("iframe");
const videoID = localStorage.getItem("videoId");
iframe.src = `https://www.youtube.com/embed/${videoID}`;


// COMMENTS CODE

// async function loadData(){
//     const URL = `${BASE}/commentThreads?key=${API}&videoId=${videoID}&maxResults=80&order=time&part=snippet`;
//     const response = await fetch(URL , {method:"GET"});
//     const data = await response.json();
//     console.log(data);
// }
// loadData();




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
    // displayVideos(videoList);
}

// function displayVideos(videoList){

// }