import { useMutation } from "@tanstack/react-query"

export const useMutationHooks = (fcCallBack) => {
    const mutation = useMutation({
        mutationFn: fcCallBack
    })
    return mutation;
} 