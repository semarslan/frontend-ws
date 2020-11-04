import {useEffect, useState} from 'react'
import axios from "axios";

export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        let requestInterceptor, responseInterceptor

        const updateApiCallFor = (url, inProgress) => {
            if (url.startsWith(apiPath)) {
                setPendingApiCall(inProgress);
            }
        };
        const registerInterceptors = () => {
            //burası componentin ilk ekrana konulduğu yerde çağırılan fonksiyon
            requestInterceptor = axios.interceptors.request.use(
                request => {
                    // if (request.url === this.props.path) {
                    //     this.setState({ pendingApiCall: true })
                    // }
                    updateApiCallFor(request.url, true);
                    return request;
                });

            responseInterceptor = axios.interceptors.response.use(
                response => {
                    //     if (response.config.url === this.props.path) {
                    //         this.setState({ pendingApiCall: false });

                    //     }

                    updateApiCallFor(response.config.url, false)
                    return response;
                },
                error => {
                    // if (error.config.url === this.props.path) {
                    //     this.setState({ pendingApiCall: false });

                    // }
                    updateApiCallFor(error.config.url, false)
                    throw error;
                });
        };

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };

        registerInterceptors();

        return function unmount() {
            unregisterInterceptors();
        };
    }, [apiPath]);
    return pendingApiCall;
}

