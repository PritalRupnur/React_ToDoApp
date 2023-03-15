/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React, { useState } from 'react';
//import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,

} from 'react-native';




//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const COLORS = { primary: '#1f145c', white: '#fff' };


function App() {

  const [todos, setTodos] = React.useState([] as any);
  const [textInput, setTextInput] = React.useState('');

  const ListItem = ({ todo }: { todo: any }) => {

    return <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: COLORS.primary,
            textDecorationLine: todo.completed ? 'line-through' : 'none',
          }}> {todo.task}</Text>
      </View>
      {
        !todo.completed && (<TouchableOpacity onPress={()=>markTodoComplete(todo.id)}> 
        <View style={[styles.actionIcon, {backgroundColor:'green'}]}>
       
          <Icon name="done" size={20} color={COLORS.white} ></Icon>
        </View>
        </TouchableOpacity>)

      }


      <TouchableOpacity style={[styles.actionIcon, { backgroundColor: "red" }]}>
        <Icon name="delete" size={20} color={COLORS.white} onPress={() => deleteToDo(todo.id)}></Icon>

      </TouchableOpacity>
    </View>
  }

  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };

  const markTodoComplete = (todoId: any) => {
    const newTodosItem = todos.map((item: any) => {
      if (item.id == todoId) {
        return { ...item, completed: true };
      }
      return item;
    });

    setTodos(newTodosItem);
  };

  const deleteToDo = (todoId: any) => {

    const latestToDo = todos.filter((item: any) =>
      (item.id != todoId)
    )
    

    Alert.alert('Confirm', 'Are you sure? You want to clear this particular todo?', [
      {
        text: 'Yes',
        
        onPress: () => setTodos(latestToDo),
      },
      {
        text: 'No',
      },
    ]);

    
  }

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {
        text: 'No',
      },
    ]);
  };

  //const saveToDoUser


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.primary }}>TO DO APP</Text>
        <View><Icon name="delete" size={25} color="red" onPress={clearAllTodos}/>
        </View>
        </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({item}) => <ListItem todo={item}/>}/>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Add task" value={textInput} onChangeText={(text) => setTextInput(text)}/>
        </View>
      
      <TouchableOpacity onPress={addTodo}>
        <View style={styles.iconContainer} >
          <Icon name="add" color="white" size={30} onPress={addTodo}/>
          </View>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexdirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },

});

export default App;
