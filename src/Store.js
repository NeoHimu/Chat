import React from 'react';
import io from 'socket.io-client';


export const CTX = React.createContext();


/*

	msg{
		from: 'user',
		msg: 'hi',
		topic: 'general'
	}

	state{
		topic1: [
			{msg}, {msg}, {msg}
		],

		topic2: [
		{msg}, {msg}, {msg}
		]		
	}

*/

const initState = {
		topic1: [
			{from: 'amitabh1', msg: 'waasup1'},
			{from: 'amitabh2', msg: 'waasup2'},
			{from: 'amitabh3', msg: 'waasup3'}
		],

		topic2: [
			{from: 'amit1', msg: 'hello1'},
			{from: 'amit2', msg: 'hello2'},
			{from: 'amit3', msg: 'hello3'}
		]		
}

function reducer(state, action){
	const {from, msg, topic} = action.payload;
	console.log(from+ " " +msg);
	switch(action.type)
	{
		case 'RECEIVE_MESSAGE':
			return {
				...state,
				[topic]: [
					...state[topic],
					{ from, msg }
				]
			}

		default:
			return state;
	}
}

let socket;

function sendChatAction(value){
	socket.emit('chat message ', value);
}

export default function Store(props){

	const [allChats, dispatch] = React.useReducer(reducer, initState);

	if(!socket){
		socket = io(':3001');
		socket.on('chat message', function(msg){
			console.log({msg});
			dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
	    });
	}

	const user = "himanshu"+Math.random(100).toFixed(2);

	 return (

	 		<CTX.Provider value={{allChats, sendChatAction, user}}>
	 			{props.children}
	 		</CTX.Provider>

	 	)

}