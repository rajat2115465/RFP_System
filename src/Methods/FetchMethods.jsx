import React from 'react'
export const baseUrl='https://rfpdemo.velsof.com/api/'
const token=localStorage.getItem("Token");

export const postFetch = async(endpoints,data) => {
    return await fetch(`${baseUrl}${endpoints}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(data),
    })
}
export const getFetch = async(endpoints) => {
 return await fetch(`${baseUrl}${endpoints}`,{
        method: "GET",
        headers: {

          "Authorization": `Bearer ${token}` 
        }
    })
}
export const putFetch = (endpoints,data) => {
    fetch(`${baseUrl}${endpoints}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        // body: JSON.stringify(data),
    })
}

 