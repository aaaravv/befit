import React, { useState } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import slugify from "slugify";

import { RootStackParamList, WorkoutType, SequenceType } from "../types";
import WorkoutForm, { Exercise } from "../components/Form/WorkoutForm";
import WorkoutItem from "../components/Workout/WorkoutItem";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "../components/Modal/Modal";
import WorkoutsForm from "../components/Form/WorkoutsForm";
import { Workout } from "../types";
import { storeWorkouts } from "../store/workouts";
import Text from "../components/Text/Text";

type Props = NativeStackScreenProps<RootStackParamList, "Planner">;

function PlannerScreen({ navigation }: Props) {
	const [seqItems, setSeqItems] = useState<SequenceType[]>([]);

	const handleOnSubmit = (form: Exercise) => {
		const sequenceItem: SequenceType = {
			slug: slugify(form.name + Date.now(), { lower: true }),
			name: form.name,
			duration: Number(form.duration),
			type: form.type as WorkoutType,
		};

		if (form.reps) sequenceItem.reps = Number(form.reps);

		setSeqItems([...seqItems, sequenceItem]);
	};

	const computeDiff = (workoutCount: number, workoutDuration: number) => {
		const intensity = workoutCount / workoutDuration;

		if (intensity < 60) {
			return "hard";
		} else if (intensity <= 100) {
			return "normal";
		} else {
			return "easy";
		}
	};

	const handleWorkoutSubmit = async (form: Workout) => {
		if (seqItems.length > 0) {
			const duration = seqItems.reduce(
				(acc, item) => acc + item.duration,
				0
			);

			const workout: Workout = {
				name: form.name,
				slug: slugify(form.name + Date.now(), { lower: true }),
				sequence: seqItems,
				duration: duration,
				difficulty: computeDiff(seqItems.length, duration),
			};

			console.log(workout);
			await storeWorkouts(workout);
		}
	};

	return (
		<View style={styles.container}>
			{seqItems?.length > 0 ? (
				<FlatList
					style={{ flex: 1 }}
					data={seqItems}
					keyExtractor={(item) => item.slug}
					renderItem={({ item, index }) => (
						<WorkoutItem item={item}>
							<FontAwesome
								name="trash"
								size={24}
								color="black"
								style={{
									marginLeft: 15,
									width: "30%",
								}}
								onPress={() => {
									const items = [...seqItems];
									items.splice(index, 1);
									setSeqItems(items);
								}}
							/>
						</WorkoutItem>
					)}
				/>
			) : (
				<View style={styles.imageContainer}>
					<Image
						style={{
							height: 200,
							width: 300,
						}}
						source={require("../assets/loader.gif")}
					/>
					<Text text="Try adding some exercises to your workout!" />
				</View>
			)}

			<WorkoutForm onSubmit={handleOnSubmit} />
			<View>
				<Modal
					data={
						<WorkoutsForm
							onSubmit={async (data) => {
								await handleWorkoutSubmit(data as Workout);
								navigation.navigate("Home");
							}}
						/>
					}
					toggleTitle={"CREATE WORKOUT"}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#eee",
	},
	imageContainer: {
		marginBottom: 60,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default PlannerScreen;
