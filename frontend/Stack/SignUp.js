import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true);
    const [eyeIcon, setEyeIcon] = useState('eye-off');
    const [invalidAlertVisible, setInvalidAlertVisible] = useState(false); // État pour contrôler la visibilité du message d'erreur pour les données invalides
    const [emailExistAlertVisible, setEmailExistAlertVisible] = useState(false); // État pour contrôler la visibilité du message d'erreur pour l'adresse email existante

    const navigation = useNavigation();

    //fonction permettant de cacher le mot de passe ou non
    const hiddenPassword = () => {
        setHide(hide => !hide); // Mise à jour de la variable d'état hide
        // Mise à jour de la variable d'état eyeIcon en fonction de la valeur actuelle de hide
        setEyeIcon(hide ? 'eye' : 'eye-off');
    };

    const regex_email = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    //fontion executée lors de l'appui du bouton sign-up
    const userSignup = async () => {
        try {
            let invalid = false;
            if (!regex_password.test(password) || !regex_email.test(email)) {
                setInvalidAlertVisible(true);
                invalid = true;

            }
            if (!invalid) {
                console.log('yes')
                const res = await fetch(`http://10.0.0.13:3000/users/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: password }),
                });
                const data = await res.json();
                if (data.result) {
                    console.log('Inscription réussie');
                    navigation.navigate('TabNavigator');
                } else {
                    if (data.error === 'User already exists') {
                        setEmailExistAlertVisible(true);
                    }
                }
            }
        } catch (error) {
            console.error('Erreur de requête:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.lilcontainer}>
                <View style={styles.title}>
                    <Text style={styles.txt}>Sign-Up Page</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput
                        style={styles.inputmail}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value.toLocaleLowerCase());
                            setInvalidAlertVisible(false);
                            setEmailExistAlertVisible(false);
                        }}
                        placeholder="Enter your Email"
                    />
                    <View style={styles.passwordinput} >
                        <TextInput
                            style={styles.input}
                            secureTextEntry={hide}
                            value={password}
                            onChangeText={(value) => {
                                setPassword(value);
                                setInvalidAlertVisible(false);
                                setEmailExistAlertVisible(false);
                            }}
                            placeholder="Enter your Password"
                        />
                        <MaterialCommunityIcons
                            onPress={hiddenPassword}
                            style={styles.eyeicon}
                            name={eyeIcon}
                            color={'black'}
                            size={26}
                        />
                    </View>
                    {invalidAlertVisible && <Text style={styles.alert}>Email ou mot de passe pas conformes aux normes demandées</Text>}
                    {emailExistAlertVisible && <Text style={styles.alert}>Adresse email déjà utilisée pour un autre compte</Text>}
                    <Text
                        onPress={() => navigation.navigate('Login')}
                        style={styles.link}
                    >
                        Already have an account? Press here
                    </Text>
                    <Pressable
                        style={styles.button}
                        onPress={userSignup}
                    >
                        <Text style={styles.txtbtn}>Sign-up</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};


export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFb58A',

    },
    lilcontainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '70%'
    },
    title: {
        alignItems: 'center',
        marginTop: 60
    },
    txt: {
        fontWeight: 'bold',
        fontSize: '30'
    },
    txtbtn: {
        fontWeight: '400',
        fontSize: '20'
    },
    inputs: {
        marginTop: '20 %',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 230,
        fontSize: '16'
    },
    inputmail: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 256,
        fontSize: '16',
        borderBottomWidth: 1,

    },
    link: {
        color: 'blue',
        padding: 10,
        borderBottomWidth: 1,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#FFA778',
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 35,
        width: 230,
    },
    passwordinput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,

    },
    alerteinvalide: {
        color: 'red',
    },
    alertemail: {
        color: 'red',
    }
});