import React, { useState } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'

import {
    Container,
    Form,
    Button,
    Input,
    Item,
    H1
} from 'native-base'
import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar'


const Add = ({ navigation }) => {
    const [name, setName] = useState('')
    const [totalNoSeason, setTotalNoSeason] = useState('')

    const addToList = async () => {
        try {
            if (!name || !totalNoSeason) {
                Snackbar.show({
                    text: "Please enter both the fields",
                    textColor: "#eee",
                    backgroundColor: "red"
                })
            }
            const seasonToAdd = {
                id: shortid.generate(),
                name: name,
                totalNoSeason: totalNoSeason,
                isWatched: false

            }
            const storedValue = await AsyncStorage.getItem('@season_list')
            const prevList = await JSON.parse(storedValue)
            if (!prevList) {
                newList = [seasonToAdd]
                await AsyncStorage.setItem('@season_list', JSON.stringify(newList))
            } else {
                prevList.push(seasonToAdd)
                await AsyncStorage.setItem('@season_list', JSON.stringify(prevList))
            }



            navigation.navigate('Home')
        } catch (error) {
            console.log(error);
        }
        navigation.navigate('Home')


    }

    return (

        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                <H1 style={styles.heading}>Add to watch list</H1>
                <Form>
                    <Item rounded style={styles.formItem} >
                        <Input
                            placeholder="enter season name "
                            style={{ color: "#eee" }}
                            value={name}
                            onChangeText={(text) => { setName(text) }}
                        >
                        </Input>

                    </Item>
                    <Item rounded style={styles.formItem} >
                        <Input
                            placeholder="enter number of seasons"
                            style={{ color: "#eee" }}
                            value={totalNoSeason}
                            onChangeText={(text) => setTotalNoSeason(text)}
                        >
                        </Input>

                    </Item>
                    <Button rounded block style={{ backgroundColor: "#000" }}
                        onPress={addToList}
                    >
                        <Text style={{ color: "#AE1438", fontWeight: "bold" }} >Add</Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>

    )
}
export default Add


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1b262c',
        flex: 1,
        justifyContent: 'flex-start',
    },
    heading: {
        textAlign: 'center',
        color: '#EAF0F1',
        marginHorizontal: 5,
        marginTop: 50,
        marginBottom: 20,
    },
    formItem: {
        marginBottom: 20,
    },
});

