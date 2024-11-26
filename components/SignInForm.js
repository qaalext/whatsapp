import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Feather } from '@expo/vector-icons';

import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signIn } from "../utils/actions/authActions";
import { useDispatch } from "react-redux";
import { ActivityIndicator, Alert } from "react-native";
import colors from "../constants/colors";

const isTestMode = true;


const initialState = {
    inputValues: {
        email: isTestMode ? "tibi@test.com": "",
        password: isTestMode ? "Tester123": "",

    },
    inputValidities: {
        email: isTestMode,
        password: isTestMode,

    },
    formIsValid: isTestMode
}

const SignInForm = props => {

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [error, setError] = useState();
    const [isloading, setIsLoading] = useState(false);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({inputId, validationResult: result, inputValue})
    }, [dispatchFormState])

    useEffect(() => {
        if(error){
            Alert.alert("An error occurred", error, [{text: "Okay"}])
        }
    }, [error])

    const authHandler = useCallback(async () => {
        try {
            setIsLoading(true);
            const action = signIn(
                formState.inputValues.email,
                formState.inputValues.password,
            );
            setError(null);
            await dispatch(action);
        } catch (error) {
            console.log(setError(error.message));
            setIsLoading(false);
        }
    }, [dispatch, formState])
  
    return <>
         
           <Input
            id="email" 
            label="Email" 
            icon="mail" 
            iconPack={Feather}
            autoCapitalize="none"
            keyboardType="email-address"
            onInputChanged={inputChangedHandler}
            initialValue={formState.inputValues.email}
            errorText={formState.inputValidities['email']}
           />
            <Input
            id="password" 
            label="Password" 
            icon="lock" 
            iconPack={Feather}
            autoCapitalize="none"
            secureTextEntry
            onInputChanged={inputChangedHandler}
            initialValue={formState.inputValues.password}
            errorText={formState.inputValidities['password']}
           />
         
           {
            isloading ? <ActivityIndicator size={"small"} color={colors.primary} style={{marginTop: 10}}/> :
                <SubmitButton
                title="Sign in"
                onPress={authHandler} 
                style= {{ marginTop: 20}}
                disabled = {!formState.formIsValid}
           />
           }
    </>
    

}
export default SignInForm;
