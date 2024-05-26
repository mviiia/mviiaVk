import axios from "axios";

export const getProfileInfo = async (token: string, v: string)=> axios.post(`http://localhost:5000/vk/profileInfo?token=${token}&version=${v}`);

export const getFriendsList = 
async (token: string, v: string, offset: number, count: number) => axios.post(`http://localhost:5000/vk/friends?token=${token}&version=${v}&count=${count}&offset=${offset}`); 

export const getSearchFriendsList = 
async (query: string, token: string, v: string, offset: number, count: number) => axios.post(`http://localhost:5000/vk/friendsSearch?query=${query}&token=${token}&version=${v}&count=${count}&offset=${offset}`); 

export const getFriendInfo = 
async (token: string, v: string, id: number) => axios.post(`http://localhost:5000/vk/friendInfo?token=${token}&version=${v}&id=${id}`);

export const getVideos = 
async (query: string, token: string, v: string, offset: number, count: number) => axios.post(`http://localhost:5000/vk/videos?query=${query}&token=${token}&version=${v}&count=${count}&offset=${offset}`); 

export const getMyVideos = 
async (token: string, v: string, offset: number, count: number) => axios.post(`http://localhost:5000/vk/myVideos?token=${token}&version=${v}&count=${count}&offset=${offset}`); 

export const getGroups = 
async (token: string, v: string, offset: number, count: number) => axios.post(`http://localhost:5000/vk/myGroups?token=${token}&version=${v}&count=${count}&offset=${offset}`); 

export const getGroupsTotalCount = 
async (token: string, v: string, offset: number, count: number) => axios.post(`http://localhost:5000/vk/myGroupsCount?token=${token}&version=${v}&count=${count}&offset=${offset}`); 

export const getPhotos = 
async (token: string, v: string, offset: number, count: number) => axios.post(`http://localhost:5000/vk/myPhotos?token=${token}&version=${v}&count=${count}&offset=${offset}`); 
