import React, {Component} from 'react';
import {RaUtil} from './ra-util';
import RaSnackBar from './ra-snack-bar';
import axios from 'axios';
import {AuthenticationService} from "../services/authentication-service";
import RaStaticHolder from "../artifacts/ra-static-holder";
import {AppConstant} from "../app/app-constant";
import {ApiURL} from "../app/api-url";
import {RaGsConditionMaker} from "./ra-gs-condition-maker";


export default class RaViewComponent extends Component {

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
            order: "desc",
            orderBy: "id"
        };
    }

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


    sortProcessor (name){
        const orderBy = name ? name : this.state.orderBy;
        let order = 'desc';
        if (this.state.orderBy === name && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({order, orderBy});
        return RaGsConditionMaker.order({}, name, order);
    }

    goToUrl = (url, event, state) => {
        if (event) {
            event.preventDefault();
        }
        this.props.route.history.push(url, state)
    };

    getValueFromParams(key) {
        return this.props.route.match.params[key];
    }


    isInputValue(fieldName) {
        if (this.state.formData && this.state.formData[fieldName]) {
            return this.state.formData[fieldName]
        }
    }

    setInputValue(fieldName, value) {
        this.setState((state) => {
            let formEditData = {...state.formEditData};
            formEditData[fieldName] = value;
            return {formEditData: formEditData};
        });
    }

    _isInputErrorMessage(fieldName) {
        if (this.state.formError[fieldName] && this.state.formError[fieldName].message) {
            return this.state.formError[fieldName].message
        }
        return ""
    }

    _isInputError(fieldName) {
        if (this.state.formError[fieldName] && this.state.formError[fieldName].isError) {
            return this.state.formError[fieldName].isError
        }
        return false
    }

    _onChangeInputProcessor(fieldName, onChangeCallBack) {
        return {
            error: this.state.formError[fieldName] !== undefined ? this._isInputError(fieldName) : false,
            name: fieldName,
            value: this.state.formData[fieldName] !== undefined ? this.isInputValue(fieldName) : "",
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
                    if (formError[fieldName] !== undefined) {
                        delete formError[fieldName];
                    }
                    return {formError: formError};
                });
                if (onChangeCallBack !== undefined) {
                    onChangeCallBack(event, fieldName, value);
                }
            }
        }
    }

    onChangeTextFieldProcessor(fieldName, onChangeCallBack) {
        let onChangeData = this._onChangeInputProcessor(fieldName, onChangeCallBack);
        onChangeData.helperText = this.state.formError[fieldName] !== undefined ? this._isInputErrorMessage(fieldName) : "";
        return onChangeData;
    }

    onChangeSelectProcessor(fieldName, onChangeCallBack) {
        let onChangeSelectCallBack = (event, fieldName, fieldValue) => {
            this.setInputValue(fieldName, fieldValue);
            if (onChangeCallBack !== undefined) {
                onChangeCallBack(event, fieldName);
            }
        };
        let onChangeData = this._onChangeInputProcessor(fieldName, onChangeSelectCallBack);
        return onChangeData;
    }

    helpTextErrorMessageProcessor(fieldName) {
        return {
            error: this.state.formError[fieldName] !== undefined ? this._isInputError(fieldName) : false,
            children: this.state.formError[fieldName] !== undefined ? this._isInputErrorMessage(fieldName) : "",
        }
    }

    formControlErrorMessageProcessor(fieldName) {
        return {
            error: this.state.formError[fieldName] !== undefined ? this._isInputError(fieldName) : false
        }
    }

    showFlashMessage() {
        if (RaStaticHolder.message.message) {
            if (RaStaticHolder.message) {
                this.showSuccessInfo(RaStaticHolder.message.message)
            } else {
                this.showErrorInfo(RaStaticHolder.message.message)
            }
        }
        RaStaticHolder.message = {};
    }

    processFormResponse = (response, successRedirectUrl, successMessage, failedRedirectUrl, failedMessage) => {
        if (response.isSuccess) {
            if (successRedirectUrl) {
                RaStaticHolder.addMessageData(successMessage ? successMessage : response.message);
                this.goToUrl(successRedirectUrl);
            }
        } else {
            if (failedRedirectUrl) {
                RaStaticHolder.addMessageData(failedMessage ? failedMessage : response.message);
                this.goToUrl(failedRedirectUrl)
            } else if (response.errorDetails) {
                response.errorDetails.forEach((data, key) => {
                    if (data.fieldName) {
                        this.state.formError[data.fieldName] = {};
                        this.state.formError[data.fieldName].isError = true;
                        this.state.formError[data.fieldName].message = data.message;
                    }
                });
            } else if (response.message) {
                this.showErrorInfo(response.message)
            }
        }
    };


    callToApiByAxios(dataSet, success, failed) {
        this.showProgressbar();
        if (dataSet !== undefined && dataSet.url !== undefined) {
            dataSet.url = ApiURL.BaseURL + dataSet.url
        }
        axios(dataSet).then((response) => {
            if (success !== undefined) {
                success(response);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
                AuthenticationService.logout();
            } else if (failed !== undefined) {
                failed(error);
            } else {
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
            headers: {'Content-Type': 'application/json'}
        };
        this.callToApiByAxios(dataSet, success, failed);
    }

    deleteToApi() {
    }

    deleteJsonToApi(url, data, success, failed) {
        let dataSet = {
            method: 'delete',
            url: url,
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };
        this.callToApiByAxios(dataSet, success, failed);
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
                <RaSnackBar variant={this.state.systemSnackBarVariant ? this.state.systemSnackBarVariant : "error"}
                            isOpen={this.state.showSystemSnackBar}
                            message={this.state.systemSnackBarMessage} onClose={this.closeSnackBar}/>
                {this.appRender()}
            </React.Fragment>
        )
    }
}
