import React, {Component} from 'react';
import {RaUtil} from './ra-util';
import RaSnackBar from './ra-snack-bar';
import axios from 'axios';
import {AuthenticationService} from "../services/authentication-service";
import {RaUrlUtil} from "./ra-url-util";
import {AppConstant} from "../app/app-constant";


export default class RaViewComponent extends Component {

    showProgressbar = () => {
        this.setState({isSystemProgressBarEnabled: true})
    };

    hideProgressbar = () => {
        this.setState({isSystemProgressBarEnabled: false})
    };

    closeSnackBar = () => {
        this.setState({showSystemSnackBar: false});
    };

    showSuccessInfo = (message) => {
        this.setState({
            showSystemSnackBar: true,
            systemSnackBarVariant: "success",
            systemSnackBarMessage: message
        });
    };

    showErrorInfo = (message) => {
        this.setState({
            showSystemSnackBar: true,
            systemSnackBarVariant: "error",
            systemSnackBarMessage: message
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            isSystemProgressBarEnabled: false,
            showSystemSnackBar: false,
            systemSnackBarVariant: "success",
            systemSnackBarMessage: "Empty Message",
            formData: {},
            formError: {},
        };
    }

    goToUrl = (url, event) =>{
        event.preventDefault();
        this.props.route.history.push(url)
    };

    getValueFromParams(key){
      return this.props.route.match.params[key];
    }


    handleFormChange = event =>{
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.state.formData[name] = value;
    };

    processFormResponse = (response, successRedirect, failedRedirect) =>{
        event.preventDefault();
        if (response.isSuccess){

        }else{
            if (response.errorDetails){
                response.errorDetails.forEach((data, key) => {
                    if (data.fieldName){
                        this.state.formError[data.fieldName] = {};
                        this.state.formError[data.fieldName].isError = true;
                        this.state.formError[data.fieldName].message = data.message;
                    }
                });
            } else if (response.message){
                this.showErrorInfo(message)
            }
        }
    };

    isInputError(fieldName){
        if (this.state.formError[fieldName] && this.state.formError[fieldName].isError){
            return this.state.formError[fieldName].isError
        }
        return false
    }

    isInputValue(fieldName){
        if (this.state.formData && this.state.formData[fieldName]){
            return this.state.formData[fieldName]
        }
        return ""
    }

    isInputErrorMessage(fieldName){
        if (this.state.formError[fieldName] && this.state.formError[fieldName].message){
            return this.state.formError[fieldName].message
        }
        return ""
    }

    callToApiByAxios(dataSet, success, failed){
        this.showProgressbar();
        if (dataSet !== undefined && dataSet.url !== undefined){
            dataSet.url = GRA.baseURL + dataSet.url
        }
        axios(dataSet).then((response) => {
            if (success !== undefined){
                success(response);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 401){
                AuthenticationService.logout();
            }else if (failed !== undefined){
                failed(error);
            }else{
                this.showErrorInfo(error.message);
            }
        }).then(() => {
            this.hideProgressbar();
        });
    }


    postToApi(url, data, success, failed) {
        let dataSet = {
            method: 'post',
            url: url,
            data: data
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    postJsonToApi(url, data, success, failed) {
        let dataSet = {
            method: 'post',
            url: url,
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    deleteToApi() {
    }


    getToApi(url, success) {
        let dataSet = {
            method: 'get',
            url: url
        };
        this.callToApiByAxios(dataSet, success);
    }

    getList() {
    }

    getBy() {
    }

    postBy() {
    }

    postList() {
    }

    appRender() {
        return (
            <h1>React Application View Component</h1>
        );
    }


    render() {
        return (
            <React.Fragment>
                {RaUtil.showLoader(this.state.isSystemProgressBarEnabled)}
                <RaSnackBar variant={this.state.systemSnackBarVariant ? this.state.systemSnackBarVariant : "error"} isOpen={this.state.showSystemSnackBar}
                             message={this.state.systemSnackBarMessage} onClose={this.closeSnackBar}/>
                {this.appRender()}
            </React.Fragment>
        )
    }
}
