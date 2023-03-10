import { Route } from "@react-navigation/native";

export type RootStackParamList = {
	Home: undefined;
	Planner: undefined;
	WorkoutDetail: {
		slug: string;
	};
	Root: undefined;
};

export type Difficulty = "easy" | "normal" | "hard";
export type WorkoutType = "exercise" | "stretch" | "break";

export interface SequenceType {
	slug: string;
	name: string;
	type: WorkoutType;
	reps?: number;
	duration: number;
}

export interface Workout {
	slug: string;
	name: string;
	duration: number;
	difficulty: Difficulty;
	sequence: Array<SequenceType>;
}

type Type = "lato-regular" | "lato-bold";
export interface TextProps {
	text: string | undefined;
	type?: Type;
	size?: number;
	style?: {
		[key: string]: any;
	};
}

export type DetailParams = {
	route: {
		params: {
			slug: string;
		};
	};
};
