import React, {useCallback, useEffect, useReducer, useState} from "react";
import { Feather, FontAwesome } from '@expo/vector-icons';

import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signUp } from "../utils/actions/authActions";
import { ActivityIndicator, Alert } from "react-native";
import colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux"; // first is for updating the state, second is for accessing the state


const initialState = {
    inputValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",

    },
    inputValidities: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,

    },
    formIsValid: false
}

const SignUpForm = props => {

    const dispatch = useDispatch();
    // const stateData = useSelector(state => state.auth); // this need to match with the function in the store
    // console.log(stateData);

    const [error, setError] = useState();
    const [isloading, setIsLoading] = useState(false);

    const [formState, dispatchFormState] = useReducer(reducer, initialState); //dispatchFormState same as => [count, setCount] from useState

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
            const action = signUp(
                formState.inputValues.firstName,
                formState.inputValues.lastName,
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
            id="firstName" 
            label="First name" 
            icon="user-o" 
            iconPack={FontAwesome}
            onInputChanged={inputChangedHandler}
            autoCapitalize="none"
            errorText={formState.inputValidities['firstName']}
           />
            <Input
            id="lastName" 
            label="Last name" 
            icon="user-o" 
            iconPack={FontAwesome}
            onInputChanged={inputChangedHandler}
            autoCapitalize="none"
            errorText={formState.inputValidities['lastName']}
           />
           <Input
            id="email" 
            label="Email" 
            icon="mail" 
            iconPack={Feather}
            onInputChanged={inputChangedHandler}
            keyboardType="email-address"
            autoCapitalize="none"
            errorText={formState.inputValidities['email']}
           />
            <Input 
            id="password" 
            label="Password" 
            icon="lock"
            autoCapitalize="none"
            secureTextEntry 
            iconPack={Feather}
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['password']}
           />
           {
            isloading ? <ActivityIndicator size={"small"} color={colors.primary} style={{marginTop: 10}}/> :
            <SubmitButton
            title="Sign up"
            onPress={authHandler} 
            style= {{ marginTop: 20}}
            disabled={!formState.formIsValid} 
           />
           }
    </>
    

}
export default SignUpForm;
