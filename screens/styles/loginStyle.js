import { StyleSheet } from 'react-native';

//colors: 01371E 56070C 212C58 3F2045 99431F E2B007
export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3F2045',
	},
	headerLogin: {
		width: '100%',
		height: 250,
		backgroundColor: '#3F2045',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 25,
	},
	headerRegistration: {
		width: '100%',
		height: 150,
		backgroundColor: '#3F2045',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 25,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff',
	},
	main: {
		paddingHorizontal: 20,
	},
});