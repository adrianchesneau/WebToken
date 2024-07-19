import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true);
    const [eyeIcon, setEyeIcon] = useState('eye-off');
    const [alerteInvalide, setalerteInvalide] = useState('none');


    const navigation = useNavigation()

    //fonction permettant de cacher le mot de passe ou non
    const hiddenPassword = () => {
        setHide(hide => !hide); // Mise à jour de la variable d'état hide
        // Mise à jour de la variable d'état eyeIcon en fonction de la valeur actuelle de hide
        setEyeIcon(hide ? 'eye' : 'eye-off');
    };
    //fontion executée lors de l'appui du bouton sign-in
    const user_signin = async () => {
        try {
            //envoie requête à la route signin
            const res = await fetch('http://10.0.0.13:3000/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await res.json();
            //si les infos sont bien envoyées 
            if (data.result) {
                console.log('Authentification réussie');
                navigation.navigate('TabNavigator');
            }
            //si l'inscription s'est mal passée 
            else {
                console.log("Erreur lors de la connexion:", data.error);
                setalerteInvalide(!data.result ? 'contents' : 'none')
            }
        } catch (error) {
            // Gérez les erreurs de  fetch ici
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
                    <Text style={styles.txt}>Sign-in Page</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.inputmail}
                        keyboardType="email-address"
                        value={email} onChangeText={(value) => setEmail(value.toLocaleLowerCase())}
                        placeholder="Enter your Email">
                    </TextInput>
                    <View style={styles.passwordinput}>
                        <TextInput style={styles.input}
                            value={password} onChangeText={(value) => setPassword(value)}
                            placeholder="Enter your Password"
                            secureTextEntry={hide}

                        >
                        </TextInput>
                        <MaterialCommunityIcons
                            onPress={() => hiddenPassword()}
                            style={styles.eyeicon} name={eyeIcon} color={'black'} size={26} />
                    </View>
                    <Text style={styles.alerteinvalide} display={alerteInvalide} >email ou mot de passe invalide</Text>

                    <Text
                        onPress={() => navigation.navigate('SignUp')}
                        style={styles.link}>Don't have account? press here</Text>
                    <Pressable
                        style={styles.button}
                        onPress={() => user_signin()}>
                        <Text style={styles.txtbtn} >Sign-in</Text>
                    </Pressable>
                </View>
            </View>

        </KeyboardAvoidingView >

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#B4cbf0',

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
        fontSize: '16',

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
        backgroundColor: '#a8B5E0',
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
});
