import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	header: {
		width: '100%',
		height: 300,
		backgroundColor: '#3F2045',
		justifyContent: 'flex-end',
		paddingBottom: 25,
		paddingHorizontal: 15,
		shadowColor: '#F1A661',
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 1
		}
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff',
	},
	main: {
		flex: 1,
		paddingTop: 30,
		paddingHorizontal: 20,
	},
});