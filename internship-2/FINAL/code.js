function getData(key){
    return JSON.parse(localStorage.getItem(key))
}
function setData(key,data){
    const data = JSON.stringify(data)
    localStorage.setItem(data)
}