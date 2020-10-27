import React, { Component } from 'react'
import axios from "axios";


function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
export function withApiProgress(WrappedComponent, apiPath){
    return class extends Component {
        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`
        //static displayName = 'ApiProgress(' + getDisplayName(WrappedComponent) + ')';

        state = {
            pendingApiCall: false
    
        }
        componentDidMount() {
            //burası componentin ilk ekrana konulduğu yerde çağırılan fonksiyon
            //console.log('Login page added to screen');
            this.requestInterceptor = axios.interceptors.request.use(
            request => {
                console.log("test");
                // if (request.url === this.props.path) {
                //     this.setState({ pendingApiCall: true })
                // }
                this.updateApiCallFor(request.url, true);
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use(
                response => {
                    //     if (response.config.url === this.props.path) {
                    //         this.setState({ pendingApiCall: false });
    
                    //     }
    
                    this.updateApiCallFor(response.config.url, false)
                    return response;
                },
                error => {
                    // if (error.config.url === this.props.path) {
                    //     this.setState({ pendingApiCall: false });
    
                    // }
                    this.updateApiCallFor(error.config.url, false)
                    throw error;
                });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                this.setState({ pendingApiCall: inProgress })
            }
        };
        render() {
            const { pendingApiCall } = this.state;
            // return (
            //     <div>
            //         {React.cloneElement(this.props.children, { pendingApiCall })}
            //     </div>
            // )

            return <WrappedComponent pendingApiCall={pendingApiCall} {...this.props}/>
        }
    }
}
