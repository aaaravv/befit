import React from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import data from "../data/data.json";
import Text from "../components/Text/Text";
import RenderWorkouts from "../components/RenderWorkout";
import { RootStackParamList, Workout } from "../types";

function HomeScreen({
	navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
	return (
		<View style={styles.container}>
			<Text
				text={"New Workouts"}
				size={20}
				type="lato-bold"
				style={{
					textAlign: "center",
				}}
			/>
			<FlatList
				scrollEnabled
				data={data as Workout[]}
				keyExtractor={(item) => item.slug}
				renderItem={({ item }) => {
					return (
						<Pressable
							onPress={() =>
								navigation.navigate("WorkoutDetail", {
									slug: item.slug,
								})
							}>
							<RenderWorkouts item={item} />
						</Pressable>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
	},
});

export default HomeScreen;
