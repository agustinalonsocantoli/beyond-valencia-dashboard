export const toastNotify = (toast: any, status: any, title: string ) => {
    
    toast({
        title: title,
        status: status,
        duration: 3000,
        isClosable: true,
    })
};