import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FDEEDC',
	},
	header: {
		width: '100%',
		height: 125,
		backgroundColor: '#FFD8A9',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 25,
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
		paddingTop: 50,
		paddingHorizontal: 20,
	},
});