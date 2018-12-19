import React, {Component} from 'react';
import {RaUtil} from './ra-util';
import RaSnackBar from './ra-snack-bar';
import axios from 'axios';
import {AuthenticationService} from "../services/authentication-service";
import {RaUrlUtil} from "./ra-url-util";
import {AppConstant} from "../app/app-constant";
import RaStaticHolder from "../artifacts/ra-static-holder";


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
            formEditData: {},
            formError: {},
        };
    }

    goToUrl = (url, event, state) => {
        if (event) {
            event.preventDefault();
        }
        this.props.route.history.push(url, state)
    };

    getValueFromParams(key){
      return this.props.route.match.params[key];
    }


    isInputValue(fieldName){
        if (this.state.formEditData && this.state.formEditData[fieldName]){
            return this.state.formEditData[fieldName]
        }
    }

     _isInputErrorMessage(fieldName){
        if (this.state.formError[fieldName] && this.state.formError[fieldName].message){
            return this.state.formError[fieldName].message
        }
        return ""
    }

    _isInputError(fieldName){
        if (this.state.formError[fieldName] && this.state.formError[fieldName].isError){
            return this.state.formError[fieldName].isError
        }
        return false
    }

    onChangeInputProcessor(fieldName) {
        return {
            error: this.state.formError[fieldName] !== undefined ? this._isInputError(fieldName) : false,
            helperText: this.state.formError[fieldName] !== undefined ? this._isInputErrorMessage(fieldName) : "",
            onChange: (event) => {
                event.preventDefault();
                const target = event.target;
                const value = target.type === 'checkbox' ? target.checked : target.value;
                const name = target.name;
                if (this.state.formData !== undefined) {
                    this.state.formData[name] = value;
                }
                this.setState((state) => {
                    let formError = {...state.formError};
                    if (formError[fieldName] !== undefined){
                        delete formError[fieldName];
                    }
                    return {formError: formError};
                });
            }
        }
    }

    showFlashMessage(){
        if (RaStaticHolder.message.message){
            if (RaStaticHolder.message){
                this.showSuccessInfo(RaStaticHolder.message.message)
            }else{
                this.showErrorInfo(RaStaticHolder.message.message)
            }
        }
    }

    processFormResponse = (response, successRedirectUrl, successMessage, failedRedirectUrl, failedMessage) =>{
        if (response.isSuccess){
            if (successRedirectUrl){
                RaStaticHolder.addMessageData(successMessage ? successMessage : response.message);
                this.goToUrl(successRedirectUrl);
            }
        }else{
            if (failedRedirectUrl){
                RaStaticHolder.addMessageData(failedMessage ? failedMessage : response.message);
                this.goToUrl(failedRedirectUrl)
            }else if (response.errorDetails){
                response.errorDetails.forEach((data, key) => {
                    if (data.fieldName){
                        this.state.formError[data.fieldName] = {};
                        this.state.formError[data.fieldName].isError = true;
                        this.state.formError[data.fieldName].message = data.message;
                    }
                });
            } else if (response.message){
                this.showErrorInfo(response.message)
            }
        }
    };


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
