import {  toast } from 'react-toastify';


export const notifySub = (id) => toast.success(`You Subscribe ${id}`,{theme:'colored'});
export const notifyUnSub = (id) => toast.info(`You Unsubscribe ${id}`,{theme:'colored'});
