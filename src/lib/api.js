export const getToken = async () =>{
    return Math.floor(Math.random()*4000) + 2000;
}

export const doSearch = (keyword)=>{
    // we fake some search request here
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve([1,2,3]);
        }, 1200)
    })
}