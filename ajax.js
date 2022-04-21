function noop(){};

class MyPromise{
    constructor(executor){
        this.queue = [];
        this.errorHandler = noop;
        this.finallyHandler = noop;

        try {
            executor.call(null,this.onResolve.bind(this),this.onReject.bind(this))
        }catch (e) {
            this.errorHandler(e);
        }finally {
            this.finallyHandler();
        }
    }

    onResolve(data){
        this.queue.forEach(callback=>{
            data = callback(data);
        })
        this.finallyHandler()
    }

    onReject(error){
        this.errorHandler(error);

        this.finallyHandler()
    }

    then(fn){
        this.queue.push(fn);
        return this;
    }

    catch(fn){
        this.errorHandler = fn;
        return this;
    }

    finally(fn){
        this.finallyHandler = fn;
        return this;
    }
}


const requestURL = 'https://jsonplaceholder.typicode.com/posts';

function ajax(url,config){
    return new MyPromise((resolve,reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open(config,url)
        xhr.responseType = "json";
        xhr.onload = () =>{
            if(xhr.status>=400){
                reject(xhr.response)
            }else{
                resolve(xhr.response)
            }
        }
        xhr.onerror=()=>{
            reject(xhr.response)
        }
        xhr.send()
    })
}

ajax(requestURL,'GET')
    .then(data=>{

        console.log(data);
    })
    .catch(err=>console.log('Error',err))