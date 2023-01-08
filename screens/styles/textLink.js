import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: "75%",
	},
	textLinkMid: {
		alignSelf: "center",
        textDecorationLine: 'underline',
		color: '#FFF',
		fontSize: 13,
	},
	textLinkLeft: {
		alignSelf: "flex-start",
		textDecorationLine: 'underline',
		color: '#FFF',
		fontSize: 13,
	},
	textLinkRight: {
		alignSelf: "flex-end",
		textDecorationLine: 'underline',
		color: '#FFF',
		fontSize: 13,
	},
});