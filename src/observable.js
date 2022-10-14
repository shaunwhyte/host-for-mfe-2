 
export let getObservable = () => {
    return window.subject.asObservable();
}

export let next = (val) => {
    window.subject.next(val);
} 

