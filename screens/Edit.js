import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import {
    Fab,
    Icon,
    Container,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Title,
    Subtitle,
    CheckBox,
    Button,
    Text,
    H1,
    Spinner,
    Form,
    Input,
    Item,
} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage';
const Edit = ({ navigation, route }) => {

    const [name, setName] = useState('')
    const [totalNoSeason, setTotalNoSeason] = useState('')
    const [id, setId] = useState(null)

    const update = async () => {
        try {
            if (!name || !totalNoSeason) {
                return alert("Please enter values")
            }

            seasonToAdd = {
                id: id,
                name: name,
                totalNoSeason: totalNoSeason,
                isWatched: false
            }
            const storedValue = await AsyncStorage.getItem('@season_list')
            const list = JSON.parse(storedValue)

            list.map((singleSeason) => {
                if (singleSeason.id == id) {
                    singleSeason.name = name
                    singleSeason.totalNoSeason = totalNoSeason
                }
                return singleSeason
            })
            await AsyncStorage.setItem('@season_list', JSON.stringify(list))
            navigation.navigate("Home")


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        const { season } = route.params   // this will give us the vaue of season
        const { id, name, totalNoSeason } = season // destructuring the values from season value
        setId(id)
        setName(name)
        setTotalNoSeason(totalNoSeason)
    }, [])
    return (

        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                <H1 style={styles.heading}>Update to watch list</H1>
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
                        onPress={update}
                    >
                        <Text style={{ color: "#AE1438", fontWeight: "bold" }} >Update</Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>

    )
}
export default Edit


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1b262c',
        flex: 1,
        justifyContent: 'flex-start',
    },
    heading: {
        textAlign: 'center',
        color: '#AE1438',
        marginHorizontal: 5,
        marginTop: 50,
        marginBottom: 20,
        backgroundColor: "#000"
    },
    formItem: {
        marginBottom: 20,
    },
});

