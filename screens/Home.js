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
    Spinner
} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native'


const Home = ({ navigation, route }) => {
    const [listOfSeasons, setListOfSeasons] = useState([])
    const [loading, setLoading] = useState(false)

    const isFocused = useIsFocused();

    const getList = async () => {
        setLoading(true)
        const storedValue = await AsyncStorage.getItem('@season_list')
        if (!storedValue) {
            setListOfSeasons([]);
        }
        const list = JSON.parse(storedValue);
        setListOfSeasons(list)
        setLoading(false)
    }
    const deleteSeason = async (id) => {
        const newList = await listOfSeasons.filter((list) => (list.id !== id))
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList))
        setListOfSeasons(newList)
    }
    const markComplete = async (id) => {
        const newList1 = listOfSeasons.map((items) => {
            if (items.id === id) {
                items.isWatched = !items.isWatched
            }
            return items

        })
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList1))
        setListOfSeasons(newList1)
    }
    useEffect(() => {
        getList()
    }, [isFocused])


    if (loading) {
        return (
            <Container>
                <Spinner color="#AE1438" />
            </Container>
        )
    }

    return (
        <Container style={styles.container} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} >

                {listOfSeasons.length === 0 ? (
                    <Container style={styles.container}>
                        <H1 style={styles.heading} > watch list is empty. Please enter a season </H1>
                    </Container>
                ) : (
                        <>
                            <H1 style={styles.heading}>Next Series to watch</H1>
                            <List>
                                {listOfSeasons.map((season) => (
                                    <ListItem key={season.id} style={styles.listItem} noBorder >
                                        <Left>
                                            <Button style={styles.actionButton}
                                                danger
                                                onPress={() => {
                                                    deleteSeason(season.id)
                                                    console.log(season.id);
                                                }}
                                            >
                                                <Icon name="trash" />
                                            </Button>
                                            <Button style={styles.actionButton}
                                                onPress={() => { navigation.navigate('Edit', { season }) }}

                                            >
                                                <Icon name="edit" type="Feather" />
                                            </Button>


                                        </Left>
                                        <Body>
                                            <Title style={styles.seasonName} >{season.name}</Title>
                                            <Text note >{season.totalNoSeason} season to watch</Text>
                                        </Body>
                                        <Right>
                                            <CheckBox
                                                checked={season.isWatched}
                                                onPress={() => {
                                                    markComplete(season.id)
                                                    console.log("iswatched", season.isWatched);
                                                }}
                                            />
                                        </Right>
                                    </ListItem>
                                ))}

                            </List>
                        </>
                    )}





                <Fab
                    style={{ backgroundColor: "#000", position: "absolute" }}

                    position="bottomRight"
                    onPress={() => navigation.navigate('Add')}
                >
                    <Icon name="add"
                        style={{ color: "#AE1438", }}
                    />
                </Fab>
            </ScrollView >
        </Container>
    )
}
export default Home

const styles = StyleSheet.create({
    emptyContainer: {
        backgroundColor: '#1b262c',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#1b262c',
        flex: 1

    },
    heading: {
        textAlign: 'center',
        color: '#AE1438',
        marginVertical: 15,
        marginHorizontal: 5,
        backgroundColor: "#000"

    },
    actionButton: {
        marginLeft: 5,
    },
    seasonName: {
        color: '#fdcb9e',
        textAlign: 'justify',
    },
    listItem: {
        marginLeft: 0,
        marginBottom: 20,
    },
});