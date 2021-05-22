const params = new URLSearchParams(location.search);
const id = params.get('id');

if(!id){
    location.href='./404.html';
}