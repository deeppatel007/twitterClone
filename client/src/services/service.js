import axios from 'axios';
import { useState } from 'react';

const url = 'http://localhost:5000/api';

export const authenticateSignup = async (user) => {
    try{
        return await axios.post(`${url}/signin`, user)
    }
    catch(error) {
        console.log('Error while calling signup api', error);
    }
}

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user);
    }
    catch(error) {
        console.log('Error while calling login api', error);
    }
}

export const add_post = async (Post) => {
    console.log("hjasdddddddd=>",Post);
    try {
        return await axios.post(`${url}/post`, Post);
    }
    catch(error) {
        console.log('Error while calling login api', error);
    }
}

export const add_comment = async (answer) => {
    console.log(answer);
    try {
        return await axios.post(`${url}/add`, answer);
    }
    catch(error) {
        console.log('Error while calling login api', error);
    }
}

export const add_tweet = async (tweet) => {
    try {
        return await axios.post(`${url}/tweet`, tweet);
    }
    catch(error) {
        console.log('Error while calling tweet api', error);
    }
}

export const add_answer = async (answer) => {
    try {
        return await axios.post(`${url}/addanswer`, answer);
    }
    catch(error) {
        console.log('Error while calling login api', error);
    }
}

